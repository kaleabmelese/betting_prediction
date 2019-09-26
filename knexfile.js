// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "localhost",
      user: "kalpsql",
      password: "kalpsql",
      database: "bettbase"
    },
    migrations: {
      directory: "./knex/migrations"
    },
    seeds: {
      directory: "./knex/seeds/userseed"
    },
    useNullAsDefault: true
  },
  test: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "kalpsql",
      password: "kalpsql",
      database: "bettbase"
    },
    migrations: {
      directory: ".knex/migrations"
    },
    seeds: {
      directory: "./knex/seeds/test"
    },
    useNullAsDefault: true
  },
  staging: {
    client: "postgresql",
    connection: {
      database: "bettbase",
      user: "kalpsql",
      password: "kalpsql"
    },
    pool: {
      min: 2,
      max: 10
      // min: process.env.DATABASE_POOL_MIN,
      // max: process.env.DATABASE_POOL_MAX
    },
    migrations: {
      tableName: "users",
      tablename: "predictions",
      tableName: "freetips"
    }
  },
  production: {
    client: "postgresql",
    connection: {
      database: "bettbase",
      user: "kalpsql",
      password: "kalpsql"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
