'use strict';

const JSONObject = org.json.JSONObject;
const JSONArray = org.json.JSONArray;

export function serialize(data: any): any {
    if (data === null || data === undefined) return JSONObject.NULL
    if (typeof data !== 'object') return data;
    if (Array.isArray(data)) return new JSONArray(JSON.stringify(data))
    return new JSONObject(JSON.stringify(data))
}

export function deserialize(dict: any): any {
    if (!dict) {
        return null;
    }
    switch (typeof dict) {
        case 'string':
        case 'number':
        case 'boolean':
        return dict;
    }
    const ns = dict.toString();
    return JSON.parse(ns.toString());
}
