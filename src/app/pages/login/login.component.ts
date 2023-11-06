import {ChangeDetectorRef, Component} from '@angular/core';
import {NbAuthService} from '@nebular/auth/services/auth.service';
import {Router} from '@angular/router';
import {NbAuthSocialLink} from '@nebular/auth/auth.options';
import 'rxjs/add/operator/pairwise';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  protected service: NbAuthService;
  protected options: {};
  protected cd: ChangeDetectorRef;
  showMessages: any;
  errors: string[];
  messages: string[];
  user: any;
  submitted: boolean;
  socialLinks: NbAuthSocialLink[];
  rememberMe: boolean;
  constructor(private router: Router) {
    console.log(this.router.getCurrentNavigation());
  };
  login(): void{};
  getConfigValue(key: string): any{};
}
