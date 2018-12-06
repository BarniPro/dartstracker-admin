import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {UserModel} from '../../../models/user.model';
import User = UserModel.User;
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  displayedColumns: string[] = ['id', 'username', 'human_name', 'country', 'date_of_birth', 'role', 'actions'];

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.userService.get().subscribe((users) => {
      this.users = users;
    });
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

}
