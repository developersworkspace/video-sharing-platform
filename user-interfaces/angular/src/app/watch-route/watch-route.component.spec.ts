import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchRouteComponent } from './watch-route.component';

describe('WatchRouteComponent', () => {
  let component: WatchRouteComponent;
  let fixture: ComponentFixture<WatchRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
