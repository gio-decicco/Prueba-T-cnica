import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './state/app.state';
import { EffectsModule } from '@ngrx/effects';
import { ClientesEffects } from './state/effects/clientes.effects';
import { ClienteService } from './services/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './clientes/listar/listar.component';
import { NuevoComponent } from './clientes/nuevo/nuevo.component';
import { ModificarComponent } from './clientes/modificar/modificar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InplaceModule } from 'primeng/inplace';
import { AccordionModule } from 'primeng/accordion';


@NgModule({
  declarations: [
    AppComponent,
    ListarComponent,
    NuevoComponent,
    ModificarComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ name: 'TEST' }),
    EffectsModule.forRoot([ClientesEffects]),
    MenubarModule,
    TableModule,
    CardModule,
    ButtonModule,
    InputNumberModule,
    FormsModule,
    InputTextModule,
    CalendarModule,
    DividerModule,
    PanelModule,
    ToolbarModule,
    SplitButtonModule,
    InplaceModule,
    AccordionModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
