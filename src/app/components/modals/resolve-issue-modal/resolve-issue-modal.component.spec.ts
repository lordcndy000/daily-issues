import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveIssueModalComponent } from './resolve-issue-modal.component';

describe('ResolveIssueModalComponent', () => {
  let component: ResolveIssueModalComponent;
  let fixture: ComponentFixture<ResolveIssueModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveIssueModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveIssueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
