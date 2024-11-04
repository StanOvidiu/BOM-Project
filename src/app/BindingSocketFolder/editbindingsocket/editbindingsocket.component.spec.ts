import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbindingsocketComponent } from './editbindingsocket.component';

describe('EditbindingsocketComponent', () => {
  let component: EditbindingsocketComponent;
  let fixture: ComponentFixture<EditbindingsocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditbindingsocketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditbindingsocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
