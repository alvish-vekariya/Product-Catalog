import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableActionsComponent } from './datatable-actions.component';

describe('DatatableActionsComponent', () => {
  let component: DatatableActionsComponent;
  let fixture: ComponentFixture<DatatableActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatatableActionsComponent]
    });
    fixture = TestBed.createComponent(DatatableActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
