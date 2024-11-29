import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppSsoStateService, SSO } from '../services/api/app-sso-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { WesterraAmplifiDataService } from '../services/westerra-amplifi-data/westerra-amplifi-data.service';
import { AmplifiResponse } from '../services/westerra-amplifi-data/westerra-amplifi-data.interfaces';

@Component({
  selector: 'bb-cards-rewards',
  template: `<p></p>`,
  styleUrls: []
})
export class CardsRewardsComponent implements OnInit {
  
  amplifiWidgetUrl?: SafeResourceUrl;
  error: any;
  restricted = false;
  isLoading: boolean | undefined;
  amplifiWidgetUrls: SafeResourceUrl | undefined;
  warning = false;
  sso = SSO;

  constructor(
    private route: ActivatedRoute,
    private appSsoService: AppSsoStateService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  getSsoLink(ssoAppName: string){
    this.appSsoService
      .getSessionState('', this.sso.amplify, 'cashback')
      .pipe(
        catchError((err: HttpErrorResponse) => {

          this.appSsoService.handleErrorAmplify(err);
          this.cd.detectChanges();
          return EMPTY;
        })
      )
      .subscribe((response: any | null) => {
        this.handleResponse(ssoAppName, response);
      });
  }

  handleResponse(ssoAppName:string, sessionResponse: AmplifiResponse | null = {}): void {
    this.isLoading = false;
    if(sessionResponse && sessionResponse.ssourl){
      this.appSsoService.navigateToExternalLink(ssoAppName, decodeURIComponent(sessionResponse.ssourl));
    }
    
  }

  getUrlParameter(name: string) {
    name = name.replace(/[\\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  ngOnInit() {
   this.getSsoLink(this.sso.amplify);

  // const redirectUrl = 'https://dreampoints.uat.augeofi.com/SingleSignOn?BNKID=CWEST3&UID=lc+azjcgu0r3V7Xz6M/EF5es9dXY9Aas6+s/0YD6gkrvDFSfIlK9bg==&IV=uOPAxQ247uA=';
  // this.router.navigate(["/accounts/my-accounts"]
  // // ,{skipLocationChange: true}
  // );
  // window.open(redirectUrl, 'popup');
  }

}
