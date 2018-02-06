import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../data.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AdalService } from 'ng2-adal/dist/services/adal.service';

xdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule ],
      declarations: [ LoginComponent ],
      providers: [ DataService, AdalService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
