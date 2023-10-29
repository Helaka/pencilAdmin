import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StallListsComponent } from './stall-lists.component';

describe('StallListsComponent', () => {
  let component: StallListsComponent;
  let fixture: ComponentFixture<StallListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StallListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StallListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
