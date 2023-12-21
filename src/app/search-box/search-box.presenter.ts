import {Injectable} from "@angular/core";
import {debounceTime, distinctUntilChanged, Observable, Subject} from "rxjs";

@Injectable()
export class SearchBoxPresenter {
  public searchTerm$: Observable<string>;

  private searchTerm: Subject<string> = new Subject();

  constructor() {
    this.searchTerm$ = this.searchTerm.pipe(debounceTime(300), distinctUntilChanged());
  }

  search(term: string): void {
    this.searchTerm.next(term);
  }
}
