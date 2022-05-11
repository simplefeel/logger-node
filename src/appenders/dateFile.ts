import { DateFileAppenderOptions, Log } from '../types'
import { ensureFile, outputFile } from 'fs-extra'
import { statSync, existsSync, appendFile, Stats, renameSync, unlink } from 'fs'
import dayjs from 'dayjs'
import { join } from 'path'
import { basicLayout } from '../layout'
import { FILE_DATE_PATTERN } from '../constants'
import globby from 'globby'

function meetFileRollCondition(fileStat: Stats, pattern) {
    const { ctime } = fileStat
    return dayjs().isAfter(ctime, pattern)
}

function getCurrentLogFileStat(filePath: string) {
    return statSync(filePath)
}

function getRollFileName(fileStat: Stats, fileName: string, pattern: string) {
    return `${dayjs(fileStat.ctime).format(
        FILE_DATE_PATTERN[pattern]
    )}.${fileName}`
}

function getLogFilePath(fileName: string, cwd: string) {
    return join(cwd, fileName)
}

export default function dateFileAppender(
    dateFileAppender: DateFileAppenderOptions
) {
    return (log: Log) => {
        const {
            fileName = 'application.log',
            cwd = process.cwd(),
            pattern = 'day',
            nameBackups
        } = dateFileAppender
        const filePath = getLogFilePath(fileName, cwd)
        const logData = basicLayout(log, false)
        if (existsSync(filePath)) {
            const fileStat = getCurrentLogFileStat(filePath)
            if (meetFileRollCondition(fileStat, pattern)) {
                const rollFilePath = getLogFilePath(
                    getRollFileName(fileStat, fileName, pattern),
                    cwd
                )
                // 1. rename application.log with date
                renameSync(filePath, rollFilePath)
                // 2. create a new application.log
                ensureFile(filePath).then(() => {
                    appendFile(filePath, logData, error => {
                        if (error) {
                            throw error
                        }
                        // 3. exceed max backups ,delete fathest
                        if (nameBackups) {
                            globby([`*.${fileName}`, `${fileName}`], {
                                cwd
                            }).then(logFiles => {
                                if (logFiles.length > nameBackups) {
                                    const needUnlinkPaths = logFiles.splice(
                                        0,
                                        logFiles.length - nameBackups
                                    )
                                    needUnlinkPaths.forEach(path => {
                                        unlink(
                                            getLogFilePath(path, cwd),
                                            error => {
                                                if (error) {
                                                    throw error
                                                }
                                            }
                                        )
                                    })
                                }
                            })
                        }
                    })
                })
            } else {
                appendFile(filePath, logData, error => {
                    if (error) {
                        throw error
                    }
                })
            }
        } else {
            ensureFile(filePath).then(() => {
                outputFile(filePath, logData)
            })
        }
    }
}
