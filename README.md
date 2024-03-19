# RIP Quick Add

Quickly create Google Calendar events from natural language.

![preview.png](https://raw.githubusercontent.com/mtimkovich/rip_quick_add/main/preview.png)

Quick Add was a Google Calendar feature that enabled creating calendar events from natural language text input. It was removed for no reason and [upset many people][support]. This is my attempt to carry on its legacy. It uses the [Chrono][chrono] library to extract time data from text.

## How it works

1. Takes a text input e.g. "Dinner friday 7pm"
2. Parses the input to find date info
3. Returns a Google Calendar URL for adding the event to your calendar.

Select any text that has date information (e.g. Movie at 2:30pm tomorrow) and right-click and use the context menu to add the event to your calendar.

Alternatively, events can be created by clicking the app icon and entering the event info in the text box.

## Language

User can choose the language in which they would like to parse the input text in extension options page.

Currently supported languages are:
* English
* French
* Dutch
* Japanese
* Russian
* Portuguese
* Ukrainian
* Chinese
* German
* Spanish

Supported languages depends on the [Chrono](https://github.com/wanasit/chrono?tab=readme-ov-file#locales) node module locales.

## Usage

### Chrome Extension
Install the Chrome extension from [Chrome Web Store][webstore].

### Web App
Alternatively, I have a running implementation [on my website][max]. This is useful when you're on a device without Chrome extensions, like a phone.

#### Local
If you want to develop locally:

```
yarn install
```

This app uses rollup transpiling to use the JavaScript modules pattern.
* `yarn build`: transpile all scripts into `chrome-extension` directory
* `yarn watch`: transpile all scripts into `chrome-extension` directory and re-transpile automatically on changes

## Documentation

The "API" this app is using is documented [here][docs].

## Author

Max Timkovich

[support]: https://support.google.com/calendar/thread/55538170/can-quick-add-be-reinstated?hl=en
[docs]: https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs/blob/main/services/google.md#google
[max]: https://timkovi.ch/rip_quick_add
[chrono]: https://github.com/wanasit/chrono
[webstore]: https://chrome.google.com/webstore/detail/rip-quick-add/einookkhlkagdckkngcebldmicpilpmk
