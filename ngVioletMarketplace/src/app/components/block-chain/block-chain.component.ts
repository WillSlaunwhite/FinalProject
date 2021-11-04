import { Component, OnInit } from '@angular/core';
import { Block } from 'src/app/models/block';
import { Token } from 'src/app/models/token';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-block-chain',
  templateUrl: './block-chain.component.html',
  styleUrls: ['./block-chain.component.css']
})
export class BlockChainComponent implements OnInit {
  chain: Block[] = [];
  token: Token | null = null;


  constructor(private auth: AuthService,
    private tokenSvc: TokenService,
    private transactionSvc: TransactionService) { }


  ngOnInit(): void {
    // logic to populate chain
  }

  createBlock(block: Block): Block {
    block.index = this.chain.length + 1;
    block.timestamp = Date();  // supposedly this should set it to now
    block.tokenData = this.token;
    block.previousBlockHash = this.getLatestBlock().blockHash;
    // need to set block's hash some how, could use http.get to pull value from java controller

    this.chain.push(block);
    return block;


    // need to build out this service for this
    //
    // return this.http.post<Block>(this.url, token, this.auth.getHttpOptions()).pipe(
    //   catchError((err: any) => {
    //     console.log(err);
    //     return throwError('tokenService.create(): Error creating Token');
    //   })
    // );

  }

  createGenesisBlock() {
    // hard code values for first block. Idk where this belongs
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  // after this works we can add to check validity

}
