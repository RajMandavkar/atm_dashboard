import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTableModule,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('atm-dashboard');

  balance = signal(1200);
  amount = signal<number>(0);
  isCredit = signal(false);

  columns = ['date', 'desc', 'amount'];

  transactions = signal<any[]>([
    { date: '10/25/2023', desc: 'Withdrawal', amount: 100 },
    { date: '10/25/2023', desc: 'Withdrawal', amount: 100 },
    { date: '10/24/2023', desc: 'Deposit', amount: 500 },
    { date: '10/24/2023', desc: 'Deposit', amount: 600 },
  ]);

  submitTransaction() {
  let amt = Number(this.amount());

  if (!amt || amt <= 0) return;

  let today = new Date().toLocaleDateString();

  if (this.isCredit()) {
    this.balance.set(this.balance() - amt);
    this.transactions.set([
      { date: today, desc: 'Withdrawal', amount: amt },
      ...this.transactions()
    ]);
  } else {
    this.balance.set(this.balance() + amt);
    this.transactions.set([
      { date: today, desc: 'Deposit', amount: amt },
      ...this.transactions()
    ]);
  }

  this.amount.set(0);
}
}