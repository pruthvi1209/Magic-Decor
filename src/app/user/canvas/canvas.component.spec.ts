import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CanvasComponent } from './canvas.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '../../data.service';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AdalService } from 'ng2-adal/dist/services/adal.service';

describe('CanvasComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpModule, ReactiveFormsModule ],
      declarations: [ CanvasComponent ],
      providers: [ DataService, AdalService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
