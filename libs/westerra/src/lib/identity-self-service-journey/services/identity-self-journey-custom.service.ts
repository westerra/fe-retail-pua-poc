import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdentitySelfJourneyCustomService {
  constructor() {}

  updatedAddressType(type: string) {
    let typeUpdated = type;

    switch (typeUpdated.toLowerCase()) {
      case 'residential':
      case 'home':
        typeUpdated = 'Home';
        break;
      case 'pobox':
      case 'mailing':
        typeUpdated = 'Mailing';
        break;
    }

    return typeUpdated;
  }
}
