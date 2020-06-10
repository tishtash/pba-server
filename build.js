var zip = require("bestzip");

zip({
  source: [
    "index.js",
    "package-lock.json",
    "package.json",
    "PbaService.service"
  ],
  destination: "./zip/pba-server.zip"
})
  .then(function() {
    console.log("File succesfully zipped");
  })
  .catch(function(err) {
    console.error(err.stack);
    process.exit(1);
  });
