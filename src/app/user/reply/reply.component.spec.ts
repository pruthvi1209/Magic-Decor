import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyComponent } from './reply.component';
import { DataService } from '../../data.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReplyComponent', () => {
  let component: ReplyComponent;
  let fixture: ComponentFixture<ReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ], 
      declarations: [ ReplyComponent ],
      providers: [ DataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
