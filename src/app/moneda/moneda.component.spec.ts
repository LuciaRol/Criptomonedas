import { ComponentFixture, TestBed } from '@angular/core/testing';

import { monedaComponent } from './moneda.component';

describe('MonedaComponent', () => {
  let component: monedaComponent;
  let fixture: ComponentFixture<monedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [monedaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(monedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
