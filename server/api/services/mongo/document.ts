import * as Mongo from 'mongodb'

export class MongoDocumentService<T> {
    public collection: Mongo.Collection<T>
    /**
     * Constructor
     *
     * @param {Mongo.Db} db Mongo database
     * @param {string} collectionName Colletion name
     */
    constructor(db: Mongo.Db, public collectionName: string) {
        this.collection = db.collection(collectionName)
    }

    /**
     * Wrapper on find().toArray()
     * 
     * @see — https ://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find
     * 
     * @param {Mongo.FilterQuery<T>} query query
     */
    public find(query: Mongo.FilterQuery<T>) {
        return this.collection.find(query).toArray()
    }
}
