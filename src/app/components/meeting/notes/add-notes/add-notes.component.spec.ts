import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNotesComponent } from './add-notes.component';
import { MaterialModule } from 'src/app/modules/material-design.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from 'src/app/services/auth/oauth';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('AddNotesComponent', () => {
  let component: AddNotesComponent;
  let fixture: ComponentFixture<AddNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNotesComponent],
      imports: [
        MaterialModule,
        RouterTestingModule,
        NgScrollbarModule,
        HttpClientModule,
        MsalModule.forRoot({
          clientID: OAuthSettings.appId,
          authority: 'https://login.microsoftonline.com/livebournemouthac.onmicrosoft.com/',
          postLogoutRedirectUri: window.location.origin
        }),
        ToastrModule.forRoot()
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({ id: 'testing-123' })
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
