import { Component, OnInit } from '@angular/core';
import { Bid } from 'src/app/models/bid';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-bid-nft',
  templateUrl: './bid-nft.component.html',
  styleUrls: ['./bid-nft.component.css']
})
export class BidNFTComponent implements OnInit {


  constructor( private transactionService: TransactionService) { }

newBid: Bid = new Bid();
bids:Bid[] = [];

createBid(bid: Bid) {
  this.transactionService.create(this.newBid).subscribe(
    () => {
      this.getAllBids();
      console.log("Success Bid")
      this.newBid = new Bid();
    },
    (failed: any) => {
      console.error('BidComponent.createBid(): Error creating Bid');
      console.error(failed);
    }
  );
}
  getAllBids() {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }



}
