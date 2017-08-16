const exec = require('child_process').exec;
const child = exec('npm run phantomjs', {cwd: 'F:\\webstorm\\Next-js\\'}, (error, stdout, stderr) => {
    if (error) {
        console.error('stderr', stderr, error);
        throw error;
    }
    console.log('stdout', stdout);
});
