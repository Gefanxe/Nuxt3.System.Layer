import type { Knex } from 'knex';
import path from 'node:path';
import process from 'node:process';
import knex from 'knex';

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: path.join(process.cwd(), '/server/database', 'database.sqlite'),
  },
  useNullAsDefault: true,
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};

const knexObj = knex(config);

export {
  config,
  knexObj,
};
