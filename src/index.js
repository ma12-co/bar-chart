import _ from "lodash"
import "./index.css"

import * as d3 from "d3"

const dataset = require('./GDP-data.json')
const DATA = dataset.data
const YEARS = dataset.data.map((d) => parseInt(d[0].slice(0, 4)))
const GDPS = dataset.data.map((d) => d[1])


const WIDTH = 600
const HEIGHT = 400
const PADDING = 30
const PADDINGLEFT = 50
const PADDINGRIGHT = 40

//set the scale for the y axis
const yScale = d3.scaleLinear()
  // the domain of the data, from the smallest date to the biggest
  .domain([d3.min(GDPS), d3.max(GDPS)])
  //the output on the graph, where do i want it visualized (from zero to top in this case)
  .range([0, HEIGHT - 2 * PADDING])

const xScale = d3.scaleLinear()
  .domain([d3.min(YEARS), d3.max(YEARS)])
  .range([0, WIDTH - PADDINGLEFT - PADDINGRIGHT])

let svg = d3.select("div")
  .append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)


svg.selectAll("rect")
  .data(DATA)
  .enter()
  .append("rect")
  //takes uses the years(parsed to integer) to position each rectangle along the x axis
  .attr("x", (d) => xScale(parseInt(d[0].slice(0, 4))) + PADDINGLEFT - 2)
  .attr("y", (d, i) => HEIGHT - yScale(d[1]) - PADDING)
  .attr("width", 5)
  .attr("height", (d) => yScale(d[1]))
  .attr("class", "bar")
  .attr("data-date", d => d[0])
  .attr("data-gdp", d => d[1])

const yAxisScale = d3.scaleLinear()
  .domain([d3.min(GDPS), d3.max(GDPS)])
  .range([HEIGHT - 2 * PADDING, 0])


const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yAxisScale);


svg.append("g")
  .attr("id", "x-axis")
  .attr("transform", `translate(${PADDINGLEFT},${HEIGHT - PADDING})`)
  .call(xAxis);


svg.append("g")
  .attr("id", "y-axis")
  .attr("transform", `translate(${PADDINGLEFT},${PADDING}) `)
  .call(yAxis);

/**
 svg.selectAll('text')
.data(DATA)
.enter()
.append("text")
.text(d => d[0])
.attr("x", (d, i) => xScale(i) + PADDING)
.attr("y", HEIGHT - PADDING + 10)
.attr('class', 'label')

 */
