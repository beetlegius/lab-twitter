import { Component, OnInit } from '@angular/core';
import { TweetsService } from '../../services/tweets.service';
import { RelationshipsService } from '../../services/relationships.service';
import { Auth } from '../../services/auth.service';

import { Tweet } from '../../models/tweet';
import { Relationship } from '../../models/relationship';

@Component({
  moduleId: module.id,
  selector: 'tweets',
  templateUrl: 'tweets.component.html',
})
export class TweetsComponent implements OnInit {
  tweets: Tweet[];
  relationships: Relationship[];
  body: string;

  constructor(private tweetsService: TweetsService, private relationshipsService: RelationshipsService, private auth: Auth){
  }

  ngOnInit(){
    this.relationshipsService.all().subscribe(relationships => {
      this.relationships = relationships;
    });
    this.tweetsService.all().subscribe(tweets => {
      this.tweets = tweets;
    });
  }

  addTweet(event: Event){
    event.preventDefault();
    var newTweet = {
      userId: this.auth.userProfile.user_id,
      username: this.auth.userProfile.nickname,
      body: this.body
    };

    this.tweetsService.create(newTweet).subscribe(tweet => {
      this.tweets.push(tweet);
      this.body = '';
    });
  }

  deleteTweet(tweet: Tweet){
    if (tweet.userId == this.auth.userProfile.user_id) {
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

  follow(user_id: string) {
    if (!this.relationships.some(relationship => relationship.userToId == user_id)) {
      var newRelationship = {
        userFromId: this.auth.userProfile.user_id,
        userToId: user_id
      }
      this.relationshipsService.create(newRelationship).subscribe(relationship => {
        this.relationships.push(relationship);
      })
    }
  }

  unfollow(relationship: Relationship){
    var relationships = this.relationships;
    this.relationshipsService.delete(relationship).subscribe(data => {
      if (data.n == 1) {
        for (var i = 0; i < relationships.length; i++) {
          if (relationships[i]._id == relationship._id) {
            relationships.splice(i, 1);
          }
        }
      }
    });
  }

  isFollowing(user_id: string) {
    return this.relationships && this.relationships.some(relationship => relationship.userToId == user_id);
  }

}
