import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage?: Storage;
  constructor() {
    this.storage = window.localStorage;
  }

  set(value: any): boolean {
    if (this.storage) {
      this.storage.setItem(this.uuidv4(), JSON.stringify(value));
      return true;
    }
    return false;
  }
  get(key: string): any {
    const item = window.localStorage.getItem(key);

    return item ? JSON.parse(item) : [];
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }
  private uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }
}
