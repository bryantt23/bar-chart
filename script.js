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
  dataset = res.data;
  // dataset = res.data.slice(0, 10);
  //   console.log(dataset);
  //   w = dataset.length;
  const maxHeight = Math.max(...dataset.map(d => d[1]));
  console.log(maxHeight);
  vScale = h / maxHeight;
  //   console.log(h / maxHeight);

  divisor = w / dataset.length;
  //   console.log(w, h);
  loadPage();
}

getData();

let w = 500,
  h = 500,
  divisor = 1;

const hScale = 1;
let vScale = 1;

function loadPage() {
  d3.select('body')
    .append('div')
    .attr('id', 'tooltip')
    .attr('style', 'position: absolute; visibilty:hidden')
    .attr('width', w)
    .attr('height', h)
    // .attr('x', e => {
    //   console.log(e);
    // })
    // .attr('data-date', () => {
    //   console.log(d3.event);
    //   // d3.select('#tooltip')
    //   //   .style('left', d3.event.pageX + 'px')
    //   //   .style('top', d3.event.pageY + 'y');
    // });
    .on('mousemove', () => {
      console.log(d3.event.target.attributes);
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
    .on('mouseover', (d, i) => {
      console.log(d, i);
      // d3.select('#tooltip').style('opacity', 1).text(`555`);
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
    .attr('data-gdp', (d, i) => {
      console.log(d, i);
      return d[1];
    })
    .attr('x', (d, i) => {
      // Add your code below this line
      //   console.log(d, i);
      return i * divisor * hScale;
      // Add your code above this line
    })
    .attr('y', (d, i) => {
      // Add your code below this line
      //   console.log(d[1], i);
      return h - d[1] * vScale;
      // Add your code above this line
    })
    // .attr('y', 0)
    .attr('width', 25 * hScale)
    .attr('height', (d, i) => d[1] * vScale);
}
