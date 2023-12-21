import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchBoxPresenter} from "./search-box.presenter";

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  viewProviders: [SearchBoxPresenter]
})
export class SearchBoxComponent {
  @Output() search = new EventEmitter<string>();

  constructor(private presenter: SearchBoxPresenter) {
    this.presenter.searchTerm$.subscribe(value => this.search.emit(value));
  }

  onSearchTermChange(term: string): void {
      this.presenter.search(term);
  }
}
