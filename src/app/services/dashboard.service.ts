import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}
  getData(): Observable<Root> {
    return this.http.get<Root>('https://run.mocky.io/v3/c33a7f1a-bd16-439d-a8d1-0d366e6a258d');
  }
}

export interface Root {
  assetAllocation: AssetAllocation[];
  marketTrends: MarketTrend[];
  performanceMetrics: PerformanceMetric[];
}

export interface AssetAllocation {
  category: string;
  value: number;
}

export interface MarketTrend {
  date: string;
  value: number;
}

export interface PerformanceMetric {
  category: string;
  value: number;
}
