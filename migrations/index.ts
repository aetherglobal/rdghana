import * as migration_20260711_120635_initial from './20260711_120635_initial';
import * as migration_20261010_155839_careers from './20261010_155839_careers';

export const migrations = [
  {
    up: migration_20260711_120635_initial.up,
    down: migration_20260711_120635_initial.down,
    name: '20260711_120635_initial',
  },
  {
    up: migration_20261010_155839_careers.up,
    down: migration_20261010_155839_careers.down,
    name: '20261010_155839_careers'
  },
];
