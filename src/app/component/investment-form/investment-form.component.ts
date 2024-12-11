import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA,ViewChild ,ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IndexedDBService } from '../../services/indexeddb.service';

@Component({
  selector: 'app-investment-form',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './investment-form.component.html',
  styleUrl: './investment-form.component.css'
})
export class InvestmentFormComponent implements OnInit {
  newInvestment = {
    assetType: '',
    quantity: 0,
    purchasePrice: 0,
    date: '',
  };
  assetTypes = ['Stocks', 'Bonds', 'Real Estate', 'Commodities'];
  investmentForm!: FormGroup;
  showReview = false;
  reviewData: any = null; // Stores form data for review
  investments: any

  
  ngOnInit(): void {
    this.createForm();
    this.getAllInvestments()
  }
  constructor(private fb: FormBuilder,private dbService:IndexedDBService){

  }
  createForm() {
    this.investmentForm = this.fb.group({
      assetType: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      purchasePrice: ['', [Validators.required, Validators.min(0.01)]],
      date: ['', Validators.required],
    });
  }

  // Trigger review logic before submission
  async onSubmit() {

    if(this.showReview){
      await this.dbService.addInvestment(this.reviewData);
      this.newInvestment = { assetType: '', quantity: 0, purchasePrice: 0, date: '' };
      this.getAllInvestments();
      this.submitInvestment();
      return
    }else{

      if (this.investmentForm.valid) {
        this.showReview = true;
        this.reviewData = this.investmentForm.value;
      } else {
        this.investmentForm.markAllAsTouched();
      }
    }


  }

  cancel(){
    this.showReview = false;
  }
  async getAllInvestments() {
    this.investments = await this.dbService.getAllInvestments();
    console.log('Submitted Data:', JSON.stringify(this.investments));

  }

  // Final submission logic
  submitInvestment() {
    this.showReview = false;
    this.investmentForm.reset();
  }

  async deleteInvestment(id:any) {
    try {
      await this.dbService.deleteInvestment(id!);
      this.getAllInvestments();
    } catch (error) {
      console.error('Error deleting employee', error);
    }
  }



}

