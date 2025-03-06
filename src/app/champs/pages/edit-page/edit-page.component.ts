import { Component, OnInit } from '@angular/core';
import { ChampService } from '../../champ.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Champ, Datum } from '../../interface/champ.interface';
import { ConfigDialogComponent } from '../../components/config-dialog/config-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'selector-name',
  templateUrl: 'edit-page.component.html',
})
export class EditPageComponent implements OnInit {
  public currentChamp?: Datum;
  public updatedChamp?: Datum;
  public champForm!: FormGroup;

  public roles = [
    { id: 'Tanque', desc: 'Tanque' },
    { id: 'Mago', desc: 'Mago' },
    { id: 'Tirador', desc: 'Tirador' },
    { id: 'Luchador', desc: 'Luchador' },
    { id: 'Apoyo', desc: 'Apoyo' },
    { id: 'Control', desc: 'Control' },
  ];

  constructor(
    private fb: FormBuilder,
    private champsService: ChampService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.champForm = this.fb.group({
      name: ['', Validators.required],
      abilities: ['', Validators.required],
      role: ['', Validators.required],
      region: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.champsService.getChampById(id)))
      .subscribe((champ) => {
        this.currentChamp = champ;
        this.champForm.reset(champ);
        console.log("aqui ",this.currentChamp);
      });
  }

  onSubmit() {
    if (this.champForm.invalid) return;
    if (this.currentChamp?.id) {
      this.updatedChamp = this.champForm.value;
      this.champsService
        .updateChamp(this.currentChamp?.id, this.updatedChamp!)
        .subscribe((champ) => {
          this.snackbar.open(`${this.currentChamp?.name} actualizado!`);
        });
      return;
    }
  }

  onDeleteChamp() {
    if (!this.currentChamp?.id) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfigDialogComponent, {
      data: { name: this.champForm.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.champsService
        .deleteChampById(this.currentChamp?.id!)
        .subscribe((wasDeleted) => {
          if (wasDeleted) this.router.navigate(['/champs']);
        });
    });
  }
}
