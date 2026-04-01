import * as migration_20260401_070023 from './20260401_070023';

export const migrations = [
  {
    up: migration_20260401_070023.up,
    down: migration_20260401_070023.down,
    name: '20260401_070023'
  },
];
