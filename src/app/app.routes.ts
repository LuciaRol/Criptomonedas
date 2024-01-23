import { Routes } from '@angular/router';
import { DetalleComponent } from './detalle/detalle.component';
import { monedaComponent } from './moneda/moneda.component';

import { authGuard} from  './auth.guard'

export const routes: Routes = [
    // cuando en la url aparezca detalle, se carga el componente especificado
    {path: 'detalle/:id', component: DetalleComponent, canActivate:[authGuard]},
    {path: 'moneda', component: monedaComponent}
];
