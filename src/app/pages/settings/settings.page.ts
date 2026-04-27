import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false
})
export class SettingsPage implements OnInit {
  showAboutModal = false;
  showPrivacyModal = false;
  showHowToModal = false;

  // Variabel untuk Profil yang dapat di-custom
  userName: string = 'Alex Sterling';
  userIcon: string = 'person'; // Icon default

  // Daftar icon yang tersedia untuk di-rotate/pilih
  private iconList: string[] = ['person', 'star', 'heart', 'body', 'shirt', 'happy', 'flash', 'sparkles'];

  constructor(private router: Router) {}

  ngOnInit() {
    // Memuat Tema
    const savedTheme = localStorage.getItem('theme');

    // Memuat Nama User dari Storage (jika ada)
    const savedName = localStorage.getItem('user_name');
    if (savedName) {
      this.userName = savedName;
    }

    // Memuat Icon User dari Storage (jika ada)
    const savedIcon = localStorage.getItem('user_icon');
    if (savedIcon) {
      this.userIcon = savedIcon;
    }
  }

  // --- LOGIKA PROFIL ---

  editName() {
    const newName = window.prompt('Masukkan nama baru:', this.userName);
    if (newName !== null && newName.trim() !== '') {
      this.userName = newName.trim();
      localStorage.setItem('user_name', this.userName);
    }
  }

  changeProfileIcon() {
    const currentIndex = this.iconList.indexOf(this.userIcon);
    const nextIndex = (currentIndex + 1) % this.iconList.length;
    this.userIcon = this.iconList[nextIndex];
    localStorage.setItem('user_icon', this.userIcon);
  }

  // --- LOGIKA TAMPILAN ---



  // --- LOGIKA MODAL & NAVIGASI ---

  showAbout() { this.showAboutModal = true; }
  showPrivacy() { this.showPrivacyModal = true; }
  showHowTo() { this.showHowToModal = true; }

  goToSavedResults() {
    this.router.navigate(['/history']);
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  // --- LOGIKA DATA ---

  shareApp() {
    const text = `✨ ShapeCheck — Aplikasi cek body shape & proporsi tubuh!\n\nKenali bentuk tubuhmu dan dapatkan rekomendasi pakaian yang tepat. Gratis & bisa dipakai offline! 💪`;
    if (navigator.share) {
      navigator.share({ title: 'ShapeCheck App', text: text });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert('Link berhasil disalin!');
      });
    }
  }

  resetOnboarding() {
    localStorage.removeItem('onboarding_done');
    this.router.navigate(['/onboarding']);
  }

  clearAllData() {
    const confirmDelete = window.confirm('Yakin ingin menghapus semua data? Riwayat analisis dan preferensi profil akan hilang.');
    if (confirmDelete) {
      localStorage.removeItem('shape_history');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_icon');
      
      // Reset tampilan ke default
      this.userName = 'User';
      this.userIcon = 'person';
      
      alert('Semua data berhasil dibersihkan.');
    }
  }
}