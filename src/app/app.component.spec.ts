import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from "@angular/router/testing";
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DataService } from './data.service';
import { HttpModule } from '@angular/http';
import { AdalService } from 'ng2-adal/dist/services/adal.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpModule ],
      declarations: [ AppComponent, FooterComponent, HeaderComponent ],
      providers: [ DataService,AdalService ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
