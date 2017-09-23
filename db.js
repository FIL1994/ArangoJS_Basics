/**
 * @author Philip Van Raalte
 * @date 2017-09-22.
 */
const keys = require('./keys');
const Database = require('arangojs').Database;
const username = keys.username;
const password = keys.password;
const db = new Database(`http://${keys.host}:8529`);
db.useDatabase(keys.dbName);

db.useBasicAuth(username, password);

module.exports = {
  listCollections: async (nameOnly = true) => {
    let collections = await db.listCollections();

    if(nameOnly) {
      collections = collections.map((c) => {
        return c.name
      });
    }

    return collections;
  },
  getCollection: async name => {
    const collection = db.collection(name);
    return collection;
  },
  insert: async (collection, object) => {
    return await collection.save(object, {returnNew: true});
  },
  update: async (collection, documentHandle, object) => {

    //documentHandle -> _id or _key or a document
    return await collection.update(documentHandle, object);
  },
  selectAll: async (collection) => {
    return await collection.all();
  },
  query: async (db, query) => {
    return await db.query(query);
  }

};