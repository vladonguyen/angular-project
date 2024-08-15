import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';

import { Place } from './place.model';


@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces(){
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong fetching available places. '
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong fetching favourite places. '
    ).pipe(
      tap({
      next: (userPlaces)=> this.userPlaces.set(userPlaces),
    })
  );
  }

  addPlaceToUserPlaces(place: Place) {
    this.userPlaces.update(prevPlaces=> [...prevPlaces, place])
    return  this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id
    })
  }

  removeUserPlace(place: Place) {}

  private fetchPlaces(url: string, errorMessage: string) {
   return this.httpClient
      .get<{ places: Place[] }>(url)
      .pipe(
        map((resData) => resData.places), 
        catchError((error)=> {  
      console.log(error);

        return  throwError(
          ()=> 
          new Error(
            errorMessage
          )
        );
      })
    )
  }
}
