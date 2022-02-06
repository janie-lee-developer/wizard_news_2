const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/wizard_news');

client.connect();

module.exports = client;