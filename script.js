const d = document.querySelector('#test-suite-selector');
console.log(d);

async function getData() {
  const data = await fetch(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
  );
  const res = await data.json();
  console.log(res);
}

getData();

// create svg element
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', 1000)
  .attr('id', 'title');

// Create the scale
const xAxis = d3
  .scaleLinear()
  .domain([0, 100]) // This is what is written on the Axis: from 0 to 100
  .range([100, 800]); // This is where the axis is placed: from 100px to 800px
// Draw the axis
svg
  .append('g')
  .attr('id', 'x-axis')
  .attr('transform', 'translate(0,50)') // This controls the vertical position of the Axis
  .call(d3.axisBottom(xAxis));
