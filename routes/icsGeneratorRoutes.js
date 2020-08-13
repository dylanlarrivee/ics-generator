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
  
  let filename = "myevent2.ics";
  let absPath = path.join(__dirname, "../temp-files/", filename);
  let relPath = path.join("./temp-files", filename); // path relative to server root

  fs.writeFile(relPath, myInvite, (err) => {
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
});

module.exports = router;
