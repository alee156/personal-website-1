import json
import requests
from datetime import datetime
from operator import attrgetter, itemgetter
import urllib2
from bs4 import BeautifulSoup

class Scraper:
    def __init__(self):
        pass

    def cleanJSON(self, response):
        return json.loads(response.text.split('])}while(1);</x>')[1])

    def decodeUTF(self, str):
        newStr = str.encode('utf-8').strip()
        decoded = unicode(newStr, 'utf-8')
        return decoded

    def epochToDate(self, epoch):
        ts = datetime.fromtimestamp(int(epoch)/1000).strftime('%B %d, %Y')
        return ts

    def sortArray(self, objects):
        #i have no idea why this works
        return sorted(objects, key=lambda objects: (objects['date']), reverse=True)

    def getPosts(self, username):
        try:
            baseURL = 'https://medium.com/@'+username+'/latest?format=json'

            response = requests.get(baseURL)
            responseDict = self.cleanJSON(response)

            cleanDict = []

            for key,value in responseDict['payload']['references']['Post'].iteritems():
                f = {}
                f['title'] = value['title']

                previewStr = ''
                for preview in value['previewContent']['bodyModel']['paragraphs']:
                    previewStr += ' ' + preview['text']
                    f['preview'] = previewStr

                f['tags'] = {}
                count = 0

                for tag in value['virtuals']['tags']:
                    count += 1
                    f['tags'][count] = tag['name']

                f['url'] = 'https://medium.com/@' + username + '/' + value['uniqueSlug']
                f['date'] = self.epochToDate(value['latestPublishedAt'])
                cleanDict.append(f)

            return self.sortArray(cleanDict)
        except Exception as e:
            print e
            return 'Not Found!'
            

    def jsonize(self, word, meaning):
        return json.dumps({'meaning': meaning[0], 'word': word[0]})

    def getWOD(self):
        content = urllib2.urlopen('https://www.merriam-webster.com/word-of-the-day').read()
        soup = BeautifulSoup(content, features="lxml")
        words = []
        meanings = []

        for div in soup.findAll('div', attrs={'class': 'word-and-pronunciation'}):
            word = div.find('h1')
            words.append(word.text.strip())

        for div in soup.findAll('div', attrs={'class': 'wod-definition-container'}):
            meaning = div.find('p')
            meanings.append(meaning.text.strip())

        return self.jsonize(meanings, words)
