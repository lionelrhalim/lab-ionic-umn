import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _userIsAuthenticaed = true;

    constructor() { }

    get userIsAuthenticated() {
        return this._userIsAuthenticaed;
    }

    login() {
        this._userIsAuthenticaed = true;
    }

    logout() {
        this._userIsAuthenticaed = false;
    }
}
