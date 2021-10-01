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
    var svg = d3.select("svg"),
        margin = 350,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin

    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 200)
       .attr("y", 50)
       .attr("font-size", "24px")
       .text("Vehicle Type Data")

    var xScale = d3.scaleBand().range([0, width]).padding(0.4);//scaleBand() is used to construct a band scale. This is useful when our data has discrete bands.
        yScale = d3.scaleLinear().range([height, 0]);//a linear scale for the y-axis since this axis will show our fixation duration.

    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("./data/MVC.csv").then(function(data) {
        // console.log(data);
        console.log(Object.keys(countObj))
        console.log(Object.values(countObj))
        // console.log(Object.entries(countObj))
        var k= Object.keys(countObj);
        var v =Object.values(countObj)
        // for(let i= 0;i<k.length;i++){
        //     if(k[i]==""){
        //         k[i]="Unspecified";
        //     }
        // }
        // console.log(countObj.map(fucntion(d){ return d;}));
        
        xScale.domain(k.map(function(d) { return d; })); //provide domain values to the x and y scales, here it's X Scale which is Timestamp
        yScale.domain([0, d3.max(v, function(d) { return d; })]); // domain value of Fixation Duration to y Scale

        g.append("g") //Another group element to have our x-axis grouped under one group element
         .attr("transform", "translate(0," + height + ")") // We then use the transform attribute to shift our x-axis towards the bottom of the SVG.
         .call(d3.axisBottom(xScale)) //We then insert x-axis on this group element using .call(d3.axisBottom(x)).
         .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" );
        g.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width-300)
            .attr("y", height+140)
            .text("Type of Car(NYPD)"); 

        g.append("g") //Another group element to have our y-axis grouped under one group element
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             console.log(d);
             return  d;
         })
         .ticks(10)) //We have also specified the number of ticks we would like our y-axis to have using ticks(10).
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "-5.1em")
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Number of Vehicles");

        g.selectAll(".bar") //created dynamic bars with our data using the SVG rectangle element.
         .data(Object.entries(countObj))
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d[0]); })  //x scale created earlier and pass the year value from our data.
         .attr("y", function(d) { return yScale(d[1]); }) // pass the data value to our y scale and receive the corresponding y value from the y range.
         .attr("width", xScale.bandwidth()) //width of our bars would be determined by the scaleBand() function.
         .attr("height", function(d) { return height - yScale(d[1]); }); //height of the bar would be calculated as height - yScale(d.value)
         //the height of the SVG minus the corresponding y-value of the bar from the y-scale
    });

}
// d3.csv("./data/MVC.csv", function(dataset) {
//     var vehicle = dataset.TRAVEL_DIRECTION;
//     //console.log(vehicle);
//     if(countObj[vehicle]=== undefined){
//         countObj[vehicle]=1;
//     }
//     else{
//         countObj[vehicle] =countObj[vehicle]+1;
//     }
//     count++;
    

// });
// var svg = d3.select("svg"),
//         margin = 350,
//         width = svg.attr("width") - margin,
//         height = svg.attr("height") - margin

//     svg.append("text")
//        .attr("transform", "translate(100,0)")
//        .attr("x", 200)
//        .attr("y", 50)
//        .attr("font-size", "24px")
//        .text("Vehicle Type Data")

//     var xScale = d3.scaleBand().range([0, width]).padding(0.4);//scaleBand() is used to construct a band scale. This is useful when our data has discrete bands.
//         yScale = d3.scaleLinear().range([height, 0]);//a linear scale for the y-axis since this axis will show our fixation duration.

//     var g = svg.append("g")
//                .attr("transform", "translate(" + 100 + "," + 100 + ")");

//     d3.csv("./data/MVC.csv").then(function(data) {
//         // console.log(data);
//         console.log(Object.keys(countObj))
//         console.log(Object.values(countObj))
//         // console.log(Object.entries(countObj))
//         var k= Object.keys(countObj);
//         var v =Object.values(countObj)
        
//         // console.log(countObj.map(fucntion(d){ return d;}));
        
//         xScale.domain(k.map(function(d) { return d; })); //provide domain values to the x and y scales, here it's X Scale which is Timestamp
//         yScale.domain([0, d3.max(v, function(d) { return d; })]); // domain value of Fixation Duration to y Scale

//         g.append("g") //Another group element to have our x-axis grouped under one group element
//          .attr("transform", "translate(0," + height + ")") // We then use the transform attribute to shift our x-axis towards the bottom of the SVG.
//          .call(d3.axisBottom(xScale)) //We then insert x-axis on this group element using .call(d3.axisBottom(x)).
//          .selectAll("text")  
//             .style("text-anchor", "end")
//             .attr("dx", "-.8em")
//             .attr("dy", ".15em")
//             .attr("transform", "rotate(-65)" );
//         g.append("text")
//             .attr("class", "x label")
//             .attr("text-anchor", "end")
//             .attr("x", width-300)
//             .attr("y", height+140)
//             .text("Type of Car(NYPD)"); 

//         g.append("g") //Another group element to have our y-axis grouped under one group element
//          .call(d3.axisLeft(yScale).tickFormat(function(d){
//              console.log(d);
//              return  d;
//          })
//          .ticks(10)) //We have also specified the number of ticks we would like our y-axis to have using ticks(10).
//          .append("text")
//          .attr("transform", "rotate(-90)")
//          .attr("y", 6)
//          .attr("dy", "-5.1em")
//          .attr("text-anchor", "end")
//          .attr("stroke", "black")
//          .text("Number of Vehicles");

//         g.selectAll(".bar") //created dynamic bars with our data using the SVG rectangle element.
//          .data(Object.entries(countObj))
//          .enter().append("rect")
//          .attr("class", "bar")
//          .attr("x", function(d) { return xScale(d[0]); })  //x scale created earlier and pass the year value from our data.
//          .attr("y", function(d) { return yScale(d[1]); }) // pass the data value to our y scale and receive the corresponding y value from the y range.
//          .attr("width", xScale.bandwidth()) //width of our bars would be determined by the scaleBand() function.
//          .attr("height", function(d) { return height - yScale(d[1]); }); //height of the bar would be calculated as height - yScale(d.value)
//          //the height of the SVG minus the corresponding y-value of the bar from the y-scale
//     });

