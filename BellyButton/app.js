// d3 to fetch & read json file
function plotted (sample){
    d3.json('samples.json').then(data =>{
console.log(data)
var samples = data.samples;
var filterresult = samples.filter(item => item.id==sample);
var result = filterresult[0]; 
//horizontal barchart w dropdown menu - sample_values, otu_ids, otu_labels
var otu_id = result.otu_ids; 
var sample_value = result.sample_values.slice(0,10).reverse();
var otu_labels = result.otu_labels.slice(0,10);

//plot top 10, reverse order 
var top_otu = (result.otu_ids.slice(0,10).reverse());
var top_otu_id = top_otu.map(d => 'OTU ' +d);
var top_label = result.otu_labels.slice(0,10);

var trace = {
    x: sample_value, 
    y: top_otu_id, 
    text: top_label, 
    marker: {
        color: 'purple'
    }, 
    type: 'bar', 
    orientation: 'h', 
};

var data = [trace];

var layout = {
    title: 'Top 10 OTU', 
    yaxis: {
        tickmode: 'linear'
    }, 

}; 

Plotly.newPlot('bar', data, layout);

// bubble chart displaying sample - otu_id (x value), sample_values (y value), sample_values (marker size)
// otu_ids (marker color), otu_lables (text values)

var trace1 = {
    x: otu_id,
    y: sample_value, 
    mode: 'markers',
    marker: {
        size: sample_value,
        color: otu_id
    },
    text: otu_labels,
    // type: 'bubble'
}

var data1 = [trace1];

var layout1 = {
    xaxis: {title: 'OTU ID'}, 
    height: 500, 
    width: 1000
}; 

Plotly.newPlot('bubble', data1, layout1);
}); 
}
// sample metadata - ID, ethnicity, gender, age, location, bbtype, wfreq
function results(sample) {
    d3.json('samples.json').then(data =>{
    var metadata = data.metadata;
    // console.log(metadata);

    var all = metadata.filter(meta => meta.id == sample)[0];
    var demoInfo = d3.select('#sample-metadata');

    demoInfo.html(''); 

    Object.entries(all).forEach((key) => {
        demoInfo.append('h5').text(key[0].toUpperCase() + ': ' + key[1] + '\n');
});
}) 
}

function optionChanged(sample1) {
    plotted(sample1);
    results(sample1);
}; 

function infobox () {
    var dropdown = d3.select ('#selDataset'); 
    d3.json('samples.json').then((data) => {
        data.names.forEach(function(name) {
            dropdown.append('option').text(name).property('value',name); 
        }); 
        plotted(data.names[0]);
        results(data.names[0]);
    });
}

infobox();