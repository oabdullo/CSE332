function report(classify){

    countObj= new Object;
    countObj2= new Object;
    count=0;
    d3.selectAll("svg > *").remove();

    // counts teh values for the scatter plot
    d3.csv("data/MVC.csv", function(data) {


        var vehicle = data[document.getElementById('cars').value]
        var second= data[document.getElementById('car1').value]
        // console.log(data.VEHICLE_DAMAGE)
        if(countObj[vehicle]=== undefined){
            countObj[vehicle]=1;
        }
        else{
            countObj[vehicle] =countObj[vehicle]+1;
        }

        if(countObj2[second]=== undefined){
            countObj2[second]=1;
        }
        else{
            countObj2[second] =countObj2[second]+1;
        }
        count++;
    });
    var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin


    svg.append("text")
    .attr("transform", "translate(100,0)")
    .attr("x", 200)
    .attr("y", 50)
    .attr("font-size", "24px")
    .text("Motor Vehicle Data")

    var xScale = d3.scaleBand().range([0, width]).padding(0.4);//scaleBand() is used to construct a band scale. This is useful when our data has discrete bands.
    yScale = d3.scaleLinear().range([height, 0]);//a linear scale for the y-axis since this axis will show our stock prices.

    var g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("data/MVC.csv").then(function(data) {
    
        console.log(countObj2)
        console.log(countObj)
        var k= Object.keys(countObj);
        var v =Object.values(countObj)
        var v2= Object.values(countObj2)
        var com = {};
        for(let i=0; i<k.length;i++){
            com[v[i]] = v2[i];
        }
        console.log(Object.entries(com))
        v= Object.keys(com);
        v2= Object.values(com)
        
    xScale.domain(v.map(function(d) { return d; })); //provide domain values to the x and y scales, here it's X Scale which is Timestamp
    yScale.domain([0, d3.max(v2, function(d) { return d; })]); // domain value of Fixation Duration to y Scale

    g.append("g") //Another group element to have our x-axis grouped under one group element
    .attr("transform", "translate(0," + height + ")") // We then use the transform attribute to shift our x-axis towards the bottom of the SVG.
    .call(d3.axisBottom(xScale)) //We then insert x-axis on this group element using .call(d3.axisBottom(x)).
    .append("text")
    .attr("y", height - 250)
    .attr("x", width - 100)
    .attr("text-anchor", "end")
    .attr("stroke", "black")
    .text(document.getElementById("cars").value);

    g.append("g") //Another group element to have our y-axis grouped under one group element
    .call(d3.axisLeft(yScale).tickFormat(function(d){
        return  d;
    })
    .ticks(10))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "-5.1em")
    .attr("text-anchor", "end")
    .attr("stroke", "black")
    .text(document.getElementById("car1").value);

    g.selectAll(".circle")
    .data(Object.entries(com))
    .enter().append("circle")

    .attr("r", function(d) { return 10; })

    .attr("cx", function(d) { return xScale(d[0]); })

    .attr("cy", function(d) { return yScale(d[1]); })

    .style("fill","red") 
    });



}