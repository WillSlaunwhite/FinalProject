import { Token } from "./token";
import { User } from "./user";

// either separate bid entity in database
// or potential field in tx showing whether confirmed


export class Tokentx {
  id:number;
  description:string;
  buyer: User;
  seller: User;
  token: Token;
  constructor(
    id: number = 0,
    description: string = '',
    buyer: User= new User(),
    seller: User = new User(),
    token: Token= new Token()
  ) {
    this.id = id;
    this.description = description;
    this.buyer = buyer;
    this.seller = seller;
    this.token = token;
  }
}
