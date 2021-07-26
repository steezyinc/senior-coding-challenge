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

async function getUserProgress(userId, classIdsList) {
  const operationsArray = classIdsList.map((classId) => firebase.getValueByPath(`progress/${userId}/${classId}/progress`));

  const classProgressList = await Promise.all(operationsArray);

  const processProgressList = classProgressList.map((progressArray) => {
    if (!progressArray) {
      return 0;
    }
    const watched = progressArray.filter((ts) => ts);
    return Math.round((watched.length / progressArray.length) * 100);
  });

  const mappedProgressToClass = classIdsList.reduce((accumulator, classId, index) => {
    const temp = accumulator;
    temp[classId] = processProgressList[index];
    return temp;
  }, {});

  return mappedProgressToClass;
}

module.exports = {
  getUserById,
  createNewUser,
  checkUserProgress,
  updateProgress,
  getUserProgress,
};
