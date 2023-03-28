const { Router } = require('express');
const fs = require('fs');

const router = Router();

const FILE_NAME = 'listOfRecords.json';

let listOfRecords = [];

if (fs.existsSync(FILE_NAME)) {
  const fileContents = fs.readFileSync(FILE_NAME, 'utf8');
  listOfRecords = JSON.parse(fileContents);
}

router.post('/', (req, res) => {
  const time = req.body.time;

  const record = {
    time: time,
    date: new Date()
  };

  listOfRecords.push(record);

  fs.writeFile(FILE_NAME, JSON.stringify(listOfRecords), () => {
    try {
      res.status(201).send('Record successfully saved');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error saving record');
    }
  });
});

module.exports = router;
