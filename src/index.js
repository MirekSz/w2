import {hello} from 'src/helloWorld';

"use strict";
import style from './main.less';

/*global global*/

/**
 * Remove item from array
 * @param item
 */
Array.prototype.remove = function (item) {
    var index = this.indexOf(item);
    this.splice(index, 1);
};


/**
 * @param {Date} date
 */
global.convertTo = function (date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

global.msg = function (key, par1, par2, par3) {
    const args = [par1, par2, par3];
    const result = _get(msgStorage, key);
    if (!result) {
        return `??${key}??`;
    }
    if (args.length > 0) {
        return result.replace(/{(\d+)}/g, function (match, number) {
            return args[Number(number)] ? args[Number(number)] : match;
        });
    }
    return result;
};
global.msgStorage = {};

/**
 * @param {Date} date
 */
global.convertFrom = function (date) {
    if (typeof date === "string") {
        return new Date(date.replace('T', ' '));
    }
    return date;
};

hello();
