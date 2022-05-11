import { Appenders, Categories, Level } from './types'
import { merge, forEach } from 'lodash'
import {
    CONSOLE_APPENDER_TYPE,
    DEFAULT_APPENDER_NAME,
    DEFAULT_CATEGORY_NAME
} from './constants'
import { Category } from './category'
import { Appender } from './appenders'
import { Logger } from './logger'

interface MidLogConstructorOptions {
    categories?: Categories
    appenders?: Appenders
}

export class MidLog {
    public options: MidLogConstructorOptions
    private category: Category
    private appender: Appender
    constructor(options: MidLogConstructorOptions) {
        this.options = merge(
            {
                appenders: {
                    [DEFAULT_APPENDER_NAME]: {
                        type: CONSOLE_APPENDER_TYPE
                    }
                },
                categories: {
                    [DEFAULT_CATEGORY_NAME]: {
                        appenders: [DEFAULT_APPENDER_NAME],
                        level: Level.ALL
                    }
                }
            },
            options
        )
        this.category = new Category()
        this.appender = new Appender()
        this.setup()
    }
    public getLogger(categoryName: string) {
        return new Logger({
            categoryName,
            category: this.category,
            appender: this.appender
        })
    }
    private setup() {
        forEach(this.options, (_value, key) => {
            if (key === 'categories') {
                forEach(this.options[key], (categoryValue, categoryKey) => {
                    this.category.setCategory(categoryKey, categoryValue)
                })
            } else if (key === 'appenders') {
                forEach(this.options[key], (appenderValue, appenderKey) => {
                    this.appender.setAppenderOptions(appenderKey, appenderValue)
                })
            }
        })
    }
}
