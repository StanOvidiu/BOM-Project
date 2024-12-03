import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryPopUpComponent } from './subcategory-pop-up.component';

describe('SubcategoryPopUpComponent', () => {
  let component: SubcategoryPopUpComponent;
  let fixture: ComponentFixture<SubcategoryPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoryPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubcategoryPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
