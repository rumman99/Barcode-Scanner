import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/products/products.page').then( m => m.ProductsPage)
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart.page').then( m => m.CartPage)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
