"""
# Quick Add
https://gsuitetips.com/tips/calendar/use-quick-add-to-speed-up-google-calendar-entries/

Steps:
    1. Parse calendar text
    2. Extract datetime
        a. event name is the renaming text
    3. Create google calendar event url
        https://www.google.com/calendar/render?action=TEMPLATE&text=test&dates=20220514T071800%2F20220514T081800
"""

from datetime import datetime, date, timedelta
from requests import Request
from time import mktime
from typing import Optional
import parsedatetime as pdt
import webbrowser


cal = pdt.Calendar()


def extract_datetime(text: str) -> datetime:
    result = cal.parse(text)
    dt = datetime.fromtimestamp(mktime(result[0]))
    return dt


def dt_format(dt: datetime) -> str:
    return dt.strftime('%Y%m%dT%H%M%S')


def create_invite_url(text: str) -> str:
    start = extract_datetime(text)
    end = start + timedelta(hours=1)
    dates = '/'.join(map(dt_format, [start, end]))

    params = {
            'action': 'TEMPLATE',
            'text': text,
            'dates': dates,
    }
    p = Request('GET', 'https://www.google.com/calendar/render',
                params=params).prepare()
    if p.url is None:
        raise Exception()
    return p.url


if __name__ == '__main__':
    text = 'Dinner with Michael 7 p.m. tomorrow'
    url = create_invite_url(text)
    print(url)
    # webbrowser.open(url)
