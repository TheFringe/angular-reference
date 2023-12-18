import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchBoxComponent} from './search-box.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SearchBoxPresenter} from "./search-box.presenter";

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let presenter: SearchBoxPresenter;

  beforeEach(async () => {
    presenter = new SearchBoxPresenter();
    await TestBed.configureTestingModule({
      imports: [ CommonModule, FormsModule ],
      declarations: [ SearchBoxComponent ],
      providers: [ { provide: SearchBoxPresenter, useValue: presenter } ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search term when onSearchTermChange is called', () => {
    const spy = jest.spyOn(presenter, 'search');
    const searchTerm = 'Test';
    component.onSearchTermChange(searchTerm);
    expect(spy).toHaveBeenCalledWith(searchTerm);
  });

  it('should emit event when presenter searchTerm$ emits', () => {
    const spy = jest.spyOn(component.search, 'emit');
    const searchTerm = 'Test';
    component.onSearchTermChange(searchTerm);
    expect(spy).toHaveBeenCalledWith(searchTerm);
  });
});
