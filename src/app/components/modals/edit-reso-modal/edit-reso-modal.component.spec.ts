import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResoModalComponent } from './edit-reso-modal.component';

describe('EditResoModalComponent', () => {
  let component: EditResoModalComponent;
  let fixture: ComponentFixture<EditResoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditResoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
