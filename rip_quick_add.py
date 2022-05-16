from datetime import datetime, timedelta
from time import mktime
import webbrowser

import parsedatetime as pdt
from requests import Request


cal = pdt.Calendar()


def extract_datetime(text: str) -> tuple[datetime, int]:
    result = cal.parse(text)
    dt = datetime.fromtimestamp(mktime(result[0]))
    return dt, result[1]


# TODO: handle all the different flags.
def dt_format(dt: datetime, flag: int) -> str:
    if flag == 1:
        return dt.strftime('%Y%m%d')
    if flag == 3:
        return dt.strftime('%Y%m%dT%H%M%S')
    raise RuntimeError(f'unhandled flag {flag}')


def create_invite_url(text: str) -> str:
    start, flag = extract_datetime(text)
    end = start + timedelta(hours=1)
    dates = '/'.join(dt_format(t, flag) for t in [start, end])

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
