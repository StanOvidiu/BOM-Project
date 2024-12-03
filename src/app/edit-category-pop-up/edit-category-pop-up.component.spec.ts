import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryPopUpComponent } from './edit-category-pop-up.component';

describe('EditCategoryPopUpComponent', () => {
  let component: EditCategoryPopUpComponent;
  let fixture: ComponentFixture<EditCategoryPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCategoryPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCategoryPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
