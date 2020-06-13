require('./db/config');

const database = require('./db/database');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const request = require('request');
const objectChecksum = require('object-hash');
const sleep = require('sleep');

const { Client } = require('whatsapp-web.js');

const DEFAULT_REGEX = /\w{2}\d{9}\w{2}$/g

// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
    session: sessionData
});

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    console.log('Client is ready!');

    const trackingPending = await database.retrieve({
        $or: [{
            'pending': true,
            'details.checksum': null
        }]
    }, {
        _id: 0
    })

    for (let tracking of trackingPending) {
        const details = tracking.details.filter(i => !i.checksum)
        for (let detail of details) {
            const message = `${detail.date} ${detail.hour} - ${detail.notice}`
            client.sendMessage(tracking.client_from, message)

            detail.checksum = objectChecksum(detail)
        }

        const isPending = tracking.details.some(i => i.notice.includes('entregue'))
        await database.update(tracking, {
            ...tracking,
            pending: isPending
        })
    }
});

client.on('message', async message => {
    // any caracter, any digit
    if (message.body.match(DEFAULT_REGEX)) {
        const match = DEFAULT_REGEX.exec(message.body)
        sleep.msleep(100)
        request(`http://localhost:8000/rastreio/correios/${match[0]}`, { json: true }, (err, res, body = {}) => {
            const { results } = body
            if (!results) {
                client.sendMessage(message.from, 'Desculpe. Ocorreu um erro quando tentei consultar sua encomenda :(');
            } else {
                client.sendMessage(message.from, `${results[0].date} ${results[0].hour} - ${results[0].notice}`);

                for (let result of results) {
                    result.checksum = objectChecksum(result)
                }

                const query = {
                    client_from: message.from,
                    trackingId: match[0],
                    details: results
                }

                const isPending = results.some(i => i.notice.includes('entregue'))
                const mod = {
                    pending: isPending
                }

                database.update(query, mod)
            }
        });
    } else {
        const contact = await message.getContact()
        const Welcome = `Olá ${contact.shortName || ''}, informe o seu código de rastreio para receber atualizações sobre sua encomenda`

        client.sendMessage(message.from, Welcome)
    }
});

client.initialize();
