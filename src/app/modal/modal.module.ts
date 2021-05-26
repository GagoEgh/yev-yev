
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.modal";
import { TableComponent } from "../table/table.component";
import { CytisComponent } from "./cytis/citys.component";
import { FormComponent } from "./form/form.component";
import { LoadComponent } from "./load/load.component";



@NgModule({
      declarations:[CytisComponent,FormComponent,TableComponent,LoadComponent],
      exports:[CytisComponent,FormComponent,TableComponent,LoadComponent],
      imports:[SharedModule]
}) export class ModalModule{}