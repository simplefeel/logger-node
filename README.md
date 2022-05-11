## features

-   遵循微店通用中间件[日志规范](http://docs.vdian.net/pages/viewpage.action?pageId=119248945)
-   支持多种 appenders (memory、mysql、redis 等)，可以随意组合控制日志输出方式
-   支持内置和自定义的日志展示格式
-   支持根据日志大小和日期进行日志分片
-   支持搜集服务连接日志

## API

## Demo

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

## How does it work?

Logger

categories

```js

{
    "name":{
        "appender":["out"],
        "level":"all"
    }
}
```

appender

```js
{
    "out":{
        "type":"stdout"
    }
}
```
