'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">jackal-track documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-b07633914928f8d9be476b62d2db2b01"' : 'data-target="#xs-components-links-module-AppModule-b07633914928f8d9be476b62d2db2b01"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-b07633914928f8d9be476b62d2db2b01"' :
                                            'id="xs-components-links-module-AppModule-b07633914928f8d9be476b62d2db2b01"' }>
                                            <li class="link">
                                                <a href="components/AddNotesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddNotesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddStudentConfirmationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddStudentConfirmationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BookingTimeslotComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BookingTimeslotComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteConfirmationDialog.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeleteConfirmationDialog</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteNoteConfirmationDialog.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeleteNoteConfirmationDialog</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditNotesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditNotesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ErrorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotesStudentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotesStudentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TimeslotConfirmationDialog.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimeslotConfirmationDialog</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TimeslotCreationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimeslotCreationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TimetableSupervisorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimetableSupervisorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewNotesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewNotesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CustomEventTitleFormatter.html" data-type="entity-link">CustomEventTitleFormatter</a>
                            </li>
                            <li class="link">
                                <a href="classes/DateTime.html" data-type="entity-link">DateTime</a>
                            </li>
                            <li class="link">
                                <a href="classes/DateTimeTimeZone.html" data-type="entity-link">DateTimeTimeZone</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailAddress.html" data-type="entity-link">EmailAddress</a>
                            </li>
                            <li class="link">
                                <a href="classes/Event.html" data-type="entity-link">Event</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomMailService.html" data-type="entity-link">CustomMailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GraphService.html" data-type="entity-link">GraphService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MeetingNotesService.html" data-type="entity-link">MeetingNotesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SupervisionService.html" data-type="entity-link">SupervisionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TimeslotService.html" data-type="entity-link">TimeslotService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/MeetingNote.html" data-type="entity-link">MeetingNote</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MeetingPeriod.html" data-type="entity-link">MeetingPeriod</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Student.html" data-type="entity-link">Student</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StudentNotes.html" data-type="entity-link">StudentNotes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SupervisionGroup.html" data-type="entity-link">SupervisionGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Supervisor.html" data-type="entity-link">Supervisor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Timeslot.html" data-type="entity-link">Timeslot</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimeslotPeriod.html" data-type="entity-link">TimeslotPeriod</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TodoList.html" data-type="entity-link">TodoList</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});