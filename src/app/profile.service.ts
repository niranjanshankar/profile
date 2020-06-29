import { Injectable } from '@angular/core';
import { InternalFormsSharedModule } from '@angular/forms/src/directives';

export interface IProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  age: number;
}

export interface IError {
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public user: IProfile;
  constructor() { }
  getProfileUser(): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user = {
            firstName: 'Michael',
            lastName: 'Collins',
            username: 'michael.collins',
            email: 'michael.collins@blueface.com',
            age: 30
          };
          resolve(this.user);
        } else {
          reject({ error: 'Profile not found' });
        }
      }, Math.random() * 5000);
    });
  }
  setName(newFirstName: string, newLastName: string): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user.firstName = newFirstName;
          this.user.lastName = newLastName;
          resolve(this.user);
        } else {
          reject({ error: 'Invalid name' });
        }
      }, Math.random() * 5000);
    });
  }

  // remove all special characters (including space) and number from first & last name using regex
  setEmail(firstName: string, lastName: string): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user.email = firstName.replace(/[^a-zA-Z]/g, '') + '.' + lastName.replace(/[^a-zA-Z]/g, '') + '@blueface.com';
          resolve(this.user);
        } else {
          reject({ error: 'Error on Email Generation' });
        }
      }, Math.random() * 5000);
    });
  }

}
