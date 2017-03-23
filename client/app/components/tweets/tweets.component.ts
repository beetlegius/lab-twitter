import { Component, OnInit } from '@angular/core';
import { TweetsService } from '../../services/tweets.service';
import { Auth } from '../../services/auth.service';

import { Tweet } from '../../models/tweet';

@Component({
  moduleId: module.id,
  selector: 'tweets',
  templateUrl: 'tweets.component.html',
})
export class TweetsComponent {
  tweets: Tweet[];
  body: string;

  constructor(private tweetsService: TweetsService, private auth: Auth){
    this.tweetsService.all().subscribe(tweets => {
      this.tweets = tweets;
    });
  }

  addTweet(event: Event){
    event.preventDefault();
    var newTweet = {
      _id: 0,
      username: this.auth.userProfile.nickname,
      body: this.body
    };

    this.tweetsService.create(newTweet).subscribe(tweet => {
      this.tweets.push(tweet);
    });
  }

  deleteTweet(tweet: Tweet){
    if (tweet.username == this.auth.userProfile.nickname) {
      var tweets = this.tweets;
      this.tweetsService.delete(tweet).subscribe(data => {
        if (data.n == 1) {
          for (var i = 0; i < tweets.length; i++) {
            if (tweets[i]._id == tweet._id) {
              tweets.splice(i, 1);
            }
          }
        }
      });
    }
  }
}
