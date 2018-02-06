import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardComponent } from './user-dashboard.component';
import { DataService } from '../../data.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AdalService } from 'ng2-adal/dist/services/adal.service';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule],
      declarations: [ UserDashboardComponent ],
      providers: [ DataService, AdalService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
