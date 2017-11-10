import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { ChipIonicModule } from '@chip/ionic';

export function loadChipIonicModule() {
    return module.dynamicImport('@chip/ionic').then(({ChipIonicModule}) => ChipIonicModule)
}

@NgModule({
  imports: [
    // Transition between server and client
    BrowserModule.withServerTransition({
      appId: 'bomip-universal'
    }),
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'todoList',
        component: TodoListComponent,
        data: {
          title: 'Todo List'
        }
      },
      {
        path: 'todoAdd',
        loadChildren: './todo-add/todo-add.module#TodoAddModule',
        data: {
          title: 'Add Todo'
        }
      },
      // { path: 'ionic', loadChildren: loadChipIonicModule},
      // Home Page
      {
        path: '',
        redirectTo: '/todoList',
        pathMatch: 'full'
      },
      // 404 Page
      {
        path: '**',
        component: PageNotFoundComponent,
        data: {
          title: '404 Page Not Found'
        }
      }
    ])
    // ChipIonicModule
  ],
  declarations: [
    // TodoComponent,
    AppComponent,
    TodoListComponent,
    PageNotFoundComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
