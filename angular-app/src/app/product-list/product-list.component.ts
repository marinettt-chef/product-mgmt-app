import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = []; // All products fetched from the backend
  filteredProducts: Product[] = []; // Filtered products to display in the table
  paginatedProducts: Product[] = []; // Products displayed on the current page
  searchTerm: string = ''; // Search term entered by the user
  sortDirection: { [key: string]: boolean } = {}; // Sort direction for each column

  currentPage: number = 1; // Current page number
  itemsPerPage: number = 3; // Number of items per page

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = data; // Initialize filteredProducts to show all products
        this.updatePaginatedProducts(); // Update paginated products for the first page
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  filterProducts(): void {
    const searchTermLower = this.searchTerm.toLowerCase(); // Convert to lowercase for case-insensitive comparison
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchTermLower)
    );
    this.currentPage = 1; // Reset to the first page after filtering
    this.updatePaginatedProducts();
  }

  sortBy(column: keyof Product): void {
    this.sortDirection[column] = !this.sortDirection[column];
    this.filteredProducts.sort((a, b) => {
      const valueA = a[column] ?? '';
      const valueB = b[column] ?? '';
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection[column] ? valueA - valueB : valueB - valueA;
      } else {
        return this.sortDirection[column]
          ? String(valueA).localeCompare(String(valueB))
          : String(valueB).localeCompare(String(valueA));
      }
    });
    this.updatePaginatedProducts();
  }

  updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }
}
