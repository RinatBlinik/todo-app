import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from 'src/app/core/models/todo-item.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-active-items',
  templateUrl: './active-items.component.html',
  styleUrls: ['./active-items.component.css']
})
export class ActiveItemsComponent implements OnInit {
  listItems$!: Promise<TodoItem[]>;
  navParts: string[] = ['Active Items'];
  doneLoading:boolean=false;

  constructor(private data: DataService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.listItems$ = this.data.getActiveItems();
    await this.listItems$;
    this.doneLoading=true;
    } catch (error) {
      this.doneLoading=true;
    }
    
  }
  async markItemAsCompleted(item: TodoItem) {
    item.isCompleted = true;
    await this.data.markItemAsCompleted(item);
    this.listItems$ = this.data.getActiveItems();
  }
}
