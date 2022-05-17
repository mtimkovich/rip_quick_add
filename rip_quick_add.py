from datetime import datetime, timedelta
from time import mktime
from typing import Optional, Tuple

import parsedatetime as pdt
from requests import Request


cal = pdt.Calendar()
PDT_FAIL = 0
PDT_DATE = 1

def extract_datetime(text: str) -> Tuple[datetime, int]:
    result = cal.parse(text)
    if result[1] == PDT_FAIL:
        raise ValueError('could not parse timestamp from event')
    dt = datetime.fromtimestamp(mktime(result[0]))
    return dt, result[1]


def dt_format(dt: datetime, flag: int) -> str:
    if flag == PDT_DATE:
        return dt.strftime('%Y%m%d')
    return dt.strftime('%Y%m%dT%H%M%S')


def create_invite_url(text: str) -> Optional[str]:
    try:
        start, flag = extract_datetime(text)
    except ValueError:
        return None

    if flag == PDT_DATE:
        end = start + timedelta(days=1)
    else:
        end = start + timedelta(hours=1)

    dates = '/'.join(dt_format(t, flag) for t in [start, end])

    params = {
        'action': 'TEMPLATE',
        'text': text,
        'dates': dates,
    }
    p = Request('GET', 'https://www.google.com/calendar/render',
                params=params).prepare()
    return p.url


if __name__ == '__main__':
    text = 'Dinner with Michael 7 p.m. tomorrow'
    url = create_invite_url(text)
    print(url)
