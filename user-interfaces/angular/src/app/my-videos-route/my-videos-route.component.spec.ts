import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVideosRouteComponent } from './my-videos-route.component';

describe('MyVideosRouteComponent', () => {
  let component: MyVideosRouteComponent;
  let fixture: ComponentFixture<MyVideosRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVideosRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVideosRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
