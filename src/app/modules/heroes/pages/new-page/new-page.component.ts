import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css'],
})
export class NewPageComponent {
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_image: new FormControl(''),
  });
  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  constructor(private heroesService: HeroesService) {}

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    console.log(hero);
    return hero;
  }

  public onSubmit(): void {
    if(this.heroForm.invalid) return;
    if( this.currentHero.id ){
      this.heroesService.updateHero( this.currentHero )
        .subscribe(hero => {
          //TODO Mostrar snackbar
        });
      return;
    }

    this.heroesService.addHero( this.currentHero )
      .subscribe(hero => {
        //TODO Mostrar snackbar y navegar a /heroes/edit/hero.id
      })
  }
}
