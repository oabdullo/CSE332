var count = 0;
var countObj = new Object;
function report(val){
    // d3.selectAll("svg > *").remove();
    countObj= new Object;
    count=0;
    d3.csv("./data/MVC.csv", function(dataset) {
        if(val=="TRAVEL_DIRECTION"){
            document.getElementById("header").innerHTML="Travel Direction"
            var vehicle = dataset.TRAVEL_DIRECTION;
        }
        else if(val=="VEHICLE_TYPE"){
            document.getElementById("header").innerHTML="Vehicle Type"
            var vehicle = dataset.VEHICLE_TYPE;
        }
        else if(val=="STATE_REGISTRATION"){
            document.getElementById("header").innerHTML="State Registration"
            var vehicle = dataset.STATE_REGISTRATION;
        }
        else if(val=="DRIVER_LICENSE_JURISDICTION"){
            document.getElementById("header").innerHTML="Driver License Jurisdiction"
            var vehicle = dataset.VEHICLE_TYPE;
        }
        else if(val=="VEHICLE_DAMAGE"){
            document.getElementById("header").innerHTML="Vehicle Damage"
            var vehicle = dataset.VEHICLE_DAMAGE;
        }
        else if(val=="DRIVER_LICENSE_STATUS"){
            document.getElementById("header").innerHTML="Driver License Status"
            var vehicle = dataset.DRIVER_LICENSE_STATUS;
        }
        else if(val=="CONTRIBUTING_FACTOR_1"){
            document.getElementById("header").innerHTML="Contributing Factor"
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
}

//compares the numbers
function compareNumbers(a, b) {
    return a - b;
  }
