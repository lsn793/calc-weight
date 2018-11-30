import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit { 
  chart:Chart;
  height:number; //label
  years:number;//label
  value1:number;
  value2:number;
  value3:number;
  value4:number;
  value5:number;
  value6:number;
  init_height=175;
  init_years=25;
  gender:string = "male";

  constructor() { }

  ngOnInit() {
  	this.height = this.init_height;
  	this.years  = this.init_years;
  	this.recalculateFormulas();

  	this.chart = new Chart('canvas', {
      type: 'horizontalBar',
      data: {
      	labels: ["Универсальная формула", "Формула Брока", "Формула Брока продвинутая", "Индекс Татоня", "Индекс Ноордена", "Индекс Брейтмана"],
      	datasets: [{
            data: [this.value1, this.value2, this.value3, this.value4, this.value5, this.value6].map(Math.round),
            datalabels: {
              align : 'right',
              anchor: 'end',
              formatter: function(value) {
                  return Math.round(value) + ' кг';
              }
            },
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
        animation: {
          duration: 750,
          onProgress: function() {
            var chartInstance = this.chart;
            var ctx = chartInstance.ctx;

            ctx.font = Chart.helpers.fontString(14, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);

            this.data.datasets.forEach(function(dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function(bar, index) {

                var label = bar._model.label;
                var xOffset = 14;
                var yOffset = bar._model.y - 16;
                ctx.fillText(label, xOffset, yOffset);
              });
            });
          }
        },
        maintainAspectRatio: false,
      	aspectRatio: 0.7,
	      scales: {
            xAxes: [{
                ticks: {
                    suggestedMin: 30,
                    suggestedMax: 140
                },
            }],
            yAxes:[{
              	ticks: {
                  display: false,
                  /*fontFamily: "Arial",
                  fontSize: 12*/
                  /*mirror: true*/
                },
               	barPercentage : 0.4

            }]
        },
        legend: {
        	display: false
	      },
	      tooltips: {
          enabled: false
        },
        plugins: {
          datalabels: {
            font: {
              size: "14"
            }
          }
        }
	    }
	});
  }

  changeHeight(h) {
    this.height = h;
    this.recalculateFormulas();
    this.updateChart();
  }

  changeYears(years) {
    this.years = years;
	  this.recalculateFormulas();
    this.updateChart();
  }

  changeGender(value) {
    this.gender = value;
    this.recalculateFormulas();
    this.updateChart();
  }

  recalculateFormulas() {
	  this.formula1();
    this.formula2();
    this.formula3();
    this.formula4();
    this.formula5();
    this.formula6();
  }

  formula1() {
  	switch(this.gender) {
  		case 'male': 
  			this.value1 = (+this.height * 3.0 - 450.0 + +this.years) * 0.25 + 40.5;
  			break;
  		case 'female': 
  			this.value1 = (+this.height * 3.0 - 450.0 + +this.years) * 0.225 + 45.0;	
  			break;
  		default:
			this.value1 = (+this.height * 3.0 - 450.0 + +this.years) * 0.25 + 40.5;
  	}
  	
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

  formula4() {
    //рост − (100 + (рост − 100) / 20)
    this.value4 = +this.height - (100 + (+this.height - 100)/20);
  }

  formula5() {
    //рост [см] • 420/1000.
    this.value5 = +this.height * 420/1000;
  }

  formula6() {
    //рост [см] • 0,7 — 50 кг
    this.value6 = +this.height * 0.7 - 50;
  }
  
  updateChart() {
    this.chart.data.datasets.forEach((dataset) => {
        dataset.data = [this.value1, this.value2, this.value3, this.value4, this.value5,this.value6];
    });
    this.chart.update();
  }
}
