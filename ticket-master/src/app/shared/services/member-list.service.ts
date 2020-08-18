import { Injectable } from '@angular/core';

import { Member } from '../models/member.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jsonbin } from "./../../../environments/jsonbin";
import { map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class MemberListService {

  constructor(private http: HttpClient){ }

  private memberList: Member[] = [];

  
  public get(): Observable<Member[]>  {
    const url = jsonbin.bins.members;
    const options = {
      headers: new HttpHeaders(jsonbin.headers)
    }
    return this.http.get<Member[]>(url, options)
    .pipe(
      tap(memberList => {
        this.memberList = memberList;
        })
    )
    
  }

  public post(member: Member): Observable<Member[]> {
    const url = jsonbin.bins.members;
    const options = {
      headers: new HttpHeaders(jsonbin.headers)
    }
    
    this.memberList.push(member);
    return this.http.put<Member[]>(url, this.memberList, options)
    
  }
  
  
  public delete(member: Member): Member {
      this.memberList.splice(
        this.memberList.indexOf(member),
        1
      );
      return member;
    }
  

  public getMemberList(): Member[]{
    return this.memberList
  }

  public getById(id: number): Member | null {
    return this.memberList.find(member => id === member.id)
  }

  

}
