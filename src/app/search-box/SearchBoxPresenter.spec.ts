import {TestBed} from '@angular/core/testing';
import {SearchBoxPresenter} from './search-box.presenter';
import {BehaviorSubject} from 'rxjs';

describe('SearchBoxPresenter', () => {
  let presenter: SearchBoxPresenter;
  let nextSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchBoxPresenter]
    });

    presenter = TestBed.inject(SearchBoxPresenter);

    // spy on BehaviorSubject's next method
    nextSpy = spyOn(BehaviorSubject.prototype, 'next');
  });

  /**
  * Testing search function that triggers the BehaviorSubjects next method
  * with given search term
  */
  it('should trigger search term update', () => {
    const searchTerm = 'Test';
    presenter.search(searchTerm);
    expect(nextSpy).toHaveBeenCalledWith(searchTerm);
  });

  /**
  * Testing if searchTerm$ Observable is correctly initialized and picking up values.
  */
  it('searchTerm$ should receive the correct value', (done) => {
    presenter.searchTerm$.subscribe(value => {
      expect(value).toEqual('Test');
      done();
    });

    presenter.search('Test');
    });
});
