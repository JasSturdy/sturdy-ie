import * as migration_20260331_084433 from './20260331_084433';

export const migrations = [
  {
    up: migration_20260331_084433.up,
    down: migration_20260331_084433.down,
    name: '20260331_084433'
  },
];
