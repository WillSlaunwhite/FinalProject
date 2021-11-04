import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})



export class BlockComponent implements OnInit {
  modalRef: BsModalRef = new BsModalRef;


  constructor(private modalService: BsModalService,  modalRef: BsModalRef) {}


  openModal(template: TemplateRef<any>) {
     this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
  }
}

