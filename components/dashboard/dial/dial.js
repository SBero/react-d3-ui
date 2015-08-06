(function(){

function dial(){
	var w = 300,
		h = 300,
		r = 100,
		data = [
			{"cx": 100, "cy": 100, "radius": 100, "color": "#333"},
			{"cx": 100, "cy": 100, "radius": 98, "color": "#FFF"},
			{"cx": 100, "cy": 180, "radius": 10, "color": "#666"},
			{"cx": 100, "cy": 20, "radius": 2, "color": "#666"},
			];

	var	triangleData = [
			{"x": 90, "y": 180}, {"x": 98, "y": 20}, 
			{"x": 98, "y": 20}, {"x": 102, "y": 20}, 
			{"x": 102, "y": 20}, {"x": 110, "y": 180}, 
			{"x": 90, "y": 180},
		];

	var svgContainer = d3.select("div#dial")
							.append("svg")
							.attr("width", w)
							.attr("height", h);

	var outsideCircle = svgContainer.selectAll("circle")
								.data(data)
								.enter()
								.append("circle")
								.attr("cx", function(d){return d.cx; })
								.attr("cy", function(d){return d.cy; })
								.attr("r", function(d){return d.radius; })
								.style("fill", function(d){ return d.color });

	var needleLineFn = d3.svg.line()
						.x(function(d){ return d.x; })
						.y(function(d){ return d.y; })
						.interpolate("linear");


	var needle = svgContainer.append("path")
							.attr("d", needleLineFn(triangleData))
							.attr("fill", "#666");

/*
	var gauge = d3.arcslider()
                .radius(120)
                .events(false)
                .indicator(iopctrl.defaultGaugeIndicator);
        gauge.axis().orient("in")
                .normalize(true)
                .ticks(12)
                .tickSubdivide(3)
                .tickSize(10, 8, 10)
                .tickPadding(5)
                .scale(d3.scale.linear()
                        .domain([0, 160])
                        .range([-3*Math.PI/4, 3*Math.PI/4]));

*/
}

dial();

})();