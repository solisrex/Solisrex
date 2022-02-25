const { MongoClient } = require("mongodb");
const express = require('express')
const app = express()
const port = 8080

app.set('view engine', 'pug')

// Connection URI
const uri =
  "mongodb+srv://readonly:EzQqMZ4kyRhZVQ7@cluster0.xde3j.azure.mongodb.net/mathematics";

// Create a new MongoClient
const client = new MongoClient(uri);

async function getCollections(req,res) {
    try {
        // Connect the client to the server
        await client.connect();

        // Establish and verify connection
        const database = client.db('Math');
        var x = await (await database.collections()).map(x=>x.collectionName)
        res.render('index', {title : "Collections",categories : x})
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function getDocuments(collection, req, res) {
    try {
        // Connect the client to the server
        await client.connect();

        // Establish and verify connection
        const database = client.db('Math');
        const collectionObject = await database.collection(collection)
        await collectionObject.find({},{sort : {title : 1}, projection : {_id: 0, title: 1, content: 1}}).toArray().then(
            result => res.render('categories', {title : collection, documents: result.map(x => x.title)})
        )
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function renderDocument(collection, document, req, res) {
    try {
        // Connect the client to the server
        await client.connect();

        // Establish and verify connection
        const database = client.db('Math');
        const collectionObject = await database.collection(collection)
        await collectionObject.findOne({title : document}).then(
            result => res.render('document', {title : document, collection: collection, content : result.content})
        )
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/main', (req, res) => {
    getCollections(req, res).catch(console.dir)
  })

app.get('/main/:collection', (req, res) => {
    getDocuments(req.params.collection,req,res).catch(console.dir)
  })

  app.get('/main/:collection/:document', (req, res) => {
    renderDocument(req.params.collection,req.params.document,req,res).catch(console.dir)
  })

app.use('/static', express.static('public'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })


