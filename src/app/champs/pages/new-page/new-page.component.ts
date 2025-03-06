import { Component, OnInit } from '@angular/core';
import { ChampService } from '../../champ.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Datum } from '../../interface/champ.interface';
import { ConfigDialogComponent } from '../../components/config-dialog/config-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
})
export class NewPageComponent implements OnInit{
  constructor(
    private champsService: ChampService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  public roles = [
    { id: 'Tanque', desc: 'Tanque' },
    { id: 'Mago', desc: 'Mago' },
    { id: 'Tirador', desc: 'Tirador' },
    { id: 'Luchador', desc: 'Luchador' },
    { id: 'Apoyo', desc: 'Apoyo' },
    { id: 'Control', desc: 'Control' },
  ]

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    //Si la URL no contiene edit salgo
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.champsService.getChampById(id))
        //Desectruturamos "params", solo necesitamos el "id"
      )
      .subscribe((champ) => {
        if (!champ) return this.router.navigateByUrl('/');
        //Si no viene "champ" retornamos a /
        const champAdaptado = {
          ...champ,
          abilities: champ.abilities?.join(', ') || '', // Convierte array a string separado por comas
        };
        this.champForm.reset(champAdaptado);
        console.log("aquie "  ,this.currentchamp);
        //Si devuelve "champ" completo el formulario con los datos
        return;
      });
  }

  public champForm = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl<string>('', { nonNullable: true }),
    abilities: new FormControl<string>(''),
    role: new FormControl<string>(''),
    description: new FormControl<string>(''),
    region: new FormControl<string>(''),
    imagen: new FormControl<string>(''),
  });

  get currentchamp(): Datum {
    const champ = this.champForm.value as Partial<Datum>;
    return {
      ...champ,
      abilities: champ.abilities
        ? String(champ.abilities).split(',').map(a => a.trim()) // Convertir a string antes de dividir
        : [], // Si es null/undefined, devuelve []
    } as Datum;
  }

  onSubmit(): void {
    const nuevoChamp = {
      "name": this.currentchamp.name,
      "role": this.currentchamp.role,
      "abilities": this.currentchamp.abilities || [],
      "region": this.currentchamp.region,
      "description": this.currentchamp.description,
      "imagen": this.currentchamp.imagen,
    }
    this.champsService.addChamp(nuevoChamp).subscribe((champ) => {
      this.showSnackbar(`${nuevoChamp.name} creado!`);
      this.router.navigate(['/champs/list', champ.id]);
    });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    });
  }

  onDeletechamp() {
    if (!this.currentchamp.id) throw Error('champ id is required');

    const dialogRef = this.dialog.open(ConfigDialogComponent, {
      data: { name: this.champForm.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.champsService
        .deleteChampById(this.currentchamp.id!)
        .subscribe((wasDeleted) => {
          if (wasDeleted) this.router.navigate(['/champs']);
        });
    });
  }
}
