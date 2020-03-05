const confirmPeriod = require('./confirmPeriod');
const unconfirmPeriod = require('./unconfirmPeriod');
const createProject = require('./createProject');
const createCustomer = require('./createCustomer');
const updateWeek = require('./updateWeek');
const updateUser = require('./updateUser');
const addUser = require('./addUser');
const addOrUpdateLabel = require('./addOrUpdateLabel');
const deleteLabel = require('./deleteLabel');
const deleteCustomer = require('./deleteCustomer');

module.exports = {
    confirmPeriod,
    unconfirmPeriod,
    createProject,
    createCustomer,
    updateWeek,
    updateUser,
    addUser,
    addOrUpdateLabel,
    deleteLabel,
    deleteCustomer,
};