import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersContactComponent } from './suppliers-contact.component';

describe('SuppliersContactComponent', () => {
  let component: SuppliersContactComponent;
  let fixture: ComponentFixture<SuppliersContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuppliersContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
