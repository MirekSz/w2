import template from './cos.hbs';
import first from 'lodash-es/first';
import app from './App.jsx';
import style from './Hello.css';

app($("#react"));
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
    debugger;
    await innerAsyncFunction();
    console.log('asyncFunction');
    $("#workspace").append('</br>' + new Date() + ' asynchFunction');
}
export async function innerAsyncFunction() {
    console.log('innerAsyncFunction');
    let d = new Date();
    $("#workspace").append(`<span class="${style.miro}">${d}  innerAsyncFunction </span>`);
    await time(2000);
}

function time(wait) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, wait);
    });
}
