"use strict";
import first from 'lodash-es/first';

import { hello } from 'src/helloWorld';
import style from './main.less';
import Customer from './Customer.ts';
new Customer().hello();

console.log(first([1, 2, 3, 4]));
hello();

import('./lazy.js').then((mod) => {
      mod.lazy();
})

