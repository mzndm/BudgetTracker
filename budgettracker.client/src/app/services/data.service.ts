import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account, Category, MonobankAccount, MonobankTransaction, Transaction, TransactionHttpParams, UserProfile} from "../shared/models";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiBasePath = `${environment.appUrl}/api`;

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

  // #start Categories

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiBasePath}/categories`)
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiBasePath}/categories/${id}`)
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiBasePath}/categories`, category)
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiBasePath}/categories/${category.id}`, category)
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${this.apiBasePath}/categories/${categoryId}`)
  }

  // #end Categories

  // #start Transactions

  getTransactions(params?: TransactionHttpParams | any): Observable<Transaction[]> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get<Transaction[]>(`${this.apiBasePath}/transactions`, { params: httpParams })
  }

  getTransaction(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiBasePath}/transactions/${id}`)
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiBasePath}/transactions`, transaction)
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiBasePath}/transactions/${transaction.id}`, transaction)
  }

  deleteTransaction(transactionId: number): Observable<any> {
    return this.http.delete(`${this.apiBasePath}/transactions/${transactionId}`)
  }

  // #end Transactions

  // #start UserProfile
  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiBasePath}/UserProfiles`)
  }

  updateUserProfile(user: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiBasePath}/UserProfiles/${user.id}`, user)
  }

  // #end UserProfile

  getMonobankAccounts(): Observable<MonobankAccount[]> {
    return this.http.get<MonobankAccount[]>(`${this.apiBasePath}/monobank/accounts`)
  }  

  getMonobankAccount(id: string): Observable<MonobankAccount> {
    return this.http.get<MonobankAccount>(`${this.apiBasePath}/monobank/account/${id}`)
  }

  syncMonobankAccounts(): Observable<any> {
    return this.http.post(`${this.apiBasePath}/monobank/sync-accounts`, null)
  }

  getMonobankTransactions(params?: TransactionHttpParams | any): Observable<MonobankTransaction[]> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get<MonobankTransaction[]>(`${this.apiBasePath}/monobank/statement`, { params: httpParams })
  }

  syncMonobankTransactions(params?: TransactionHttpParams | any): Observable<any> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.post(`${this.apiBasePath}/monobank/sync-transactions`, null, { params: httpParams })
  }
}
