import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVideosEditRouteComponent } from './my-videos-edit-route.component';

describe('MyVideosEditRouteComponent', () => {
  let component: MyVideosEditRouteComponent;
  let fixture: ComponentFixture<MyVideosEditRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVideosEditRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVideosEditRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
