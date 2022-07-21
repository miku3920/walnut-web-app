[![build](https://img.shields.io/github/workflow/status/miku3920/walnut-web-app/Github%20Actions)](https://github.com/miku3920/walnut-web-app) [![npm](https://img.shields.io/npm/v/walnut-web-app)](https://www.npmjs.com/package/walnut-web-app) [![cdnjs](https://img.shields.io/cdnjs/v/walnut-web-app)](https://cdnjs.com/libraries/walnut-web-app) [![minified size](https://img.shields.io/bundlephobia/min/walnut-web-app)](https://cdnjs.com/libraries/walnut-web-app) [![license](https://img.shields.io/github/license/miku3920/walnut-web-app)](https://github.com/miku3920/walnut-web-app/blob/main/LICENSE)

# walnut-web-app

Bring your WebApp into effect outside of Telegram WebView.

## Table of Contents

- [General Information](#general-information)
- [Setup](#setup)
- [Usage](#usage)
- [Settings](#settings)
- [Contact](#contact)

## General Information

This package achieves something otherwise impossible by intervening between WebView and WebApp.

![Schematic](https://github.com/miku3920/walnut-web-app/blob/main/images/Schematic.png?raw=true)

If you can draw better, please draw one for me.

## Setup

```bash
$ npm i -D walnut-web-app
```

## Usage

`walnut-web-app` import should occur before import Telegram, because walnut cheats the WebApp by modifying location.hash. Accordingly, it does work outside of Telegram WebView.

```javascript
// destructured import
import { utils, event } from 'walnut-web-app'
// import all exported members
import * as walnut from 'walnut-web-app'
// import default export
import walnut from 'walnut-web-app'
```

Here are two ways to use `walnut-web-app`:

1. Only import package without other settings (use default settings):

```javascript
// main.js
import 'walnut-web-app'
import 'miku-web-app' // import Telegram
import router from '@/router'
import App from './App.vue'
```

2. Import and make some settings:

```javascript
// main.js
import '@/walnut'
import 'miku-web-app' // import Telegram
import router from '@/router'
import App from './App.vue'
```

```javascript
// src/walnut/index.js
import walnut from 'walnut-web-app'

// default settings
walnut.utils.setup({
  Data: {
    user: {
      id: 127355800,
      first_name: '初音',
      last_name: 'ミク',
      username: 'miku3920',
      language_code: 'zh-hant',
    },
    auth_date: Date.now(),
    token: '1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  Version: '6.1',
  ThemeParams: {
    bg_color: '#ffffff',
    button_color: '#40a7e3',
    button_text_color: '#ffffff',
    hint_color: '#999999',
    link_color: '#168acd',
    text_color: '#000000',
  },
  Debug: true,
})

walnut.event.on('default', (e) => {
  console.log('[Walnut.default] postEvent', e.type, e.data)
})

walnut.event.on('all', (e) => {
  // do no things
})
```

## Settings

If not set, the default value as above will be used.

### setup

You can fix the time like this:

```javascript
walnut.utils.setup({
  Data: {
    auth_date: 1658213143920,
  }
})
```

| Field       | Type                                                              | Description                                                                                                                                                            |
| ----------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Data        | [SetupData](#setupdata)                                           | _Optional._ This object contains data that is transferred to the Web App when it is opened.                                                                            |
| Version     | String                                                            | _Optional._ The version of the Bot API available in the user's Telegram app. Set to _6.1_ by default.                                                                  |
| ThemeParams | [ThemeParams](https://core.telegram.org/bots/webapps#themeparams) | _Optional._ Web Apps can adjust the appearance of the interface to match the Telegram user's app in real time. This object contains the user's current theme settings. |
| Debug       | Boolean                                                           | _Optional._ Make the MainButton visible outside of Telegram WebView. Set to _true_ by default.                                                                         |

### SetupData

| Field          | Type                                                            | Description                                                                                                                                                                     |
| -------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| query_id       | string                                                          | _Optional._ A fake unique identifier for the Web App session. Messages cannot be sent via the [answerWebAppQuery](https://core.telegram.org/bots/api#answerwebappquery) method. |
| user           | [WebAppUser](https://core.telegram.org/bots/webapps#webappuser) | _Optional._ An object containing data about the current user.                                                                                                                   |
| receiver       | [WebAppUser](https://core.telegram.org/bots/webapps#webappuser) | _Optional._ An object containing data about the chat partner of the current user in the chat where the bot was launched via the attachment menu.                                |
| chat           | [WebAppChat](https://core.telegram.org/bots/webapps#webappchat) | _Optional._ An object containing data about the chat where the bot was launched via the attachment menu.                                                                        |
| start_param    | string                                                          | _Optional._ The value of the startattach parameter, passed via link.                                                                                                            |
| can_send_after | number                                                          | _Optional._ Time in seconds, after which a message can be sent via the [answerWebAppQuery](https://core.telegram.org/bots/api#answerwebappquery) method.                        |
| auth_date      | number                                                          | _Optional._ Unix time when the form was opened.                                                                                                                                 |
| token          | string                                                          | _Optional._ Any token that is the same as you use for server-side validation                                                                                                    |

### event

If not set, the `default` event as above will be used. You can set your own event to replace the original. The `all` event will be executed on any event.

Use `e.post()` to execute the original event:

```javascript
walnut.event.on('all', (e) => {
  e.post()
})

// e.post inside of Telegram WebView
// -> post event to Telegram

// e.post outside of Telegram WebView
console.log('[Walnut.debug] postEvent', e.type, e.data)
```

| eventType                         |
| --------------------------------- |
| `default`                         |
| `all`                             |
| `web_app_setup_closing_behavior`  |
| `web_app_set_header_color`        |
| `web_app_set_background_color`    |
| `web_app_setup_back_button`       |
| `web_app_setup_main_button`       |
| `web_app_trigger_haptic_feedback` |
| `web_app_data_send`               |
| `web_app_open_link`               |
| `web_app_open_tg_link`            |
| `web_app_open_invoice`            |
| `web_app_open_popup`              |
| `web_app_ready`                   |
| `web_app_expand`                  |
| `web_app_close`                   |
| `web_app_request_theme`           |
| `web_app_request_viewport`        |

## Contact

Created by [@miku3920](https://t.me/miku3920) - feel free to contact me if you have any problems!