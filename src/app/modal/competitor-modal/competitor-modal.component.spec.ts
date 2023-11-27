import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorModalComponent } from './competitor-modal.component';

describe('CompetitorModalComponent', () => {
  let component: CompetitorModalComponent;
  let fixture: ComponentFixture<CompetitorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitorModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
