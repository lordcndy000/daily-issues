import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIssueModalComponent } from './delete-issue-modal.component';

describe('DeleteIssueModalComponent', () => {
  let component: DeleteIssueModalComponent;
  let fixture: ComponentFixture<DeleteIssueModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteIssueModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteIssueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
