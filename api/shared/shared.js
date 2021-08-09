const mongoClient = require("mongodb").MongoClient;


const connectDb = async () => {
    const client = await mongoClient.connect("mongodb://thunderstormdemo4n0q4gmo:yRur0xqtU3CSKFOcuSd4qrofEcT3v8iO86LaGuyxu0sxCMZ3fAets1k0QvJbSFo8Ks4BgWs7R7YRqDtwMfDNiw%3D%3D@thunderstormdemo4n0q4gmo.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@thunderstormdemo4n0q4gmo@");
  
    return client.db("thunderstormdemo4n0q4gmo ");
};

const getUser = (req) => {
    const header = req.headers['x-ms-client-principal'];
    const encoded = Buffer.from(header, 'base64');
    const decoded = encoded.toString('ascii');
    const user = JSON.parse(decoded);

    return user;
}

module.exports = { connectDb, getUser};