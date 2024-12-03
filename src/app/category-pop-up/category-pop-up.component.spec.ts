import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPopUpComponent } from './category-pop-up.component';

describe('CategoryPopUpComponent', () => {
  let component: CategoryPopUpComponent;
  let fixture: ComponentFixture<CategoryPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
