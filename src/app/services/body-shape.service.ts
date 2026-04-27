import { Injectable } from '@angular/core';
import { bodyShapeData, proporsiData } from '../data/recommendations';

@Injectable({
  providedIn: 'root'
})
export class BodyShapeService {

  analyzeBodyShape(gender: string, bahu: number, dada: number, pinggang: number, hip: number) {
    const g = gender === 'pria' ? 'pria' : 'wanita';

    // Hitung 3 rasio utama
    const WHR = pinggang / hip;
    const SHR = bahu / hip;
    const WSR = pinggang / bahu;

    let shapeKey = '';

    if (g === 'pria') {
      shapeKey = this.classifyPria(WHR, SHR, WSR);
    } else {
      shapeKey = this.classifyWanita(WHR, SHR, WSR);
    }

    return {
      ...bodyShapeData[g][shapeKey],
      ratios: {
        WHR: WHR.toFixed(2),
        SHR: SHR.toFixed(2),
        WSR: WSR.toFixed(2)
      }
    };
  }

  private classifyPria(WHR: number, SHR: number, WSR: number): string {
    // Oval — perut dominan, prioritas pertama
    if (SHR >= 0.98 && SHR <= 1.05 && WSR >= 0.90 && WHR >= 1.00) {
      return 'oval';
    }
    // Triangle — pinggul lebih lebar dari bahu
    if (SHR < 0.95 && WSR > 0.90 && WHR >= 0.95) {
      return 'triangle';
    }
    // Inverted Triangle — bahu jauh lebih lebar
    if (SHR >= 1.18 && WSR <= 0.75) {
      return 'inverted_triangle';
    }
    // Trapezoid — proporsional ideal
    if (SHR >= 1.05 && SHR <= 1.15 && WSR >= 0.75 && WSR <= 0.85) {
      return 'trapezoid';
    }
    // Rectangle — tubuh lurus
    if (SHR >= 0.98 && SHR <= 1.04 && WSR >= 0.85 && WSR <= 0.90) {
      return 'rectangle';
    }

    // Fallback — cari yang paling mendekati
    const scores: { key: string; score: number }[] = [
      {
        key: 'inverted_triangle',
        score: this.rangeScore(SHR, 1.18, 99) + this.rangeScore(WSR, 0, 0.75)
      },
      {
        key: 'trapezoid',
        score: this.rangeScore(SHR, 1.05, 1.15) + this.rangeScore(WSR, 0.75, 0.85)
      },
      {
        key: 'rectangle',
        score: this.rangeScore(SHR, 0.98, 1.04) + this.rangeScore(WSR, 0.85, 0.90)
      },
      {
        key: 'triangle',
        score: this.rangeScore(SHR, 0, 0.95) + this.rangeScore(WSR, 0.90, 99)
      },
      {
        key: 'oval',
        score: this.rangeScore(WHR, 1.00, 99) + this.rangeScore(WSR, 0.90, 99)
      }
    ];

    return scores.sort((a, b) => b.score - a.score)[0].key;
  }

  private classifyWanita(WHR: number, SHR: number, WSR: number): string {
    // Apple — perut dominan
    if (SHR >= 0.90 && SHR <= 1.05 && WSR >= 0.90 && WHR >= 0.90) {
      return 'apple';
    }
    // Hourglass — lekukan ideal
    if (SHR >= 0.95 && SHR <= 1.05 && WHR <= 0.75) {
      return 'hourglass';
    }
    // Pear — pinggul lebih lebar
    if (SHR <= 0.90 && WSR >= 0.85 && WHR >= 0.85) {
      return 'pear';
    }
    // Inverted Triangle — bahu lebih lebar
    if (SHR >= 1.10 && WSR >= 0.75 && WSR <= 0.85) {
      return 'inverted_triangle';
    }
    // Rectangle — tubuh lurus
    if (SHR >= 0.95 && SHR <= 1.05 && WSR >= 0.80 && WSR <= 0.90) {
      return 'rectangle';
    }

    // Fallback
    const scores: { key: string; score: number }[] = [
      {
        key: 'hourglass',
        score: this.rangeScore(SHR, 0.95, 1.05) + this.rangeScore(WHR, 0, 0.75)
      },
      {
        key: 'pear',
        score: this.rangeScore(SHR, 0, 0.90) + this.rangeScore(WHR, 0.85, 99)
      },
      {
        key: 'inverted_triangle',
        score: this.rangeScore(SHR, 1.10, 99) + this.rangeScore(WSR, 0.75, 0.85)
      },
      {
        key: 'rectangle',
        score: this.rangeScore(SHR, 0.95, 1.05) + this.rangeScore(WSR, 0.80, 0.90)
      },
      {
        key: 'apple',
        score: this.rangeScore(WSR, 0.90, 99) + this.rangeScore(WHR, 0.90, 99)
      }
    ];

    return scores.sort((a, b) => b.score - a.score)[0].key;
  }

  // Helper: beri skor 1 jika nilai ada di dalam range, 0 jika tidak
  private rangeScore(val: number, min: number, max: number): number {
    return val >= min && val <= max ? 1 : 0;
  }

  analyzeProporsi(tinggiBadan: number, panjangTorso: number, panjangKaki: number) {
    // Leg-to-Height Ratio (K/T)
    const LHR = panjangKaki / tinggiBadan;

    let proporsiKey = '';
    let lhrLabel = '';

    if (LHR > 0.49) {
      proporsiKey = 'torso_pendek';
      lhrLabel = 'Short Torso / Long Legs';
    } else if (LHR >= 0.46) {
      proporsiKey = 'torso_balance';
      lhrLabel = 'Balanced / Proporsional';
    } else {
      proporsiKey = 'torso_panjang';
      lhrLabel = 'Long Torso / Short Legs';
    }

    return {
      ...proporsiData[proporsiKey],
      LHR: LHR.toFixed(3),
      lhrLabel,
      torsoPercentage: ((panjangTorso / tinggiBadan) * 100).toFixed(1),
      panjangKakiPercentage: ((panjangKaki / tinggiBadan) * 100).toFixed(1)
    };
  }

  // ===== ONBOARDING =====
  setOnboardingDone() {
    localStorage.setItem('onboarding_done', 'true');
  }

  isOnboardingDone(): boolean {
    return localStorage.getItem('onboarding_done') === 'true';
  }

  // ===== HISTORY =====
  saveHistory(data: any) {
    const history = this.getHistory();
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      ...data
    };
    history.unshift(entry);
    localStorage.setItem('shape_history', JSON.stringify(history));
  }

  getHistory(): any[] {
    const raw = localStorage.getItem('shape_history');
    return raw ? JSON.parse(raw) : [];
  }

  deleteHistory(id: number) {
    const history = this.getHistory().filter((h: any) => h.id !== id);
    localStorage.setItem('shape_history', JSON.stringify(history));
  }

  clearAllHistory() {
    localStorage.removeItem('shape_history');
  }
}