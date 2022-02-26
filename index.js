var mysql      = require('mysql');

const express = require('express');
const res = require('express/lib/response');
const app = express()
const port = 8080

app.set('view engine', 'pug')

function capitalize(string) {
  return string[0].toUpperCase()+string.slice(1,string.length)
}


async function getCollections(database, req,res) {
  var connection = mysql.createConnection({
    host     : 'db-mysql-sgp1-44809-do-user-10968463-0.b.db.ondigitalocean.com',
    user     : 'doadmin',
    password : '8zNuD8Zs7KAgvrgC',
    database : 'mathematics',
    port : 25060
  });
  connection.connect();
     
  connection.query('SHOW TABLES FROM '+database+";", function (error, results, fields) {
    if (error) throw error;
    res.render('index',{title : capitalize(database), categories : results.map(x => capitalize(x["Tables_in_"+database]))});
  });
  connection.end();
}

async function getDocuments(collection, req, res) {
  var connection = mysql.createConnection({
    host     : 'db-mysql-sgp1-44809-do-user-10968463-0.b.db.ondigitalocean.com',
    user     : 'doadmin',
    password : '8zNuD8Zs7KAgvrgC',
    database : 'mathematics',
    port : 25060
  });
  connection.connect();
     
  connection.query('SELECT * FROM '+collection, function (error, results, fields) {
    if (error) throw error;
    res.render('categories',{title : capitalize(collection),ids : results.map(x => parseInt(x.id)), documents : results.map(x => capitalize(x.title))})
  });
  connection.end();
}

async function renderDocument(collection, document_id, req, res) {
  var connection = mysql.createConnection({
    host     : 'db-mysql-sgp1-44809-do-user-10968463-0.b.db.ondigitalocean.com',
    user     : 'doadmin',
    password : '8zNuD8Zs7KAgvrgC',
    database : 'mathematics',
    port : 25060
  });
  connection.connect();
     
  connection.query('SELECT * FROM '+collection+' WHERE id = '+document_id+';', function (error, results, fields) {
    if (error) throw error;
    res.render('document',{title : results[0].title, collection : capitalize(collection), content : results.map(x => x.content)[0]})
  });
  connection.end();
}


app.get('/', (req, res) => {
    res.redirect("/main")
})

app.get('/main', (req, res) => {
    getCollections("mathematics",req, res).catch(console.dir)
  })
  

app.get('/main/:collection', (req, res) => {
    getDocuments(req.params.collection.toLocaleLowerCase(),req,res).catch(console.dir)
  })

  app.get('/main/:collection/:documentid', (req, res) => {
    renderDocument(req.params.collection.toLocaleLowerCase(),req.params.documentid,req,res).catch(console.dir)
  })

app.use('/static', express.static('public'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })


