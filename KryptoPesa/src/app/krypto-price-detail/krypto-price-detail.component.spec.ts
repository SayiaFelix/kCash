import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KryptoPriceDetailComponent } from './krypto-price-detail.component';

describe('KryptoPriceDetailComponent', () => {
  let component: KryptoPriceDetailComponent;
  let fixture: ComponentFixture<KryptoPriceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KryptoPriceDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KryptoPriceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
