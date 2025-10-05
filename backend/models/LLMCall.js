const { MongoClient, ObjectId } = require('mongodb');

class LLMCall {
  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI);
    this.dbName = 'llm_observability';
    this.collectionName = 'llm_calls';
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db(this.dbName);
    this.collection = this.db.collection(this.collectionName);
  }

  async create(callData) {
    await this.connect();
    const result = await this.collection.insertOne({
      ...callData,
      timestamp: new Date()
    });
    await this.client.close();
    return result;
  }

  async getAll() {
    await this.connect();
    const calls = await this.collection.find({})
      .sort({ timestamp: -1 })
      .toArray();
    await this.client.close();
    return calls;
  }
}

module.exports = LLMCall;