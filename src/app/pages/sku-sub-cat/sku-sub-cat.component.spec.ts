import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuSubCatComponent } from './sku-sub-cat.component';

describe('SkuSubCatComponent', () => {
  let component: SkuSubCatComponent;
  let fixture: ComponentFixture<SkuSubCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkuSubCatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkuSubCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
