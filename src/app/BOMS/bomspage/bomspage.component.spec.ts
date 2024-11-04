import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomspageComponent } from './bomspage.component';

describe('BomspageComponent', () => {
  let component: BomspageComponent;
  let fixture: ComponentFixture<BomspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BomspageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BomspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
