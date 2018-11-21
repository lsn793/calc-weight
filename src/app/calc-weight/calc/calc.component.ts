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
  value1:number;
  value2:number;
  init_height=175;
  init_weight=60;

  constructor() { }

  ngOnInit() {
  	this.height = this.init_height;
  	this.formula1();
    this.formula2();
  	this.chart = new Chart('canvas', {
      type: 'horizontalBar',
      data: {
      	labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      	datasets: [{
            data: [this.value1, this.value2, this.value1, this.value2, this.value1, this.value2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      },
      options: {
	    scales: {
            xAxes: [{
                ticks: {
                    suggestedMin: 50,
                    suggestedMax: 100
                }
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
      this.updateChart();
      console.log(h);     
  }

  formula1() {
  	this.value1 = this.height/2;
  }

  formula2() {
  	this.value2 = (this.height/2)-10;
  }

  updateChart() {
    this.chart.data.datasets.forEach((dataset) => {
        dataset.data = new Array(this.value1, this.value2, this.value1, this.value2, this.value1, this.value2);
    });
    this.chart.update();
  }
}
