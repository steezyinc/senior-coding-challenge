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

async function checkUserProgress(id, videoId, videoDuration) {
  const value = await firebase.getValueByPath(`progress/${id}/${videoId}`);

  if (!value) {
    const progressArray = new Array(videoDuration).fill(false);
    firebase.setValueByPath(`progress/${id}/${videoId}/progress`, progressArray);
  }
}

async function updateProgress(userId, videoId, time, pausedTotal) {
  if (time) {
    firebase.setValueByPath(`progress/${userId}/${videoId}/progress/${time}`, true);
  }

  if (pausedTotal) {
    firebase.setValueByPath(`progress/${userId}/${videoId}/pausedTotal`, pausedTotal);
  }
}

module.exports = {
  getUserById,
  createNewUser,
  checkUserProgress,
  updateProgress,
};
