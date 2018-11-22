import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit { 
  chart:Chart;
  height:number; //label
  years:number;
  value1:number;
  value2:number;
  value3:number;
  init_height=175;
  init_years=25;

  constructor() { }

  ngOnInit() {
  	this.height = this.init_height;
  	this.years  = this.init_years;
  	this.formula1();
    this.formula2();
    this.formula3();
  	this.chart = new Chart('canvas', {
      type: 'horizontalBar',
      data: {
      	labels: ["Универсальная формула", "Формула Брока", "Формула Брока продвинутая"],
      	datasets: [{
            data: [this.value1, this.value2, this.value1],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
               /* 'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'*/
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                /*'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'*/
            ],
            borderWidth: 1
        }]
      },
      options: {
      	aspectRatio: 3,
	    scales: {
            xAxes: [{
                ticks: {
                    suggestedMin: 25,
                    suggestedMax: 140
                }
            }],
            yAxes:[{
            	ticks: {mirror: true},
            	barPercentage : 1

            }]
        },
        legend: {
        	display: false
	    }
	    
	  }
	});
  }

  changeHeight(h) {
      this.height = h;
      this.formula1();
      this.formula2();
      this.formula3();
      this.updateChart();
  }

  changeYears(years) {
      this.years = years;
      this.formula1();
      this.formula2();
      this.formula3();
      this.updateChart();
  }

  formula1() {
  	this.value1 = (+this.height * 3.0 - 450.0 + +this.years) * 0.25 + 40.5;
  }

  formula2() {
  	if (this.height<165)
  	{
  		this.value2 = +this.height - 100;
  	}
  	else if(this.height<175 && this.height>=165)
  	{
  	 	this.value2 = +this.height - 105;
  	}
  	else {
  		this.value2 = +this.height - 105;
  	}
  }
  formula3() {
  	let x = 0;
  	x = (+this.years-30)/10;
  	if (x < 0)
  		x = 0;

  	x = Math.floor(x);
  	if (x > 3)
  		x = 3;

  	this.value3 = this.value2 + (this.value2 * 3*x / 100);

  }

  updateChart() {
    this.chart.data.datasets.forEach((dataset) => {
        dataset.data = new Array(this.value1, this.value2, this.value3, this.value2, this.value1, this.value2);
    });
    this.chart.update();
  }
}
