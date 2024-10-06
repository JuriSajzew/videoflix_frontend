import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadWindowComponent } from './load-window.component';

describe('LoadWindowComponent', () => {
  let component: LoadWindowComponent;
  let fixture: ComponentFixture<LoadWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
