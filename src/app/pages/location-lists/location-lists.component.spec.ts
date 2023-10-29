import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationListsComponent } from './location-lists.component';

describe('LocationListsComponent', () => {
  let component: LocationListsComponent;
  let fixture: ComponentFixture<LocationListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
