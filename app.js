url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Create function to get metadata for panel
function Metadata(sampl) {
    d3.json(url).then((data) => {
      var metadata= data.metadata;
      var results= metadata.filter(sampleob => 
        sampleob.id == sampl);
      var result= results[0]
      var panel = d3.select("#sample-metadata");
      panel.html("");
      Object.entries(result).forEach(([key, value]) => {
        panel.append("h6").text(`${key}: ${value}`);
      });
    });
  }


// create variables for bar and bubble charts
function charts(sample) {
    d3.json(url).then(data => {
    console.log(data);    
    samples = data.samples;
    filter = samples.filter(row => row.id == sample);
    result = filter[0];
    values = result.sample_values;
    otuids = result.otu_ids;
    otulabels = result.otu_labels;


   
// Bar chart
let trace1 = {
    y:otuids.slice(0,10).map(row => "OTU " + row).reverse(),
    x: values.slice(0,10).reverse(),
    text: otulabels.slice(0,10).reverse(),
    type: "bar",
    orientation: "h",
    
};

let barData = [trace1];

let layout = {
    width: 600,
    margin:{
        l: 100,
        r: 100,
        t:5,
        b: 50
    }
}

Plotly.newPlot("bar",barData,layout);


// Bubble chart

var trace2 = {
    x: otuids,
    y: values,
    mode: 'markers',
    text: otulabels,
    marker: {
      color: otuids,
      size: values,
      opacity: [1, 0.8, 0.6, 0.4],
    }
  };
  
  var bubble = [trace2];
  
  var layout2 = {
    height: 600,
    width: 1200,
    xaxis: {
        title: "OTU ID"
    }
  };
  
  Plotly.newPlot('bubble', bubble, layout2);
  



    })
}
// dropdown
function init(){
    d3.json(url).then(data =>{

dropDown = d3.select("#selDataset");
_names = data.names
	_names.forEach((name)=>{
	dropDown.append('option').text(name).property("value", name);
	});
    
    
    var first = _names[0];
    Metadata(first);
    charts(first);


    });
 
}
// function to apply changes 
function optionChanged(newSampl){
    Metadata(newSampl);
    charts(newSampl);
}

init();
