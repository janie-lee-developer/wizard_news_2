const express = require("express");
const morgan = require("morgan");
// const postBank = require("./postBank");
const postList = require("./views/postList");
const postDetails = require("./views/postDetails");
const client = require("./db/index.js");
const res = require("express/lib/response");

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));

app.get("/", async(req, res, next) => {
  try {
    const data = await client.query('SELECT * FROM posts');

    
    const posts = data.rows;
    
    res.send(postList(posts));
  }
  catch(ex) {
    next(ex);
  }
});

app.get("/posts/:id", async(req, res, next) => {
  // const post = postBank.find(req.params.id);
  try {
    const data = await client.query('SELECT * FROM posts WHERE id=$1', [req.params.id]);
    const post = data.rows[0];

    res.send(postDetails(post));

  } catch(ex) {
    next(ex);
  }
});

const setUp = async() => {
  try {
    // await client.connect();
    console.log('connected to database');
    const PORT = 1337;
    app.listen(PORT, () => console.log(`App listening in port ${PORT}`))
  } 
  catch(ex) {
    console.log(ex);
  }
}
setUp();

// const PORT = 1337;

// app.listen(PORT, () => {
//   console.log(`App listening in port ${PORT}`);
// });