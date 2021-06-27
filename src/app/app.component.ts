import { Component, OnInit } from '@angular/core';
import { config } from 'rxjs';
import { ConfigService } from './core/services/config.service';
import { StyleService } from './core/services/style.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'todo-app';
 header!:string;
  constructor(private configService:ConfigService) {   
  }
  ngOnInit(): void {
    this.header = this.configService.appName;
  }

}
