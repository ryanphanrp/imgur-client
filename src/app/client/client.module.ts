import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';

/**
 * Ant Design
 */
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';


const antModule = [
  NzButtonModule,
  NzLayoutModule
];

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    antModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
