
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const dbURI = `mongodb+srv://admin:admin@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  mongoose.connect(dbURI, 
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    }, err => {
      !err ?
        console.log("Successfully Established Connection with MongoDB")
      :
        console.log(
          "Failed to Establish Connection with MongoDB with Error: " + err
        );
     
    
    }
   
);
mongoose.connection.on("error", (err) => {
  console.log(err);
});

module.exports = {
  mongoose: mongoose,
};

