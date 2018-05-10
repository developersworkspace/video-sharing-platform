import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVideosNewRouteComponent } from './my-videos-new-route.component';

describe('MyVideosNewRouteComponent', () => {
  let component: MyVideosNewRouteComponent;
  let fixture: ComponentFixture<MyVideosNewRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVideosNewRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVideosNewRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
