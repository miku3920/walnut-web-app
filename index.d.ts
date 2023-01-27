declare namespace walnut {

  interface ThemeParams {
    bg_color?: string,
    text_color?: string,
    hint_color?: string,
    link_color?: string,
    button_color?: string,
    button_text_color?: string,
    secondary_bg_color?: string,
  }

  interface WebAppChat {
    id: number,
    type: 'group' | 'supergroup' | 'channel';
    title: string,
    username?: string,
    photo_url?: string,
  }

  interface WebAppUser {
    id: number,
    is_bot?: boolean,
    first_name: string,
    last_name?: string,
    username?: string,
    language_code?: string,
    photo_url?: string,
  }

  interface WordArray {
    sigBytes: 32,
    words: Array<number>,
  }

  interface DataCheck {
    query_id?: string,
    user?: JsonString,
    receiver?: JsonString,
    chat?: JsonString,
    start_param?: string,
    can_send_after?: number,
    auth_date: number,
  }

  interface StringifyData {
    query_id?: string,
    user?: JsonString,
    receiver?: JsonString,
    chat?: JsonString,
    start_param?: string,
    can_send_after?: number,
    auth_date: number,
    token: string,
  }

  interface SetupData {
    query_id?: string,
    user?: WebAppUser,
    receiver?: WebAppUser,
    chat?: WebAppChat,
    start_param?: string,
    can_send_after?: number,
    auth_date?: number,
    token?: string,
  }

  interface WebAppInitData {
    query_id?: string,
    user?: WebAppUser,
    receiver?: WebAppUser,
    chat?: WebAppChat,
    start_param?: string,
    can_send_after?: number,
    auth_date: number,
    hash: string,
  }

  interface TelegramInitData {
    tgWebAppData?: string,
    tgWebAppVersion?: string,
    tgWebAppThemeParams?: string,
    tgWebAppDebug?: '1' | '',
  }

  interface Setup {
    Data?: SetupData,
    Version?: string,
    Platform?: string,
    ThemeParams?: ThemeParams,
    Debug?: boolean,
  }

  interface eventObject {
    type: eventType,
    data: string,
    post: () => void
  }

  type eventType = 'default' | 'all' | 'web_app_setup_closing_behavior' | 'web_app_set_header_color' | 'web_app_set_background_color' | 'web_app_setup_back_button' | 'web_app_setup_main_button' | 'web_app_trigger_haptic_feedback' | 'web_app_data_send' | 'web_app_open_link' | 'web_app_open_tg_link' | 'web_app_open_invoice' | 'web_app_open_popup' | 'web_app_open_scan_qr_popup' | 'web_app_close_scan_qr_popup' | 'web_app_read_text_from_clipboard' | 'web_app_ready' | 'web_app_expand' | 'web_app_close' | 'web_app_request_theme' | 'web_app_request_viewport'

  type JsonString = string
  type TelegramInitString = string
  type WebAppInitString = string
  type HashString = string

  interface utils {
    setup: (option: Setup) => void,
    // urlStringifyHashString: (option: Setup) => HashString,
    // urlStringifyQueryParams: (queryParams: TelegramInitData | WebAppInitData) => TelegramInitString | WebAppInitString,
    // urlSafeEncode: (urldecoded: string) => string,
    // stringifyDataParams: (setupData: SetupData) => StringifyData,
    // dataSafeStringify: (data: WebAppUser | WebAppChat) => JsonString,
    // createVerificationHash: (stringifyData: StringifyData) => string,
    // buildDataCheckString: (dataCheck: DataCheck) => string,
    // HMAC_SHA256: (data: string, secret: string | WordArray, hex?: boolean) => string | WordArray,
  }

  interface event {
    on: (type: eventType, callback: (e: eventObject) => void) => void,
    off: (type: eventType) => void,
    receive: (type: eventType, data: string) => void,
  }

  const utils: utils
  const event: event
}

export = walnut
