export class EmailComposer {
  protected emailAddresses: MSGraphEmailAddress[];
  protected subject: string;
  protected content: string;
  // tslint:disable-next-line:variable-name
  constructor(_emailAddresses: MSGraphEmailAddress[], _subject: any, _content: any) {
    this.emailAddresses = _emailAddresses;
    this.subject = _subject,
    this.content = _content;
  }

  makeEmail() {
        const mail = {
          subject: this.subject,
          toRecipients: this.emailAddresses,
          body: {
            content: this.content,
            contentType: 'html'
          }
        };

  }
}

interface MSGraphEmailAddress {
  emailAddress: { address: string };
}
