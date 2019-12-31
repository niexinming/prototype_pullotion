var express = require('express');
var router = express.Router();
var db = require('mysql-promise')
const mysql = require( 'mysql' );


class Database {
  constructor( config ) {
    this.connection = mysql.createConnection( config );
  }
  query( sql, args ) {
    return new Promise( ( resolve, reject ) => {
      this.connection.query( sql, args, ( err, rows ) => {
        if ( err )
          return reject( err );
        resolve( rows );
      } );
    } );
  }
  close() {
    return new Promise( ( resolve, reject ) => {
      this.connection.end( err => {
        if ( err )
          return reject(err);
        resolve();
      } );
    } );
  }
}



const isObject = obj => obj && obj.constructor && obj.constructor === Object;
function merge(a, b) {
  for (var attr in b) {
    if (isObject(a[attr]) && isObject(b[attr])) {
      merge(a[attr], b[attr]);
    } else {
      a[attr] = b[attr];
    }
  }
  return a
}

function clone(a) {
  return merge({}, a);
}

router.get('/',function (req,res,next) {
  console.log("index");
  //res.render('index', {title: 'HTML'});
})

/* GET home page. */
router.post('/', function(req, res, next) {


    var body = JSON.parse(JSON.stringify(req.body));
    if (body.host != undefined) {
      res.json({
        "error": "error","msg":"no !! !!"
      })
      process.exit(-1);
    }
    var copybody = clone(body)
    var host = copybody.host == undefined ? "localhost" : copybody.host
    var config = {
      host: host,
      user: 'root',
      password: 'root',
      database: 'test'
    };

  let database=new Database(config);


  let someRows, otherRows;
  database.query( 'select * from user where user= ? and passwd =?', [copybody.user,copybody.passwd] )
      .then( rows => {

        console.log('The solution is: ', rows[0].user);
        if (1 == rows[0].Id) {
          res.json({
            "ok": "congratulations","msg":"pls look \\kfhkhkdsdshalkhkhaklhlahlkkhdfklhhjkhgdajgfhjaghghjasgfjh\\jflkdsajklfjsakljfjkhkjhdsfgasdyuuyueuwguguiuidgffddjfj.js"
          })
        } else {
          res.json({
            "error": "cookie not set","msg":"1111111111"
          })
        }

      } )
      .then( rows => {
        otherRows = rows;
        return database.close();
      }, err => {
        return database.close().then( () => { throw err; } )
      } )
      .then( () => {
        res.json({
          "error": "err","msg":"user or pass err"
        })
      })
      .catch( err => {
        res.json({
          //"error": "err","msg":err.message
            "error": "err","msg":"user or pass err"
        })
      } )





});

module.exports = router;