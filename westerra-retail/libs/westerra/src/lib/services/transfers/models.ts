import { ProductSummaryItem } from "@backbase/internal-at-shared-ang/data";


export type GetProductsResponse = {
    isLoading?: boolean;
    products?: ProductSummaryItem[];
    hasError?: boolean;
};
