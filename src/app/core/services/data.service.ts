import { Injectable } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';
import { HttpClient } from '@angular/common/http';
import { TodoList } from '../models/todo-list.model';
import { filter, first, map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //readonly baseUrl: string = 'http://localhost:3000';
  //readonly baseUrl: string = 'http://localhost:49163/api';
  //readonly baseUrl: string = 'http://localhost:5000/api';
  readonly baseUrl!: string ;

  constructor(private configService:ConfigService, private http: HttpClient) {
    this.baseUrl = this.configService.baseUrl;
   }

  getAllItems(): Promise<TodoItem[]> {
    const url = `${this.baseUrl}/items`;

    return this.http
      .get<TodoItem[]>(url)
      .toPromise();
  }
  getAllItemsByListId(listId: number): Promise<TodoItem[]> {
    const url = `${this.baseUrl}/items?listId=${listId}`;

    return this.http
      .get<TodoItem[]>(url)
      .toPromise();
  }
  getAllItemsIdsByListId(listId: number): Promise<number[]> {
    const url = `${this.baseUrl}/items?listId=${listId}`;

    return this.http
      .get<TodoItem[]>(url)
      .pipe(map(items => items.map(it => it.id)))
      .toPromise();
  }

  getActiveItems(): Promise<TodoItem[]> {
    const url = `${this.baseUrl}/items`;

    return this.http
      .get<TodoItem[]>(url)
      .pipe(map(items => items.filter(i => !i.isCompleted)))
      .toPromise();
  }

  async getAllLists(): Promise<TodoList[]> {
    const url = `${this.baseUrl}/lists`;
return this.http
.get<TodoList[]>(url).toPromise();
  }

  getListscount(): Promise<number> {
    const url = `${this.baseUrl}/lists`;

    return this.http
      .get<TodoList[]>(url)
      .pipe(map(lists => lists.length))
      .toPromise();
  }

  getAllItemsCount(): Promise<number> {
    const url = `${this.baseUrl}/items`;

    return this.http
      .get<TodoItem[]>(url)
      .pipe(map(lists => lists.length))
      .toPromise();
  }
  getActiveItemsCount(): Promise<number> {
    const url = `${this.baseUrl}/items`;

    return this.http
      .get<TodoItem[]>(url)
      .pipe(
        map(items => items.filter(i => !i.isCompleted)),
        map(lists => lists.length))
      .toPromise();
  }

  getAllCounters(): Promise<[number, number, number]> {
    return combineLatest([this.getListscount(), this.getAllItemsCount(), this.getActiveItemsCount()])
      .toPromise();
  }
  getListById(id: number): Promise<TodoList> {
    const url = `${this.baseUrl}/lists/${id}`;

    return this.http
      .get<TodoList>(url)
      .toPromise();
  }

  updateList(list: TodoList): Promise<TodoList> {
    const url = `${this.baseUrl}/lists/${list.id}`;
    return this.http.put<TodoList>(url, list).toPromise();

  }

  createNewist(list: TodoList): Promise<TodoList> {
    const url = `${this.baseUrl}/lists`;
    return this.http.post<TodoList>(url, list).toPromise();

  }

  addItem(item:TodoItem):Promise<TodoItem> {
    const url = `${this.baseUrl}/items`;
    return this.http.post<TodoItem>(url, item).toPromise();
  }

  deleteItemById(id: number) {
    const url = `${this.baseUrl}/items/${id}`;
    return this.http.delete(url);
  }

  deleteList(list: TodoList): Promise<TodoList> {
    const url = `${this.baseUrl}/lists/${list.id}`;
    return this.http.delete<TodoList>(url).toPromise();
  }
  deleteItemsByListId(list: TodoList): Promise<TodoItem[]> {
    const urlItems = `${this.baseUrl}/items?listId=${list.id}`;
    return this.http.delete<TodoItem[]>(urlItems)
      .toPromise().then(res => {
        console.log(res);
        return res
      });
  }


  markItemAsCompleted(item: TodoItem): Promise<TodoItem> {
    const url = `${this.baseUrl}/items/${item.id}`;
    return this.http.put<TodoItem>(url, item).toPromise();
  }

}
