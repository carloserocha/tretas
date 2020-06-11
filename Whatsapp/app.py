from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import os
import json
import time

class WhatsappBot:
    dir_path = os.getcwd()
    profile = os.path.join(dir_path, "profile", "zapzap")

    def __init__(self, msg):
        self.message = msg
        self.senders = ["oi carlos"]
        self.options = webdriver.ChromeOptions()
        self.options.add_argument('lang=pt-br')

        self.options.add_argument(
            f"user-data-dir={self.profile}"
        )
        self.driver = webdriver.Chrome(
            ChromeDriverManager().install(), chrome_options=self.options)

        self.driver.get('https://web.whatsapp.com')
        time.sleep(15)

    def sendMessages(self):
        for sender in self.senders:
            print(sender, self.message)
            senderField = self.driver.find_element_by_xpath(
                f"//span[@title='{sender}']")
            time.sleep(3)
            senderField.click()
            inp_xpath = '//div[@class="_3FRCZ copyable-text selectable-text"][@contenteditable="true"][@data-tab="1"]'
            chat_box = self.driver.find_element_by_xpath(inp_xpath)
            time.sleep(3)
            chat_box.click()
            chat_box.send_keys(self.message)
            time.sleep(1)
            botao_enviar = self.driver.find_element_by_xpath(
                "//span[@data-icon='send']")
            time.sleep(1)
            botao_enviar.click()
            time.sleep(5)


if __name__ == "__main__":
    with open('quotes.json',  encoding='utf-8') as outfile:
        data = json.load(outfile)
        timeNow = int (time.strftime("%H", time.gmtime()))
        while(True):
            for quote in data['quotes']:
                if timeNow > quote['min'] and timeNow < quote['max']:
                    bot = WhatsappBot(quote['msg'])
                    bot.sendMessages()
            time.sleep(60)
