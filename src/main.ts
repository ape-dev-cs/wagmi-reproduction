import { PublicClient, createPublicClient, http, parseAbi } from 'viem';

export default class ReproduceBugPls {
  client: any;
  constructor() {
    this.client = createPublicClient({ transport: http('https://eth.llamarpc.com') });
  }

  async getContractNames() {
    const abi = parseAbi(['function name() view returns (string)'] as const);

    const addresses = [
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      '0x94b17476a93b3262d87b9a326965d1e91f9c13e7',
      '0xc4c319e2d4d66cca4464c0c2b32c9bd23ebe784e',
      '0xdce5d6b41c32f578f875efffc0d422c57a75d7d8',
      '0xba12222222228d8ba445958a75a0704d566bf2c8',
    ];

    const returnValues = await Promise.all(
      addresses.map(async address => {
        try {
          return await this.client.readContract({
            abi,
            address: address,
            functionName: 'name',
          });
        } catch (err) {
          return 'No name() function or not a contract';
        }
      })
    );

    return returnValues;
  }
}

async function main() {
  const bugPls = new ReproduceBugPls();

  const names = await bugPls.getContractNames();
  console.log(`We will get here when we run normally as the segfault only occurs when running through jest, we got: ${names.join(', ')}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
