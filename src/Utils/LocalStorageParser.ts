import {IParser} from "./IParser";

export class LocalStorageParser implements IParser{

    public toJson(): any {
        let localInvoices: any = localStorage.getItem('invoices');
        localInvoices = JSON.parse(localInvoices);
        localInvoices = localInvoices.map((el: any) => JSON.parse(el));
        return localInvoices;

    }
    public toString(object: any): string {
        return ''
    }

    private stringifyArrayOfObject = (array: any[]) => {
        let temp = array.map((el: any) => {
            el.elements = el.elements.map((els: object) => JSON.stringify(els)).toString();
            return JSON.stringify(el);
        });
        return temp.toString();
    }


    private parseArrayOfObject = (string: string) => {

    }
}
