import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { CredentialsService } from '@app/auth/credentials.service';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appHasRole]',
})
export class HasAuthorityDirective implements OnInit, OnDestroy {
  @Input() appHasRole: string;

  stop$ = new Subject();

  isVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit() {
    const userData = this.credentialsService.credentials;
    const appRoles = this.appHasRole.split(',');
    const roles = userData.role;
    if (!roles) {
      this.viewContainerRef.clear();
    }
    if (roles) {
      if (appRoles.includes(roles)) {
        if (!this.isVisible) {
          this.isVisible = true;
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    }
  }

  ngOnDestroy() {
    this.stop$.next();
  }
}
