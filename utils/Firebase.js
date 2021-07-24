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

    const hello = this.db.ref('auth');

    hello.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  }

  async getValueByPath(path) {
    try {
      const snapshot = await this.db.ref(path).get();

      if (snapshot.exists()) {
        return snapshot.val();
      }

      return null;
    } catch (err) {
      console.log('error fetching data', err);
      throw Error(err);
    }
  }
}

module.exports = new Firebase();
