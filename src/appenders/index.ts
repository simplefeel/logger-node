/* eslint-disable @typescript-eslint/no-var-requires */
import { forEach } from 'lodash'
import { AppendersFunction, AppendersOptions } from '../types'

const APPENDERS_FUNCTIONS = ['console', 'dateFile']

export class Appender {
    public appendersFunction: Map<string, AppendersFunction>
    public appendersOptions: Map<string, AppendersOptions>
    constructor() {
        this.appendersFunction = new Map()
        this.appendersOptions = new Map()
        forEach(APPENDERS_FUNCTIONS, appenderFunctionName => {
            this.appendersFunction.set(
                appenderFunctionName,
                require(`./${appenderFunctionName}`).default
            )
        })
    }
    public getAppenderFunction(appenderName: string) {
        return this.appendersFunction.get(appenderName)!
    }
    public getAppenderOptions(optionName: string) {
        return this.appendersOptions.get(optionName)!
    }
    public setAppenderOptions(
        optionName: string,
        optionValue: AppendersOptions
    ) {
        this.appendersOptions.set(optionName, optionValue)
    }
}
