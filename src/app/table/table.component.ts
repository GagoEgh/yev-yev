import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MyRequestService } from "../myRequestService";




@Component({
      selector: 'app-table',
      templateUrl: './table.component.html',
      styleUrls: ['./table.component.scss']
}) export class TableComponent implements OnInit {


      //table
      data = [];
      isVisible = false; //modal
      isLoading = false;
      i = 1;
      validateForm: FormGroup; //form
      @Input('id') id: number
      @Input() driving: any[] = [];
      constructor(private fb: FormBuilder, public req: MyRequestService, private http: HttpClient) { }
      ngOnInit(): void {
            this.req.frstGetHttp().subscribe((event: any) => {

                  this.req.way = event.results;
            })

            //form
            this.validateForm = this.fb.group({
                  main_route: [null, [Validators.required]]
            });
      }
      // modal
      showModal(): void {
            if (this.req.way === undefined) {
                  this.isLoading = true
            }
            this.isVisible = true;
      }


      handleOk() {
            let drivt = {
                  main_route: this.validateForm.get('main_route').value,
                  user: this.id
            }

            if (this.id) {
                  this.req.tablePost(drivt)
                        .subscribe((elem: any) => {
                              this.driving.push(elem);
                              //  this.req.isOnLoading = false;
                              this.isVisible = false;
                              console.log(this.driving)

                        })

            } else {
                  if (!this.driving) {
                        this.driving = []
                  }
                  let way = this.req.way.filter((el) => { return el.id == drivt.main_route });
                  if (way && way[0]) {
                        this.driving.push({ main_route_details: way[0] })
                  }
            }
            // this.req.isOnLoading = true;
            this.isVisible = false;
      }

      handleCancel(): void {
            this.isVisible = false;
      }

      deleteRow(num,) {

            this.http.delete(`http://api.yevyev.am/route/main-route-driver/${num}/`)
                  .subscribe(() => {
                        this.req.isOnLoading = false;
                        this.driving = this.driving.filter((el: any) => num != el.id)
                  })
            this.req.isOnLoading = true;

      }


      cityChange(value: string): void {
            this.req.way.forEach(element => {
                  if (element.id === this.validateForm.get('main_route').value) {

                        this.data.push({
                              id: this.i,
                              citys: element.route_name,
                              deletRoew: 'Delete',
                        })


                  }
            });
            this.i++;
      }

}


