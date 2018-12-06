import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {throwError as observableThrowError} from 'rxjs';
import User = UserModel.User;
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW46MTIzNA==', // admin/password
    })
  };

  private baseUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {
  }

  get() {
    return this.http
      .get<User[]>(this.baseUrl, this.httpOptions)
      .pipe(map(data => data), catchError(this.handleError));
  }

  getOne(request: UserModel.GetRequest) {
    const url = this.baseUrl + '/' + request.id;
    return this.http
      .get<User>(url, this.httpOptions)
      .pipe(map(data => data), catchError(this.handleError));
  }

  create(request: UserModel.CreateRequest) {
    const url = this.baseUrl;
    return this.http
      .post<User>(url, request, this.httpOptions)
      .pipe(map(data => data), catchError(this.handleError));
  }

  update(request: UserModel.UpdateRequest) {
    const url = this.baseUrl + '/' + request.id;
    return this.http
      .put<User>(url, request, this.httpOptions)
      .pipe(map(data => data), catchError(this.handleError));
  }

  delete(request: UserModel.DeleteRequest) {
    const url = '${this.baseUrl}/${request.id}';
    return this.http
      .delete<User>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}
