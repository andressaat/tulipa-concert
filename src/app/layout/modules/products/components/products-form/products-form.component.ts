import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductType } from '@common/models/product-type.model';
import { ProductsService } from '@common/service/product.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {
  form: FormGroup;
  productTypes: ProductType[] = [];
  productId: number | null = null;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private service: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      id: [null, null],
      name: [null, Validators.required],
      amount: [null, Validators.required],
      price: [null, Validators.required],
      typeId: [null, Validators.required]
    });
   }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl ?? '/';
    this.route.params.subscribe((params: Params) => {
      this.productId = params.id;
      if (!!this.productId) {
        this.service.getProduct(this.productId).subscribe(product => {
          this.form.patchValue(product);
        });
      }
    });

    this.service.listAllProductTypes().subscribe((types) => {
      this.productTypes = types;
    });
  }

  save(): void {
    if (this.form.valid) {
      const { id, ...product } = this.form.value;
      if (!!this.productId) {
        this.service.update(this.productId, product).subscribe(updated => {
          console.log(updated);
        });
      }
      else {
        this.service.save(product).subscribe((created) => {
          console.log(created);
        });
      }
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  cancel(): void {
    this.router.navigateByUrl(this.returnUrl);
  }

}
