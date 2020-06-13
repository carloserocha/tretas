import React from 'react';
import { Table, Form, Grid } from 'semantic-ui-react'
import request from 'superagent'

const URI = 'http://192.168.15.70:8000/rastreio/correios'

/*const levels = [
  {
    'word': 'postado',
    'level': 1,
    'nodes': [],
    'path': './../public/images/enviada.png'
  },
  {
    'word': 'encaminhado',
    'level': 1,
    'nodes': [],
    'path': './../public/images/enviada.png'
  },
  {
    'word': 'saiu',
    'level': 2,
    'nodes': [
      1
    ],
    'path': './../public/images/saiu.png'
  },
  {
    'word': 'entregue',
    'level': 3,
    'nodes': [
      2, 1
    ],
    'path': './../public/images/entregue.png'
  },
]*/


class TrackingTable extends React.Component {
  constructor(props) {
    super(props)

    // fazer os blocos de alerta
    this.state = {
      tracking_code: '',
      done: false,
      items: [],
      level: {}
    }
  }

  // OA117280554BR
  /*componentDidMount() {
   
  }*/

  myChangeHandler = (event) => {
    this.setState({ tracking_code: event.target.value });
    if (this.state.tracking_code.length > 11) {
      this.setState({ tracking_code: event.target.value });
      request
        .get(`${URI}/${event.target.value}`)
        .then(res => this.setState({ items: (JSON.parse(res.text)).results, done: true }))
        .catch(err => console.log(err))
    }
  }

  renderTableData() {
    if (this.state.done) {
      return this.state.items.map((element) => {
        return (
          <Table.Row>
            <Table.Cell>{element.date} {element.hour}</Table.Cell>
            <Table.Cell>{element.local}</Table.Cell>
            <Table.Cell>
              {element.notice}
            </Table.Cell>
          </Table.Row>
        )
      })
    }
  }

  /*componentImage() {
    const item = this.state.items[0] // já retorna ordenado
    const c = levels.filter(i => item.notice.includes(i.word))
    console.log(c)
    this.setState({
      level: c
    })
  }*/

  render() {
    return (
      <Grid centered columns={3}>
        <Grid.Column>
        <Form onSubmit={this.mySubmitHandler} padded>
        <h3>{this.state.tracking_code}</h3>
          <Form.Group>
            <Form.Input
              placeholder='Insire o código de rastreio'
              type='text'
              value={this.state.tracking_code}
              onChange={this.myChangeHandler}
            />
          </Form.Group>
        </Form>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Hora</Table.HeaderCell>
              <Table.HeaderCell>Local</Table.HeaderCell>
              <Table.HeaderCell>Observação</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.renderTableData()}
          </Table.Body>
        </Table>
        </Grid.Column>
      </Grid>
    )
  }
}

export default TrackingTable;
