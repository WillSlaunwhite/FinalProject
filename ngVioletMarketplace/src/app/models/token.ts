export class Token {
  id: number;
  name: string;
  description: string;
  rarity: string;
  price: number;
  releaseDate: string;
  tokenLocation: string;
  offered: boolean;
  // owner

  constructor(
    id: number = 0,
    name: string = '',
    description: string = '',
    rarity: string = '',
    price: number = 0,
    releaseDate: string = '',
    tokenLocation: string = '',
    offered: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.rarity = rarity;
    this.price = price;
    this.releaseDate = releaseDate;
    this.tokenLocation = tokenLocation;
    this.offered = offered;
  }
}
