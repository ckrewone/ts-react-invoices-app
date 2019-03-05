export interface IParser {
    toString(object: any): string

    toJson(string: string): any
}
