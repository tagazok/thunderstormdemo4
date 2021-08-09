const mongoClient = require("mongodb").MongoClient;


const connectDb = async () => {
    const client = await mongoClient.connect("YOUR-CONNECTION-STRING");
  
    return client.db("swaworkshop");
};

const getUser = (req) => {
    const header = req.headers['x-ms-client-principal'];
    const encoded = Buffer.from(header, 'base64');
    const decoded = encoded.toString('ascii');
    const user = JSON.parse(decoded);

    return user;
}

module.exports = { connectDb, getUser};