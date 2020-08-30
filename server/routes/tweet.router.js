const express = require('express');
const router = express.Router();
const pool = require( './pool' );


// GET
router.get( '/:title', ( req, res )=>{
    console.log( 'in router /events GET',req.params.title );
    /// - query: SELECT * FROM "eventlist" - ///
    let queryString = `SELECT "tweet_html" FROM "tweets" ORDER BY date DESC`;
    pool.query( queryString ).then( ( result )=>{
        // success
        res.send( result.rows );
    }).catch( ( err )=>{
        // error
        res.sendStatus( 500 );
    })
})



module.exports = router;