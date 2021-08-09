const {connectDb, getUser} = require('../shared/shared');

module.exports = async function (context, req) {
    const database = await connectDb();

    const user = getUser(req);

    const task = {
        userId: user.userId,
        label: req.body.label,
        status: ""
    };

    const response = await database.collection("tasks").insertOne(task);
    context.res = {
        body: task
    };
}