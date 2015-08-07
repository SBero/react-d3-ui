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

	var config = {
		size						: 200,
		clipWidth					: 200,
		clipHeight					: 110,
		ringInset					: 20,
		ringWidth					: 60,
		
		pointerWidth				: 10,
		pointerTailLength			: 5,
		pointerHeadLengthPercent	: 0.9,
		
		minValue					: 0,
		maxValue					: 10,
		
		minAngle					: -90,
		maxAngle					: 90,
		
		transitionMs				: 750,
		
		majorTicks					: 5,
		labelFormat					: d3.format(',g'),
		labelInset					: 10,
		
		arcColorFn					: d3.interpolateHsl(d3.rgb('#e8e2ca'), d3.rgb('#3e6c0a'))
	};

	var scale = undefined;
	var ticks = undefined;
	var tickData = undefined;
	var range = config.maxAngle - config.minAngle;

	var svgContainer = d3.select("div#dial")
							.append("svg")
							.attr("width", w)
							.attr("height", h);

	// Build the Outer Circle
    var outsideCircle = svgContainer.selectAll("circle")
								.data(data)
								.enter()
								.append("circle")
								.attr("cx", function(d){return d.cx; })
								.attr("cy", function(d){return d.cy; })
								.attr("r", function(d){return d.radius; })
								.style("fill", function(d){ return d.color });

	var tickArcSetup = d3.svg.arc()
    				.innerRadius(75)
    				// .innerRadius((5 * Math.PI) / 6)
    				.outerRadius(77)
    				.startAngle(-1)
    				.endAngle(1)

	var tickArcObj = svgContainer.append("svg:path")

    						.attr("id", "tick")
    						.attr("d", tickArcSetup)
    						.attr("fill", "#999")
    						.attr("width", 150)
    						.attr("height", 150)
    						.style("fill", "#999")
    						.attr("transform", "translate(100,100)");

	var needleLineFn = d3.svg.line()
						.x(function(d){ return d.x; })
						.y(function(d){ return d.y; })
						.interpolate("linear");


	var needle = svgContainer.append("path")
							.attr("d", needleLineFn(triangleData))
							.attr("fill", "#666");


	function makeTicks(){
		scale = d3.scale.linear()
					.range([0,1])
					.domain([config.minValue, config.maxValue]);

		ticks = scale.ticks(config.majorTicks);
		tickData = d3.range(config.majorTicks).map(function(d){ return scale(d); });

		tickObjs = svgContainer.selectAll('line')
						.data(ticks)
						.enter()
							.append('line')
							.attr('class', 'tickline')
							.attr('x1', 0)
							.attr('y1', 0)
							.attr('x2', 0)
							.attr('y2', 30)

							.attr('transform', function(d){
								var ratio = scale(d),
								    newAngle = config.minAngle + (ratio * range) * -1;

								    console.log("RATIO - RANGE - ANGLE:")
								    console.log(ratio);
								    console.log(range);
								    console.log(newAngle);
								    console.log("\n");
								//var r = 90;
									var x = ratio * 150;

								    // return 'rotate(' + newAngle + ') translate(0, ' + (config.labelInset + config.ringWidth) + ')';
								    return 'rotate('+newAngle+') translate('+x+', '+(config.minAngle + config.ringWidth)+')';


							})
							.style('stroke', '#666')
							.style('stroke-width', '2pz');


	}

	makeTicks();
	// a linear scale that maps domain values to a percent from 0..1
		/*scale = d3.scale.linear()
			.range([0,1])
			.domain([config.minValue, config.maxValue]);
			
		ticks = scale.ticks(config.majorTicks);
		tickData = d3.range(config.majorTicks).map(function() {return 1/config.majorTicks;});

	
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