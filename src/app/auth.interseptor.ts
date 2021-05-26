import { HttpEvent, HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";


 export class AuthInterseptor implements HttpInterceptor{
       intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
             let headers=req.headers?req.headers:new HttpHeaders()
             const cloned = req.clone({
                   url:req.url,
                   params:req.params,
                   headers:req.headers.append('Authorization','Token f2b33cf904319643ee9bafe3718471da6c77f4d1')
             })
           
             return next.handle(cloned)
       }

 }


