import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Album } from './album';

export class AlbumData implements InMemoryDbService {

  createDb() {
    const albums: Album[] = [
      {
        id: 1,
        albumName: 'Happy Days',
        albumCode: 'SONIC-0011',
        albumReleaseDate: 'March 19, 2018',
        albumAvail: true,
        price: 23.15,
        description: 'Jacky Crise,Tom Chan',
        composer: 'Bethovan',
        artist:'Shan',
        starRating: 5,
        imageUrl: 'assets/images/music_logo.jpg'
      },
      {
        id: 2,
        albumName: 'Show me the meaning',
        albumCode: 'SONIC-0021',
        albumReleaseDate: 'December 30, 2018',
        albumAvail: true,
        price: 4.15,
        description: 'Decap',
        composer: 'Micky',
        artist:'Donald',
        starRating: 3.2,
        imageUrl: 'assets/images/music_logo.jpg'
      },
      {
        id: 3,
        albumName: 'Sky is not enough',
        albumCode: 'SONIC-0016',
        albumReleaseDate: 'March 19, 2018',
        albumAvail: true,
        price: 6.15,
        description: 'Blue bells wisdom',
        composer: 'Nick Jon',
        artist:'Jose',
        starRating: 2.2,
        imageUrl: 'assets/images/music_logo.jpg'
      },
      {
        id: 4,
        albumName: 'Miracle day',
        albumCode: 'SONIC-0111',
        albumReleaseDate: 'March 19, 2018',
        albumAvail: true,
        price: 13.15,
        description: 'Summer days',
        composer: 'Roamani',
        artist:'Dane',
        starRating: 4.2,
        imageUrl: 'assets/images/music_logo.jpg'
      },
      {
        id: 5,
        albumName: 'Cake walk',
        albumCode: 'SONIC-0081',
        albumReleaseDate: 'March 19, 2018',
        albumAvail: true,
        price: 33.15,
        description: 'New Asians',
        composer: 'Rahman',
        artist:'Amir',
        starRating: 4.6,
        imageUrl: 'assets/images/music_logo.jpg'
      }
    ];
    return { albums };
  }
}
