import { Component } from '@angular/core';

import { MemberListService } from 'src/app/shared/services/member-list.service';
import { Member } from 'src/app/shared/models/member.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent {

  public memberList: Member[] = [];

  fetching: boolean = false;

  constructor(
    private memberListService: MemberListService) { }

  ngOnInit(){

    this.fetching = true;

    this.memberListService.get().subscribe(
      (memberList: Member[]) => {
        this.memberList = memberList;
        this.fetching = false;
      },
      (error: HttpErrorResponse) => {
        this.fetching = false;
      }
    );
  }
  

}
