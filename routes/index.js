const express = require('express');
const router = express.Router();

const sql = require('../utils/sql');

router.get('/', (req, res) => {
    // should really get the user data here and then fetch it thru, but let's try this asynchronously
    console.log('at the main route');

    let query = "SELECT ID, cover, name FROM tbl_books";

    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }

        console.log(result); // should see objects wrapped in an array

        // render the home view with dynamic data
        res.render('index', { data: result });
     
        

       
    })
})
//looling for localhost:3000/anything
router.get('/:id', (req, res) => {
    console.log("hit a dynamic route");
    console.log(req.params.id);


    let query = `SELECT  * FROM tbl_books WHERE ID="${req.params.id}"`;

    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }

        console.log(result); // should see objects wrapped in an array
        // turn our social property into an array - its just text in the DB
        // wich isnt really anything we can work with

         result[0].quote = result[0].quote.split(',').map(function(item) {
         item = item.trim(); //remove the extra spaces from each word

         return item;
          });
       console.log('after split: ', result[0]);
      


        // render the home view with dynamic data
        //res.render('home', { data: result });
        res.json(result);

       
    })
})

module.exports = router;