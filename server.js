const pg = require('pg');

// const connectionString = 'postgres://chuks@recipes-server:SuperSecret01@recipes-server.postgres.database.azure.com:5432/postgres?ssl=true';

const client = new pg.Client({
  user: 'postgres',
  password: 'chuks',
  database: 'postgres',
  host: config.pg_host,
});
client.connect();

const query = 'SELECT * FROM {table-name}';
client.query(query, (err, res) => {
  console.log('>>>>>', res);
});

postgres://postgres:daddy@10.0.1.4:5432/postgres?ssl=true

postgres://<username>:<password>@<host>:<portnumber>/<database>?ssl=true

username: "postgres",
password: "daddy",
database: "postgres",
host: "10.0.1.4",
port: 5432,
dialect: "postgres",
ssl: true
