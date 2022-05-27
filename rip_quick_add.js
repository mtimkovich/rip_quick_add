import Sherlock from 'sherlockjs';
import moment from 'moment';

function dateRange(start, end, isAllDay, utc=false) {
  let formatString = 'YYYYMMDD[T]HHmmss';

  if (isAllDay) {
    formatString = 'YYYYMMDD';
  } else if (utc) {
    formatString = 'YYYYMMDD[T]HHmmss[Z]';
  }

  return [start, end].map(t => t.format(formatString)).join('/');
}

function parse(text) {
  if (!text) {
    throw new Error('invalid input text');
  }

  let utc = false;

  if (/\bnow\b/.test(text)) {
    utc = true;
  }

  const { eventTitle, startDate, endDate, isAllDay } = Sherlock.parse(text);
  const start = moment(startDate);
  let end = moment(endDate);

  if (!start.isValid()) {
    throw new Error('could not find time data');
  }

  if (!end.isValid()) {
    end = start.clone();

    if (!isAllDay) {
      end.add(1, 'hours');
    }
  }

  if (isAllDay) {
    end.add(1, 'days');
  }

  const dates = dateRange(start, end, isAllDay, utc);
  return { text: eventTitle, dates }
}

export function createEventUrl(text) {
  let data;
  try {
    data = parse(text);
  } catch {
    return null;
  }

  data.action = 'TEMPLATE';

  const baseUrl = 'https://www.google.com/calendar/render';
  const params = new URLSearchParams(data);
  return `${baseUrl}?${params}`;
}
