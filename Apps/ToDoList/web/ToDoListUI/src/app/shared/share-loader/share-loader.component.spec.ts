import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareLoaderComponent } from './share-loader.component';

describe('LoadingSpinnerComponent', () => {
  let component: ShareLoaderComponent;
  let fixture: ComponentFixture<ShareLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
