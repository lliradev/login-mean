import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userService.getUserProfile()
      .subscribe(
        res => {
          this.userDetails = res['user'];
        },
        err => { }
      )

    /*this.route.paramMap
      .subscribe(params => {
        params.get('fullname');
        console.log(params);
      });*/
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
