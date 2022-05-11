import { CategoriesOptions } from './types'

export class Category {
    public categories: Map<string, CategoriesOptions>
    constructor() {
        this.categories = new Map()
    }
    public getCategory(categoryName: string) {
        return this.categories.get(categoryName)
    }
    public setCategory(categoryName: string, categoryValue: CategoriesOptions) {
        this.categories.set(categoryName, categoryValue)
    }
}
