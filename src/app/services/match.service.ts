import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError as observableThrowError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MatchModel} from '../models/match.model';
import Match = MatchModel.Match;

@Injectable()
export class MatchService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW46MTIzNA==', // admin/password
    })
  };

  private baseUrl = 'http://localhost:8080/competitions';

  constructor(private http: HttpClient) {
  }

  get(request: MatchModel.QueryRequest) {
    const url = this.baseUrl + '/' + request.competition_id + '/matches';
    return this.http
      .get<Match[]>(url, this.httpOptions)
      .pipe(map(data => data), catchError(this.handleError));
  }

  getOne(request: MatchModel.GetRequest) {
    const url = this.baseUrl + '/' + request.competition_id + '/matches/' + request.id;
    return this.http
      .get<Match>(url, this.httpOptions)
      .pipe(map(data => data), catchError(this.handleError));
  }

  create(request: MatchModel.CreateRequest) {
    const url = '${this.baseUrl}/${request.competition_id}/matches';
    return this.http
      .post<Match>(url, request, this.httpOptions)
      .pipe(map(data => data), catchError(this.handleError));
  }

  update(request: MatchModel.UpdateRequest) {
    const url = this.baseUrl + '/' + request.competition_id + '/matches/' + request.id;
    return this.http
      .put<Match>(url, request, this.httpOptions)
      .pipe(map(data => data), catchError(this.handleError));
  }

  delete(request: MatchModel.DeleteRequest) {
    const url = '${this.baseUrl}/${request.competition_id}/matches/${request.id}/';
    return this.http
      .delete<Match>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}
