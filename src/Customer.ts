import * as _ from 'lodash';
import template from './cos.hbs';
import ee from 'event-emitter';
let e = new ee();
// e.addListener('dupa', (data) => {

// })
e.emit('asd', {});
export default class Customer {
      private name: string;
      constructor() {
            this.name = 'mirek';
      }
      hello(a: string) {
            var r = 5;
            console.log(this, template());
            return "asd";
      }

      long(): Promise<string> {
            return new Promise((res, rej) => {
                  setTimeout(() => {
                        res("oki" + JSON.stringify(this));
                  }, 2000)
            })
      }
}
async function getDataFromAsynch() {
      var result = await new Customer().long();
      console.log(result);
}
console.log(_.max([1, 2, 3]));
const a: number = 23;
new Customer().hello('s');
getDataFromAsynch();