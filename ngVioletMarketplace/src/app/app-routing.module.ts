import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { TokenComponent } from './components/token/token.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { UserPageComponent } from './components/user-page/user-page.component';
import { FormsModule } from '@angular/forms';
import { PictureuploadComponent } from './components/pictureupload/pictureupload.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CryptoComponent } from './components/crypto/crypto.component';
import { BlockComponent } from './components/block/block.component';
import { BuyNFTComponent } from './components/buy-nft/buy-nft.component';
import { BidNFTComponent } from './components/bid-nft/bid-nft.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent },
  { path: 'token', component: TokenComponent },
  { path: 'token/id/:id', component: TokenComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'transfers', component: LoginComponent },
  { path: 'user/:username', component: UserPageComponent },
  { path: 'test', component: PictureuploadComponent },
  { path: 'about', component: AboutUsComponent},
  { path: 'crypto', component: CryptoComponent},
  { path: 'block', component: BlockComponent},
  { path: 'buy', component: BuyNFTComponent},
  { path: 'bid', component: BidNFTComponent},
  { path: 'bid/:tokenId', component: BidNFTComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [FormsModule, CommonModule, BrowserModule, RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
