import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitDeleteModalComponent } from './visit-delete-modal.component';

describe('VisitDeleteModalComponent', () => {
  let component: VisitDeleteModalComponent;
  let fixture: ComponentFixture<VisitDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitDeleteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
