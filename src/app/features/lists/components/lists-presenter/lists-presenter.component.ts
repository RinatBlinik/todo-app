import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TodoList } from 'src/app/core/models/todo-list.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-lists-presenter',
  templateUrl: './lists-presenter.component.html',
  styleUrls: ['./lists-presenter.component.css']
})
export class ListsPresenterComponent implements OnInit {
  lists$!: Promise<TodoList[]>;
  navParts: string[] = ['Todo List'];
  doneLoading: boolean = false;
  newList: TodoList = {
    id: 0,
    caption: 'new...',
    description: '',
    icon: 'library_add',
    color: 'white'
  };
  constructor(private data: DataService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    try {
      this.lists$ = this.data.getAllLists();
      await this.lists$;
      this.doneLoading = true;
    } catch (error) {
      this.doneLoading = true;
    }

  }
  goToCreateList() {
    this.router.navigate(['lists', '-1', 'edit']);
  }
  goToListViewer(id: number) {
    this.router.navigate(['lists', id]);
  }
}
