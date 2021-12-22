export class Student {
  private _studentName: string;
  private _surname: string;
  private _fatherName: string;
  private _birthDate: Date;
  private _severalMark: number;
  private _find: boolean = false;
  private _filtered: boolean = true;
  private _deleted: boolean = false;

  constructor(name: string, surname: string, fatherName: string, birthDate: Date, severalMark: number ) {
    this._studentName = name;
    this._surname = surname;
    this._fatherName = fatherName;
    this._birthDate = birthDate;
    this._severalMark = severalMark;
  }

  get studentName(): string {
    return this._studentName;
  }

  get surname(): string {
    return this._surname;
  }

  get fatherName(): string {
    return this._fatherName;
  }

  get birthDate(): Date {
    return this._birthDate;
  }

  get severalMark(): number {
    return this._severalMark;
  }

  get find(): boolean {
    return this._find;
  }

  set find(value: boolean) {
    this._find = value;
  }

  get filtered(): boolean {
    return this._filtered;
  }

  set filtered(value: boolean) {
    this._filtered = value;
  }

  get deleted(): boolean {
    return this._deleted;
  }

  set deleted(value: boolean) {
    this._deleted = value;
  }

  getProp(key: string): Date | number | string  {
    switch (key) {
      case "name":
        return this.studentName;
      case "surname":
        return this.surname;
      case "fatherName":
        return this.fatherName;
      case "birthDate":
        return this.birthDate;
      case "marks":
        return this.severalMark;
      default:
        return this.studentName;
    }
  }

  getAllProps(): string[] {
    return ["studentName", "surname", "fatherName", "birthDate", "severalMark", "find", "filtered", "deleted"];
  }

  isEqual(student: Student): boolean {
    let res: boolean = true;

    const allProps: string[] = this.getAllProps();
    for (let prop of allProps) {
      if (this.getProp(prop) !== student.getProp(prop)) {
        res = false;
        break;
      }
    }

    return res;
  }
}
