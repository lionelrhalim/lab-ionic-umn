import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UkmPage } from './ukm.page';

describe('UkmPage', () => {
  let component: UkmPage;
  let fixture: ComponentFixture<UkmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UkmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UkmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
