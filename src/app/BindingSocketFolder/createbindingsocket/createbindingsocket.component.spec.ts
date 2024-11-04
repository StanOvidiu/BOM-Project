import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebindingsocketComponent } from './createbindingsocket.component';

describe('CreatebindingsocketComponent', () => {
  let component: CreatebindingsocketComponent;
  let fixture: ComponentFixture<CreatebindingsocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatebindingsocketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatebindingsocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
