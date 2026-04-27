import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BodyShapeService } from '../../services/body-shape.service';
import { ToastController } from '@ionic/angular'; // Tambahkan toast untuk feedback user

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
  standalone: false
})
export class ResultPage implements OnInit {
  gender: string = '';
  mode: string = '';
  bodyShapeResult: any = null;
  proporsiResult: any = null;
  isSaved: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bodyShapeService: BodyShapeService,
    private toastController: ToastController // Untuk notifikasi save/share
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.gender = params['gender'];
      this.mode = params['mode'];

      // Logika Analisis Body Shape
      if (this.mode === 'bodyshape' || this.mode === 'full') {
        this.bodyShapeResult = this.bodyShapeService.analyzeBodyShape(
          this.gender,
          +params['bahu'],
          +params['dada'],
          +params['pinggang'],
          +params['hip']
        );
      }

      // Logika Analisis Proporsi
      if (this.mode === 'proporsi' || this.mode === 'full') {
        this.proporsiResult = this.bodyShapeService.analyzeProporsi(
          +params['tinggiBadan'],
          +params['panjangTorso'],
          +params['panjangKaki']
        );
      }
    });
  }

  async saveResult() {
    if (this.isSaved) return;

    const data: any = {
      date: new Date().toISOString(),
      gender: this.gender,
      mode: this.mode,
      emoji: this.bodyShapeResult?.emoji || '📏',
      shape: this.bodyShapeResult?.shape || this.proporsiResult?.label,
    };

    if (this.bodyShapeResult) data.bodyShape = this.bodyShapeResult;
    if (this.proporsiResult) data.proporsi = this.proporsiResult;

    this.bodyShapeService.saveHistory(data);
    this.isSaved = true;

    const toast = await this.toastController.create({
      message: 'Analisis berhasil disimpan ke Riwayat!',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }

  async shareResult() {
    let text = `📊 Hasil Analisis ShapeCheck\n`;
    text += `👤 ${this.gender === 'pria' ? 'Pria' : 'Wanita'}\n\n`;

    if (this.bodyShapeResult) {
      text += `✨ Body Shape: ${this.bodyShapeResult.emoji} ${this.bodyShapeResult.shape}\n`;
      text += `✅ Tips: ${this.bodyShapeResult.cocok?.slice(0, 2).join(', ')}\n`;
    }

    if (this.proporsiResult) {
      text += `📏 Proporsi: ${this.proporsiResult.label}\n`;
    }

    text += `\nCek bentuk tubuhmu di ShapeCheck! 💪`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Body Analysis', text });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(text);
      const toast = await this.toastController.create({
        message: 'Teks berhasil disalin ke clipboard!',
        duration: 2000,
        color: 'dark'
      });
      toast.present();
    }
  }

  // Tambahkan fungsi ini agar tidak error di HTML yang baru

  // Fungsi navigasi untuk Bottom Bar
  goToHistory() {
    this.router.navigate(['/history']); // Sesuaikan dengan route history kamu
  }

  goToSettings() {
    this.router.navigate(['/settings']); // Sesuaikan dengan route settings kamu
  }

  goBack() {
    this.router.navigate(['/input-form'], {
      queryParams: { gender: this.gender, mode: this.mode }
    });
  }

  restart() {
    this.router.navigate(['/gender-select']);
  }
}