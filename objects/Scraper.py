import json
import requests
from datetime import datetime
from operator import attrgetter

class Scraper:
    def __init__(self):
        pass

    def cleanJSON(self, response):
        return json.loads(response.text.split('])}while(1);</x>')[1])

    def decodeUTF(self, str):
        newStr = str.decode('utf-8').strip()
        return newStr

    def epochToDate(self, epoch):
        ts = datetime.fromtimestamp(int(epoch)/1000).strftime('%B %d, %Y')
        return ts

    def sortArray(self, objects):
        return sorted(objects, key=attrgetter('date'))


    def getPosts(self, username):
        baseURL = 'https://medium.com/@'+username+'/latest?format=json'

        response = requests.get(baseURL)
        responseDict = self.cleanJSON(response)

        cleanDict = []

        for key,value in responseDict['payload']['references']['Post'].iteritems():
            f = {}
            f['title'] = value['title']
            # f['preview'] = self.decodeUTF(value['content']['subtitle'])

            f['tags'] = {}
            count = 0

            for tag in value['virtuals']['tags']:
                count += 1
                f['tags'][count] = tag['name']

            f['url'] = 'https://medium.com/@' + username + '/' + value['uniqueSlug']
            f['date'] = self.epochToDate(value['latestPublishedAt'])
            cleanDict.append(f)

        return cleanDict
