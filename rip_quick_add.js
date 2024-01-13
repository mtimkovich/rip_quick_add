import * as chrono from 'chrono-node';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);
dayjs.extend(timezone);

function dateRange(start, end, isAllDay) {
  let formatString = 'YYYYMMDD[T]HHmmss';

  if (isAllDay) {
    formatString = 'YYYYMMDD';
  }

  return [start, end].map(t => t.format(formatString)).join('/');
}

function parse(text, localTz) {
  if (!text) {
    throw new Error('invalid input text');
  }

  // Custom chrono refiner
  const localTime = dayjs.tz(new Date(), localTz)
  const localOffset = localTime.utcOffset() // returns in minutes
  const custom = chrono.casual.clone()
  custom.refiners.push({
    refine: (context, results) => {
      results.forEach((result) => {
        // Returns the time with the offset in included (must use minutes)
        result.start.imply('timezoneOffset', localOffset)
        result.end && result.end.imply('timezoneOffset', localOffset)
      })
      return results
    }
  });

  const results = custom.parse(text);

  if (results.length === 0) {
    throw new Error('could not find time data');
  }

  const result = results[0];

  const eventTitle = text.replace(result.text, "").trim();
  const startDate = result.start;
  const isAllDay = !startDate.isCertain('hour');
  const start = dayjs(startDate.date()).tz(localTz);
  let end = null;

  if (result.end !== null) {
    end = dayjs(result.end.date());
  }

  if (!start.isValid()) {
    throw new Error('could not find time data');
  }

  if (end === null) {

    if (!isAllDay) {
      end = start.add(1, 'hours');
    }
  }

  if (isAllDay) {
    end = start.add(1, 'days');
  }


  const dates = dateRange(start, end, isAllDay);
  return { text: eventTitle, dates }
}

export function createEventUrl(text, timezone=undefined) {
  let data;
  try {
    data = parse(text, timezone);
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

function main() {
  // const input = "Brunch with Gary and Mira tomorrow at 10:30am";
  const input = "Event now";
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // const timezone = 'Etc/Utc';

  const url = createEventUrl(input, timezone);
  console.log(url);
}

// main();
