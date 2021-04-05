import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from '@common/service/product.service';
import {Product} from '@common/models/product.model'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'amount', 'price', 'actions'];
  dataSource: MatTableDataSource<Product>;

  constructor(
    private service: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.service.listAll().subscribe(results => {
      this.products = results;
      this.dataSource = new MatTableDataSource(this.products);
    });
  }

  onAdd(): void {
    this.router.navigate(['create'], { queryParams: { returnUrl: this.router.url }, relativeTo: this.route });
  }

  onEdit(product: Product): void {
    this.router.navigate(['edit', product.id], { queryParams: { returnUrl: this.router.url }, relativeTo: this.route });
  }

  onRemove(product: Product): void {
    this.service.delete(product.id).subscribe((deletar) => {
      const index = this.products.indexOf(product);
      this.products.splice(index, 1);
      this.dataSource.data = this.products;
    });
  }

}
