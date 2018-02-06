import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewUsersComponent } from './view-users.component';
import { DataService } from '../../data.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ViewUsersComponent', () => {
  let component: ViewUsersComponent;
  let fixture: ComponentFixture<ViewUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ HttpModule, RouterTestingModule ],
      declarations: [ ViewUsersComponent ],
      providers: [ DataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
