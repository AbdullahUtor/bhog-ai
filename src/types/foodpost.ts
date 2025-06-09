export class FoodPost {
  id?: string;
  name?: string;
  distance?: number;
  price?: number;
  restaurantName?: string;
  description?: string;
  like?: boolean;
  dislike?: boolean;


  constructor(
    id?: string,
    name?: string,
    distance?: number,
    price?: number,
    restaurantName?: string,
    description?: string,
    like?: boolean,
    dislike?: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.distance = distance;
    this.price = price;
    this.restaurantName = restaurantName;
    this.description = description;
    this.like = like;
    this.dislike = dislike;
  }
}