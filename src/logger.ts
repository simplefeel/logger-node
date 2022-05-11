import { forEach } from 'lodash'
import { Appender } from './appenders'
import { Category } from './category'
import { APPENDERS, LEVEL, LEVEL_COLOUR } from './constants'
import { Log } from './log'
import { CategoriesOptions, Level } from './types'

interface LoggerConstructorOptions {
    categoryName: string
    category: Category
    appender: Appender
}

export class Logger {
    private appender: Appender
    private categoryName: string
    private level: string
    private appenderNames: string[]
    private categoriesOptions: CategoriesOptions

    constructor(options: LoggerConstructorOptions) {
        const { appender, category, categoryName } = options
        this.appender = appender
        this.categoryName = categoryName
        this.categoriesOptions = category.getCategory(options.categoryName)!
        this.level = this.categoriesOptions[LEVEL]
        this.appenderNames = this.categoriesOptions[APPENDERS]
    }

    public trace(...args: any[]) {
        this.log(Level.TRACE, args)
    }
    public debug(...args: any[]) {
        this.log(Level.DEBUG, args)
    }
    public info(...args: any[]) {
        this.log(Level.INFO, args)
    }
    public warn(...args: any[]) {
        this.log(Level.WARN, args)
    }
    public error(...args: any[]) {
        this.log(Level.ERROR, args)
    }
    public fetal(...args: any[]) {
        this.log(Level.FETAL, args)
    }

    private log(level: string, args: any[]) {
        if (this.shouldOutput(level)) {
            forEach(this.appenderNames, appenderName => {
                const { getAppenderFunction, getAppenderOptions } =
                    this.appender
                const appenderFunction = getAppenderFunction.call(
                    this.appender,
                    appenderName
                )
                const appenderOptions = getAppenderOptions.call(
                    this.appender,
                    appenderName
                )
                appenderFunction(appenderOptions)(
                    new Log({
                        data: args,
                        categoryName: this.categoryName,
                        level
                    })
                )
            })
        }
    }

    private shouldOutput(levelStr: string) {
        return LEVEL_COLOUR[levelStr].value >= LEVEL_COLOUR[this.level].value
    }
}
