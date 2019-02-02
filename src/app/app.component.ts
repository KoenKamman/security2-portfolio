import { Component, ChangeDetectorRef, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "security2-portfolio";
  sidenavOpen = true;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.matIconRegistry.addSvgIcon(
      "github",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/icons/github.svg"
      )
    );
  }

  public ngOnInit(): void {
    let resize = () => {
      if (window.innerWidth > 768) {
        this.sidenavOpen = true;
      } else {
        this.sidenavOpen = false;
      }
    };
    window.onresize = resize;
    resize();
  }

  public scroll(element: Element): void {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
