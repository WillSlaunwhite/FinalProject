import { Token } from "./token";
import { Tokentx } from "./tokentx";
import { User } from "./user";

export class Bid {
  id:number;
  description: string;
  offerAmount: number;
  accepted: boolean;
  buyer: User;
  seller: User;
  bidDate: string;
  token: Token;
  transaction: Tokentx;

  constructor(
    id: number = 0,
    description: string = '',
    offerAmount: number = 0,
    accepted: boolean = false,
    buyer: User= new User(),
    seller: User = new User(),
    token: Token= new Token(),
    transaction: Tokentx = new Tokentx(),
    bidDate: string = '',
  ) {
    this.id = id;
    this.description = description;
    this.accepted = accepted;
    this.buyer = buyer;
    this.seller = seller;
    this.token = token;
    this.transaction = transaction;
    this.bidDate = bidDate;
    this.offerAmount = offerAmount;
  }
}
