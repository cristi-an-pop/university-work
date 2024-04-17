const cron = require('node-cron');
const { createNewList } = require('./listCreation');

const scheduleCronJob = () => {
  cron.schedule('*/9999 * * * * *', () => {
    createNewList();
  });
};

module.exports = { scheduleCronJob };
