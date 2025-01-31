import "@stdlib/deploy";

message Mint {
    amount: Int;
    address: Address;
}

message(0xf8a7ea5) TokenTransfer {
    queryId: Int;
    amount: Int as coins;
    destination: Address;
    responseDestination: Address?;
    customPayLoad: Cell? ;
    forwardTonAmount: Int;
    forwardPayLoad: Slice;
}

trait Inheritance {
    balance: Int;
    totalSupply: Int;
    ownerAddress: Address;

    get fun mintFunction(msg: Mint): Int {
        return self.totalSupply + msg.amount;
    }

    get fun returnBalance(msg: Mint): Int {
        return self.balance + msg.amount;
    }

}

contract Example with Inheritance {
    balance: Int = 0;
    totalSupply: Int = 0;
    ownerAddress: Address;


    init(queryId: Int) {
        self.balance = 0;
        self.totalSupply = 0; 
        self.ownerAddress = address("0QC1GuMlMyN4bLe0xRAUulsvTgL1Z03nnTo34C4gdUpsrxfg");
    }

    fun sender(): Address {
        return self.ownerAddress;
    }

    receive (msg:Mint) {
        require (
           sender() == self.ownerAddress, 
           "Not Address"
        );
        require (
            self.balance > msg.amount,
            "Not Enough Token"
        );
        
    }

}
