import template from './cos.hbs';
import first from 'lodash-es/first';
//require('alpha/node_modules/babel-polyfill/node_modules/regenerator-runtime/runtime');
//require('beta/vendor');

console.log(first([1, 2, 3]));

import {eventBus, events} from './modules/core/lib/EventBus';

import site from './modules/core/site/Site';

import core from './modules/core/_initialize';
import opal from './modules/opal/_initialize';
import samil from './modules/samil/_initialize';
import sidow from './modules/sidow/_initialize';
import vedas from './modules/vedas/_initialize';

export function hello() {
    console.log('Hello World ' + template());
    wypad();
}


export async function wypad() {
    await wypad2();
    console.log('wypad');
    document.body.innerHTML = document.body.innerHTML + ' wypad'
}
export async function wypad2() {
    console.log('wypad2');
    document.body.innerHTML = 'wypad2' + new Date()
}
