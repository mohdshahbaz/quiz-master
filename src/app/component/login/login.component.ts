import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  login(email, password) {
    const data = {
      email: email,
      password: password
    }

    this.authService.authenticateLogin(data).subscribe(res => {
      if (res['status']) {
        this.toastr.success(res['message']);
        this.router.navigate(['/main-content']);
        localStorage.setItem('quizMaster', JSON.stringify(res['quizMaster']));
      } else {
        this.toastr.error(res['message']);
      }

    });
  }

}
