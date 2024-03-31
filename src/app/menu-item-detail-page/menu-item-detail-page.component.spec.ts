import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemDetailPageComponent } from './menu-item-detail-page.component';

describe('MenuItemDetailPageComponent', () => {
  let component: MenuItemDetailPageComponent;
  let fixture: ComponentFixture<MenuItemDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuItemDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuItemDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
