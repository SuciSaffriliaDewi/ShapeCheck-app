import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.page.html',
  styleUrls: ['./input-form.page.scss'],
  standalone: false
})
export class InputFormPage implements OnInit {
  gender: string = '';
  mode: string = 'full';

  // Body shape measurements
  bahu: number | null = null;
  dada: number | null = null;
  pinggang: number | null = null;
  hip: number | null = null;

  // Proportion measurements
  tinggiBadan: number | null = null;
  panjangTorso: number | null = null;
  panjangKaki: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    // Mengambil data dari navigasi sebelumnya (Gender & Mode)
    this.route.queryParams.subscribe(params => {
      this.gender = params['gender'] || 'pria'; // fallback ke pria
      this.mode = params['mode'] || 'full';
    });
  }

  /**
   * Validasi Form berdasarkan mode yang dipilih
   */
  isFormValid(): boolean {
    if (this.mode === 'bodyshape') {
      return !!(this.bahu && this.dada && this.pinggang && this.hip);
    } 
    if (this.mode === 'proporsi') {
      return !!(this.tinggiBadan && this.panjangTorso && this.panjangKaki);
    } 
    // Full Mode
    return !!(
      this.bahu && this.dada && this.pinggang && this.hip &&
      this.tinggiBadan && this.panjangTorso && this.panjangKaki
    );
  }

  /**
   * Mengirim data ke halaman Result
   */
  analyze() {
    if (!this.isFormValid()) return;

    // Menyiapkan payload data
    const analysisData: any = {
      gender: this.gender,
      mode: this.mode,
      timestamp: new Date().getTime() // Untuk keperluan history nanti
    };

    // Tambahkan data body shape jika relevan
    if (this.mode === 'bodyshape' || this.mode === 'full') {
      Object.assign(analysisData, {
        bahu: this.bahu,
        dada: this.dada,
        pinggang: this.pinggang,
        hip: this.hip
      });
    }

    // Tambahkan data proporsi jika relevan
    if (this.mode === 'proporsi' || this.mode === 'full') {
      Object.assign(analysisData, {
        tinggiBadan: this.tinggiBadan,
        panjangTorso: this.panjangTorso,
        panjangKaki: this.panjangKaki
      });
    }

    // Navigasi ke halaman hasil
    this.router.navigate(['/result'], { 
      queryParams: analysisData 
    });
  }

  /**
   * Kembali ke pemilihan mode dengan membawa data gender
   */
  goBack() {
    this.navCtrl.navigateBack(['/mode-select'], {
      queryParams: { gender: this.gender }
    });
  }

  /**
   * Helper untuk judul dinamis di Header
   */
  getModeLabel(): string {
    switch (this.mode) {
      case 'full': return 'Full Analysis';
      case 'bodyshape': return 'Body Shape';
      case 'proporsi': return 'Proporsi Torso';
      default: return 'Input Data';
    }
  }

  /**
   * Fungsi placeholder untuk tombol bantuan (?) di header
   */
 showHowToModal = false;
showHowTo() {
  this.showHowToModal = true;
}
}