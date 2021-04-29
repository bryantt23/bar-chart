let dataset = [];
const padding = 60;
let w = 500,
  h = 500,
  xScale = 1,
  yScale = 1,
  startDate,
  endDate;

const d = document.querySelector('#test-suite-selector');

async function getData() {
  const data = await fetch(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
  );
  const res = await data.json();
  dataset = res.data;
  const n = res.data.length;
  startDate = Number(dataset[0][0].split('-')[0]);
  endDate = Number(dataset[n - 1][0].split('-')[0]);
  const maxHeight = Math.max(...dataset.map(d => d[1]));
  yScale = h / maxHeight;
  xScale = w / dataset.length;
  loadPage();
}

getData();

function loadPage() {
  d3.select('body')
    .append('div')
    .attr('id', 'tooltip')
    .attr('style', 'position: absolute; visibilty:hidden')
    .attr('width', w)
    .attr('height', h)
    .on('mousemove', () => {
      d3.select('#tooltip')
        .style('left', d3.event.pageX + 'px')
        .style('top', d3.event.pageY + 'y');
    });

  const svg = d3
    .select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .attr('id', 'title');

  svg
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .style('opacity', 0.1)
    .on('mouseover', (d, i) => {
      d3.select('#tooltip')
        .style('visibility', 'visible')
        .attr('data-date', `${i[0]}`)
        .text(`${i[0]} ${i[1]}`);
    })
    .on('mouseout', () => {
      d3.select('#tooltip')
        .style('visibility', 'hidden')
        .attr('data-date', null);
    })
    .attr('data-date', (d, i) => {
      return d[0];
    })
    .attr('data-gdp', (d, i) => {
      return d[1];
    })
    .attr('x', (d, i) => {
      return i * xScale;
    })
    .attr('y', (d, i) => {
      return h - d[1] * yScale;
    })
    .attr('width', 25 * xScale)
    .attr('height', (d, i) => d[1] * yScale);

  const yAxisScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(dataset, d => {
        return d[1];
      })
    ])
    .range([h, 0]);

  const xAxisScale = d3
    .scaleLinear()
    .domain([startDate, endDate])
    .range([0, h]);

  const xAxis = d3.axisBottom().scale(xAxisScale);
  svg.append('g').attr('id', 'x-axis').call(xAxis);

  const yAxis = d3.axisLeft(yAxisScale);
  svg
    .append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${padding}, 0)`)
    .call(yAxis);
}
