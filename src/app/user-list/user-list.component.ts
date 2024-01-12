import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { UsersService } from '../users.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatRow, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { SnackService } from '../snack.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private _dialog:MatDialog, 
    private _userService : UsersService,
    private _snackService : SnackService) {}

    ngOnInit(): void {
      this.getUserList();
    }

  openForm(){
   const dialogRef = this._dialog.open(FormComponent);
   dialogRef.afterClosed().subscribe({
    next: (val)=>{
      if(val){
        this.getUserList();
      }
    }
   })

  }

  getUserList(){
    this._userService.getUserList().subscribe({
      next: (res)=>{
        // console.log(res);
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;

      },
      error: console.log,
      
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUsers(id:number){
    this._userService.deleteUsers(id).subscribe({
      next: (res)=>{
        // this._snackService.openSnackBar("User Deleted!",'done')
        confirm("Are you sure delet the data")
        this.getUserList();
      },
      error :(err)=>{
        console.log(err);
      }
    })
  }

  openEditForm(data:any){
    const dialogRef = this._dialog.open(FormComponent,{
      data,
    });
    
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          this.getUserList();
        }
      }
     })
  
  }
    


}
