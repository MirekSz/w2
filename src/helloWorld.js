import template from './cos.hbs';
import first from 'lodash-es/first';
import * as $ from 'jquery';
import samile from '../sample_data.json';
import flow from './flow.json';
require('alpha/node_modules/babel-polyfill/node_modules/regenerator-runtime/runtime');
require('beta/vendor');

console.log(first([1, 2, 3]));

export function hello() {
    console.log('Hello World ' + template());
    wypad();
}


export async function wypad() {
    await wypad2();
    console.log('wypad');
    $(document.body).append('wypad');
}
export async function wypad2() {
    console.log('wypad2');
    $(document.body).append('wypad2 ' + new Date() + ' ');
}
var nodes = [];
nodes.push({name:'root',"metadata": {
    "streaming": 100
}, "metrics": {
    "normal": 41515.944}, "renderer": "global"});
var connections = [];

prepareFlow(flow,flow.nodes);
function prepareFlow(parent,children) {
    if (!children){
        debugger
    }
    console.log(children)
    for (let child of children) {
        nodes.push({name: child.text,"metadata": {
            "streaming": 100
        }, "metrics": {
            "normal": 41515.944}, "renderer": "focusedChild"});
        connections.push({source:parent.text,target:child.text, metrics: {normal: 100}, "renderer": "focusedChild"});
        if (child.nodes.length > 0) {
            prepareFlow(child,child.nodes);
        }
    }
}
import Vizceral from 'vizceral';
$(document.body).ready(() => {
    const viz = new Vizceral(document.getElementById('vizceral'));
// Add event handlers for the vizceral events
    viz.on('viewChanged', view => {
    });
    viz.on('objectHighlighted', object => {
    });
    viz.on('rendered', data => {
    });
    viz.on('nodeContextSizeChanged', dimensions => {
    });

    viz.updateData({
        "renderer": "region",
        "name": "us-east-1",
        "displayName": "US-EAST-1",
        "nodes": nodes, "connections": connections
    });

    viz.setView();
    viz.animate();
})