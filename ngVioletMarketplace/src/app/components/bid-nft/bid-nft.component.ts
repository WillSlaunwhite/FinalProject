import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bid } from 'src/app/models/bid';
import { AuthService } from 'src/app/services/auth.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-bid-nft',
  templateUrl: './bid-nft.component.html',
  styleUrls: ['./bid-nft.component.css']
})
export class BidNFTComponent implements OnInit {


  constructor( private transactionService: TransactionService, private auth: AuthService, private route: ActivatedRoute) { }

newBid: Bid = new Bid();
bids:Bid[] = [];

createBid(bid: Bid) {
  if(this.auth.isUserLoggedIn() && this.route.snapshot.paramMap.get('tokenId')){


  this.auth.getUser(localStorage.getItem('username')).subscribe(

    user => {
      console.log(user.displayName)
      bid.buyer=user;
    },
    fail => {
      console.log("fail");
    }

  );

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
}
  getAllBids() {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }



}
