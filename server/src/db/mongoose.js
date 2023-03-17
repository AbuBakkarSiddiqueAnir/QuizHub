const mongoose = require("mongoose");
//connect with the database
try {
  mongoose.connect("mongodb+srv://anir10:<anir151997>@cluster0.wluy3s6.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  throw new Error("Can't connect to the database");
}

mongoose.connection.on("error", (error) => {
  throw new Error("Error connecting to database: " + error);
});
