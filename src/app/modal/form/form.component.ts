import { HttpClient } from "@angular/common/http";
import { Component, ElementRef,Input, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { map, switchMap } from "rxjs/operators";
import { MyRequestService } from "src/app/myRequestService";
import { User } from "src/app/user.interface";

@Component({
      selector: 'app-form',
      templateUrl: './form.component.html',
      styleUrls: ['./form.component.scss']

}) export class FormComponent implements OnInit {

      isVisible = false;
      driver_id: number;
      formLoad :boolean;
      @Input('id') id: ElementRef;
      @Input('driving') driving: ElementRef;

      constructor(private fb: FormBuilder, public myReq: MyRequestService, private http: HttpClient) { }
      ngOnInit(): void {
            this.validateForm = this.fb.group({
                  first_name: [null, Validators.required],
                  last_name: [null, Validators.required],
                  phone_number: [null, Validators.required],
                  car_model: [null, Validators.required],
                  car_color_name_hy: [null, Validators.required],
                  car_color_name_ru: [null, Validators.required],
                  car_color_name_en: [null, Validators.required],
                  car_capacity: [null, Validators.required],
                  car_number: [null, Validators.required],
                  viber_id: [null],
                  main_city_id: [null, Validators.required],
                  car_color: [null, Validators.required],
            });


      }

      showModal(): void {
            this.myReq.userData(this.id)
                  .pipe(switchMap((elem: any) => {

                        this.validateForm.patchValue({
                              car_capacity: elem?.results[0]?.car_capacity,
                              car_color: elem?.results[0]?.car_color,
                              car_color_name_en: elem?.results[0]?.car_color_name_en,
                              car_color_name_hy: elem?.results[0]?.car_color_name_hy,
                              car_color_name_ru: elem?.results[0]?.car_color_name_ru,
                              car_model: elem?.results[0]?.car_model,
                              car_number: elem?.results[0]?.car_number,
                              first_name: elem?.results[0]?.user?.first_name,
                              last_name: elem?.results[0]?.user?.last_name,
                              located_city_id: elem?.results[0]?.located_city?.name_hy,
                              main_city_id: elem?.results[0]?.main_city?.id,
                              phone_number: elem?.results[0]?.phone_number,
                              viber_id: null
                        })

                        this.driver_id = elem.results[0].id
                        this.isVisible = true;
                        return this.myReq.selectCity(this.id)

                  })).subscribe(() => {
                        this.myReq.isOnLoading = false;

                  })
            this.myReq.isOnLoading = true;


      }

      handleOk() {
            if (this.validateForm.invalid) { return }
            let user: User = {
                  car_capacity: this.validateForm.value.car_capacity,
                  car_color: this.validateForm.value.car_color,
                  car_color_name_en: this.validateForm.value.car_color_name_en,
                  car_color_name_hy: this.validateForm.value.car_color_name_hy,
                  car_color_name_ru: this.validateForm.value.car_color_name_ru,
                  car_model: this.validateForm.value.car_model,
                  car_number: this.validateForm.value.car_number,
                  first_name: this.validateForm.value.first_name,
                  image: '',
                  last_name: this.validateForm.value.last_name,
                  located_city_id: this.validateForm.value.main_city_id,
                  main_city_id: this.validateForm.value.main_city_id,
                  phone_number: this.validateForm.value.phone_number,
                  viber_id: null

            }

            this.http.put(`http://api.yevyev.am/userdetails/edit-user-details/${this.id}/`, user)
                  .pipe(switchMap((val: any) => {
                        return this.myReq.citySerch()
                              .pipe(map((elem: any) => {
                                    this.myReq.tabelItem = elem.results;

                              }))
                  })).subscribe(() => {
                        this.myReq.isOnLoading = false;
                        this.isVisible = false
                  })
            this.myReq.isOnLoading = true;
          

      }

      handleCancel(): void {
            this.isVisible = false;
      }



      //form
      validateForm: FormGroup;

      changeColorPicker(controlName: string, event: string) {
            this.validateForm.get(controlName).setValue(event)
      }


      secntGetHttp() {
            return this.myReq.secntGetHttp().subscribe((event: any) => {
                  this.myReq.citys = event.results;
            })
      }
    

}