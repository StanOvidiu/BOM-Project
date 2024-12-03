import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubcategoryPopUpComponent } from './edit-subcategory-pop-up.component';

describe('EditSubcategoryPopUpComponent', () => {
  let component: EditSubcategoryPopUpComponent;
  let fixture: ComponentFixture<EditSubcategoryPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSubcategoryPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSubcategoryPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
