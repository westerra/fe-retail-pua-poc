import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject, EMPTY, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { GetProductsResponse } from './models';
import { ProductSummaryHttpService, ProductSummaryItem } from '@backbase/arrangement-manager-http-ang';
import { PaymentOrdersHttpService } from '@backbase/payment-order-v3-http-ang';

@Injectable({
    providedIn: 'root',
})
export class WesterraTransfersService implements OnDestroy {
    readonly componentDestroyed = new Subject();

    // These constants were grabbed from the OOTB Transfer
    RESOURCE_NAME = 'Payments';
    PRIVILEGE = 'create';
    EXTERNAL_ID = 'EXTERNAL_ID';
    PAGE_SIZE = 1000;

    productSummaryParameters = {
        resourceName: this.RESOURCE_NAME,
        privilege: this.PRIVILEGE,
        size: this.PAGE_SIZE,
        businessFunction: 'A2A Transfer',
    };

    public debitProducts$ = new BehaviorSubject<GetProductsResponse>(null);
    public creditProducts$ = new BehaviorSubject<GetProductsResponse>(null);

    constructor(
        protected productSummaryHttpService: ProductSummaryHttpService,
        protected paymentOrderService: PaymentOrdersHttpService
    ) {}

    public getProducts() {
        this.getAllProducts();
    }

    private getAllProducts() {
        this.productSummaryHttpService
            .getArrangementsByBusinessFunction(this.productSummaryParameters)
            .pipe(
                takeUntil(this.componentDestroyed),
                catchError((err) => {
                    this.debitProducts$?.next({ hasError: true });
                    this.creditProducts$?.next({ hasError: true });
                    return EMPTY;
                })
            )
            .subscribe((data) => {
                // sort response
                const sortedProducts = data.sort((a, b) => this.sortProducts(a, b));
                this.creditProducts$?.next({ products: sortedProducts });

                // for debit we need to remove zero and negative balance products
                const filteredAndSortedProducts = sortedProducts.filter((p) => this.removeNegativeProducts(p));
                this.debitProducts$?.next({ products: filteredAndSortedProducts });

                console.log('this.debitProducts$ : ', this.debitProducts$.getValue())
                console.log('this.creditProducts$ : ', this.creditProducts$.getValue())
            });
    }

    private sortProducts(a: ProductSummaryItem, b: ProductSummaryItem) {
        if (a?.BBAN > b?.BBAN) {
            return 1;
        } else if (a?.BBAN < b?.BBAN) {
            return -1;
        } else {
            if (a?.additions?.productType < b?.additions?.productType) {
                return 1;
            } else if (a?.additions?.productType > b?.additions?.productType) {
                return -1;
            } else {
                if (a?.additions?.productId > b?.additions?.productId) {
                    return 1;
                } else {
                    return -1;
                }
            }
        }
    }

    private removeNegativeProducts(a: ProductSummaryItem) {
        switch (a?.productKindName) {
            case 'Checking Accounts':
            case 'Saving Accounts':
            case 'Credit Card':
                return a?.availableBalance > 0;
            case 'Certificates':
            case 'Loan':
                if (a?.additions?.productSubType === 'LineOfCredit') {
                    return a?.availableBalance > 0;
                } else {
                    return a?.bookedBalance > 0;
                }
            default:
                return a?.bookedBalance > 0;
        }
    }

    ngOnDestroy() {
        this.componentDestroyed.complete();
    }
}
