import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from '../app/Components/user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ThankYouComponent } from './Components/thank-you/thank-you.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    path: 'thank-you',
    component: ThankYouComponent,
  },
];
@NgModule({
  declarations: [AppComponent, UserComponent, ThankYouComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
