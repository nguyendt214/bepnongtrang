import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyfoodPage } from './dailyfood.page';

describe('DailyfoodPage', () => {
  let component: DailyfoodPage;
  let fixture: ComponentFixture<DailyfoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyfoodPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyfoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
