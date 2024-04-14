import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelegramInsctructionComponent } from './telegram-insctruction.component';

describe('TelegramInsctructionComponent', () => {
  let component: TelegramInsctructionComponent;
  let fixture: ComponentFixture<TelegramInsctructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelegramInsctructionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelegramInsctructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
