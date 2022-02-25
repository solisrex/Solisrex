var mysql      = require('mysql');

const express = require('express')
const app = express()
const port = 8080

app.set('view engine', 'pug')


async function getCollections(req,res) {
    
}

async function getDocuments(collection, req, res) {
    
}

async function renderDocument(collection, document, req, res) {
    
}


app.get('/', (req, res) => {
    res.send('Hello World!')
    var connection = mysql.createConnection({
        host     : 'db-mysql-sgp1-44809-do-user-10968463-0.b.db.ondigitalocean.com',
        user     : 'doadmin',
        password : '8zNuD8Zs7KAgvrgC',
        database : 'mathematics'
      });
    
      connection.connect();
     
      connection.query('SELECT * FROM propositions', function (error, results, fields) {
        if (error) throw error;
        res.send("success")
      });
      connection.end();
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


