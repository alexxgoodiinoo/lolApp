import { Pipe, PipeTransform } from '@angular/core';
import { Datum } from '../interface/champ.interface';

@Pipe({
  name: 'champImage'
})
export class ChampImagePipe implements PipeTransform {

  transform(champ: Datum): string {
    if (!champ?.imagen) {
      return 'no-image.png';
    }

    return champ.imagen;
  }

}
