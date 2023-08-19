const SegfaultHandler = require('segfault-handler');
SegfaultHandler.registerHandler('crash.log');

import ReproduceBugPls from '../main';

describe('main.ts', () => {

  it('should reproduce', async () => {
    const rbp = new ReproduceBugPls();
    const names = await rbp.getContractNames();
    console.log(`We shouldn't get here because it'll segfault, but we got ${names.join(', ')}`);
  });
});
