const { getIo } = require('../socket');

const createNewList = () => {
  const newList = {
    id: Date.now().toString(),
    name: "Cron List",
    taskCount: 0,
  };

  const io = getIo();
  io.emit('newList', newList);
};

module.exports = { createNewList };
