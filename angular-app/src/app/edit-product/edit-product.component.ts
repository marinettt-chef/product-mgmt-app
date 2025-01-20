import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  productId!: number; // ID of the product to edit
  product = {
    name: '',
    type: '',
    picture: '',
    price: 0,
    description: '',
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get product ID from route params
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct();
  }

  loadProduct(): void {
    this.productService.getProducts().subscribe((products) => {
      const product = products.find((p) => p.id === this.productId);
      if (product) {
        this.product = product;
      } else {
        alert('Product not found!');
        this.router.navigate(['/']);
      }
    });
  }

  updateProduct(): void {
    this.productService.updateProduct(this.productId, this.product).subscribe(
      () => {
        alert('Product updated successfully!');
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error updating product:', error);
        alert('Failed to update product!');
      }
    );
  }
}
