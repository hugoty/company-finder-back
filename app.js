express = require("express");
const app = express();
mongoose = require("mongoose");
Cities= require("./src/controllers/Cities.js");
Users= require("./src/controllers/Users.js");
Login= require("./src/controllers/Login.js");
bodyParser= require("body-parser");
auth = require("./src/auth/auth.js");
cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

mongoose
    .connect(
        "mongodb+srv://devuser:1234@clustercompanyfinder.zclfgfz.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.get("/cities",  Cities.getAll);
app.get("/cities/:name" , Cities.getOne);
app.get("/users",  Users.getAll);
app.get("/users/:id", Users.getOne);
app.get("/users_by_username/:username", Users.getByUsername)
app.post('/api/login', Login.login);



app.listen(3000, () => {
    console.log("Server started on port 3000");
});
