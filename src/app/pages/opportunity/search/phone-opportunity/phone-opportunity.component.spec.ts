import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneOpportunityComponent } from './phone-opportunity.component';

describe('NewOpportunitySearchComponent', () => {
  let component: PhoneOpportunityComponent;
  let fixture: ComponentFixture<PhoneOpportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneOpportunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
