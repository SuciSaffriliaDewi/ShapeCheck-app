import { Component, OnInit, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Keyboard } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {
  showBottomNav = false;
  activeTab = 'gender-select';
  isKeyboardOpen = false;

  navPages = ['gender-select', 'history', 'settings'];

  constructor(
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    // Deteksi perubahan halaman
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      this.showBottomNav = this.navPages.some(page => url.includes(page));
      const matched = this.navPages.find(page => url.includes(page));
      if (matched) this.activeTab = matched;
    });

    // Deteksi keyboard hanya di device native (Android/iOS)
    // Di browser/web tidak perlu karena keyboard tidak mengganggu
    if (Capacitor.isNativePlatform()) {
      Keyboard.addListener('keyboardWillShow', () => {
        // Jalankan di dalam NgZone agar Angular mendeteksi perubahan
        this.ngZone.run(() => {
          this.isKeyboardOpen = true;
        });
      });

      Keyboard.addListener('keyboardWillHide', () => {
        this.ngZone.run(() => {
          this.isKeyboardOpen = false;
        });
      });
    }
  }

  navigateTo(page: string) {
    this.activeTab = page;
    this.router.navigate([`/${page}`]);
  }

  ngOnDestroy() {
    // Bersihkan listener saat component dihancurkan
    if (Capacitor.isNativePlatform()) {
      Keyboard.removeAllListeners();
    }
  }
}