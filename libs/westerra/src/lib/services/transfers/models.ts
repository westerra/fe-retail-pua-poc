import { ProductSummaryItem } from '@backbase/data-ang/arrangements';

export type GetProductsResponse = {
    isLoading?: boolean;
    products?: ProductSummaryItem[];
    hasError?: boolean;
};
