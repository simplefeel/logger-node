export enum Level {
    ALL = 'all',
    TRACE = 'trace',
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    FETAL = 'fetal'
}

export interface CategoriesOptions {
    appenders: string[]
    level: string
    enableCallStack?: boolean
}

export interface Categories {
    [name: string]: CategoriesOptions
}

export type AppendersOptions = ConsoleAppenderOptions | DateFileAppenderOptions

export interface Appenders {
    [name: string]: AppendersOptions
}

export interface ConsoleAppenderOptions {
    type: string
    layout?: Layout
    pid?: number
}

export interface DateFileAppenderOptions {
    type: string
    fileName?: string
    pattern?: 'month' | 'day' | 'hour'
    nameBackups?: number
    layout?: Layout
    pid?: number
    cwd?: string
}

export type ConsoleAppenderFunction = (
    options: ConsoleAppenderOptions
) => (message: Log) => void

export type DateFileAppenderFunction = (
    options: DateFileAppenderOptions
) => (message: Log) => void

export interface Log {
    categoryName: string
    level: string
    data: any[]
    startTime: Date
    pid: number
}

export type AppendersFunction =
    | ConsoleAppenderFunction
    | DateFileAppenderFunction

export type Layout = BaseLayout | PatternLayout

export interface BaseLayout {
    type: 'base'
}

export interface PatternLayout {
    type: 'pattern'
    pattern: string
}
