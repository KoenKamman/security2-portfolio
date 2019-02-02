import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { MaterialModule } from "./modules/material/material.module";
import { HttpClientModule } from "@angular/common/http";
import { AssignmentCardComponent } from "./components/assignment-card/assignment-card.component";

@NgModule({
  declarations: [AppComponent, AssignmentCardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
