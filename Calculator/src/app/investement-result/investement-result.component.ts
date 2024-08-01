import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investement-result',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investement-result.component.html',
  styleUrl: './investement-result.component.css'
})
export class InvestementResultComponent {
  // alternative to constructor injection
private investmentService = inject(InvestmentService);

get results(){
  return this.investmentService.resultData;
}
}
