import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError as observableThrowError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MatchModel} from '../models/match.model';
import {RoundModel} from '../models/round.model';
import Round = RoundModel.Round;
import {httpOptions} from './auth.service';

@Injectable()
export class RoundService {

  private baseUrl = 'http://localhost:8080/competitions';

  constructor(private http: HttpClient) {
    const token = window.localStorage.getItem('token');
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Basic ' + token);
  }

  get(request: RoundModel.QueryRequest) {
    const url = this.baseUrl + '/' + request.competition_id + '/matches/' + request.match_id + '/rounds';
    return this.http
      .get<Round[]>(url, httpOptions)
      .pipe(map(data => data), catchError(this.handleError));
  }

  getOne(request: RoundModel.GetRequest) {
    const url = '${this.baseUrl}/${request.competition_id}/matches/${request.match_id}/rounds/${request.id}';
    return this.http
      .get<Round>(url, httpOptions)
      .pipe(map(data => data), catchError(this.handleError));
  }

  create(request: RoundModel.CreateRequest) {
    const url = this.baseUrl + '/' + request.competition_id + '/matches/' + request.match_id + '/rounds';
    return this.http
      .post<Round>(url, request, httpOptions)
      .pipe(map(data => data), catchError(this.handleError));
  }

  update(request: RoundModel.UpdateRequest) {
    const url = this.baseUrl + '/' + request.competition_id + '/matches/' + request.match_id + '/rounds/' + request.id;
    return this.http
      .put<Round>(url, request, httpOptions)
      .pipe(map(data => data), catchError(this.handleError));
  }

  delete(request: RoundModel.DeleteRequest) {
    const url = this.baseUrl + '/' + request.competition_id + '/matches/' + request.match_id + '/rounds/' + request.id;
    return this.http
      .delete<Round>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}
