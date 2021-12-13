const express = require('express')
const app = express()
const port = 3000
const crypto = require('crypto');

app.get('/sha1/:link', (req, res) => {
  let link = req.params.link
  console.log(link)
  res.send(sha1get("./cache/wwv" + file +".zip"))
})

var https = require('https');
var fs = require('fs');
var rimraf = require("rimraf");

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
  console.log(path)
  const fileBuffer = fs.readFileSync(path);
  const hashSum = crypto.createHash('sha1');
  hashSum.update(fileBuffer);

  const hex = hashSum.digest('hex');
  console.log(hex)
  return hex;
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

function cleanup(){
  rimraf.sync("/cache");
  fs.mkdirSync('/cache')
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})