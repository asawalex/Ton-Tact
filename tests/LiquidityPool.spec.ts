import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { LiquidityPool } from '../wrappers/LiquidityPool';
import '@ton/test-utils';

describe('LiquidityPool', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let liquidityPool: SandboxContract<LiquidityPool>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        liquidityPool = blockchain.openContract(await LiquidityPool.fromInit(BigInt(1)));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await liquidityPool.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: liquidityPool.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and liquidityPool are ready to use
    });

    it('should increase counter', async () => {
        const increaseTimes = 3;
        for (let i = 0; i < increaseTimes; i++) {
            console.log(`increase ${i + 1}/${increaseTimes}`);

            const increaser = await blockchain.treasury('increaser' + i);

            const counterBefore = await liquidityPool.getCounter();

            console.log('counter before increasing', counterBefore);

            const increaseBy = BigInt(20_5);

            console.log('increasing by', increaseBy);

            const increaseResult = await liquidityPool.send(
                increaser.getSender(),
                {
                    value: toNano('0.05'),
                },
                {
                    $$type: 'Transfer',
                    queryId: BigInt(1),
                    amount: increaseBy,
                }
            );

            expect(increaseResult.transactions).toHaveTransaction({
                from: increaser.address,
                to: liquidityPool.address,
                success: true,
            });

            const counterAfter = await liquidityPool.getCounter();

            console.log('counter after increasing', counterAfter);

            expect(counterAfter).toBe(counterBefore + increaseBy);
        }
    });


    it ("Beginner Test", async ( ) => {

        const amountToAdd = BigInt(10)
       const added = await liquidityPool.getAddAmountToCounter(amountToAdd)
        console.log(added + " Has Been Added") 
    });




});
