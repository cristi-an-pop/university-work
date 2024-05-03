const cron = require('node-cron');
const { createNewList } = require('./listCreation');

const scheduleCronJob = () => {
  cron.schedule('*/10 * * * * *', () => {
    createNewList();
  });
};

module.exports = { scheduleCronJob };
