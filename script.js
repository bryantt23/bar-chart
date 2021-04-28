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
  dataset = res.data.slice(0, 100);
  //   dataset = res.data;
  console.log(dataset);
  //   w = dataset.length;
  const maxHeight = Math.max(...dataset.map(d => d[1]));
  vScale = h / maxHeight;
  console.log(h / maxHeight);

  divisor = w / dataset.length;
  console.log(w, h);
  loadPage();
}

getData();

let w = 500,
  h = 500,
  divisor = 1;

const hScale = 1;
let vScale = 1;

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
