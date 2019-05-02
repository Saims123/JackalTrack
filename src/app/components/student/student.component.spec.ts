import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentComponent } from './student.component';
import { MaterialModule } from 'src/app/modules/material-design.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { HttpClientModule } from '@angular/common/http';
import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from 'src/app/services/auth/oauth';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentComponent],
      imports: [
        MaterialModule,
        RouterTestingModule,
        HttpClientModule,
        MsalModule.forRoot({
          clientID: OAuthSettings.appId,
          authority: 'https://login.microsoftonline.com/livebournemouthac.onmicrosoft.com/',
          postLogoutRedirectUri: window.location.origin
        }),
        ToastrModule.forRoot()
      ],
      schemas: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
