/* Defines the product entity */
export interface Album {
  id: number;
  albumName: string;
  albumCode: string;
  albumReleaseDate: string;
  albumAvail:boolean,
  price: number;
  description: string;
  composer: string;
  artist:string;
  starRating: number;
  imageUrl: string;
}

