const {connectDb, getUser} = require('../shared/shared');

module.exports = async function (context, req) {
    const user = getUser(req);

    const database = await connectDb();

    const response = await database.collection("tasks").find({
        userId: user.userId
    });
    const tasks = await response.toArray();

    context.res = {
        body: tasks
    };
}