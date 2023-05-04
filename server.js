import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import mongoose from "mongoose";

const connection =
  "mongodb+srv://Vara:yiThQpgu4mR4n1z8@varasampath-mongo-ts.fkyvevy.mongodb.net/form-api?retryWrites=true&w=majority";

mongoose
  .connect(connection, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })

  .then(() => console.log("Database Connected Successfully"))

  .catch((err) => console.log(err));

const userSchema = {
  name: String,
  age: Number,
  sex: String,
  mobile: Number,
  govtIdNumber: String,
  gsalutaion: String,
  gName: String,
  email: String,
  emergencyMobile: String,
  address: String,
  state: String,
  city: String,
  occupation: String,
  religion: String,
  maritalStatus: String,
  bloodGroup: String,
  nationality: String,
  country: String,
};
const user = mongoose.model("user", userSchema);
const app = express();
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(8000, () => {
  console.log("listening on 8000");
});

app.get("/", (req, res) => {
  user.find().then((data) => {
    res.send({ users: data });
  });
});

app.post("/", (req, res) => {
  const userDetails = req.body;
  const newUser = new user(userDetails);

  newUser
    .save()
    .then(() => {
      res.status(200).send({ message: "user Recieved" });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
