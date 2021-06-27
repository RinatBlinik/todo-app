import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-presenter',
  templateUrl: './navigation-presenter.component.html',
  styleUrls: ['./navigation-presenter.component.css']
})
export class NavigationPresenterComponent implements OnInit {

  @Input()
  navParts:string[] = [];
  navPartsStr!:string;
  constructor() { }

  ngOnInit(): void {
    this.navPartsStr= this.navParts.join(' > ');
  }

}
