import { Pipe, PipeTransform } from '@angular/core';
import { SortBy, SortDirection } from 'src/app/core/models/sort.model';
import { Video } from '../models/video.model';

@Pipe({
  name: 'sort',
  pure: false,
})
export class SortPipe implements PipeTransform {
  private sortByDate(array: Video[]) {
    return array.sort((a, b) => {
      const d1 = new Date(a.publishedAt).getTime();
      const d2 = new Date(b.publishedAt).getTime();
      return d2 - d1;
    });
  }

  private sortByViewers(array: Video[]) {
    return array.sort((a, b) => Number(b.viewCount) - Number(a.viewCount));
  }

  private sortByKeyword(array: Video[], compare: string) {
    if (compare !== '') {
      return array
        .filter((v) => v.tags?.some((k) => k.includes(compare.toLocaleLowerCase())));
    }
    return array;
  }

  transform(value: Video[], arg: SortBy): Video[] {
    const valueCopy: Video[] = this.sortByKeyword(structuredClone(value), arg.keyword);
    if (arg.date !== SortDirection.none) {
      if (arg.date === SortDirection.desc) return this.sortByDate(valueCopy);
      return this.sortByDate(valueCopy).reverse();
    }

    if (arg.viewers !== SortDirection.none) {
      if (arg.viewers === SortDirection.desc) return this.sortByViewers(valueCopy);
      return this.sortByViewers(valueCopy).reverse();
    }

    return valueCopy;
  }
}
