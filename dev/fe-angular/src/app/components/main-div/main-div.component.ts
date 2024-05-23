import { Component } from '@angular/core';

@Component({
  selector: 'app-main-div',
  standalone: true,
  imports: [],
  templateUrl: './main-div.component.html',
  styleUrl: './main-div.component.scss'
})
export class MainDivComponent {

  applyBlur(){

    document.body.style.filter = "blur(5px)";
    const container = document.querySelector('.container');
    container.renderer.setStyle(container, "cursor: not-allowed");
  }
}
