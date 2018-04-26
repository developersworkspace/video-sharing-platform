import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackRouteComponent } from './callback-route.component';

describe('CallbackRouteComponent', () => {
  let component: CallbackRouteComponent;
  let fixture: ComponentFixture<CallbackRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallbackRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
