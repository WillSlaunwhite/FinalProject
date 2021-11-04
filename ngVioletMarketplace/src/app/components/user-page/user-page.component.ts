import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BsModalService,
  BsModalRef,
  ModalOptions,
  ModalDirective,
} from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Bid } from 'src/app/models/bid';
import { Token } from 'src/app/models/token';
import { Tokentx } from 'src/app/models/tokentx';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { LoginComponent } from '../login/login.component';
import { PictureuploadComponent } from '../pictureupload/pictureupload.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private tokenSvc: TokenService,
    private transSvc: TransactionService,
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  bsModalRef?: BsModalRef;
  editProfile: boolean = false;

  user: User = new User();
  bids: Bid[] = [];
  transfers: Tokentx[] = [];
  tokens: Token[] = [];

  ngOnInit(): void {
    // subscribes to populate user.
    if (this.route.snapshot.paramMap.get('username')) {
      this.auth.getUser(this.route.snapshot.params['username']).subscribe(
        (retrievedUser) => {
          console.log("retrieved display name: " + retrievedUser.displayName);

          this.user = retrievedUser;

          console.log(this.user.displayName);

        },
        (failedToRetrieveUser) => {
          console.error(
            'userPageComponent.ngOnInit(): failed to retrieve user using auth.getUser()'
          );
          console.error(failedToRetrieveUser);
        }
      );
    }

    // subscribes to get user's transactions
    this.transSvc.getAllUserTransfers(this.user.id).subscribe(
      (retrievedListOfTransfers) => {
        this.transfers = retrievedListOfTransfers;
      },
      (failedToRetrieveListOfTransfers) => {
        console.log('user id: ' + this.user.id);
        console.error(
          'userPageComponent.ngOnInit(): failed to retrieve list of transfers using transSvc.getAllUserTransfers()'
        );
        console.error(failedToRetrieveListOfTransfers);
      }
    );

    // subscribes to populate list of bids
    this.transSvc.getAllUserBids(this.user.id).subscribe(
      (retrievedListOfBids) => {
        this.transfers = retrievedListOfBids;
      },
      (failedToRetrieveListOfBids) => {
        console.error(
          'userPageComponent.ngOnInit(): failed to retrieve list of transfes using transSvc.getAllUserBids()'
        );
        console.error(failedToRetrieveListOfBids);
      }
    );

    // subscribes to populate list of user's tokens
    this.tokenSvc.getAllUserTokens().subscribe(
      (retrievedListOfTokens) => {
        this.tokens = retrievedListOfTokens;
        this.test();
      },
      (failedToRetrieveListOfTokens) => {
        console.error(
          'userPageComponent.ngOnInit(): failed to retrieve list of transfes using transSvc.getAllUserTransfers()'
        );
        console.error(failedToRetrieveListOfTokens);
      }
    );

    // this.parameterValue = this.activatedRoute.params.subscribe((params) => {
    //   this.setUser(params['username']);
    // });

  }

  // Misc methods

  test(): void {
    console.log('user id: ' + this.user.id);
    console.log('user display name: ' + this.user.displayName);

    console.log("bids length: " + this.bids.length);
    console.log("transfers length: " + this.transfers.length);
    console.log("tokens length: " + this.tokens.length);


    for(let bid of this.bids) {
      console.log('bid offerAmount: ' + bid.offerAmount);
      console.log('bid accepted: ' + bid.accepted);
      console.log('bid buyer displayname: ' + bid.buyer.displayName);
      console.log('bid seller displayname: ' + bid.seller.displayName);
      console.log('bid token name: ' + bid.token.name);
    }

    for(let transfer of this.transfers) {
      console.log("transfer buyer displayname: " + transfer.buyer.displayName);
      console.log("transfer seller displayname: " + transfer.seller.displayName);
      console.log("transfer description: " + transfer.description);
      console.log("transfer token name: " + transfer.token.name);
    }

    for(let token of this.tokens) {
      console.log("token id: " + token.id);
      console.log("token name: " + token.name);
    }
  }

  loggedIn(): boolean {
    return this.auth.isUserLoggedIn();
  }

  setUser(username: string): void {
    this.auth.getUser(username).subscribe(
      (user) => {
        this.user = user;
      },
      (fail) => {
        console.log('Failed to Retrieve User: user-page SetUser()');
      }
    );
  }

  openModalWithComponent() {
    const initialState: ModalOptions = {
      initialState: {
        list: [
          'Open a modal with component',
          'Pass your data',
          'Do something else',
          '...',
        ],
        title: 'Modal with component',
      },
    };
    this.bsModalRef = this.modalService.show(
      PictureuploadComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
