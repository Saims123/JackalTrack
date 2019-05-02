import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponent } from './notes.component';
import { ViewNotesComponent } from './view-notes/view-notes.component';
import { MaterialModule } from 'src/app/modules/material-design.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { HttpClientModule } from '@angular/common/http';
import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from 'src/app/services/auth/oauth';
import { ToastrModule } from 'ngx-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from 'src/app/modules/app-routing.module';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotesComponent, ViewNotesComponent],
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
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        // {
        //   provide: ActivatedRoute,
        //   useValue: {
        //     params: Observable.of({ id: 'testing-123' })
        //   }
        // }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
