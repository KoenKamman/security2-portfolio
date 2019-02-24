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

  assignment2DisplayedColumns: string[] = [
    "threat",
    "title",
    "description",
    "location",
    "mitigation"
  ];
  assignment2TableDataSource = [
    {
      threat: "Spoofing",
      title: "Spoofing the Client (Phone) External Entity",
      description:
        "Client (Phone) may be spoofed by an attacker and this may lead to unauthorized access to Google Drive Backup Processing. Consider using a standard authentication mechanism to identify the external entity.",
      location: "Client (Phone) --> Google Drive Backup Processing",
      mitigation: "Authenticatie procedure tussen gebruiker en server."
    },
    {
      threat: "Tampering",
      title: "Persistent Cross Site Scripting",
      description:
        "The web server 'Google Drive Backup Processing' could be a subject to a persistent cross-site scripting attack because it does not sanitize data store 'Google Cloud Storage' inputs and output.",
      location: "Google Drive Backup Processing --> Google Cloud Storage",
      mitigation: "Filters toepassen om code uit data input te verwijderen."
    },
    {
      threat: "Repudiation",
      title: "Non-repudiation sending messages.",
      description:
        "Client (Phone) could deny having sent a certain message due to poor authentication or insecuring logging.",
      location: "Client (Phone) --> Message processing",
      mitigation:
        "Securing logging with encryption. Stronger authentication and signing messages with encryption keys."
    },
    {
      threat: "Information Disclosure",
      title: "Weak Access Control for a Resource",
      description:
        "Improper data protection of Cache can allow an attacker to read information not intended for disclosure. Review authorization settings.",
      location: "WhatsApp Server --> Cache",
      mitigation:
        "Data encrypten voordat het verzonden en opgeslagen wordt in een data store."
    },
    {
      threat: "Denial Of Service",
      title:
        "Potential Excessive Resource Consumption for WhatsApp Server or Cache",
      description:
        "Does WhatsApp Server or Cache take explicit steps to control resource consumption? Resource consumption attacks can be hard to deal with, and there are times that it makes sense to let the OS do the job. Be careful that your resource requests don't deadlock, and that they do timeout.",
      location: "WhatsApp Server --> Cache",
      mitigation:
        "Filteren van recurring requests, quotas zetten op het aantal requests per gebruiker (per interval)."
    },
    {
      threat: "Elevation Of Privilege",
      title: "Elevation Using Impersonation",
      description:
        "Client (Webbrowser) may be able to impersonate the context of Message processing in order to gain additional privilege.",
      location: "Message Processing --> Client (Webbrowser)",
      mitigation:
        "Access Control Lists om alleen geverifieerde apparaten bepaalde acties te laten uitvoeren."
    }
  ];

  assignment3DisplayedColumns: string[] = ["threat", "location", "description"];
  assignment3TableDataSource = [
    {
      threat: "Cross Site Scripting",
      location: "Browser Client ← → Web Server",
      description:
        "De webserver zuivert de input van data niet, waardoor schadelijke input (code) toegelaten wordt door de webserver."
    },
    {
      threat: "Persistent Cross Site Scripting",
      location: "Web Server ← → Memory",
      description:
        "Aangezien de webserver de input die persistent wordt opgeslagen niet zuivert, kan schadelijke code persistent opgeslagen worden. Deze kan vervolgens teruggestuurd worden naar meerdere gebruikers."
    }
  ];

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
