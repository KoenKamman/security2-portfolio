import { NgModule } from "@angular/core";
import {
  MatToolbarModule,
  MatRippleModule,
  MatButtonModule,
  MatIconModule,
  MatGridListModule
} from "@angular/material";

@NgModule({
  imports: [
    MatToolbarModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule
  ],
  exports: [
    MatToolbarModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule
  ]
})
export class MaterialModule {}
