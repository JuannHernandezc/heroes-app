import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, catchError, of, map} from 'rxjs';

import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;
  constructor( private httpClient: HttpClient ) { }

  public getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  public heroById(id: string): Observable<Hero | undefined> {
    return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError( error => of(undefined))
      )
  }

  public getSuggestions(query: string): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&limit=6`);
  }

  public addHero(hero: Hero): Observable<Hero>{
    return this.httpClient.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  public updateHero(hero: Hero): Observable<Hero>{
    if(!hero.id) throw Error('Hero id is required');
    return this.httpClient.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  public deleteHero(id: string): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/heroes/${ id }`)
      .pipe(
        catchError(error => of(false) ),
        map(res => true)
      )
  }
}
