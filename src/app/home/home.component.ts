import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../service/rest-api.service';
import { Contest } from '../contest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  contests: Contest[] = [];

  contestDetailsMock = [
    {
      contestId: 1,
      contestTheme: 'Nature',
      date: '19/07/2019'
    }, {
      contestId: 2,
      contestTheme: 'Girl Friend',
      date: '19/07/2019'
    }, {
      contestId: 3,
      contestTheme: 'Animals',
      date: '19/07/2019'
    }, {
      contestId: 4,
      contestTheme: 'Construction',
      date: '19/07/2019'
    }, {
      contestId: 5,
      contestTheme: 'Water',
      date: '19/07/2019'
    }];

  constructor(private restApiService: RestApiService) { }

  ngOnInit() {

    this.contests = this.contestDetailsMock;
    this.restApiService.contestList()
      .subscribe(res => {
        this.contests = res;
      });
  }


}
