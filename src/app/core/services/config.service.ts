import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  appName!:string;
  developerName!: string;
  baseUrl!: string;
  constructor() { }
}
