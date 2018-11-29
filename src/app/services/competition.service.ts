import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {throwError as observableThrowError} from 'rxjs';
import User = UserModel.User;
import {catchError, map} from 'rxjs/operators';
import {CompetitionModel} from '../models/competition.model';
import Competition = CompetitionModel.Competition;

@Injectable()
export class CompetitionService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW46MTIzNA==', // admin/password
    })
  };

  private baseUrl = 'http://localhost:8080/competitions';

  constructor(private http: HttpClient) {
  }

  get() {
    return this.http
      .get<Competition[]>(this.baseUrl, this.httpOptions)
      .pipe(map(data => data), catchError(this.handleError));
  }

  getOne(request: CompetitionModel.GetRequest) {
    const url = '${this.baseUrl}/${request.id}';
    return this.http
      .get<Competition>(url, this.httpOptions)
      .pipe(map(data => data), catchError(this.handleError));
  }

  create(request: CompetitionModel.CreateRequest) {
    const url = '${this.baseUrl}';
    return this.http
      .post<Competition>(url, request, this.httpOptions)
      .pipe(map(data => data), catchError(this.handleError));
  }

  update(request: CompetitionModel.UpdateRequest) {
    const url = '${this.baseUrl}/${request.id}';
    return this.http
      .put<Competition>(url, request, this.httpOptions)
      .pipe(map(data => data), catchError(this.handleError));
  }

  delete(request: CompetitionModel.DeleteRequest) {
    const url = '${this.baseUrl}/${request.id}';
    return this.http
      .delete<Competition>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}
