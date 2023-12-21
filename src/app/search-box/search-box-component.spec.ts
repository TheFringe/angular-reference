import {fakeAsync} from '@angular/core/testing';
import {SearchBoxComponent} from './search-box.component';
import {createComponentFactory, Spectator} from "@ngneat/spectator/jest";

describe('SearchBoxComponent', () => {
  let spectator: Spectator<SearchBoxComponent>;
  const createComponent = createComponentFactory(SearchBoxComponent);
  beforeEach(() => spectator = createComponent());

  it('should emit event when presenter searchTerm$ emits', fakeAsync(() => {
    const keyupSpy = jest.spyOn(spectator.component, 'onSearchTermChange');
    let searchTerm = '';

    spectator.output('search').subscribe(res => searchTerm = res as string);

    const input = spectator.element.querySelector('input') as HTMLInputElement;
    input.value = 'searchTerm';
    input.dispatchEvent(new Event('keyup'));
    spectator.tick(300);

    expect(keyupSpy).toHaveBeenCalledWith('searchTerm')
    expect(searchTerm).toBe('searchTerm');
  }));
});
