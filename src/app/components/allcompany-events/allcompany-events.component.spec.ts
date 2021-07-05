import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcompanyEventsComponent } from './allcompany-events.component';

describe('AllcompanyEventsComponent', () => {
  let component: AllcompanyEventsComponent;
  let fixture: ComponentFixture<AllcompanyEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllcompanyEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllcompanyEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
