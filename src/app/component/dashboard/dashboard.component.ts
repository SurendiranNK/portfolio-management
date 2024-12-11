import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA,ViewChild ,ElementRef} from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { first } from 'rxjs/operators';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseChartDirective], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 

})

export class DashboardComponent implements OnInit {


  error: string = '';
  totals: { [key: string]: number } = {};

  assetAllocationLabels: string[] = [];
  assetAllocationData: number[] = [];
  marketTrendLabels: string[] = [];
  marketTrendData: number[] = [];
  performanceMetricLabels: string[] = [];
  performanceMetricData: number[] = [];


  constructor(private dashboardService: DashboardService) {}

  
  ngOnInit(): void {
    this.getData();
    
  }




  getData() {
    this.dashboardService
      .getData()
      .pipe(first())
      .subscribe({
        next: (response) => {
          console.log('Fetched data', JSON.stringify(response));
          this.calculateTotals(response );
          // this.AssetAllocationChart(response.assetAllocation);
          // this.MarketTrendsChart(response.marketTrends);
          // this.PerformanceMetricsChart(response.performanceMetrics);

          this.assetAllocationLabels = response.assetAllocation.map((item: any) => item.category);
      this.assetAllocationData = response.assetAllocation.map((item: any) => item.value);

      // Process Market Trends
      this.marketTrendLabels = response.marketTrends.map((item: any) => item.date);
      this.marketTrendData = response.marketTrends.map((item: any) => item.value);

      // Process Performance Metrics
      this.performanceMetricLabels = response.performanceMetrics.map((item: any) => item.category);
      this.performanceMetricData = response.performanceMetrics.map((item: any) => item.value);
        },
        error: (error) => {
          this.error = error;
          console.error('Dashboard data failed to load', error);
        },
      });
  }


  calculateTotals(data:any): void {
    this.totals = {
      assetAllocation: this.calculateTotal(data.assetAllocation, 'value'),
      marketTrends: this.calculateTotal(data.marketTrends, 'value'),
      performanceMetrics: this.calculateTotal(data.performanceMetrics, 'value')
    };
  }

  calculateTotal(items: any[], key: string): number {
    return items.reduce((sum, item) => sum + item[key], 0);
  }

  // AssetAllocationChart(data: any): void {
  //   this.assetAllocationData = {
  //     labels: data.map((d: any) => d.category),
  //     datasets: [
  //       {
  //         label: 'Asset Allocation',
  //         data: data.map((d: any) => d.value),
  //         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
  //       }
  //     ]
  //   };
  // }

  // MarketTrendsChart(data: any): void {
  //   this.marketTrendsData = {
  //     labels: data.map((d: any) => d.date),
  //     datasets: [
  //       {
  //         label: 'Market Trends',
  //         data: data.map((d: any) => d.value),
  //         borderColor: '#36A2EB',
  //         backgroundColor: 'rgba(54, 162, 235, 0.2)',
  //         fill: true
  //       }
  //     ]
  //   };
  // }

  // PerformanceMetricsChart(data: any): void {
  //   this.performanceMetricsData = {
  //     labels: data.map((d: any) => d.category),
  //     datasets: [
  //       {
  //         label: 'Performance Metrics',
  //         data: data.map((d: any) => d.value),
  //         backgroundColor: '#FF6384'
  //       }
  //     ]
  //   };
  // }
}