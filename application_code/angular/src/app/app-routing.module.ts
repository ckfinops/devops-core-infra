import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PaymentComponent } from './components/payment/payment.component';
import { AifinopsComponent } from './modules/public-ui/Pages/aifinops/aifinops.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./modules/public-ui/public-ui.modue').then(m => m.PublicUiModule)
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'aifinops',
    component: AifinopsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
      });
  }

  ngOnInit() {
    // Your component initialization code
  }
}
