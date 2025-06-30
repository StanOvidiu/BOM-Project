import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BOMCreatePopUpComponent } from './bomcreate-pop-up.component';

describe('BOMCreatePopUpComponent', () => {
  let component: BOMCreatePopUpComponent;
  let fixture: ComponentFixture<BOMCreatePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BOMCreatePopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BOMCreatePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
