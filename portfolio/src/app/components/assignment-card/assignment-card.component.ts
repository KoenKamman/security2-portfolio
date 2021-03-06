import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-assignment-card",
  templateUrl: "./assignment-card.component.html",
  styleUrls: ["./assignment-card.component.scss"]
})
export class AssignmentCardComponent implements OnInit {
  @Input() public title: string;
  @Input() public subtitle: string;

  constructor() {}

  ngOnInit() {}
}
