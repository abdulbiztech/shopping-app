import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit{
  countdown: number = 5;
  constructor(private router:Router){}
  ngOnInit(): void {
     this.startCountdown();
    setTimeout(() => {
      this.router.navigate(['/products']);
    }, 5000);
  }
  startCountdown() {
    const countdownInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);
  }
}
