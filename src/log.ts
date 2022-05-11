interface LogConstructorOptions {
    categoryName: string
    data: any[]
    level: string
}

export class Log {
    public startTime: Date
    public categoryName: string
    public data: any[]
    public level: string
    public pid: number
    constructor(options: LogConstructorOptions) {
        const { categoryName, data, level } = options
        this.startTime = new Date()
        this.categoryName = categoryName
        this.data = data
        this.level = level
        this.pid = process.pid
    }
}
