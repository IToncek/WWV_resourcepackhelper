const express = require('express')
const app = express()
const port = 3000
const crypto = require('crypto');

app.get('/', (req, res) => {
  res.send("pong")
  //console.log("ping")
})

app.get('/sha1/:link', (req, res) => {
  let link = req.params.link.toString()
  res.send(sha1get("./cache/wwv" + link +".zip"))
  //console.log("Generated SHA-1 for file: " + link)
})

app.get('/download/:link', (req, res) => {
  let link = req.params.link.toString()
  res.sendfile("./cache/wwv" + link +".zip")
  //console.log("./cache/wwv" + link +".zip")
  //console.log("Sent file: " + link)
})
var fs = require('fs');

/*function download(file) {
  var url = "https://github.com/IToncek/WWV/releases/latest/download/wwv" + file + ".zip"
  var dest = "./cache/wwv" + file +".zip"
  console.log(dest)
  var file = fs.createWriteStream(dest);
  var request = https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close();  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
  });
  return dest;
};*/

function sha1get(path){
  const fileBuffer = fs.readFileSync(path);
  const hashSum = crypto.createHash('sha1');
  hashSum.update(fileBuffer);

  const hex = hashSum.digest('hex');
  return hex;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})