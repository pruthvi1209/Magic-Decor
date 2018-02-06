import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadHistoryComponent } from './upload-history.component';
import { DataService } from '../../data.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';


describe('UploadHistoryComponent', () => {
  let component: UploadHistoryComponent;
  let fixture: ComponentFixture<UploadHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ HttpModule, RouterTestingModule ],
      declarations: [ UploadHistoryComponent ],
      providers: [ DataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
