#!/usr/bin/env python3
'''flask application
'''
from flask import render_template, Flask, request
from flask_babel import Babel, _


class Config:
    '''config class
    '''
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_TIMEZONE = 'UTC'
    BABEL_DEFAULT_LOCALE = 'en'


app = Flask('__name__')
app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale() -> str:
    '''finds locale of user using HTML header attribute ACCEPT-LANGUAGES'''
    return request.accept_languages.best_match(Config.LANGUAGES)


@app.route('/')
def index() -> str:
    '''home page'''
    home_title = _('Welcome to Holberton')
    home_header = _('Hello world!')
    return render_template('3-index.html',
                           home_title=home_title,
                           home_header=home_header)


if __name__ == '__main__':
    app.run(debug=True)
