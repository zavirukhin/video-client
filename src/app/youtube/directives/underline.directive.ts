import {
  Directive,
  ElementRef,
  Input,
  AfterViewInit,
} from '@angular/core';

enum Colors {
  blue = '#2F80ED',
  green = '#27AE60',
  yellow = '#F2C94C',
  red = '#EB5757',
}

@Directive({
  selector: '[appUnderline]',
})
export class UnderlineDirective implements AfterViewInit {
  @Input() publishedAt: string;

  constructor(private elementRef: ElementRef) {}

  private getDays(d1: Date, d2: Date): number {
    const days = Math.abs((d1.getTime() - d2.getTime()) / (1000 * 3600 * 24));
    return Math.floor(days);
  }

  private getMonths(d1: Date, d2: Date): number {
    const months = Math.abs((d1.getFullYear() - d2.getFullYear())) * 12;
    return months + Math.abs(d1.getMonth() - d2.getMonth());
  }

  ngAfterViewInit(): void {
    const days = this.getDays(new Date(this.publishedAt), new Date());
    const months = this.getMonths(new Date(this.publishedAt), new Date());
    if (days < 7) this.elementRef.nativeElement.style.background = Colors.blue;
    else if (days >= 7 && months < 1) this.elementRef.nativeElement.style.background = Colors.green;
    else if (months >= 1 && months < 6) {
      this.elementRef.nativeElement.style.background = Colors.yellow;
    } else this.elementRef.nativeElement.style.background = Colors.red;
  }
}
