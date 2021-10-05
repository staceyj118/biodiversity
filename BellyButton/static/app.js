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

// sample metadata - ID, ethnicity, gender, age, location, bbtype, wfreq
function results(id) {
    d3.json('samples.json').then(data =>{
    var metadata = data.metadata;
    // console.log(metadata);

    var all = metadata.filter(meta => meta.id.toString() === id)[0];
    var demoInfo = d3.select('#sample-metadata');

    demoInfo.html(''); 

    Object.entries(all).forEach((key) => {
        demoInfo.append('h5').text(key[0].toUpperCase() + ': ' + key[1] + '\n');
});
}); 
}