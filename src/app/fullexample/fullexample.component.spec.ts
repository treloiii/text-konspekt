import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullexampleComponent } from './fullexample.component';

describe('FullexampleComponent', () => {
  let component: FullexampleComponent;
  let fixture: ComponentFixture<FullexampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullexampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullexampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
