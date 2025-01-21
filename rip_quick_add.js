import * as chrono from 'chrono-node';
import dayjs from 'dayjs';

function dateRange(start, end, isAllDay) {
  let formatString = 'YYYYMMDD[T]HHmmss';

  if (isAllDay) {
    formatString = 'YYYYMMDD';
  }

  return [start, end].map(t => t.format(formatString)).join('/');
}

function parse(text) {
  if (!text) {
    throw new Error('invalid input text');
  }

  const results = chrono.parse(text);

  if (results.length === 0) {
    throw new Error('could not find time data');
  }

  const result = results[0];

  const eventTitle = text.replace(result.text, "").trim();
  const startDate = result.start;
  const isAllDay = !startDate.isCertain('hour');
  const start = dayjs(startDate.date());
  let end = null;

  if (!start.isValid()) {
    throw new Error('could not find time data');
  }

  if (result.end !== null) {
    end = dayjs(result.end.date());
  }

  if (end === null) {
    if (isAllDay) {
      end = start.add(1, 'days');
    } else {
      end = start.add(1, 'hours');
    }
  }

  const dates = dateRange(start, end, isAllDay);
  return { text: eventTitle, dates }
}

// TODO: Update this to the latest version.
export function createEventUrl(text) {
  let data;
  try {
    data = parse(text);
    console.log(data);
  } catch (err) {
    console.log(err);
    return null;
  }

  data.action = 'TEMPLATE';

  const baseUrl = 'https://www.google.com/calendar/render';
  const params = new URLSearchParams(data);
  return `${baseUrl}?${params}`;
}
