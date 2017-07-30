var month = new Date();
let dateFormat = month;
let body = [
      ['Dzień miesiąca', 'Czas pracy', 'Program', 'Czas nieobecności', 'Przyczyna nieobecności'],
];
var userData = { program: 'NEXT VERTO' }
var days = [];
for (var i = 1; i < 31; i++) {
      days.push({ lp: i, workHours: 8, holiday: 0 })
}
for (let day of days) {
      body.push([day.lp, day.workHours || '', day.holiday || day.weekend ? '' : (day.nonWorkHours == 8 ? '' : userData.program), day.holiday || day.weekend ? '' : day.nonWorkHours || '', day.holiday || day.weekend ? '' : day.nonWorkReason || '']);
}
let docDefinition = {
      content: [{
            text: 'Zestawienie czasu pracy pracownika za ' + dateFormat + " - " + userData.user,
            style: 'header'
      }, {
            layout: 'lightHorizontalLines',
            style: 'table',
            table: {
                  headerRows: 1,
                  widths: ['*', 'auto', 100, '*', '*'],

                  body: body
            }
      }],
      styles: {
            header: {
                  fontSize: 12,
                  alignment: 'center',
                  margin: [0, 0, 0, 20]
            },
            table: {
                  alignment: 'center',
                  fontSize: 10,
            }
      }
};
var path = require('path');
var fontDescriptors = {
      Roboto: {
            normal: path.join(__dirname, '..', '/Roboto-Regular.ttf'),
      }
};


var pdfmake = require('pdfmake');
var fs = require('fs');
var printer = new pdfmake(fontDescriptors);
var pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('../basics.pdf'));
pdfDoc.end();
