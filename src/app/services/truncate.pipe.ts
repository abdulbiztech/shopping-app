import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, words: number): string {
    if (!value) return '';

    const truncatedWords = value.split(' ').slice(0, words).join(' ');
    return truncatedWords + (value.split(' ').length > words ? '...' : '');
  }
}
