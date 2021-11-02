import React,{ FC, useState,useEffect  } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";




const Chart :FC =()=> {
	const weatherDataa = useSelector((state:RootState)=>state)

	useEffect(()=>{
console.log("weatherDataaweatherDataaweatherDataa",weatherDataa)
	},[weatherDataa])

useEffect(()=>{
	let root = am5.Root.new("chartdiv");

	root.setThemes([
	  am5themes_Animated.new(root)
	]);
	
	

	let chart = root.container.children.push(am5xy.XYChart.new(root, {
	  panX: true,
	  panY: true,
	  wheelX: "none",
	  wheelY: "none"
	}));
	
	chart.zoomOutButton.set("forceHidden", true);
	
	

	let xRenderer = am5xy.AxisRendererX.new(root, {
	  minGridDistance: 30
	});
	xRenderer.labels.template.setAll({
	  rotation: 0,
	  centerY: am5.p50,
	  centerX: 0,
	  paddingRight: 15,
	  text:"HUMIDITY/WIND",
	  fontSize:9,
	});
	xRenderer.grid.template.set("visible", false);
	
	let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
	  maxDeviation: 0.3,
	  categoryField: "humidity",
	  renderer: xRenderer
	}));

	let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
	  maxDeviation: 0.3,
	  min: 0,
	  renderer: am5xy.AxisRendererY.new(root, {})
	}));


	

	let series = chart.series.push(am5xy.ColumnSeries.new(root, {
	  name: "Series 1",
	  xAxis: xAxis,
	  yAxis: yAxis,
	  valueYField: "pressure",
	  categoryXField: "humidity"
	}));
	

	series.columns.template.setAll({
	  cornerRadiusTL: 5,
	  cornerRadiusTR: 5
	});
	series.columns.template.adapters.add("fill", function (fill, target:any) {
	  return chart.get("colors")!.getIndex(series.columns.indexOf(target ));
	});
	
	series.columns.template.adapters.add("stroke", function (stroke, target:any) {
	  return chart.get("colors")!.getIndex(series.columns.indexOf(target ));
	});
	
	series.bullets.push(function () {
	  return am5.Bullet.new(root, {
		locationY: 1,
		sprite: am5.Label.new(root, {
		  text: "{valueYWorking.formatNumber('#.')}",
		  fill: root.interfaceColors.get("alternativeText"),
		  centerY: 0,
		  centerX: am5.p50,
		  populateText: true
		})
	  });
	});
	
	
	// Set data
	console.log(" weatherDataa.weather?.forcast ?  weatherDataa?.weather?.forcast?.daily: ", weatherDataa.weather.forcast)
	let data: any =weatherDataa?.weather?.forcast?.daily || [];
	
	xAxis.data.setAll(data);
	series.data.setAll(data);
	
	// update data with random values each 1.5 sec
	setInterval(function () {
	  updateData();
	}, 1500)
	
	function updateData() {
	  am5.array.each(series.dataItems, function (dataItem) {
		let value = dataItem.get("valueY")! + Math.round(Math.random() * 300 - 150);
		if (value < 0) {
		  value = 10;
		}
		// both valueY and workingValueY should be changed, we only animate workingValueY
		dataItem.set("valueY", value);
		dataItem.animate({
		  key: "valueYWorking",
		  to: value,
		  duration: 600,
		  easing: am5.ease.out(am5.ease.cubic)
		});
	  })
	
	  sortCategoryAxis();
	}
	
	
	// Get series item by category
	function getSeriesItem(category:any) {
	  for (var i = 0; i < series.dataItems.length; i++) {
		let dataItem = series.dataItems[i];
		if (dataItem.get("categoryX") == category) {
		  return dataItem;
		}
	  }
	}
	
	
	// Axis sorting
	function sortCategoryAxis() {
	
	  // Sort by value
	  series.dataItems.sort(function (x, y) {
		return y.get("valueY")! - x.get("valueY")!; // descending
		//return y.get("valueY") - x.get("valueY"); // ascending
	  })
	
	  // Go through each axis item
	  am5.array.each(xAxis.dataItems, function (dataItem) {
		// get corresponding series item
		let seriesDataItem = getSeriesItem(dataItem.get("category"));
	
		if (seriesDataItem) {
		  // get index of series data item
		  let index = series.dataItems.indexOf(seriesDataItem);
		  // calculate delta position
		  let deltaPosition = (index - dataItem.get("index", 0)) / series.dataItems.length;
		  // set index to be the same as series data item index
		  dataItem.set("index", index);
		  // set deltaPosition instanlty
		  dataItem.set("deltaPosition", -deltaPosition);
		  // animate delta position to 0
		  dataItem.animate({
			key: "deltaPosition",
			to: 0,
			duration: 1000,
			easing: am5.ease.out(am5.ease.cubic)
		  })
		}
	  });
	
	  // Sort axis items by index.
	  // This changes the order instantly, but as deltaPosition is set,
	  // they keep in the same places and then animate to true positions.
	  xAxis.dataItems.sort(function (x, y) {
		return x.get("index")! - y.get("index")!;
	  });
	}
	
	
	// Make stuff animate on load
	// https://www.amcharts.com/docs/v5/concepts/animations/
	series.appear(1000);
	chart.appear(1000, 100);
	
	
},[weatherDataa])
	return (
	<>      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
	</>
	)
}

export default Chart;