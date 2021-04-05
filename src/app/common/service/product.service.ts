import { Injectable } from '@angular/core';
import { Product } from '@common/models/product.model';
import { environment } from '@environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { catchError } from 'rxjs/operators';
import { ProductType } from '@common/models/product-type.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService {
  constructor(
    public http: HttpClient
  ) {
    super();
   }

  listAll(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${environment.API_ENDPOINT}/products`);
  }

  listAllProductTypes(): Observable<ProductType[]> {
    return this.http
      .get<ProductType[]>(`${environment.API_ENDPOINT}/product-types`);
  }

  save(aluno: Product): Observable<Product> {
    return this.http
      .post(`${environment.API_ENDPOINT}/products`, aluno)
      .pipe(catchError(this.handleError<Product>('save', {} as Product)));
  }

  delete(id: number) {
    return this.http
      .delete(`${environment.API_ENDPOINT}/products/${id}`);
  }

  getProduct(id: number): Observable<Product>{

    const queryParams = {
      filter: JSON.stringify({})
    };
    const params = new HttpParams({ fromObject: queryParams });

    return this.http
      .get(`${environment.API_ENDPOINT}/products/${id}`, {params})
      .pipe(catchError(this.handleError<Product>('save', {} as Product)));
  }

  update(id: number, aluno: Product): Observable<Product> {
    return this.http
      .patch(`${environment.API_ENDPOINT}/products/${id}`, aluno)
      .pipe(catchError(this.handleError<Product>('save', {} as Product)));
  }
}