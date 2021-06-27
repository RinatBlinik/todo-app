import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ListsGuard implements CanActivate {

  constructor(
    private data: DataService,
    private router: Router) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<true | UrlTree> {
    console.log('Guard is checking if there are any lists');
    try {
      let listsIsEmpty = (await this.data.getListscount()) === 0;
      if (!listsIsEmpty) return true;
      //no list found -> route to new list page
      return this.router.parseUrl('lists/-1/edit');
    } catch (error) {
      return true;
    }
  }

}
