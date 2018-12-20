import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  calc_name:string;

  constructor(public router: Router){}

  ngOnInit() {
    /*let path =  window.location.href ;
    let search = "?calc=";
    let found = path.lastIndexOf(search);
    this.calc_name = path.slice(found + search.length);
    this.router.navigate([this.calc_name]);*/
  	this.router.navigate(["calc-weight"], {skipLocationChange: true});
  }
}
