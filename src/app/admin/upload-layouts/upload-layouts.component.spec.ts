import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadLayoutsComponent } from './upload-layouts.component';

describe('UploadLayoutsComponent', () => {
  let component: UploadLayoutsComponent;
  let fixture: ComponentFixture<UploadLayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadLayoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
