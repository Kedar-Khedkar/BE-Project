const {PythonShell} = require('python-shell');

file = "/home/mitali/Downloads/CEGP012620_S.E.(2019 PAT.)(INFORMATIOM TECHNOLOGY) (1).pdf"

const extractpdf = (file) => {
    const options = {
        mode: 'json',
        pythonOptions: ['-u'], 
          scriptPath: './',
          args: [file],
    };
    
    //'/computationalUnit/extractpdf.py'
    PythonShell.run('/computationalUnit/extractpdf.py', options, function (err, result){
        // let results = []
        // result.forEach((obj) => {
        //   const data = JSON.parse(obj);
        //   results.push(data)
        // });
        // console.log(results)
        for(let i=0; i<result.length; i++){
            for(const prop in result[i]){
            if(result[i][prop] == "---"){
              result[i][prop] = null
            }
              //console.log(`${prop}: ${result[i][prop]}`)
            }
            }
            if (err) throw err;
            console.log('result: ', results);
    });
}

//extractpdf(file)

module.exports = {extractpdf}

