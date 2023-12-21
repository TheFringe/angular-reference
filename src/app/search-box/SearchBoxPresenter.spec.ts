import {TestBed, waitForAsync} from "@angular/core/testing";
import {SearchBoxPresenter} from "./search-box.presenter";

describe('SearchBoxPresenter', () => {
  let service: SearchBoxPresenter;

  beforeEach(async () => {
    const module = TestBed.configureTestingModule({
      providers: [SearchBoxPresenter],
    });

    service = module.inject<SearchBoxPresenter>(SearchBoxPresenter);
  });

  it('Testing search functionality', async () => {
    const searchTerm = 'test';

    // First we spy on the next method of the searchTerm BehaviorSubject. This allows us to check whether it gets called during the test.
    const nextSpy = jest.spyOn(service['searchTerm'], 'next');

    // Call the search method with the test searchTerm
    service.search(searchTerm);

    // We then expect that the next method has been called with the test searchTerm
    expect(nextSpy).toBeCalledWith(searchTerm);
  });

  it('Testing searchTerm$ observable functionality', waitForAsync(() => {
    const searchTerm = 'test';
    service.search(searchTerm);

    // subscribe to the searchTerm$ Observable and check the received value
    let actual = '';
    service.searchTerm$.subscribe(value => actual = value);

  }));
});
