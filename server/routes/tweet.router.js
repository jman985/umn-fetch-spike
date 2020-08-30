const express = require('express');
const router = express.Router();
const pool = require( './pool' );


// GET
router.get( '/', ( req, res )=>{
    console.log( 'in router /events GET',req.params.title );
    /// - query: SELECT * FROM "eventlist" - ///
    let queryString = `SELECT "tweet_html" FROM "tweets" WHERE "publication_id"=253;`;
    pool.query( queryString ).then( ( result )=>{
        // success
        res.send( result.rows );
    }).catch( ( err )=>{
        // error
        res.sendStatus( 500 );
    })
})



module.exports = router;