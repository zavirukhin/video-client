import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  take,
} from 'rxjs';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [ButtonComponent],
  standalone: true,
})
export class SearchComponent implements OnInit {
  constructor(
    private router: Router,
    private acitvatedRoute: ActivatedRoute,
  ) {
    this.searchDebounce.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((search) => search.length >= 3),
    ).subscribe((search) => this.router.navigate([`search/${search}`]));
  }

  searchInputDefault = '';

  searchDebounce = new Subject<string>();

  ngOnInit() {
    this.acitvatedRoute.params.pipe(
      take(1),
    ).subscribe((params) => {
      this.searchInputDefault = params['request'] || '';
    });
  }

  searchInputHandler(event: KeyboardEvent) {
    const element = event.target as HTMLInputElement;
    this.searchDebounce.next(element.value);
  }
}
