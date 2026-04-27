import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BodyShapeService } from '../../services/body-shape.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: false
})
export class HistoryPage implements OnInit {
  historyList: any[] = [];
  selectedItem: any = null;
  showDetailModal = false;

  constructor(
    private router: Router,
    private bodyShapeService: BodyShapeService
  ) {}

  ngOnInit() {
    this.loadHistory();
  }

  ionViewWillEnter() {
    this.loadHistory();
  }

  loadHistory() {
    this.historyList = this.bodyShapeService.getHistory();
  }

  openDetail(item: any) {
    this.selectedItem = item;
    this.showDetailModal = true;
  }

  closeDetail() {
    this.showDetailModal = false;
    this.selectedItem = null;
  }

  deleteItem(id: number) {
    this.bodyShapeService.deleteHistory(id);
    this.loadHistory();
  }

  clearAll() {
    const confirm = window.confirm('Yakin ingin menghapus semua data tersimpan?');
    if (confirm) {
      this.bodyShapeService.clearAllHistory();
      this.loadHistory();
    }
  }

  goBack() {
    this.router.navigate(['/gender-select']);
  }

  getModeLabel(mode: string): string {
    if (mode === 'full') return 'Analisis Full';
    if (mode === 'bodyshape') return 'Body Shape';
    return 'Proporsi Torso';
  }
}