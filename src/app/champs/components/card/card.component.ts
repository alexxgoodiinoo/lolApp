import { Component, Input, OnInit } from '@angular/core';
import { Datum } from '../../interface/champ.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit{
  @Input()
  public champ!: Datum;

  ngOnInit(): void{
    if(!this.champ) throw Error('Champ property is required')
  }
}
