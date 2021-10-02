// d3 to fetch & read json file
d3.json('samples.json').then(data =>{
// console.log(data)

//horizontal barchart w dropdown menu - sample_values, otu_ids, otu_labels
var otu_id = data.samples[0].otu_ids; 
var sample_value = data.samples[0].sample_values.slice(0,10).reverse();
var otu_labels = data.samples[0].otu_labels.slice(0,10);

//plot top 10, reverse order 
var top_otu = (data.samples[0].otu_ids.slice(0,10).reverse());
var top_otu_id = top_otu.map(d => 'OTU ' +d);
var top_label = data.samples[0].otu_labels.slice(0,10);

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
    // margin: {
    //     l: 500,
    //     r: 500,
    //     t: 500,
    //     b: 30
    // }
}; 

Plotly.newPlot('bar', data, layout);

// bubble chart displaying sample - otu_id (x value), sample_values (y value), sample_values (marker size)
// otu_ids (marker color), otu_lables (text values)


// sample metadata


//key-value pair from metadata in demographic info box


})