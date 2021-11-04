import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AccordionModule } from 'ngx-bootstrap/accordion';


import { AppComponent } from './app.component';
import { BlockComponent } from './components/block/block.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PictureuploadComponent } from './components/pictureupload/pictureupload.component';
import { RegisterComponent } from './components/register/register.component';
import { TokenComponent } from './components/token/token.component';
import { UserPageComponent } from './components/user-page/user-page.component';

import { TokenService } from './services/token.service';

import { NFTInfoComponent } from './components/nft-info/nft-info.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { EventsComponent } from './components/events/events.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { BuyNFTComponent } from './components/buy-nft/buy-nft.component';
import { BidNFTComponent } from './components/bid-nft/bid-nft.component';
import { NotFoundComponent } from './components/not-found/not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    BlockComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    PictureuploadComponent,
    TokenComponent,
    UserPageComponent,
    NFTInfoComponent,
    AboutUsComponent,
    EventsComponent,
    NewsletterComponent,
    BuyNFTComponent,
    BidNFTComponent,
    NotFoundComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CollapseModule,
    HttpClientModule,
    AccordionModule.forRoot(),
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    TokenService,
    BsModalService,
    BsModalRef
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
