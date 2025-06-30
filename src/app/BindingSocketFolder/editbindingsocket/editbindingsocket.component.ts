import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BindingSocket, BindingSocketProducerInner, DefaultService } from '../../generated';
import { BindingSocketServiceService } from '../../binding-socket-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editbindingsocket',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    this.router.navigate(['bindingSocket']);
  }

  saveBindingSocket() {
    if (!this.bindingsocket) return;
  
    const editBindingSocket: bindingSocketJson = {
      _id: this.bindingsocket._id!,
      image: this.picture ?? this.bindingsocket.image!,
      name: this.bindingsocket.name!,
      mpn: this.bindingsocket.mpn!,
      pricemin: this.calculatePriceMin(),
      details: this.bindingsocket.details!,
      project: this.bindingsocket.project!,
      stock: this.bindingsocket.stock!,
      producer: this.bindingsocket.producer!    // assert non-null
    };
  
    this.service.updateBindingSocket(this.bindingsocket._id, editBindingSocket)
      .subscribe(
        response => console.log('Saved!', response),
        err => console.error(err)
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
  mpn: string,
  pricemin: number,
  details: string,
  project: string,
  stock: number,
  producer: BindingSocketProducerInner[]
}
