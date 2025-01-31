import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { address, toNano } from '@ton/core';
import { Example } from '../wrappers/Example';
import '@ton/test-utils';

describe('Example', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let example: SandboxContract<Example>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        let queryId = BigInt(10);

        example = blockchain.openContract(await Example.fromInit(queryId));

        deployer = await blockchain.treasury('deployer');

        const myAddress = address("0QC1GuMlMyN4bLe0xRAUulsvTgL1Z03nnTo34C4gdUpsrxfg");

        const deployResult = await example.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Mint',
                amount: BigInt(10),
                address: myAddress,

            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: example.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and example are ready to use

    });
});
