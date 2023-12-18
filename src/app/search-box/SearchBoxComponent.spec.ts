import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import {SearchBoxPresenter} from "./search-box.presenter";
import {SearchBoxComponent} from "./search-box.component";

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let presenterMock: jasmine.SpyObj<SearchBoxPresenter>;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(() => {
    presenterMock = jasmine.createSpyObj('SearchBoxPresenter', ['search']);
    presenterMock.searchTerm$ = of('');

    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [SearchBoxComponent],
      providers: [{ provide: SearchBoxPresenter, useValue: presenterMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event when search term changes', () => {
    const emitSpy = spyOn(component.search, 'emit');
    const term = 'testing';
    presenterMock.searchTerm$ = of(term);

    component.onSearchTermChange(term);

    expect(presenterMock.search).toHaveBeenCalledWith(term);
    expect(emitSpy).toHaveBeenCalledWith(term);
  });

  it('should call SearchBoxPresenter.search method when search term changes', () => {
    const term = 'testing';
    component.onSearchTermChange(term);
    expect(presenterMock.search).toHaveBeenCalledWith(term);
  });
});

describe('SearchBoxPresenter', () => {
  let presenter: SearchBoxPresenter;

  beforeEach(() => {
    presenter = new SearchBoxPresenter();
  });

  it('should create presenter', () => {
    expect(presenter).toBeTruthy();
  });

  it("should update searchTerm$ when calling search", (done) => {
    const term = "test";

    presenter.search(term);

    presenter.searchTerm$.subscribe(value => {
      expect(value).toBe(term);
      done();
    });

  });
});
