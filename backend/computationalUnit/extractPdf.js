const { spawn } = require("child_process");

// const cleanResult = (result, errors) => {

// };

const spawnProcess = (coords, seatNos, pages, path) => {
  return new Promise(function (success, error) {
    // Send SSE headers
    //res.writeHead(200, {
    //   "Content-Type": "text/event-stream",
    //   "Cache-Control": "no-cache",
    //   Connection: "keep-alive",
    // });
    let result = [];
    let errors = [];
    let tempStr = "";
    let count = 0;
    const pdf_path = path;
    const args = [
      "computationalUnit/extractpdf.py",
      pdf_path,
      coords,
      seatNos,
      pages,
    ];
    const pythonProcess = spawn("python", args);

    pythonProcess.stdout.on("data", (data) => {
      count++;
      //res.write(`Processed: ${(count / pages) * 100}\n\n`);
      console.log(`Processed: ${(count / pages) * 100}`);
      tempStr += data;
    });

    pythonProcess.stderr.on("data", (data) => {
      errors.push(`${data}`);
    });

    pythonProcess.on("close", (code) => {
      tempStr = tempStr.split("|");
      tempStr.forEach((element) => {
        try {
          element = element.trim();
          if (element.length > 0) {
            result.push(JSON.parse(element));
          }
        } catch (err) {
          console.log(element, err);
        }
      });
      console.log(`child process exited with code ${code}`);
      //res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      // {result, errors} = cleanResult(result, errors);
      success({ result: result, errors: errors });
    });
  });
};

module.exports = { spawnProcess };
