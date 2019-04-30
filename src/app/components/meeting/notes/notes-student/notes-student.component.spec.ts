import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesStudentComponent } from './notes-student.component';
import { MaterialModule } from 'src/app/modules/material-design.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { HttpClientModule } from '@angular/common/http';
import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from 'src/app/services/auth/oauth';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ViewNotesComponent } from '../view-notes/view-notes.component';

describe('NotesStudentComponent', () => {
  let component: NotesStudentComponent;
  let fixture: ComponentFixture<NotesStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotesStudentComponent, ViewNotesComponent],
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
    fixture = TestBed.createComponent(NotesStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
