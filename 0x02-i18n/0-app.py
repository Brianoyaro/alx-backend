#!/usr/bin/env python3
'''flask application
'''
from flask import render_template, Flask


app = Flask('__name__')


@app.route('/')
def index() -> str:
    '''home page'''
    return render_template('0-index.html')


if __name__ == '__main__':
    app.run(debug=True)
