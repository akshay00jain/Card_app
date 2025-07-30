import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({ providedIn: 'root' })
export class CardService {
  private cardsSubject = new BehaviorSubject<Card[]>([]);
  cards$ = this.cardsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCards();
  }

  private loadCards() {
    this.http.get<Card[]>('assets/data/cards.json').subscribe(data => {
      this.cardsSubject.next(data);
    });
  }

  updateCard(updatedCard: Card) {
    const cards = this.cardsSubject.value.map(card =>
      card.id === updatedCard.id ? updatedCard : card
    );
    this.cardsSubject.next(cards);
  }
}