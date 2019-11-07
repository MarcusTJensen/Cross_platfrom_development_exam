import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailViewPage } from './room-detail-view.page';

describe('RoomDetailViewPage', () => {
  let component: RoomDetailViewPage;
  let fixture: ComponentFixture<RoomDetailViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomDetailViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
