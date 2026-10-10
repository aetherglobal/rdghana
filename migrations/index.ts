import * as migration_20260711_120635_initial from './20260711_120635_initial';
import * as migration_20261010_155839_careers from './20261010_155839_careers';
import * as migration_20261010_163000_careers_initial_vacancies from './20261010_163000_careers_initial_vacancies';
import * as migration_20261010_165355_nav_links from './20261010_165355_nav_links';

export const migrations = [
  {
    up: migration_20260711_120635_initial.up,
    down: migration_20260711_120635_initial.down,
    name: '20260711_120635_initial',
  },
  {
    up: migration_20261010_155839_careers.up,
    down: migration_20261010_155839_careers.down,
    name: '20261010_155839_careers',
  },
  {
    up: migration_20261010_163000_careers_initial_vacancies.up,
    down: migration_20261010_163000_careers_initial_vacancies.down,
    name: '20261010_163000_careers_initial_vacancies',
  },
  {
    up: migration_20261010_165355_nav_links.up,
    down: migration_20261010_165355_nav_links.down,
    name: '20261010_165355_nav_links'
  },
];
