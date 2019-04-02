import _ from "lodash"
import "./index.css"

import * as d3 from "d3"

const dataset = require('./GDP-data.json')
const DATA = dataset.data

const WIDTH = 600
const HEIGHT = 400
const PADDING = 30
const PADDINGLEFT = 50
const PADDINGRIGHT = 40


const yScale = d3.scaleLinear()
  .domain([0, d3.max(DATA, (d) => d[1])])
  .range([0, HEIGHT - 2 * PADDING])

const xScale = d3.scaleLinear()
  .domain([0, DATA.length])
  .range([0, WIDTH - PADDINGLEFT - PADDINGRIGHT])

let svg = d3.select("div")
  .append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)



svg.selectAll("rect")
  .data(DATA)
  .enter()
  .append("rect")
  .attr("x", (d, i) => xScale(i) + PADDINGLEFT)
  .attr("y", (d, i) => HEIGHT - yScale(d[1]) - PADDING)
  .attr("width", 1)
  .attr("height", (d) => yScale(d[1]))
  .attr("class", "bar")
  .attr("data-date", d => d[0])
  .attr("data-gdp", d => d[1])

const yAxisScale = d3.scaleLinear()
  .domain([0, d3.max(DATA, (d) => d[1])])
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
