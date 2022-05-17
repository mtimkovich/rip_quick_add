# RIP Quick Add

Quickly create Google Calendar events from plain text.

![preview.jpg](https://raw.githubusercontent.com/mtimkovich/rip_quick_add/main/preview.jpg)

[Quick Add][article] was a Google Calendar feature that existed circa 2012 that enabled creating calendar events from natural language text input. I loved it and they deprecated it from me ☹️. This is my attempt to recreate Quick Add in Python. It uses the [parsedatetime][pdt] library to extract time data from text.

## How it works

1. Takes a text input,
2. parses the input to find date info, and then
3. returns a Google Calendar URL for adding the event to your calendar.

## Usage

I have a running implementation [on my website][max].

If you want to run the webapp locally:

```
venv env
source env/bin/activate.fish
pip install -r requirements.txt
flask run
```

## Documentation

The "API" this app is using is documented [here][docs].

# Author

Max Timkovich

[article]: https://gsuitetips.com/tips/calendar/use-quick-add-to-speed-up-google-calendar-entries/
[docs]: https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs/blob/main/services/google.md#google
[max]: https://timkovi.ch/rip_quick_add
[pdt]: https://github.com/bear/parsedatetime#readme
