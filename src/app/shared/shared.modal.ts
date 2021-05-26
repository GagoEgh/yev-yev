import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ColorPickerModule } from 'ngx-color-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@NgModule({
      declarations: [],
      imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
           
      ],
      exports: [
            NzModalModule,
            NzTabsModule,
            NzFormModule,
            NzSelectModule,
            NzButtonModule,
            NzTableModule,
            ColorPickerModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            NzMessageModule,
            NzPaginationModule,
            NzIconModule,
            NzSwitchModule
           
      ]

}) export class SharedModule {

}