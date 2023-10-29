import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuDeleteModalComponent } from './sku-delete-modal.component';

describe('SkuDeleteModalComponent', () => {
  let component: SkuDeleteModalComponent;
  let fixture: ComponentFixture<SkuDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkuDeleteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkuDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
