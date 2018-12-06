import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'role'})
export class RolePipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'ROLE_ADMIN') {
      return 'Administrator';
    }
    if (value === 'ROLE_OFFICIAL') {
      return 'Official';
    }
    if (value === 'ROLE_PLAYER') {
      return 'Player';
    }
    return value;
  }
}
