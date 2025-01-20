import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  product = {
    name: '',
    type: '',
    picture: '',
    price: 0,
    description: '',
  };

  constructor(private productService: ProductService) {}

  createProduct(): void {
    this.productService.createProduct(this.product).subscribe(
      (response) => {
        alert('Product created successfully!');
        console.log(response);
        // Reset form after successful creation
        this.product = {
          name: '',
          type: '',
          picture: '',
          price: 0,
          description: '',
        };
      },
      (error) => {
        alert('Failed to create product!');
        console.error(error);
      }
    );
  }
}
