countObj= new Object;
count=0;
d3.csv("./data/MVC.csv", function(dataset) {
    
    var vehicle = dataset.VEHICLE_TYPE;
    
   
    
    if(countObj[vehicle]=== undefined){
        countObj[vehicle]=1;
    }
    else{
        countObj[vehicle] =countObj[vehicle]+1;
    }
    count++;
    

});
d3.csv("./data/MVC.csv").then(function(dataset) {
    var data = Object.values(countObj);

    //reduce the pi chart to 6 Values
    //console.log(Object.values(countObj).sort())
    //console.log(Object.entries(countObj))
    Object.entries(countObj).sort((a, b) => (a.values > b.values) ? 1 : -1)
    //console.log(Object.entries(countObj))
    console.log(data.sort(compareNumbers));
    data.reverse();
    //Object.entries(countObj).sort(([,a],[,b]) => a-b)
    keysSorted = Object.keys(countObj).sort(function(a,b){return countObj[a]-countObj[b]})
    keysSorted.reverse();
    console.log(keysSorted);  
    //console.log(countObj)
    var sub =0
    
    for(let i=0; i<6;i++){
        sub+=data[i];
    }
    console.log(count-sub)
    var arr =[];
    for(let i =0;i<6;i++){
        arr[i]=data[i];
    }
    arr[6]= count-sub;
    //console.log(count)
    //console.log(arr)
    data= arr;
    
    for(let i =0; i<keysSorted.length; i++){
        if(keysSorted[i]==""){
            keysSorted[i]= "Not Specified"
        }
    }
    var x = parseInt((arr[0] / count)*100);
  
    document.getElementById("firstColor").innerHTML=keysSorted[0] + " ("+ x + "%)";
    var x = parseInt((arr[1] / count)*100);
    document.getElementById("secondColor").innerHTML=keysSorted[1]+ " ("+ x + "%)";
    var x = parseInt((arr[2] / count)*100);
    document.getElementById("thirdColor").innerHTML=keysSorted[2]+ " ("+ x + "%)";
    var x = parseInt((arr[3] / count)*100);
    document.getElementById("fourthColor").innerHTML=keysSorted[3]+ " ("+ x + "%)";
    var x = parseInt((arr[4] / count)*100);
    document.getElementById("fifthColor").innerHTML=keysSorted[4]+ " ("+ x + "%)";
    var x = parseInt((arr[5] / count)*100);
    document.getElementById("sixthColor").innerHTML=keysSorted[5]+ " ("+ x + "%)";
    var x = parseInt((arr[6] / count)*100);
    document.getElementById("lastColor").innerHTML="Other"+ " ("+ x + "%)"

    var svg = d3.select("svg");

    let g = svg.append("g")
           .attr("transform", "translate(150,120)");
    
    //Create pie

    var pie = d3.pie();


    // Creating arc
    var arc = d3.arc()
                .innerRadius(0)
                .outerRadius(100);

    // Sets up the arcs
    var arcs = g.selectAll("arc")
                .data(pie(data))
                .enter()
                .append("g");

    // Appending path and Sets up the scheme  for the pie chart
    arcs.append("path")
        .attr("fill", (data, i)=>{
            let value=data.data;
            return d3.schemeSet1[i];
        })
        .attr("d", arc);

    
});

//compares the numbers
function compareNumbers(a, b) {
return a - b;
}
//counts the frequency for the values
var count = 0;
var countObj = new Object;
function change(val){
    
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
    d3.selectAll(".bar").remove();
    d3.selectAll("text").remove();
    
    //creates the image of the bar chart
    var svg1 = d3.select("svg"),
        margin = 350,
        width = svg1.attr("width") - margin,
        height = svg1.attr("height") - margin

    svg1.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 200)
       .attr("y", 50)
       .attr("font-size", "24px")
       .text(val)
    //creates the scale for the bar chartr
    var xScale = d3.scaleBand().range([0, width]).padding(0.4);
        yScale = d3.scaleLinear().range([height, 0]);

    var g1 = svg1.append("g")
               .attr("transform", "translate(" + 300 + "," + 100 + ")");
    

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

        g1.append("g") 
         .attr("transform", "translate(0," + height + ")") 
         .call(d3.axisBottom(xScale)) 
         .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" );
        g1.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width-300)
            .attr("y", height+200)
            .text(val); 
        //Another group element to have our y-axis grouped under one group element
        g1.append("g") 
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

        g1.selectAll(".bar") //created dynamic bars with our data using the SVG rectangle element.
         .data(Object.entries(countObj))
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d[0]); }) 
         .attr("y", function(d) { return yScale(d[1]); }) 
         .attr("width", xScale.bandwidth()) 
         .attr("height", function(d) { return height - yScale(d[1]); }); 
        
    });

}

