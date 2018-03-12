from flask import Flask, flash, render_template, request, jsonify, redirect, make_response, session, redirect, url_for
from objects.Scraper import Scraper

app = Flask(__name__)

scraper = Scraper()

@app.route('/')
def homePage():
    return render_template('index.html')

@app.route('/portfolio')
def portfolioPage():
    return render_template('portfolio.html')

@app.route('/thoughts')
def thoughtsPage():
    posts = scraper.getPosts('esteininger')
    return render_template('thoughts.html', posts=posts)

@app.route('/test')
def testPage():
    return render_template('test.html')

##APIs
@app.route('/api/get-medium-posts/<username>')
def getMediumPostsAPI(username):
    posts = scraper.getPosts(username)
    return jsonify(posts)

@app.route('/api/get-word-of-the-day')
def getWODAPI():
    WOD = scraper.getWOD()
    return jsonify(WOD)

if __name__ == '__main__':
    app.run(debug=True, port=5010)
