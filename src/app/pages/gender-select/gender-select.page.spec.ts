import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenderSelectPage } from './gender-select.page';

describe('GenderSelectPage', () => {
  let component: GenderSelectPage;
  let fixture: ComponentFixture<GenderSelectPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
