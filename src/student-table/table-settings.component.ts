import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-table-settings",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./table-settings.component.html",
  styleUrls: ["./table-settings.component.css"]
})
export class TableSettingsComponent{

  enableToNoticeBadMarks: boolean = true;

  @Output() public eTNBMEmitter: EventEmitter<boolean> = new EventEmitter<boolean>(this.enableToNoticeBadMarks);

  getNoticeBadMarks(): boolean {
    return this.enableToNoticeBadMarks;
  }

  toggleNoticeBadMarks(): void {
    this.enableToNoticeBadMarks = !this.enableToNoticeBadMarks;
    this.eTNBMEmitter.emit(this.enableToNoticeBadMarks);
  }

  runChangeDetection(): void { }
}
