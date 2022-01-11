import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent{

  constructor() { }

  enableToNoticeBadMarks: boolean = true;

  toggleNoticeBadMarks(res: boolean): void {
    this.enableToNoticeBadMarks = res;
  }

  runChangeDetection(): void {
    console.log('Checking view from -- app -- !!!');
  }
}
