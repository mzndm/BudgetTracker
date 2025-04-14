import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account} from "../shared/models";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiBasePath = '/api';

  constructor(
    private http: HttpClient,
    ) { }

  // #start Accounts

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiBasePath}/accounts`)
  }

  getAccount(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiBasePath}/accounts/${id}`)
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${this.apiBasePath}/accounts`, account)
  }

  updateAccount(account: Account): Observable<Account> {
    return this.http.put<Account>(`${this.apiBasePath}/accounts/${account.id}`, account)
  }

  deleteAccount(accountId: number): Observable<any> {
    return this.http.delete(`${this.apiBasePath}/accounts/${accountId}`)
  }

  // #end Accounts
}
