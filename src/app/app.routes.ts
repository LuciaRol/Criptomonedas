import { Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { monedaComponent } from './moneda/moneda.component';
import { DetalleComponent } from './detalle/detalle.component';


import { authGuard} from  './auth.guard'

export const routes: Routes = [
    // cuando en la url aparezca detalle, se carga el componente especificado
    {path: '', component: LandingComponent},

    {path: 'moneda', component: monedaComponent},

    {path: 'detalle', component: DetalleComponent, /* canActivate:[authGuard] */}
    
];
