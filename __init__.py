from flask import Flask, flash, render_template
from objects.Scraper import Scraper

app = Flask(__name__)

scraper = Scraper()

@app.route('/')
def homePage():
    return render_template('index.html')

@app.route('/about')
def aboutPage():
    return render_template('about.html')

@app.route('/portfolio')
def portfolioPage():
    return render_template('portfolio.html')

@app.route('/thoughts')
def thoughtsPage():
    return render_template('thoughts.html')

@app.route('/contact')
def contactPage():
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True, port=5010)
