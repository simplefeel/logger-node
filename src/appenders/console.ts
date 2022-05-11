import { Log } from '../types'
import { basicLayout } from '../layout'

// eslint-disable-next-line no-console
const consoleLog = console.log.bind(console)

export default function consoleAppender() {
    return (log: Log) => {
        consoleLog(basicLayout(log))
    }
}
