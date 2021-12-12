export class Student {
  _studentName: string = "";
  _surname: string = "";
  _fatherName: string = "";
  _birthDate: Date = new Date();
  _severalMark: number = .0;
  _find: boolean = false;
  _filtered: boolean = true;
  _deleted: boolean = false;

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

  beautifulBirthDate(): string {
    let res: string = this.birthDate.getDate() < 10 ? "0" + this.birthDate.getDate() : this.birthDate.getDate().toString();
    res += ".";
    res += this.birthDate.getMonth() < 10 ? "0" + this.birthDate.getMonth() : this.birthDate.getMonth().toString();
    res += ".";
    res += this.birthDate.getFullYear().toString();

    return res;
  }

}
