import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gender-select',
  templateUrl: './gender-select.page.html',
  styleUrls: ['./gender-select.page.scss'],
  standalone: false
})
export class GenderSelectPage {
  selectedGender: string = '';

  genderOptions = [
    {
      key: 'pria',
      title: 'Pria',
      desc: 'Analisis berdasarkan karakteristik tubuh pria.',
      icon: 'male',
      color: 'rgba(79, 195, 247, 0.40)', // Biru transpara
      iconColor: '#4fc3f7'              // Icon biru
    },
    {
      key: 'wanita',
      title: 'Wanita',
      desc: 'Analisis berdasarkan karakteristik tubuh wanita.',
      icon: 'female',
      color: 'rgba(239, 154, 154, 0.50)', // Merah transparan
      iconColor: '#f06292'              // Icon pink
    }
  ];

  constructor(private router: Router) {}

  selectGender(gender: string) {
    this.selectedGender = gender;
    
    // Memberi jeda animasi aktif sebelum navigasi
    setTimeout(() => {
      this.router.navigate(['/mode-select'], {
        queryParams: { gender }
      });
    }, 300);
  }

}