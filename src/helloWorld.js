import template from './cos.hbs';
import first from 'lodash-es/first';


console.log(first([1, 2, 3]));

//import {eventBus, events} from './modules/core/lib/EventBus';
//
//import site from './modules/core/site/Site';
//
export function hello() {
    console.log('Hello World ' + template());
}
asyncFunction().then(() => {
    console.log('done')
});


export async function asyncFunction() {
    await innerAsyncFunction();
    console.log('asyncFunction');
    document.body.innerHTML = document.body.innerHTML + '</br>' + new Date() + ' asynchFunction';
}
export async function innerAsyncFunction() {
    console.log('innerAsyncFunction');
    document.body.innerHTML = '' + new Date() + ' innerAsyncFunction ';
    await time(2000);
}

function time(wait) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, wait);
    });
}
