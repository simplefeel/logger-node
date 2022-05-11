## features

-   支持按环境、日志 Level 自主控制日志输出方式
-   支持自定义日志输出格式
-   支持根据日期进行日志分片

Usage

```js
const midLog = new MidLog({
    appenders: {
        console: {
            type: 'console'
        },
        dateFile: {
            type: 'dateFile',
            fileName: 'application.log',
            nameBackups: 7
        }
    },
    categories: {
        dev: {
            level: 'all',
            appenders: ['console']
        },
        portal: {
            level: 'all',
            appenders: ['dateFile']
        }
    }
})
const logger = midLog.getLogger(
    config.dev === 'dev' ? 'fe-webconfig' : 'portal'
)
logger.info('I am a message')
```
