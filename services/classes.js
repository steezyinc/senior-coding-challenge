const firebase = require('../utils/Firebase');

async function getClasses(startAtKey = '0', limit = 9) {
  const snapshot = await firebase.db.ref('classes')
    .orderByKey()
    .startAt(startAtKey)
    .limitToFirst(limit)
    .get();

  if (snapshot.exists()) {
    return snapshot.val()
      .filter((classItem) => classItem); // removes nulls from pagination
  }
  return null;
}

async function getTotalClassCount() {
  const snapshot = await firebase.db.ref('classes').get();

  if (snapshot.exists()) {
    return snapshot.numChildren();
  }
  return null;
}

module.exports = {
  getClasses,
  getTotalClassCount,
};
