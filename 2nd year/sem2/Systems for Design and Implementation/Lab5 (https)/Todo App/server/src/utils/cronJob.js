const cron = require('node-cron');
const { createNewList } = require('./listCreation');

const scheduleCronJob = () => {
  cron.schedule('*/30 * * * * *', () => {
    createNewList();
  });
};

module.exports = { scheduleCronJob };
