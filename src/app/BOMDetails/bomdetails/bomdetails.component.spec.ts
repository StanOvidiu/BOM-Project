import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomdetailsComponent } from './bomdetails.component';

describe('BomdetailsComponent', () => {
  let component: BomdetailsComponent;
  let fixture: ComponentFixture<BomdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BomdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BomdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
