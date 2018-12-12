import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError as observableThrowError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MatchModel} from '../models/match.model';
import Match = MatchModel.Match;
import {httpOptions} from './auth.service';

@Injectable()
export class MatchService {

  private baseUrl = 'http://localhost:8080/competitions';

  constructor(private http: HttpClient) {
    const token = window.localStorage.getItem('token');
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Basic ' + token);
  }

  get(request: MatchModel.QueryRequest) {
    const url = this.baseUrl + '/' + request.competition_id + '/matches';
    return this.http
      .get<Match[]>(url, httpOptions)
      .pipe(map(data => data), catchError(this.handleError));
  }

  getOne(request: MatchModel.GetRequest) {
    const url = this.baseUrl + '/' + request.competition_id + '/matches/' + request.id;
    return this.http
      .get<Match>(url, httpOptions)
      .pipe(map(data => data), catchError(this.handleError));
  }

  create(request: MatchModel.CreateRequest) {
    const url = '${this.baseUrl}/${request.competition_id}/matches';
    return this.http
      .post<Match>(url, request, httpOptions)
      .pipe(map(data => data), catchError(this.handleError));
  }

  update(request: MatchModel.UpdateRequest) {
    const url = this.baseUrl + '/' + request.competition_id + '/matches/' + request.id;
    return this.http
      .put<Match>(url, request, httpOptions)
      .pipe(map(data => data), catchError(this.handleError));
  }

  delete(request: MatchModel.DeleteRequest) {
    const url = this.baseUrl + '/' + request.competition_id + '/matches/' + request.id;
    return this.http
      .delete<Match>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}
