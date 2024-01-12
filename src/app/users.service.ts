import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http : HttpClient) { }

  addUsers(data:any): Observable<any>{
    return this._http.post("http://localhost:3000/users",data)
  }

  getUserList(): Observable<any>{
    return this._http.get("http://localhost:3000/users")
  }

  deleteUsers(id:number): Observable<any>{
    return this._http.delete(`http://localhost:3000/users/${id}`);

  }
    updateData(id:number, data:any): Observable<any>{
      return this._http.put(`http://localhost:3000/users/${id}`,data)
    }
  

}
