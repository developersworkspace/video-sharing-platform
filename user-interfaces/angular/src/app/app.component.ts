import { Component } from '@angular/core';
import { Profile } from './entities/profile';
import { Address } from './value-objects/address';
import { ContactDetails } from './value-objects/contact-details';
import { User } from './entities/user';
import { Video } from './entities/video';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public apiUri = 'http://localhost:3000/api';

  public latestVideo: Video = null;

  public profile: Profile = null;

  public recentVideos: Video[] = null;

  public user: User = null;

  public videos: Video[] = null;

  constructor() {
    this.profile = new Profile(
      new Address('Montreal', 'Canada'),
      new ContactDetails('chris@leslingshot.com', '(000) 000-0000'),
      // tslint:disable-next-line:max-line-length
      `I'm a professional magician who regularly uploads videos on magic performance, street magic, tutorials, cardistry and VLOGS! Come check out my channel if you're a beginner, intermediate or advanced magician. There's something for everyone!`,
      'chris-ramsay-profile-id',
      // tslint:disable-next-line:max-line-length
      `Chris Ramsay specializes in the deceptive practices. Using techniques he's refined through thousands of hours of practice, he persists in altering your perceived reality. His flare for creativity has thrown him in to the world of deception, where some of his techniques are distributed to practitioners across the globe. At the forefront of today's industry of modern conjuring, Chris is constantly creating new ways to entertain and redefine your idea of magic.`,
      'chris-ramsay',
      'chris-ramsay-user-id',
    );

    this.user = new User('chris@leslingshot.com', 'Chris', 'chris-ramsay-user-id', 'Ramsay');

    this.videos = [
      new Video(
        'video-1.file',
        'chris-ramsay-video-id-1',
        // tslint:disable-next-line:max-line-length
        `In today's video, I get stumped by an impossible puzzle, I see impossible magic and hang out with the master of impossible things, consultant to David Blaine and all around generous and humble human being, Garrett Thomas! Garrett lectured last night and I caught some of it on video! Enjoy and Go follow GT!`,
        'chris-ramsay',
        // tslint:disable-next-line:max-line-length
        `In today's video, I get stumped by an impossible puzzle, I see impossible magic and hang out with the master of impossible things, consultant to David Blaine and all around generous and humble human being, Garrett Thomas! Garrett lectured last night and I caught some of it on video! Enjoy and Go follow GT!`,
        74338401,
        'thumbnail-1.file',
        'An IMPOSSIBLE Puzzle and UNEXPLAINABLE Magic!!'),
      new Video(
        'video-2.file',
        'chris-ramsay-video-id-2',
        // tslint:disable-next-line:max-line-length
        `Today I'm going to attempt to solve this level 9 Viking puzzle, hand made by Jean-Claude Constantin. It is a sequential puzzle where the aim is to slide out the piece holding the top together.`,
        'chris-ramsay',
        // tslint:disable-next-line:max-line-length
        `Today I'm going to attempt to solve this level 9 Viking puzzle, hand made by Jean-Claude Constantin. It is a sequential puzzle where the aim is to slide out the piece holding the top together.`,
        74338401,
        'thumbnail-2.file',
        'Solving the GENIUS Viking Puzzle'),
      new Video(
        'video-3.file',
        'chris-ramsay-video-id-3',
        // tslint:disable-next-line:max-line-length
        `YO! Today I decided to go out and perform some magic in the streets...`,
        'chris-ramsay',
        `YO! Today I decided to go out and perform some magic in the streets...`,
        74338401,
        'thumbnail-3.file',
        'A Demonstration of MIND CONTROL'),
    ];

    this.recentVideos = this.videos.slice(0, 2);

    this.latestVideo = this.videos[0];
  }

}
