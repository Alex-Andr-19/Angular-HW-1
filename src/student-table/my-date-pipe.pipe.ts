import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "myDatePipe"
})
export class MyDatePipePipe implements PipeTransform {

  transform(value: Date): string {
    return `${value.getDate() < 10 ? "0" + value.getDate() : value.getDate()}.${value.getMonth() < 10 ? "0" + value.getMonth() : value.getMonth()}.${value.getFullYear()}`;
  }

}
