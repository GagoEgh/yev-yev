import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MyRequestService } from './myRequestService';
import { User } from './user.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  validateForm: FormGroup;
  route_name: string;
  minCount: boolean;
  isVisible = false;
  drivingId: number;
  cityName: string;
  cityId: number;

  constructor(private http: HttpClient,
    private fb: FormBuilder,
    public myReq: MyRequestService,
    public message: NzMessageService) { }

  ngOnInit(): void {
    this.comboneObservable()
    this.validateForm = this.fb.group({
      first_name: [null, [Validators.required, this.onlyLetters]],
      last_name: [null, [Validators.required, this.onlyLetters]],
      phone_number: [null, [Validators.required, this.onlyNumber, this.numberLength]],
      phone_code:[null,[Validators.required]],
      car_model: [null, [Validators.required]],
      car_color_name_hy: [null, [Validators.required]],
      car_color_name_ru: [null, [Validators.required]],
      car_color_name_en: [null, [Validators.required]],
      car_capacity: [null, [Validators.required]],
      car_number: [null, [Validators.required]],
      car_color: [null, [Validators.required]],
      main_city_id: [null],
      viber_id: [null],
    });

    this.showTable().subscribe();

  }

  errorLast: string;
  phoneNumber = [{id:1,code:'091'},{id:2,code:'096'},{id:3,code:'099'},{id:4,code:'043'},
  {id:5,code:'077'},{id:6,code:'093'},{id:7,code:'094'},{id:8,code:'098'},{id:9,code:'049'},
  {id:10,code:'055'},{id:11,code:'095'},{id:12,code:'041'}];
  code: string;

  errorName(formName: string) {
   
    if (this.validateForm.get(formName).hasError('required')) this.errorLast = 'Լռացրեք տվյալ դաշտը';
    else if (this.validateForm.get(formName).hasError('lettersErrore')) this.errorLast = 'գրեք միայն տառ';
    else if (this.validateForm.get(formName).hasError('numberError')) this.errorLast = 'գրեք միայն թիվ';
    else if (this.validateForm.get(formName).hasError('lengthErrore')) this.errorLast = 'նման համար գոյություն չունի';
    else this.errorLast = '';
    return this.errorLast;
  }


  numberLength(control: FormControl) {
    if (control.value && control.value.length != 6) {
      return {
        lengthErrore: true
      }
    }
    return null
  }

  onlyNumber(control: FormControl) {
    let regExp = /[a-z,~!@#$%^&*()_+=|\\}{[\]"':;?>.<,]/giu;
    if (regExp.test(control.value)) {
      return {
        numberError: true
      }
    }
    return null
  }

  onlyLetters(control: FormControl) {
    let regexp = /[0-9]/;
    if (regexp.test(control.value)) {
      return {
        lettersErrore: true
      }
    }
    return null;
  }

  showModal(): void {
    this.isVisible = true;
  }


  comboneObservable() {
    const combine = forkJoin(this.secntGetHttp(), this.frstGetHttp())
    combine.subscribe(() => {
      this.myReq.isOnLoading = false;
    })
    this.myReq.isOnLoading = true;
  }

  frstGetHttp() {
    return this.myReq.frstGetHttp().pipe(map((event: any) => {
      this.myReq.way = event.results;
      this.myReq.way.unshift({ id: '', route_name: 'Բոլորը' })

    }))
  }

  secntGetHttp() {
    return this.myReq.secntGetHttp().pipe(map((event: any) => {
      this.myReq.citys = event.results;
    }))
  }

  changeColorPicker(controlName: string, event: string) {

    this.validateForm.get(controlName).setValue(event)
  }



  handleOk(type: string) {
    if (this.validateForm.invalid) {
     
    
      console.log(this.validateForm.value.phone_code);
      console.log(this.validateForm.value.phone_number);
     // console.log(p)
      this.message.create(type, 'Գործողությունը ձախողված է');
      return
    }
    let cod = this.validateForm.get('phone_code').value;
    let tell = this.validateForm.get('phone_number').value;
    let p = cod+ tell;
    const user: User = {
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
      phone_number: p,//this.validateForm.value.phone_number,
      viber_id: null

    }


    this.myReq.userdetails(user).pipe(
      switchMap((val: any) => { return this.showTable() })
    ).subscribe(() => {
      this.myReq.isOnLoading = false;
      this.isVisible = false;
      this.resetForm();
    })
    this.myReq.isOnLoading = true;

  }

  handleCancel(): void {

    this.isVisible = false;
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  // table

  showTable() {
    return this.myReq.serchUser()
      .pipe(map((elem: any) => {
        this.myReq.total = elem.count;
        this.myReq.tabelItem = elem.results;
      }))

  }

  nzPageIndexChange(page) {

    this.myReq.pageIndex = page;
    if (this.drivingId) {
      this.myReq.pageDrivingSearch(this.drivingId)
        .subscribe((item: any) => {
          this.myReq.isOnLoading = false;
          this.myReq.tabelItem = item.results;
          this.myReq.num = ((this.myReq.pageIndex - 1) * this.myReq.pageSize + 1);
          this.myReq.total = item.count;
        })

      this.myReq.isOnLoading = true;

    } else {

      this.myReq.serchUser()
        .subscribe((elem: any) => {
          this.myReq.isOnLoading = false;
          this.myReq.tabelItem = elem.results;
          this.myReq.num = ((this.myReq.pageIndex - 1) * this.myReq.pageSize + 1);
        })

    }
    this.myReq.isOnLoading = true;
  }

  modelCahnge(el: any) {
    this.myReq.drivingSearch(this.drivingId).
      subscribe((item: any) => {
        this.myReq.pageIndex = 1;
        this.myReq.total = item.count;
        this.myReq.isOnLoading = false;
        this.myReq.tabelItem = item.results;
        this.myReq.num = ((this.myReq.pageIndex - 1) * this.myReq.pageSize + 1);
        this.myReq.num = 1;
        this.myReq.pageSize = 10;

      })

    this.myReq.isOnLoading = true;
  }

  changeActive(id, event) {
    this.http.put(`http://api.yevyev.am/userdetails/edit-user-details/${id}/`, {
      is_active: event
    }).subscribe(() => {
      this.myReq.isOnLoading = false;

    })
    this.myReq.isOnLoading = true;

  }



}
