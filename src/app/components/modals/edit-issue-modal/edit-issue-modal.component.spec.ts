import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIssueModalComponent } from './edit-issue-modal.component';

describe('EditIssueModalComponent', () => {
  let component: EditIssueModalComponent;
  let fixture: ComponentFixture<EditIssueModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIssueModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIssueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
