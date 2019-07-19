import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contest } from '../contest';

enum ViewType {
  CONTEST= 'contest',
  CONTEST_LIST= 'contest-list',
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  navData: any;
  userData: any;
  selectedFile: File;
  showView: string;
  viewType = ViewType;
  selectedContest: any;
  contests: Contest[];
  contestDetailsMock = [
    { contestId: 1, contestTheme: 'Nature', date: '19/07/2019' },
    { contestId: 2, contestTheme: 'Girl Friend', date: '19/07/2019' },
    { contestId: 3, contestTheme: 'Animals', date: '19/07/2019' },
    { contestId: 4, contestTheme: 'Construction', date: '19/07/2019' },
    { contestId: 5, contestTheme: 'Water', date: '19/07/2019' },
    ];

  selectedContestMock = [
    { img: 'assets/img/admin.png', photographer: 'xyz', numOfLikes: 20, isliked: false },
    { img: 'assets/img/admin.png', photographer: 'xyz', numOfLikes: 20, isliked: false },
    { img: 'assets/img/admin.png', photographer: 'xyz', numOfLikes: 20, isliked: true },
    { img: 'assets/img/admin.png', photographer: 'xyz', numOfLikes: 20, isliked: false },
    { img: 'assets/img/admin.png', photographer: 'xyz', numOfLikes: 20, isliked: false },
    { img: 'assets/img/admin.png', photographer: 'xyz', numOfLikes: 20, isliked: true },
    { img: 'assets/img/admin.png', photographer: 'xyz', numOfLikes: 20, isliked: true },
    { img: 'assets/img/admin.png', photographer: 'xyz', numOfLikes: 20, isliked: false },
    { img: 'assets/img/admin.png', photographer: 'xyz', numOfLikes: 20, isliked: false },
    { img: 'assets/img/admin.png', photographer: 'xyz', numOfLikes: 20, isliked: false }
  ];

  constructor(
    private router: Router) {
      this.getNavData();
  }

  getNavData() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.navData = navigation.extras.state;
    }
    console.log(this.navData);
  }

  ngOnInit() {
    this.showView = this.viewType.CONTEST_LIST;
    this.userData = JSON.parse(localStorage.getItem('admin-data'));

    this.contests = this.contestDetailsMock;
  }

  goToContest(contest) {
    this.showView = this.viewType.CONTEST;
    this.selectedContest = contest;
    console.log(contest);
  }

  backToContestList() {
    this.showView = this.viewType.CONTEST_LIST;
  }

}
