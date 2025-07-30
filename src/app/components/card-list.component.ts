import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card-list',
  template: \`
    <div *ngFor="let card of cards" style="margin-bottom: 1rem;">
      <mat-card>
        <mat-card-title>{{card.title}}</mat-card-title>
        <mat-card-content>{{card.description}}</mat-card-content>
        <button mat-button (click)="openEditDialog(card)">Edit</button>
      </mat-card>
    </div>
  \`
})
export class CardListComponent implements OnInit {
  cards: any[] = [];

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('assets/cards.json').subscribe(data => {
      this.cards = data;
    });
  }

  openEditDialog(card: any): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: { ...card }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.cards.findIndex(c => c.id === result.id);
        if (index !== -1) {
          this.cards[index].description = result.description;
        }
      }
    });
  }
}