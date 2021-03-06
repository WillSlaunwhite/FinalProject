import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BsModalRef, BsModalService, ModalOptions, ModalDirective } from 'ngx-bootstrap/modal';
import { PictureuploadComponent } from '../pictureupload/pictureupload.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService,
    private modalService: BsModalService,
    modalRef: BsModalRef) { }


  modalRef: BsModalRef= new BsModalRef();
  username: string | null = null;
  // check login

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }


 loggedIn(): boolean {
  return this.auth.isUserLoggedIn();
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit(): void {
    this.username = this.auth.getUsername();
  }

}



