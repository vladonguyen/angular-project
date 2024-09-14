import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "./user.model";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}


@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new Subject<User>();

    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }

        )
            .pipe(catchError(this.handleError),
            tap(resData => {
                this.handleAuthentification(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    Number(resData.expiresIn))
            }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
            {
                email,
                password,
                returnSecureToken: true
            }
        )
            .pipe(catchError(this.handleError), 
            tap(resData => {
                this.handleAuthentification(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    Number(resData.expiresIn))
            }),  tap(resData => {
                this.handleAuthentification(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    Number(resData.expiresIn))
            }));
    }

    private handleAuthentification(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email,
            userId,
            token,
            expirationDate);
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct!';
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'Invalid username or password!';
        }
        return throwError(errorMessage);
    }
}