import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateComponent } from './authenticate.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AdalService } from 'ng2-adal/dist/services/adal.service';
import { AuthGuard } from '../../auth.guard';

describe('AuthenticateComponent', () => {
  let component: AuthenticateComponent;
  let fixture: ComponentFixture<AuthenticateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ RouterTestingModule],
      declarations: [ AuthenticateComponent ],
      providers:[ AdalService, AuthGuard ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
