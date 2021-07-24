const firebase = require('../utils/Firebase');

async function getUserById(id) {
  const value = await firebase.getValueByPath(`users/${id}`);
  return value;
}

async function createNewUser(id, data) {
  try {
    firebase.setValueByPath(`users/${id}`, data);
  } catch (err) {
    throw Error('couldnt create user');
  }
}

module.exports = {
  getUserById,
  createNewUser,
};
