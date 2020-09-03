// requires
const pg = require( 'pg' );
// globals
const pool = new pg.Pool({
    database: 'umn_app',
    host: 'localhost',
    port: 5432,
    max: 15,
    idleTimeoutMillis: 30000
})
// export
module.exports = pool;