const { getIo } = require('../socket');

const createNewList = () => {
  const newList = {
    id: Date.now().toString(),
    name: "Cron List",
    tasks: []
  };

  const io = getIo();
  io.emit('newList', newList);
};

module.exports = { createNewList };
