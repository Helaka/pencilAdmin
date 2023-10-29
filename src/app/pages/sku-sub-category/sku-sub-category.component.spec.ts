import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuSubCategoryComponent } from './sku-sub-category.component';

describe('SkuSubCategoryComponent', () => {
  let component: SkuSubCategoryComponent;
  let fixture: ComponentFixture<SkuSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkuSubCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkuSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
