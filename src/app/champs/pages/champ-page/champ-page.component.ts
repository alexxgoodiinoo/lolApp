import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Datum } from '../../interface/champ.interface';
import { ChampService } from '../../champ.service';

@Component({
  selector: 'app-champ-page',
  templateUrl: './champ-page.component.html',
  styles: ``
})
export class ChampPageComponent implements OnInit{
  public champ?: Datum;
  constructor(
    private champService: ChampService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(3000),
        switchMap(( { id } ) => this.champService.getChampById( id ))
      )
      .subscribe( champ => {
        if (!champ )return this.router.navigate([ '/champ/list' ]);
        // this.champ = champ;
        console.log(champ);
        return;
      })
  }

  goList():void{
    this.router.navigateByUrl('champ/list')
  }
}