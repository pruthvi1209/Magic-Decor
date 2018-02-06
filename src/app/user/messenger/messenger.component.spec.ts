import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerComponent } from './messenger.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataService } from '../../data.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('MessengerComponent', () => {
  let component: MessengerComponent;
  let fixture: ComponentFixture<MessengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule ],
      declarations: [ MessengerComponent ],
      providers: [ DataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
