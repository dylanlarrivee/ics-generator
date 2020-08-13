const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/ics-generator", (req, res) => {
    //res.status(200).send({"message": "test"})
  let eventTitle = "Dylan Event";
  let timeZone = "PST";
  let allDay = false;
  let dateTimeStart = "";
  let dateTimeEnd = "";
  let location = "";

  let myInvite = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
CLASS:PUBLIC
DESCRIPTION:DylanEvent\nDate and Time - Aug 19\, 2020 12:00 PM to 1:00 PM\nVenue - PetsmartStore\ntest\n
DTSTART:20200819T190000Z
DTEND:20200819T200000Z
LOCATION:PetsmartStore
SUMMARY;LANGUAGE=en-us:DylanEvent
END:VEVENT
END:VCALENDAR
  `
  // Users/Dylan/Documents/Workspace/ics-file-generator/temp-files/20200819-dylanevent.ics
  let icsTemplatePath = path.join(__dirname, "../temp-files/", "icsTemplate.ics");
  let filename = "myevent3.ics";
  let absPath = path.join(__dirname, "../temp-files/", filename);
  let relPath = path.join("./temp-files", filename); // path relative to server root
  
  fs.readFile(icsTemplatePath, function read(err, data) {
    if (err) {
        throw err;
    }
    const templateContent = data;
      fs.writeFile(relPath, templateContent, (err) => {
        console.log("absPath", absPath)
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
    // Invoke the next step here however you like
    // console.log(content);   // Put all of the code here (not the best solution)
   // processFile(content);   // Or put the next step in a function and invoke it
});
  





});

module.exports = router;
