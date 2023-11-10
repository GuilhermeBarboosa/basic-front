import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-yellow',
  templateUrl: './button-yellow.component.html',
  styleUrls: ['./button-yellow.component.css']
})
export class ButtonYellowComponent implements OnInit {

  @Input() value: String | undefined;
  constructor() { }

  ngOnInit() {
  }


}
