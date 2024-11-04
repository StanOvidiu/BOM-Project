import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BindingSocket, BindingSocketProducerInner, DefaultService } from '../../generated';
import { BindingSocketServiceService } from '../../binding-socket-service.service';

@Component({
  selector: 'app-editbindingsocket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editbindingsocket.component.html',
  styleUrl: './editbindingsocket.component.css'
})

export class EditbindingsocketComponent {

  producersList:Array<BindingSocketProducerInner> = [];
  bindingsocket: BindingSocket = {};
  picture:string = "";

  constructor(private router: Router, private bindingSocketService: BindingSocketServiceService, private service: DefaultService) {
    
  }

  ngOnInit(): void {
    this.bindingSocketService.currentBindingSocket.subscribe(data =>{
      if(data){
        this.bindingsocket = data;
        this.producersList = this.bindingsocket.producer ? this.bindingsocket.producer : [];
        this.picture = this.bindingsocket.image ? this.bindingsocket.image : "";
      }
    });
  }

  goBack(){
    this.router.navigate(['/']);
  }

  saveBindingSocket() {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const size = parseFloat((document.getElementById('size') as HTMLInputElement).value);
    const color = (document.getElementById('color') as HTMLInputElement).value;
    const mpn = (document.getElementById('mpn') as HTMLInputElement).value;
    const details = (document.getElementById('details') as HTMLInputElement).value;
    const project = (document.getElementById('project') as HTMLInputElement).value;
    const stock = parseFloat((document.getElementById('stock') as HTMLInputElement).value);
    
    if(this.bindingsocket){
      this.picture = this.picture ?? this.bindingsocket.image;
      this.producersList = this.bindingsocket.producer?.map((producer: BindingSocketProducerInner, index: number) => {
        const productname = (document.getElementById(`name${index}`) as HTMLInputElement).value;
        //const productCode = (document.getElementById(`productCode${index}`) as HTMLInputElement).value;
        const quantity = parseFloat((document.getElementById(`quantity${index}`) as HTMLInputElement).value);
        const price = parseFloat((document.getElementById(`price${index}`) as HTMLInputElement).value);
        //return { productname, productCode, quantity, price };
        return { productname, quantity, price };
    }) ?? [];
    }
    

    const editBindingSocket:bindingSocketJson = {
      _id: this.bindingsocket._id,
      image: this.picture,
      name,
      size,
      color,
      mpn,
      pricemin: this.calculatePriceMin(),
      details,
      project,
      stock,
      producer: this.producersList
    }

    this.service.updateBindingSocket(this.bindingsocket._id, editBindingSocket)
    .subscribe(
      (response) => {
        console.log('Binding Socket created successfully:', response);
      },
      (error) => {
        console.error('Error creating Binding Socket:', error);
      }
    );

    this.router.navigate(['/bindingSocket']);
  }

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

  calculatePriceMin(){

    const validPrice = this.producersList.filter(producer => producer.price !== undefined && producer.price > 0);

    if (validPrice.length > 0) {
      return Math.min(...validPrice.map(producer => producer.price!));
    } else {
      return 0;
    }
  }

  addProducer(){
    const newProducer:producerDetails = {
      name: '',
      quantity: 0,
      price: 0
    };
    if(this.bindingsocket.producer){
      this.bindingsocket.producer.unshift(newProducer);
    }
    this.producersList = this.bindingsocket.producer!;
  }
}

interface producerDetails {
  name: string;
  quantity: number;
  price: number;
}

interface bindingSocketJson {
  _id: string,
  image: string,
  name: string,
  size: number,
  color: string,
  mpn: string,
  pricemin: number,
  details: string,
  project: string,
  stock: number,
  producer: BindingSocketProducerInner[]
}
