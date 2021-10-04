//counts the frequency for the values
var count = 0;
var countObj = new Object;
function report(val){
    d3.selectAll("svg > *").remove();
    countObj= new Object;
    d3.csv("./data/MVC.csv", function(dataset) {
        if(val=="TRAVEL_DIRECTION"){
            var vehicle = dataset.TRAVEL_DIRECTION;
        }
        else if(val=="VEHICLE_TYPE"){
            var vehicle = dataset.VEHICLE_TYPE;
        }
        else if(val=="VEHICLE_DAMAGE"){
            var vehicle = dataset.VEHICLE_DAMAGE;
        }
        else if(val=="DRIVER_LICENSE_STATUS"){
            var vehicle = dataset.DRIVER_LICENSE_STATUS;
        }
        else if(val=="CONTRIBUTING_FACTOR_1"){
            var vehicle = dataset.CONTRIBUTING_FACTOR_1;
        }
        else if(val=="STATE_REGISTRATION"){
            var vehicle = dataset.STATE_REGISTRATION;
        }
        else if(val=="DRIVER_LICENSE_JURISDICTION"){
            var vehicle = dataset.DRIVER_LICENSE_JURISDICTION;
        }
        else{
            var vehicle = dataset.VEHICLE_TYPE;
        }
       
        
        if(countObj[vehicle]=== undefined){
            countObj[vehicle]=1;
        }
        else{
            countObj[vehicle] =countObj[vehicle]+1;
        }
        count++;
        
    
    });
    //creates the image of the bar chart
    var svg = d3.select("svg"),
        margin = 350,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin

    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 200)
       .attr("y", 50)
       .attr("font-size", "24px")
       .text(val)
    //creates the scale for the bar chartr
    var xScale = d3.scaleBand().range([0, width]).padding(0.4);
        yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("./data/MVC.csv").then(function(data) {
        // console.log(data);
        console.log(Object.keys(countObj))
        console.log(Object.values(countObj))
        console.log(Object.entries(countObj))
        delete countObj[""]
        delete countObj["Unspecified"]

        var k= Object.keys(countObj);
        var v =Object.values(countObj)
    
        
        xScale.domain(k.map(function(d) { return d; })); 
        yScale.domain([0, d3.max(v, function(d) { return d; })]); 

        g.append("g") 
         .attr("transform", "translate(0," + height + ")") 
         .call(d3.axisBottom(xScale)) 
         .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" );
        g.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width-300)
            .attr("y", height+200)
            .text(val); 
        //Another group element to have our y-axis grouped under one group element
        g.append("g") 
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             console.log(d);
             return  d;
         })
         .ticks(10)) 
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("x", -100)
         .attr("y", 6)
         .attr("dy", "-5.1em")
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Number of Occurances");

        g.selectAll(".bar") //created dynamic bars with our data using the SVG rectangle element.
         .data(Object.entries(countObj))
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d[0]); }) 
         .attr("y", function(d) { return yScale(d[1]); }) 
         .attr("width", xScale.bandwidth()) 
         .attr("height", function(d) { return height - yScale(d[1]); }); 
    });

}
