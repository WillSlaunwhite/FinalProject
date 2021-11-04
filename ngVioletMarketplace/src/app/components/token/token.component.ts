import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bid } from 'src/app/models/bid';
import { Token } from 'src/app/models/token';
import { Tokentx } from 'src/app/models/tokentx';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsModalRef , BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css'],
})
export class TokenComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private transactionService: TransactionService,
    private auth: AuthService,
    private modalService: BsModalService,
  ) {}
  newToken: Token = new Token();
  tokens: Token[] = [];
  selected: Token = new Token();
  editToken: Token | null = null;
  tokenTransactions: Tokentx[] = [];
  bids: Bid[] = [];
  modalRef: BsModalRef= new BsModalRef();
  username: string | null = null;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }

  createToken(token: Token) {
    this.tokenService.create(token).subscribe(
      (newToken) => {
        this.getAllTokens();
        this.newToken = new Token();
      },
      (failed) => {
        console.error('TokenComponent.createToken(): Error creating Token');
        console.error(failed);
      }
    );
  }

  deleteToken(id: number): void {
    this.tokenService.destroy(id).subscribe(
      (success) => {
        this.getAllTokens();
      },
      (failure) => {
        console.error('tokenComponent.deleteToken(): error deleting Token');
        console.error(failure);
      }
    );
  }

  // updateToken
  // method already exists in service, needs to be built out here

  getAllTokens(): void {
    this.tokenService.getAllTokens().subscribe(
      (tokenList) => {
        this.tokens = tokenList;
      },
      (fail) => {
        console.error(
          'TokenComponent.reloadTokens(): Error getting Token List'
        );
        console.log(fail);
      }
    );
  }

  // getAllTransfers() {
  //   this.transactionService.getAllTransfers().subscribe(
  //     (tokentxList) => {
  //       console.log(this.tokenTransactions.length);

  //       this.tokenTransactions = tokentxList;

  //       console.log(this.tokenTransactions.length);
  //     },
  //     (fail) => {
  //       console.error(
  //         'tokenComponent.getAllTransfers(): error getting transfers'
  //       );
  //       console.error(fail);
  //     }
  //   );
  // }

  getBidsForSelectedToken() {
    if (this.selected) {
      this.transactionService.getAllTokenBids(this.selected.id).subscribe(
        (bidsList) => {
          console.log(this.bids.length);

          this.bids = bidsList;

          console.log(this.bids.length);
        },
        (fail) => {
          console.error(
            'tokenComponent.getAllTransfers(): error getting transfers'
          );
          console.error(fail);
        }
      );
    }
  }

  // on init, add these fields

  // do I need to do anything for the owner? maybe buyer/seller?
  // would the buyer/seller stuff be handled somewhere else, maybe on
  // the bid page specifically.

  // if show, specifically. Think we just need to fill selected
  // this.transactionService.getAllTokenBids(this.selected.id);

  ngOnInit(): void {
    // originally also had !this.selected && on 115 idk if I need it
    if (this.route.snapshot.paramMap.get('id')) {
      this.tokenService.show(this.route.snapshot.params['id']).subscribe(
        (success) => {
          this.selected = success;

          console.log('succeeded getting token, attempting to get transfers.');



          // subscribe to assign selected its transfers

          // I think we would only need to see bids on this page, right?
          // no need to pull bids for another reason than to see them on a specific
          // token, so we don't need to even populate bids if we don't route to show.

          this.transactionService.getAllTokenBids(this.selected.id).subscribe(
            retrievedTokenBids => {
              this.bids = retrievedTokenBids;
            },
            failedToRetrieveBids => {
              console.error('userPageComponent.ngOnInit(): failed to retrieve list of Token bids using transactionService.getAllTokenBids()');
              console.error(failedToRetrieveBids);
            }
          );

          console.log(
            'succeeded getting transfers, attempting to get all bids'
          );

          console.log('successfully retrieved all bids');
        },
        (fail) => {
          console.error(
            'tokenComponent.ngOnInit(): error initializing Token by id'
          );
          console.error('routing to index');

          this.tokenService.getAllTokens();

          console.error('Succeeded routing to index, getting transfers');

          this.transactionService.getAllTransfers();
          console.log(this.tokenTransactions.length);

          console.error('succeded getting transfers');

          console.error(fail);
        }
      );
    } else {
      this.getAllTokens();
    }
  }

  setEditToken() {
    this.editToken = Object.assign({}, this.selected);
  }

  displayToken(token: Token) {
    this.selected = token;
  }

  // hideToken() {
  //   this.selected = null;
  // }

  loggedIn() {
    return this.auth.isUserLoggedIn();
  }


}
