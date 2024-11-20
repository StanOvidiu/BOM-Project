import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BOMPopUpComponent } from './bom-pop-up.component';

describe('BOMPopUpComponent', () => {
  let component: BOMPopUpComponent;
  let fixture: ComponentFixture<BOMPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BOMPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BOMPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
