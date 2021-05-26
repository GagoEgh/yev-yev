import { HttpClient } from "@angular/common/http";
import { ElementRef, Injectable, OnInit } from "@angular/core";

@Injectable({
      providedIn: 'root'
}) export class MyRequestService {
      pageIndex: number = 1;
      isOnLoading: boolean;
      tabelItem: any[];
      num: number = 1;
      pageSize = 10;
      total = 10;
      citys = [];
      way = [];

      constructor(private http: HttpClient) { }


      frstGetHttp() {
            return this.http.get('http://api.yevyev.am/route/main-route/?only_my=true')
      }

      secntGetHttp() {
            return this.http.get('http://api.yevyev.am/utils/city/')
      }

      userdetails(user) {
            return this.http.post('http://api.yevyev.am/userdetails/add-driver/', user);
      }


      serchUser() {
            return this.http.get(`http://api.yevyev.am/userdetails/user/?search=&user_role__code=DR&page=${this.pageIndex}&limit=${this.pageSize}&offset=${(this.pageIndex - 1) * this.pageSize}&search=`)
      }

      selectCity(id: ElementRef) {
            return this.http.get(`http://api.yevyev.am/order/approved-order/?driver_id=${id}&limit=${this.pageSize}&offset=${(this.pageIndex - 1) * this.pageSize}`)
      }


      citySerch() {
            return this.http.get(`http://api.yevyev.am/userdetails/user/?search=&user_role__code=DR&page=${this.pageIndex}&limit=${this.pageSize}&offset=${(this.pageIndex - 1) * this.pageSize}&search=`)
      }

      userData(id: any) {
            return this.http.get(`http://api.yevyev.am/userdetails/user/?search=&user_role__code=DR&id=${id}`)
      }

      tablePost(item: any) {
            return this.http.post(`http://api.yevyev.am/route/main-route-driver/`, item)
      }


      drivingSearch(driverID: number) {
            return this.http.get(`http://api.yevyev.am/userdetails/user/?search=&user_role__code=DR&page=1&limit=10&offset=0&search=&driving_routes__main_route=${driverID}`)

      }

      pageDrivingSearch(driverID: number) {
            return this.http.get(`http://api.yevyev.am/userdetails/user/?search=&user_role__code=DR&page=${this.pageIndex}&limit=${this.pageSize}&offset=${(this.pageIndex - 1) * this.pageSize}&search=&driving_routes__main_route=${driverID}`)

      }
}
