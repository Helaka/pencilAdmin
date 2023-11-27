import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorDeleteModalComponent } from './competitor-delete-modal.component';

describe('CompetitorDeleteModalComponent', () => {
  let component: CompetitorDeleteModalComponent;
  let fixture: ComponentFixture<CompetitorDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitorDeleteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitorDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
