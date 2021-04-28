let dataset = [];

// const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

const d = document.querySelector('#test-suite-selector');
console.log(d);

async function getData() {
  const data = await fetch(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
  );
  const res = await data.json();
  console.log(res);
  dataset = res.data.slice(0, 10);
  console.log(dataset);
  loadPage();
}

getData();

/*
var margin = { top: 20, right: 20, bottom: 40, left: 60 };
const width = 500,
  height = 500;
// create svg element
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr('id', 'title');

// Create the scale
const xAxis = d3
  .scaleLinear()
  .domain([0, 100]) // This is what is written on the Axis: from 0 to 100
  .range([55, 800]); // This is where the axis is placed: from 100px to 800px
//   .ticks(10);
//   .attr("class", "tick");

// Create the scale
const yAxis = d3
  .scaleLinear()
  .domain([0, 100]) // This is what is written on the Axis: from 0 to 100
  .range([290, 10]); // This is where the axis is placed: from 100px to 800px

// Draw the axis
svg
  .append('g')
  .attr('id', 'x-axis')
  .attr('transform', 'translate(55,300)') // This controls the vertical position of the Axis
  .call(d3.axisBottom(xAxis))

  .append('g')
  .attr('id', 'y-axis')
  //   .attr('transform', 'rotate(-90)')
  .attr('transform', 'translate(55,-300)') // This controls the vertical position of the Axis
  .call(d3.axisLeft(yAxis));

*/

const w = 500;
const h = 500;
const scale = 1;

function loadPage() {
  const svg = d3
    .select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  svg
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', (d, i) => {
      // Add your code below this line
      console.log(d, i);

      return i * 30;

      // Add your code above this line
    })
    .attr('y', (d, i) => {
      // Add your code below this line
      console.log(d);

      return h - d[1];

      // Add your code above this line
    })
    // .attr('y', 0)
    .attr('width', 25)
    .attr('height', (d, i) => d[1]);
}
