'use strict';

export function serialize(data: any): any {
    if (data === null || data === undefined) return NSNull.alloc();
    if (typeof data !== 'object') return data;
  
    //{ "a": undefined } is serialized to { "a": null }
    //if (Array.isArray(data)) return NSArray.arrayWithArray(data);
    //return NSDictionary.dictionaryWithDictionary(data);

    const json = JSON.stringify(data);
    const buf = new NSString({ string: json }).dataUsingEncoding(NSUTF8StringEncoding)

    const dict = NSJSONSerialization.JSONObjectWithDataOptionsError(
        buf,
        null
    );
    
    return dict;
}


export function deserialize(dict: any): any {
    if (dict instanceof NSNull) {
        return null;
    }
    const data = NSJSONSerialization.dataWithJSONObjectOptionsError(
        dict,
        null
    );
    const ns = NSString.alloc().initWithDataEncoding(
        data,
        NSUTF8StringEncoding
    );
    return JSON.parse(ns.toString());
}
