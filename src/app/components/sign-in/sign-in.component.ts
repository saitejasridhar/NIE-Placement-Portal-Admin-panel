import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  constructor(
    public authService: AuthService,public router: Router
  ) { 
    if(this.authService.isLoggedIn==true)
    {
      this.router.navigate(['/add-book']);
    }
    else{
      console.log("Hello");
    }
  }

  ngOnInit() { }

}