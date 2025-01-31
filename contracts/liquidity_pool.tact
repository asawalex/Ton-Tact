import "@stdlib/deploy";

message Transfer {
    queryId: Int as uint64;
    amount: Int as uint32;
}

message (0x7362d09c) JettonNotification {
    queryId: Int;
    amount: Int;
    sender: Address;
    forwardPayload: Slice;
}

struct MyWalletData {
    queryId: Int;
    balance: Int;
}

message AddToCounter {
    amount: Int;
}

contract LiquidityPool with Deployable {
    id: Int as uint32;
    counter: Int as uint32;

    init(id: Int) {
        self.id = id;
        self.counter = 0;
    }

    fun structTOCell(): Cell {
      let walletData = MyWalletData {
            queryId: 1,
            balance: 0,
        };
        return walletData.toCell();
    }
    receive(msg: Transfer) {
        self.counter += msg.amount;
        // Notify the caller that the receiver was executed and forward remaining value back
        self.notify("Cashback".asComment());
    }

    get fun id(): Int {
        return self.id;
    }

    get fun addAmountToCounter(amount: Int): Int {
        self.counter = self.counter + amount;
        return self.counter;
    }




}
