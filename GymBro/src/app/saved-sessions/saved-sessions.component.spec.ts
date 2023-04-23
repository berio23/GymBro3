import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedSessionsComponent } from './saved-sessions.component';

describe('SavedSessionsComponent', () => {
  let component: SavedSessionsComponent;
  let fixture: ComponentFixture<SavedSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedSessionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
