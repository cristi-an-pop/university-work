let lists = []
let idCounter = 1;

const getAllLists = (order) => {
    return lists;
}

const getListById = (id) => {
    return lists.find(list => list.id === id);
}

const createList = (newList) => {
    if(newList.id == undefined) {
        newList.id = idCounter++;
    
    }
    lists.push(newList);
    return newList;
}

const updateList = (id, updatedList) => {
    const index = lists.findIndex(list => list.id === id);
    lists[index] = updatedList;
    return updatedList;
}

const deleteList = (id) => {
    lists = lists.filter(list => list.id !== id);
}

module.exports = {
    getAllLists,
    getListById,
    createList,
    updateList,
    deleteList
};