const {PythonShell} = require('python-shell');

let options = {
    mode: 'json',
    pythonOptions: ['-u'], 
      scriptPath: '/home/mitali/Downloads/',
};

PythonShell.run('extractpdf.py', options, function (err, result){
    if (err) throw err;
    console.log('result: ', result);
});