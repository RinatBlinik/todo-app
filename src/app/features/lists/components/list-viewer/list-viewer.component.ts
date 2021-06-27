import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { TodoList } from 'src/app/core/models/todo-list.model';
import { DataService } from 'src/app/core/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TodoItem } from 'src/app/core/models/todo-item.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { wordsValidator } from 'src/app/core/validators/general-validators';

@Component({
  selector: 'app-list-viewer',
  templateUrl: './list-viewer.component.html',
  styleUrls: ['./list-viewer.component.css']
})
export class ListViewerComponent implements OnInit {

  currentList$!: Observable<TodoList>;
  listItems$!: Observable<TodoItem[]>;
  navParts: string[] = ['Lists', ''];
  isError: boolean = false;
  err: string = "";
  showdeleteAlert: boolean = false;
  doDelete: boolean = false;
  formGroup!: FormGroup;
  doneLoading: boolean = false;
  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    try {

      let id = Number(this.route.snapshot.params['id']);
      let id$ = this.route.params.pipe(
        map(prms => Number(prms['id']))
      );
      let list: TodoList;
      if (id > 0) {
        this.currentList$ = id$.pipe(
          switchMap(id => this.data.getListById(id))
        );

        this.listItems$ = id$.pipe(
          switchMap(id => this.data.getAllItemsByListId(id))
        );
        this.currentList$.pipe(catchError(err => {
          this.doneLoading=true;
          return throwError(err);
        }))
        .subscribe(
          res => {},
          err => this.doneLoading=true,
          () => {});
      
        this.listItems$.pipe(catchError(err => {
          this.doneLoading=true;
          return throwError(err);
        }))
        .subscribe(
          res => {},
          err => this.doneLoading=true,
          () => {});
        this.formGroup = new FormGroup({
          caption: new FormControl('', [Validators.required, wordsValidator(3, 10)])
        });
        this.formGroup.reset();
      }
      else {
        this.doneLoading = true;
      }

    } catch (error) {
      this.doneLoading = true;
    } 
  }
  get(fieldName: string) {
    return this.formGroup.get(fieldName);
  }
  markItemAsCompleted(item: TodoItem) {
    try {

      item.isCompleted = true;
      this.data.markItemAsCompleted(item);
    } catch (error) {
      alert('Failed to mark item as completed');
      console.log(error);
    }
  }
  goToCreateList() {
    this.router.navigate(['lists', '-1', 'edit']);
  }
  goToListEdit(id: number) {
    this.router.navigate(['lists', id, 'edit']);
  }

  alertDelete() {
    this.showdeleteAlert = true;
  }
  cancelDelete() {
    this.showdeleteAlert = false;
  }

  async deleteList(list: TodoList) {
    this.showdeleteAlert = false;
    try {
      let res = await this.data.getAllItemsIdsByListId(list.id);
      for (const i of res) {
        await this.data.deleteItemById(i);
      }
      await this.data.deleteList(list);
      this.router.navigate(['home']);
    } catch (error) {
      this.isError = true;
      this.err = "error on delete"
    }


    //let res = await this.data.deleteItemsByListId(list).catch((err) => console.log(err));
    //await this.data.deleteList(list);
    //this.router.navigate(['home']);
  }

  async addItem(listId: number) {
    if (this.formGroup.invalid) return;
    let newItem: TodoItem = this.createNewItem(listId);
    newItem.listId = listId;
    let item = { ...newItem, ...this.formGroup.value };
    try {
      await this.data.addItem(item);
      let id$ = this.route.params.pipe(
        map(prms => Number(prms['id']))
      );
      this.listItems$ = id$.pipe(
        switchMap(id => this.data.getAllItemsByListId(id))
      );
      this.formGroup.reset();
    } catch (error) {
      alert('Failed to add item');
      console.log(error);
    }
  }

  createNewItem(listId: number): TodoItem {
    return {
      id: 0,
      caption: "",
      listId: listId,
      isCompleted: false
    }
  }
}
