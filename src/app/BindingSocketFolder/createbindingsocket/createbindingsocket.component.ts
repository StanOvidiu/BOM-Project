import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DefaultService } from '../../generated';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createbindingsocket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './createbindingsocket.component.html',
  styleUrl: './createbindingsocket.component.css'
})

export class CreatebindingsocketComponent {

  producersList:Array<producerDetails> = [];

  constructor(private service:DefaultService, private router: Router){}

  picture:string = "";

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.picture = (reader.result as string).replace(/^data:image\/[a-z]+;base64,/, '');
      };
      reader.readAsDataURL(file);
    }
  }

  create() {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const size = parseFloat((document.getElementById('size') as HTMLInputElement).value);
    const color = (document.getElementById('color') as HTMLInputElement).value;
    const mpn = (document.getElementById('mpn') as HTMLInputElement).value;
    const pricemin = this.calculatePriceMin();
    const details = (document.getElementById('details') as HTMLInputElement).value;
    const project = (document.getElementById('project') as HTMLInputElement).value;
    const stock = parseFloat((document.getElementById('stock') as HTMLInputElement).value);
    const subcategory = (document.getElementById('subcategory') as HTMLInputElement).value;

    console.log("subcategory:", subcategory)

    const socket:bindingSocketJson = {
      image: this.picture,
      name,
      size,
      color,
      mpn,
      pricemin,
      details,
      project,
      stock,
      producer: this.producersList,
      subcategory
    }

    this.service.createBindingSocket(socket)
      .subscribe(
        (response) => {
          console.log('Binding Socket created successfully:', response);
        },
        (error) => {
          console.error('Error creating Binding Socket:', error);
        }
      );
    

    (document.getElementById('image') as HTMLInputElement).value = '';
    (document.getElementById('name') as HTMLInputElement).value = '';
    (document.getElementById('size') as HTMLInputElement).value = '';
    (document.getElementById('color') as HTMLInputElement).value = '';
    (document.getElementById('mpn') as HTMLInputElement).value = '';
    (document.getElementById('details') as HTMLInputElement).value = '';
    (document.getElementById('project') as HTMLInputElement).value = '';
    (document.getElementById('stock') as HTMLInputElement).value = '';

    this.router.navigate(['/bindingSocket'])
  }

  calculatePriceMin(){
    if (this.producersList.length > 0) {
      return Math.min(...this.producersList.map(producer => producer.price));
    } else {
      return 0;
    }
  }

  addProducer() {
    const name = (document.getElementById('pname') as HTMLInputElement).value;
    const productCode = (document.getElementById('code') as HTMLInputElement).value;
    const quantity = parseInt((document.getElementById('qty') as HTMLInputElement).value, 10);
    const price = parseFloat((document.getElementById('price') as HTMLInputElement).value);

    const details:producerDetails = {
      name,
      productCode,
      quantity,
      price
    };

    this.producersList.push(details);

    console.log(this.producersList);

    (document.getElementById('pname') as HTMLInputElement).value = '';
    (document.getElementById('code') as HTMLInputElement).value = '';
    (document.getElementById('qty') as HTMLInputElement).value = '';
    (document.getElementById('price') as HTMLInputElement).value = '';
  }
}

interface producerDetails {
  name: string;
  productCode: string;
  quantity: number;
  price: number;
}

interface bindingSocketJson {
  image: string,
  name: string,
  size: number,
  color: string,
  mpn: string,
  pricemin: number,
  details: string,
  project: string,
  stock: number,
  producer: producerDetails[],
  subcategory: string
}