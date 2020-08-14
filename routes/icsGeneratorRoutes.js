const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/ics-generator", (req, res) => {
  let startDate = req.query.startDate
  let endDate = req.query.endDate

  console.log("startDate", startDate);
  console.log("endDate", endDate)
  
  let icsTemplatePath = path.join(
    __dirname,
    "../temp-files/",
    "icsTemplate.ics"
  );
  let filename = "myevent3.ics";
  let absPath = path.join(__dirname, "../temp-files/", filename);
  let relPath = path.join("./temp-files", filename); // path relative to server root

  fs.readFile(icsTemplatePath, "utf8", function read(err, data) {
    if (err) {
      throw err;
    }
    let templateContent = data.replace('DTSTART_VALUE', startDate).replace('DTEND_VALUE',endDate);

    console.log("templateContent", templateContent);
    fs.writeFile(relPath, templateContent, (err) => {
      console.log("absPath", absPath);
      if (err) {
        console.log(err);
      }
      res.download(absPath, (err) => {
        if (err) {
          console.log(err);
        }
        fs.unlink(relPath, (err) => {
          if (err) {
            console.log(err);
          }
          console.log("FILE [" + filename + "] REMOVED!");
        });
      });
    });
  });
});

module.exports = router;
