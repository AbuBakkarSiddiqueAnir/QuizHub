const mongoose = require('mongoose');

try {

    mongoose.connect("mongodb://localhost:27017/Quiz_app", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })

} catch (error) {
    throw new Error("Can't connect to the database");
}

mongoose.connection.on("error",(error) => {
    throw new Error("Error connecting to database: " + error)
})