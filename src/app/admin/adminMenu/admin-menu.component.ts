import { Component, OnInit } from '@angular/core';
import { UserService} from '../adminShared/user.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.css'],
    providers: [UserService]
})

export class AdminMenuComponent implements OnInit{
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    theUser: string;

    constructor(private userSVC: UserService, private router: Router){}

    nOnInit(){
        this.theUser = this.userSVC.loggedInUser;
    }

    logout() {
        this.userSVC.logout();
        this.router.navigate(['']);
    }
}