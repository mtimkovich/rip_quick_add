import * as chrono from 'chrono-node';
import moment from 'moment';

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
  const start = moment(startDate.date());
  let end = null;

  if (result.end !== null) {
    end = moment(result.end.date());
  }

  if (!start.isValid()) {
    throw new Error('could not find time data');
  }

  if (end === null || !end.isValid()) {
    end = start.clone();

    if (!isAllDay) {
      end.add(1, 'hours');
    }
  }

  if (isAllDay) {
    end.add(1, 'days');
  }

  const dates = dateRange(start, end, isAllDay);
  return { text: eventTitle, dates }
}

export function createEventUrl(text) {
  let data;
  try {
    data = parse(text);
    console.log(data);
  } catch {
    return null;
  }

  data.action = 'TEMPLATE';

  const baseUrl = 'https://www.google.com/calendar/render';
  const params = new URLSearchParams(data);
  return `${baseUrl}?${params}`;
}

function main() {
  const input = "Brunch with Gary and Mira tomorrow at 10:30am";
  const url = createEventUrl(input);
  console.log(url);
}
