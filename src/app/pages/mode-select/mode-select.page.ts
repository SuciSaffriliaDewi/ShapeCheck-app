import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mode-select',
  templateUrl: './mode-select.page.html',
  styleUrls: ['./mode-select.page.scss'],
  standalone: false
})
export class ModeSelectPage implements OnInit {
  gender: string = '';

  // Penyesuaian pada properti color menggunakan RGBA
  // Ini agar warna kartu tetap elegan di mode terang maupun gelap
  modes = [
    {
      key: 'full',
      icon: 'body-outline',
      title: 'Analisis Full',
      desc: 'Body shape + proporsi tubuh',
      color: 'rgba(79, 195, 247, 0.40)', // Biru transparan
      iconColor: '#4fc3f7'
    },
    {
      key: 'bodyshape',
      icon: 'shirt-outline',
      title: 'Body Shape',
      desc: 'Kenali bentuk tubuhmu',
      color: 'rgba(129, 199, 132, 0.50)', // Hijau transparan
      iconColor: '#81c784'
    },
    {
      key: 'proporsi',
      icon: 'resize-outline',
      title: 'Proporsi Torso',
      desc: 'Analisis panjang proporsi tubuh',
      color: 'rgba(239, 154, 154, 0.50)', // Merah transparan
      iconColor: '#ef9a9a'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.gender = params['gender'] || '';
    });
  }

  selectMode(modeKey: string) {
    this.router.navigate(['/input-form'], {
      queryParams: { gender: this.gender, mode: modeKey }
    });
  }

  goBack() {
    this.router.navigate(['/gender-select']);
  }

 showHowToModal = false;
showHowTo() {
  this.showHowToModal = true;
}
}