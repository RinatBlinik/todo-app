import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoList } from 'src/app/core/models/todo-list.model';
import { first, map, switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/core/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StyleService } from 'src/app/core/services/style.service';
import { wordsValidator } from 'src/app/core/validators/general-validators';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {
  form!: FormGroup;
  initialList!: TodoList
  initialList$!: Observable<TodoList>;
  initialcolor!: string;
  colors$!: Promise<string[]>;
  icons$!: Promise<string[]>;
  navParts: string[] = ['Edit Todo List Details']
  id!: number;
  doneLoading: boolean = false;

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private styleService: StyleService
  ) { }


  async ngOnInit(): Promise<void> {

    this.colors$ = this.styleService.getColors();
    this.icons$ = this.styleService.getIcons();

    await this.init();
    this.buildForm();


  }

  async init() {
    try {
      this.id = Number(this.route.snapshot.params['id']);
      if (isNaN(this.id) || (this.id <= 0 && this.id !== -1)) {
        this.router.navigate(['**']);
      }
      let id$ = this.route.params.pipe(
        map(prms => Number(prms['id']))
      );
      let list: TodoList;
      if (this.id > 0) {
        this.initialList$ = id$.pipe(
          switchMap(id => this.data.getListById(id))
        );
        this.initialList = await this.initialList$
          .pipe(first()).toPromise()
      }
      else {
        this.doneLoading=true;
      }

    } catch (error) {
      //this.alertError(error);
      this.doneLoading = true;
    }
  }


  buildForm() {

    this.form = new FormGroup({
      caption: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, wordsValidator(10, 30)]),
      icon: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required])
    });
    this.initialcolor = this.initialList.color;
    this.form.reset(this.initialList);
  }

  get(fieldName: string) {
    return this.form.get(fieldName);
  }
  colorChanged(color: string) {
    this.initialcolor = color;
  }
  async savelist() {

    if (this.form.invalid) return;
    let idStr: string = this.route.snapshot.params['id'];
    try {
      let id = Number(idStr);
      let resp: TodoList;
      if (id > 0) {
        let initialList: TodoList = this.createEmptyList();
        initialList.id = id;
        let list = { ...initialList, ...this.form.value };
        resp = await this.data.updateList(list);
      }
      else {
        let initialList: TodoList = this.createEmptyList();
        let list = { ...initialList, ...this.form.value };
        resp = await this.data.createNewist(list);
      }
      this.router.navigate(['lists', resp.id]);
    } catch (error) {
      this.alertError(error);
    }


  }


  createEmptyList(): TodoList {
    return {
      id: 0,
      caption: '',
      description: '',
      icon: '',
      color: ''
    }
  }

  alertError(error: any) {
    let errStatus = error.status;
    if (typeof (errStatus) === 'number') {
      if (errStatus === 404){
        this.router.navigate(['**']);
        return;
      }  
    }
    
      let errMsg: string;
      if (typeof (error.message) === 'string') {
        errMsg = error.message;
        alert(errMsg);
      }
      else
        alert('Unknown error!');
  }

}
