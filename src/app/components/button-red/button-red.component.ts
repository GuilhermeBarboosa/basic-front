import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-red',
  templateUrl: './button-red.component.html',
  styleUrls: ['./button-red.component.css']
})
export class ButtonRedComponent implements OnInit {
  @Input() value: String | undefined;
  constructor() { }

  ngOnInit() {
  }

}
