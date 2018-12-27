import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class UserService implements CanActivate {
    userLoggedIn: boolean = false;
    loggedInUser: string;
    authUser: any;

    constructor(private router: Router) {
        var config = {
            apiKey: "AIzaSyD5SopJBgzH_cbZy_IzfcIN-df4c8Y-9gk",
            authDomain: "gigabytegames-f02b6.firebaseapp.com",
            databaseURL: "https://gigabytegames-f02b6.firebaseio.com",
            projectId: "gigabytegames-f02b6",
            storageBucket: "gigabytegames-f02b6.appspot.com",
            messagingSenderId: "711009184595"
        };
        if(!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.verifyLogin(url);
    }

    verifyLogin(url: string): boolean {
        if (this.userLoggedIn) { return true; }

        this.router.navigate(['/admin/login']);
        return false;
    }

    register(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function (error) {
                alert(`${error.message} Please Try Again!`);
            });
    }

    verifyUser() {
        this.authUser = firebase.auth().currentUser;

        if(this.authUser) {
            console.log('From verify user');
            alert(`Welcome ${this.authUser.email}`);
            this.loggedInUser = this.authUser.email;
            this.userLoggedIn = true;
            this.router.navigate(['']);
        }
    }

    login(loginEmail: string, loginPassword: string) {
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
        .catch(function(error){
            alert(`${error.message} Unable to login. Try Again!`);
        });
    }

    logout() {
        this.userLoggedIn = false;
        firebase.auth().signOut().then(function(){
            alert(`Logged Out Successfully!`);
        }, function(error) {
            alert(`${error.message} Unable to Logout. Try again!`);
        })
    }

}