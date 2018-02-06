import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutsComponent } from './layouts.component';
import { DataService } from '../../data.service';
import { HttpModule } from '@angular/http'
import { RouterTestingModule } from '@angular/router/testing';
describe('LayoutsComponent', () => {
  let component: LayoutsComponent;
  let fixture: ComponentFixture<LayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      declarations: [ LayoutsComponent ],
      providers: [ DataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
