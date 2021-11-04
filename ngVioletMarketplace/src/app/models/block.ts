import { Tokentx } from "./tokentx";


// I dont know if we need to actually hash the values here in angular or not
// I dont think we do, we sort of talked about that yesterday I think

// if we decide we need to we can use const SHA256 = require('crypto-js/sha256');
// but I think it's fine without.

// alternatively there's methods out there that would do the same thing in angular as
// hash code does in java, idk how putting it in and getting it out would work. If we
// wanted to hash in angular

export class Block {
  index: number;
  timestamp: string;
  tokenData: any;
  previousBlockHash: string;
  blockHash: string;
  transactions: Tokentx[] = [];

  constructor(
    index: number = 0,
    timestamp: string = '',
    tokenData: any | undefined,
    previousBlockHash: string = '',
    blockHash: string = '',
    transactions: Tokentx[],
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.tokenData = tokenData;
    this.previousBlockHash = previousBlockHash;
    this.blockHash = blockHash;
    this.transactions = transactions;


  }

  computeHashForThisBlock() {

  }
}
