const { Router } = require('express');
const fs = require('fs');

const router = Router();

const FILE_NAME = 'listOfRecords.json';

router.get('/', (_req, res) => {
  fs.readFile(FILE_NAME, 'utf8', (err, data) => {
    try {
      const records = JSON.parse(data);
      res.status(200).send(records);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error reading log file');
    }
  });
});

router.delete('/', (_req, res) => {
  fs.readFile(FILE_NAME, () => {
    const newRecord = [];

    fs.writeFile(FILE_NAME, JSON.stringify(newRecord), err => {
      try {
        res.status(204).send('Records deleted successfully');
      } catch (err) {
        console.error(err);
        res.status(500).send('Error delete file');
      }
    });
  });
});

module.exports = router;
