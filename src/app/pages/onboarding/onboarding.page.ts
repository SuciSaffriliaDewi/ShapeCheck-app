import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BodyShapeService } from '../../services/body-shape.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: false
})
export class OnboardingPage implements OnInit {
  currentSlide = 0;

  slides = [
    {
      icon: '📏',
      title: 'Kenali Tubuhmu',
      desc: 'Masukkan ukuran tubuhmu dan temukan body shape serta proporsi tubuhmu secara akurat.',
    },
    {
      icon: '👕',
      title: 'Rekomendasi Pakaian',
      desc: 'Dapatkan rekomendasi pakaian dan aksesori yang paling cocok untuk bentuk tubuhmu.'
    },
    {
      icon: '📱',
      title: 'Offline & Gratis',
      desc: 'ShapeCheck bisa digunakan kapan saja tanpa koneksi internet. Privasi datamu terjaga.'
    }
  ];

  constructor(
    private router: Router,
    private bodyShapeService: BodyShapeService
  ) {}

  ngOnInit() {
    if (this.bodyShapeService.isOnboardingDone()) {
      this.router.navigate(['/gender-select']);
    }
  }

  next() {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
    } else {
      this.finish();
    }
  }

  skip() {
    this.finish();
  }

  finish() {
    this.bodyShapeService.setOnboardingDone();
    this.router.navigate(['/gender-select']);
  }
}