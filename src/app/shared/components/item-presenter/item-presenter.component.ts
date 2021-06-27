import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-presenter',
  templateUrl: './item-presenter.component.html',
  styleUrls: ['./item-presenter.component.css']
})
export class ItemPresenterComponent implements OnInit {

  @Input()
  caption:string='';

  @Input()
  isCompleted:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

}
