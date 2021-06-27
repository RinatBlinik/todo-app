import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { Colors } from '../models/color.model';
import { Icons } from '../models/icons.model';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  constructor() { }

getColors():Promise<string[]> {
  return from([Colors]).toPromise();
}
getIcons():Promise<string[]> {
  return from([Icons]).toPromise();
}

}
