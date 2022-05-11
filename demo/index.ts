import { MidLog } from '../src/index'
const midLog = new MidLog({
    appenders: {
        console: {
            type: 'console'
        },
        dateFile: {
            type: 'dateFile',
            fileName: 'application.log',
            nameBackups: 7,
            pattern: 'hour'
        }
    },
    categories: {
        'fe-webconfig': {
            level: 'info',
            appenders: ['dateFile', 'console']
        }
        // portal: {
        //     level: 'all',
        //     appenders: ['dateFile']
        // }
    }
})
const logger = midLog.getLogger('fe-webconfig')
logger.error('hhahahhah', 'sss')
// try {
//     throw new Error('a')
// } catch (error) {
//     logger.error(error)
// }
