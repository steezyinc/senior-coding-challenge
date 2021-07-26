const firebase = require('../utils/Firebase');

async function getClasses(startAtKey = '0', limit = 9) {
  const snapshot = await firebase.db.ref('classes')
    .orderByKey()
    .startAt(startAtKey)
    .limitToFirst(limit)
    .get();

  let classesList = [];

  if (snapshot.exists()) {
    if (parseInt(startAtKey, 10) > 9) { // please ask me about this... firebase is weird...
      classesList = Object.values(snapshot.val()).map((value) => value);
    } else {
      classesList = snapshot.val().filter((classItem) => classItem);
    }
  }

  const scrubbedList = classesList.map((classItem) => {
    // this omits the videoUrl
    // same as using delete operator but doesnt break lint rule of param-reassign
    const { videoUrl, ...rest } = classItem;
    return { ...rest };
  });

  return scrubbedList;
}

async function getTotalClassCount() {
  const snapshot = await firebase.db.ref('classes').get();

  if (snapshot.exists()) {
    return snapshot.numChildren();
  }
  return null;
}

async function getClassVideoUrlById(id) {
  const videoUrl = await firebase.getValueByPath(`classes/${id}/videoUrl`);

  return videoUrl;
}

module.exports = {
  getClasses,
  getTotalClassCount,
  getClassVideoUrlById,
};
