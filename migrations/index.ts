import * as migration_20260711_120635_initial from './20260711_120635_initial';

export const migrations = [
  {
    up: migration_20260711_120635_initial.up,
    down: migration_20260711_120635_initial.down,
    name: '20260711_120635_initial'
  },
];
