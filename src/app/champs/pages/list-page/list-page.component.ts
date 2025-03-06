import { Component } from '@angular/core';
import { Champ, Datum } from '../../interface/champ.interface';
import { ChampService } from '../../champ.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html'
})
export class ListPageComponent {
  public champs: Datum[] = [];

  constructor( private champsService: ChampService){}
 
  ngOnInit(): void {
    this.champsService.getChamps()
    .subscribe ( champ => this.champs = champ);
  }
}
