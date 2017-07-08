export function lazy() {
      var a = { name: 'mirek' };
      var { name } = a;
      console.log('lazy call', name);
}
