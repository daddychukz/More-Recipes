
module.exports = {
  development: {
    username: 'postgres',
    password: 'hb',
    database: 'chuks-recipes',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'hb',
    database: 'recipetest',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};

