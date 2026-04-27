import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFormPage } from './input-form.page';

describe('InputFormPage', () => {
  let component: InputFormPage;
  let fixture: ComponentFixture<InputFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
