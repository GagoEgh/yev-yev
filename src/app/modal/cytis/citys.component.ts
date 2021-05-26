import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { map, switchMap } from "rxjs/operators";
import { MyRequestService } from "src/app/myRequestService";

@Component({
      selector: 'app-cytis',
      templateUrl: './cytis.component.html',
      styleUrls: ['./cytis.component.scss']
}) export class CytisComponent implements OnInit {

      validateForm: FormGroup;
      isVisible = false;


      constructor(public req: MyRequestService, private active: HttpClient) { }
      @Input('id') id: ElementRef
      ngOnInit(): void {
            this.validateForm = new FormGroup({
                  located_city_id: new FormControl(null, Validators.required)
            })
            this.req.secntGetHttp().subscribe((event: any) => {
                  this.req.citys = event.results;
            })

      }

      showModal(): void {
            this.req.selectCity(this.id).subscribe(() => {
                  this.isVisible = true;
                  this.req.isOnLoading = false;
            })
            this.req.isOnLoading = true;

      }

      handleOk() {
            if (this.validateForm.invalid) { return }
            this.active.put(`http://api.yevyev.am/userdetails/edit-user-details/${this.id}/`, {
                  located_city_id: this.validateForm.get('located_city_id').value
            }).pipe(switchMap((val: any) => {
                  return this.req.citySerch().pipe(map((elem: any) => {

                        this.req.tabelItem = elem.results;
                  }));
            })).subscribe(() => {
                  this.req.isOnLoading = false;
                  this.isVisible = false;
            })
            this.req.isOnLoading = true;

      }

      handleCancel(): void {

            this.isVisible = false;
      }
}