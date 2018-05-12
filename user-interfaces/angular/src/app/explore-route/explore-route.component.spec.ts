import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreRouteComponent } from './explore-route.component';

describe('ExploreRouteComponent', () => {
  let component: ExploreRouteComponent;
  let fixture: ComponentFixture<ExploreRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
