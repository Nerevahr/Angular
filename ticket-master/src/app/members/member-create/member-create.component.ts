import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MemberListService } from './../../shared/services/member-list.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Member } from 'src/app/shared/models/member.model';


@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.scss']
})
export class MemberCreateComponent implements OnInit {

  public memberForm: FormGroup;

  public fetched : boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private memberListService: MemberListService,
    private http: HttpClient
  ) { console.log(this.fetched);
   }

  ngOnInit(): void {
    this.memberForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      role: ['', Validators.required]
    }, {
      updateOn: "submit"
    });

  }

  public create(): void {

    if (this.memberForm.valid) {

      this.fetched = true;

      this.memberListService.post({
        id: this.memberListService.getMemberList().length + 1,
        firstName: this.memberForm.controls.firstName.value,
        lastName: this.memberForm.controls.lastName.value,
        role: this.memberForm.controls.role.value
      }).subscribe(
        (data: Member[]) => {
          //console.log(data);
          this.fetched = false
          this.router.navigate(["members"]);
        },
        (error: HttpErrorResponse) => {
          //console.log(error);
          this.fetched = false
        }
      );
      //this.router.navigate(["members"]);
    }
  }

  


}
