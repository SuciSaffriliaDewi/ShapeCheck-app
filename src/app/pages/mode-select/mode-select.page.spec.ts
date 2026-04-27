import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModeSelectPage } from './mode-select.page';

describe('ModeSelectPage', () => {
  let component: ModeSelectPage;
  let fixture: ComponentFixture<ModeSelectPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
