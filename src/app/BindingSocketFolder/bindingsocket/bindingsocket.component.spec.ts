import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BindingsocketComponent } from './bindingsocket.component';

describe('BindingsocketComponent', () => {
  let component: BindingsocketComponent;
  let fixture: ComponentFixture<BindingsocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BindingsocketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BindingsocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
