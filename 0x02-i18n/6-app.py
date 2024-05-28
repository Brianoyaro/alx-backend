#!/usr/bin/env python3
'''flask application
'''
from flask import render_template, Flask, request, g
from flask_babel import Babel, _
from typing import Union


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
def get_locale() -> Union[str, None]:
    '''finds locale of user using HTML header attribute ACCEPT-LANGUAGES'''
    locale = request.args.get('locale')
    if locale is None:
        user = getattr(g, 'user', None)
        if user is None or user['locale'] not in Config.LANGUAGES:
            return request.accept_languages.best_match(Config.LANGUAGES)
        locale = user['locale']
    return locale


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user():
    '''validates a user
    '''
    user_id = request.args.get('login_as')
    if user_id is None or int(user_id) not in users:
        return None
    user_dict = users[int(user_id)]
    return (user_dict)


@app.before_request
def before_request():
    '''executed before any request in the app
    '''
    user = get_user()
    setattr(g, 'user', user)


@app.route('/')
def index() -> str:
    '''home page'''
    user = getattr(g, 'user', None)
    if user is None:
        login_msg = _('You are not logged in')
    else:
        login_msg = _('You are logged in as %(username)s',
                      username=user['name'])
    home_title = _('Welcome to Holberton')
    home_header = _('Hello world!')
    return render_template('6-index.html',
                           home_title=home_title,
                           home_header=home_header,
                           login_msg=login_msg)


if __name__ == '__main__':
    app.run(debug=True)
