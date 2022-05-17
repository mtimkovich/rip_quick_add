const Sherlock = require('sherlockjs');
const moment = require('moment');

function dateRange(start, end, isAllDay) {
  let formatString = 'YYYYMMDD[T]HHmmss';

  if (isAllDay) {
    formatString = 'YYYYMMDD';
  }

  return [start, end].map(t => t.format(formatString)).join('/');
}

function parse(text) {
  const { eventTitle, startDate, endDate, isAllDay } = Sherlock.parse(text);
  const start = moment(startDate);
  let end = moment(endDate);

  if (!start.isValid()) {
    throw new Error('could not find time data');
  }

  if (!end.isValid()) {
    end = start.clone();
    if (isAllDay) {
      end.add(1, 'days');
    } else {
      end.add(1, 'hours');
    }
  }

  const dates = dateRange(start, end, isAllDay);
  return { text: eventTitle, dates }
}

function createEventUrl(text) {
  const data = parse(text);
  data.action = 'TEMPLATE';

  const baseUrl = 'https://www.google.com/calendar/render';
  const params = new URLSearchParams(data);
  return `${baseUrl}?${params}`;
}

// const text = 'Brunch tomorrow at 9:30am';
// const url = createEventUrl(text);
// console.log(url);
