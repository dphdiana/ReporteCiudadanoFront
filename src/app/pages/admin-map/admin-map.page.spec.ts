import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMapPage } from './admin-map.page';

describe('AdminMapPage', () => {
  let component: AdminMapPage;
  let fixture: ComponentFixture<AdminMapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
