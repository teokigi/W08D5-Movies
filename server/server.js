const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
const express = require('express');
const app = express();

app.use(cors());
app.use(bodyParser.json());

MongoClient.connect('mongodbL//localhost:27017')
.then((client)=>{
    const db = client.db('movies_hub');
    const moviesCollection = db.collection('movies');
    const moviesRouter = createRouter(moviesCollection);
    app.use('/api/movies',moviesRouter);
}).catch(console.error)

app.listen(3000,function(){
    console.log(`listening on port ${this.address().port}`);
}
