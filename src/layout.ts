import util from 'util'
import { Log } from './log'
import dayjs from 'dayjs'
import chalk from 'chalk'
import { LEVEL_COLOUR } from './constants'

function colorize(text: string, level: string) {
    return chalk[LEVEL_COLOUR[level].colour](text)
}

function timestampLevelAndCategory(log: Log, color: boolean) {
    const data = util.format(
        '%s %s [%s] %s - ',
        dayjs(log.startTime).format('YYYY:MM:DD HH:mm:ss:SSS'),
        log.level.toUpperCase(),
        log.pid,
        log.categoryName.toUpperCase()
    )
    if (color) {
        return colorize(data, log.level)
    } else {
        return data
    }
}

export function basicLayout(log: Log, color = true) {
    return (
        timestampLevelAndCategory(log, color) + util.format(...log.data) + '\n'
    )
}
