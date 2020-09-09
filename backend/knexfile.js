module.exports = {
  client: 'postgresql',
  connection: {
    database: 'knowledge',
    user: 'postgres',
    password: 'docker',
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database/migrations'
  }
}

/*
  Cria o arquivo
  yarn knex:make create_users

  Roda as migrate
  yarn knex:migrate

*/