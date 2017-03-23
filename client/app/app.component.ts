import { Component } from '@angular/core';
import { TweetsService } from './services/tweets.service';
import { Auth } from './services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [
    TweetsService
  ]
})
export class AppComponent  {
  constructor(private auth: Auth){

  }
}
