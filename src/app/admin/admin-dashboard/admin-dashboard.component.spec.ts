import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { DataService } from '../../data.service';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { HttpModule } from "@angular/http";
import { RouterTestingModule } from '@angular/router/testing';


describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ HttpModule, RouterTestingModule ],
      declarations: [ AdminDashboardComponent ],
      providers:[ DataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
