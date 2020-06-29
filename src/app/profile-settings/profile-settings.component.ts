import { Component, OnInit } from '@angular/core';
import { IProfile, IError, ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  public title = 'Profile';
  public user: IProfile;

  public error: IError;
  public isError: boolean;
  public isLoading: boolean;
  public isSaving: boolean;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.isLoading = true;
    this.profileService.getProfileUser()
      .then(user => {
        this.user = { ...user };
        this.isLoading = false;
      })
      .catch(err => {
        this.error = err;
        this.isLoading = false;
        this.isError = true;
      });
  }

  // track change event of firstName in input field
  public firstNameChanged(newName: string): void {
    this.user.firstName = newName;
    this.isError = false;
  }

  // track change event of lastName in input field
  public lastNameChanged(newName: string): void {
    this.user.lastName = newName;
    this.isError = false;
  }

  saveProfile() {
    this.isError = false;
    this.isSaving = true;
    this.profileService.setName(this.user.firstName, this.user.lastName)
      .then(user => {
        this.user = { ...user };
        this.updateEmail(this.user);
      })
      .catch(err => {
        this.error = err;
        this.isSaving = false;
        this.isError = true;
      });
  }

  private updateEmail(user: IProfile): void {
    this.profileService.setEmail(user.firstName, user.lastName)
      .then(updatedUser => {
        this.isSaving = false;
        this.user = { ...updatedUser };
      })
      .catch(err => {
        this.error = err;
        this.isSaving = false;
        this.isError = true;
      });
  }

}
