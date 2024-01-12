import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackService } from '../snack.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  userForm : FormGroup;
  email: any;

  constructor(private _fb: FormBuilder, 
    private _userService : UsersService, 
    private _dialogRef : MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private _snackService : SnackService) { 
    this.userForm = this._fb.group({
      name:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role:['',Validators.required]
    })
    }

  onFormSubmit(){
    if(this.userForm.valid){
      if(this.data){
        this._userService.updateData(this.data.id,this.userForm.value).subscribe({
          next : (val:any)=>{
            this._snackService.openSnackBar("User Detailes Updated!",'done')
            this._dialogRef.close(true);
          },
          error :(err:any)=>{
            console.log(err);
          }
        }
        );
      } else{
        this._userService.addUsers(this.userForm.value).subscribe({
          next : (val:any)=>{
            this._snackService.openSnackBar("User added successfully",'done')
            this._dialogRef.close(true);
          },
          error :(err:any)=>{
            console.log(err);
          }
        }
        );
      }
        }
      }
    

  ngOnInit(): void {
    this.userForm.patchValue(this.data)
  }

}
