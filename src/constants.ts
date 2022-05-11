export const CONSOLE_APPENDER_TYPE = 'console'
export const DEFAULT_APPENDER_NAME = 'default'
export const DEFAULT_CATEGORY_NAME = 'default'
export const APPENDERS = 'appenders'
export const CATEGORIES = 'categories'
export const LEVEL = 'level'
export const LEVEL_COLOUR = {
    all: { value: Number.MIN_VALUE, colour: 'grey' },
    trace: { value: 5000, colour: 'blue' },
    debug: { value: 10000, colour: 'cyan' },
    info: { value: 20000, colour: 'green' },
    warn: { value: 30000, colour: 'yellow' },
    error: { value: 40000, colour: 'red' },
    fetal: { value: 50000, colour: 'magenta' }
}
export const FILE_DATE_PATTERN = {
    day: 'YYYY-MM-DD',
    hour: 'YYYY-MM-DD-HH'
}
