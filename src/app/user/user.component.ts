import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../service/rest-api.service';
import { HttpEventType } from '@angular/common/http';
import { Contest } from '../contest';

enum ViewType {
  CONTEST= 'contest',
  CONTEST_LIST= 'contest-list',
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
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

  onFileChanged(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  constructor(
    private router: Router,
    private restApiService: RestApiService) {
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
    this.userData = JSON.parse(localStorage.getItem('user-data'));

    this.contests = this.contestDetailsMock;
  }

  onUpload() {
    // this.http is the injected HttpClient
    const data = new FormData();
    data.append('file', this.selectedFile);
    this.restApiService.uploadPhoto(data).subscribe(event => {
      console.log(event);
    });
  }

  goToContest(contest) {
    this.showView = this.viewType.CONTEST;
    this.selectedContest = contest;
    console.log(contest);
  }

  backToContestList() {
    this.showView = this.viewType.CONTEST_LIST;
  }

  likeUnlikeImage(index) {
    if (this.selectedContestMock[index].isliked) {
      this.selectedContestMock[index].numOfLikes -= 1;
    } else {
      this.selectedContestMock[index].numOfLikes += 1;
    }
    this.selectedContestMock[index].isliked = !this.selectedContestMock[index].isliked;
  }

}
