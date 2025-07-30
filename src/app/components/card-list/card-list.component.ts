import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/models/card.model';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent implements OnInit {
  cards: Card[] = [];

  constructor(private cardService: CardService, private dialog: MatDialog) {}

  ngOnInit() {
    this.cardService.cards$.subscribe(cards => this.cards = cards);
  }

  editCard(card: Card) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { ...card },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cardService.updateCard(result);
      }
    });
  }
}