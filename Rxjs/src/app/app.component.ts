import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
ngOnInit(): void {
  interval(1000).subscribe({
    next: (val) => console.log(val),
  });
}
}
