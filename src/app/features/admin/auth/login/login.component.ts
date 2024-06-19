import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,MatButtonModule,MatInputModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoginComponent implements OnInit {
  form;
  
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router){
this.form=this.fb.group({
  email:['',[Validators.required,Validators.email]],
  password:['',[Validators.required]]
})
  }
ngOnInit(): void {
  
}
login(){
  const item= this.form.getRawValue();
  if (this.form.status=='VALID') {
     this.authService.login().subscribe({
      next:(data)=>{
        if (data.email === item.email && data.password === item.password) {
          this.router.navigateByUrl("/app/board");
          localStorage.setItem('user',JSON.stringify(data));
        }

      }
     })
  }
}
}
