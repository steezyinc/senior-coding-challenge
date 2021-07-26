require('dotenv').config();

const firebase = require('firebase');

const {
  API_KEY, AUTH_DOMAIN, DATABASE_URL, STORAGE_BUCKET,
} = process.env;

const config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  storageBucket: STORAGE_BUCKET,
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.db = firebase.database();
  }

  async getValueByPath(path) {
    try {
      const snapshot = await this.db.ref(path).get();

      if (snapshot.exists()) {
        return snapshot.val();
      }

      return null;
    } catch (err) {
      throw Error(err);
    }
  }

  setValueByPath(path, dataObj) {
    return this.db.ref(path).set(dataObj);
  }

  generateNewKeyByPath(path) {
    return this.db.ref(path).push().key;
  }
}

module.exports = new Firebase();
