import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-green',
  templateUrl: './button-green.component.html',
  styleUrls: ['./button-green.component.css']
})
export class ButtonGreenComponent implements OnInit {

  @Input() value?: String;

  constructor() { }

  ngOnInit() {
  }
}
