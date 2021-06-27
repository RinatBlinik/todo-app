import { Component, Input, OnInit } from '@angular/core';
import { TodoList } from 'src/app/core/models/todo-list.model';

@Component({
  selector: 'app-list-box',
  templateUrl: './list-box.component.html',
  styleUrls: ['./list-box.component.css']
})
export class ListBoxComponent implements OnInit {

  @Input()
  caption:string='';

  @Input()
  color:string='black';

  @Input()
  bgColorClass:string='white';

  @Input()
  icon:string='';

  constructor() { }

  ngOnInit(): void {
  }

}
