var ObjectId = require('mongodb').ObjectId;
const { connectDb, getUser } = require('../shared/shared');

module.exports = async function (context, req) {

    const database = await connectDb();

    const user = getUser(req);

    const task = {
        userId: user.userId,
        label: req.body.label,
        status: ""
    };

    const response = await database.collection("tasks").updateOne(
        { _id: new ObjectId(context.bindingData.id) },
        { $set: { "status": req.body.status } }
    );

    context.res = {
        status: 204, /* Defaults to 200 */
    };
}