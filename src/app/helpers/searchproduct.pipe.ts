import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchproduct'
})
export class SearchproductPipe implements PipeTransform {

  transform(products: any[], searchTerm: string): any[] {
    if (!products || !searchTerm) {
      return products;
    }

    return products?.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
