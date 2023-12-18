import {Injectable} from "@angular/core";
import {BehaviorSubject, debounceTime, distinctUntilChanged, Observable} from "rxjs";

@Injectable()
export class SearchBoxPresenter {
  public searchTerm$: Observable<string>;

  private searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {
    this.searchTerm$ = this.searchTerm.pipe(debounceTime(300), distinctUntilChanged());
  }

  search(term: string): void {
    this.searchTerm.next(term);
  }
}
