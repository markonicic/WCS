import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/@shared/interfaces/user.model';
import { Observable, of } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  username: string;
  password: string;
  role: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  users: User[];
  constructor(private credentialsService: CredentialsService, private http: HttpClient) {
    this.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call

    const data = {
      username: context.username,
      role: context.role,
      token: '123456',
    };
    this.credentialsService.setCredentials(data, context.remember);
    return of(data);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }
}
