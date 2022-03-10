/** Informs the user that their email, name and phone number were received successfully. */
function submission() {
	alert("Submitted successfully! Please check your inbox for a welcome letter. Kindly allow us up to two working days to reach out to you.")
};

// Deforestation in Amazon Graph with Interactive filtering created using Jonah William's Interactive Bar Chart I from http://bl.ocks.org/jonahwilliams/2f16643b999ada7b1909
// Set Margins
var margin = {top: 50, right: 50, bottom: 50, left: 50},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

/** SVG for Amazon Rainforest Deforestation Graph */
var svg1 = d3.select("#forestGraph").append("svg")
	.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/** Deforestation data from https://www.kaggle.com/mbogernetto/brazilian-amazon-rainforest-degradation/ */
d3.csv("https://gist.githubusercontent.com/brandonch-9029/508639c89dbb60761a4e18d4f2aa2a7b/raw/bfdc6391b4514a97100f2d1f88456bbaee81b432/def_area.csv", function(error, data){

	var elements = Object.keys(data[0])
		.filter(function(d){
			return ((d != "Year"));
		});
	var selection = elements[0];
/** Selection of Data filter, default is Total Brazilian Deforestation */
	var y = d3.scale.linear()
			.domain([0, d3.max(data, function(d){
				return +d[selection];
			})])
			.range([height, 0]);

/** X-axis values, specifically each year of recorded data */
	var x = d3.scale.ordinal()
			.domain(data.map(function(d){ return d.Year;}))
			.rangeBands([0, width]);


	var xAxis = d3.svg.axis()
		.scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
	    .orient("left");

	svg1.append("g")
    	.attr("class", "x axis")
    	.attr("transform", "translate(0," + height + ")")
    	.call(xAxis)
    	.selectAll("text")
    	.style("font-size", "8px")
      	.style("text-anchor", "end")
      	.attr("dx", "-.8em")
      	.attr("dy", "-.55em")
      	.attr("transform", "rotate(-90)" );

 	svg1.append("g")
    	.attr("class", "y axis")
    	.call(yAxis);

	svg1.selectAll("rectangle")
		.data(data)
		.enter()
		.append("rect")
		.attr("class","rectangle")
		.attr("width", width/data.length)
		.attr("height", function(d){
			return height - y(+d[selection]);
		})
		.attr("x", function(d, i){
			return (width / data.length) * i ;
		})
		.attr("y", function(d){
			return y(+d[selection]);
		})
		.append("title")
		.text(function(d){
			return d.Year + " : " + d[selection];
		});
	
	/** Variable for the user to select via dropdown for whichever state of Brazil they would like the data to filter out */
	var selector = d3.select("#drop")
    	.append("select")
    	.attr("id","dropdown")
    	.on("change", function(d){
        	selection = document.getElementById("dropdown");

        	y.domain([0, d3.max(data, function(d){
				return +d[selection.value];})]);

        	yAxis.scale(y);

        	d3.selectAll(".rectangle")
           		.transition()
	            .attr("height", function(d){
					return height - y(+d[selection.value]);
				})
				.attr("x", function(d, i){
					return (width / data.length) * i ;
				})
				.attr("y", function(d){
					return y(+d[selection.value]);
				})
           		.ease("linear")
           		.select("title")
           		.text(function(d){
           			return d.Year + " : " + d[selection.value];
           		});
      
           	d3.selectAll("g.y.axis")
           		.transition()
           		.call(yAxis);

         });
		 
    selector.selectAll("option")
      .data(elements)
      .enter().append("option")
      .attr("value", function(d){
        return d;
      })
      .text(function(d){
        return d;
      })
});

// Source: https://www.statista.com/statistics/205966/world-carbon-dioxide-emissions-by-region/
/** The dataset of Regional Greenhouse Gas Emission, assigned to a const for D3 to parse as CSV into Array */
const chartData = "https://gist.githubusercontent.com/brandonch-9029/d90cb400e8201fc95cfb9911ec575d54/raw/e109a534e81faeaf1c6ce202909e80f3e4fb44cc/greenhousecontinent.csv";

// Use D3's CSV parsing function and create const for Years and Continents
d3.csv(chartData, function(datapoints) {
	console.log(datapoints)
	const year = [];
	const asia = [];
	const northa = [];
	const europe = [];
	const mideast = [];
	const common = [];
	const africa = [];
	const southa = [];

	// Iterate through the length of the CSV to create arrays for each continent
	for (f = 0; f < datapoints.length; f++) {
	  year.push(datapoints[f].Year)
	  asia.push(datapoints[f].AsiaPacific)
	  northa.push(datapoints[f].NorthAmerica)
	  europe.push(datapoints[f].Europe)
	  mideast.push(datapoints[f].MiddleEast)
	  common.push(datapoints[f].Commonwealth)
	  africa.push(datapoints[f].Africa)
	  southa.push(datapoints[f].SouthCentralAmerica)
	}
  
	// Generate a chart with seven data lines, one color per continent, all sharing Year as the Y-Axis
	const ctx = document.getElementById("myChart").getContext('2d');
	/** Draws a different colored line for each region  */
	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: year,
			datasets: [{
				label: 'Asia Pacific',
				data: asia,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
			}, {
				label: 'North America',
				data: northa,
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgba(54, 162, 235, 1)',
			}, {
				label: 'Europe',
				data: europe,
				backgroundColor: 'rgba(255, 206, 86, 0.2)',
				borderColor: 'rgba(255, 206, 86, 1)',
			}, {
				label: 'Middle East',
				data: mideast,
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				borderColor: 'rgba(75, 192, 192, 1)',
			}, {
				label: 'Commonwealth of Independent Nations',
				data: common,
				backgroundColor: 'rgba(153, 102, 255, 0.2)',
				borderColor: 'rgba(153, 102, 255, 1)',
			}, {
				label: 'Africa',
				data: africa,
				backgroundColor: 'rgba(255, 159, 64, 0.2)',
				borderColor: 'rgba(255, 159, 64, 1)',
			}, {
				label: 'South & Central America',
				data: southa,
				backgroundColor: 'rgba(150, 75, 0, 0.2)',
				borderColor: 'rgba(150, 75, 0, 1)',
			}]
		},
		options: {
			borderWidth: 1,
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	});
});

  