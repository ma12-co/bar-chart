import _ from "lodash"
import "./index.css"

import * as d3 from "d3"

const dataset = require('./GDP-data.json')
const data = dataset.data

const WIDTH = 1200
const HEIGHT = 600

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, (d) => d[1])])
  .range([0, HEIGHT])






let svg = d3.select("body")
  .append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)



svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * 3)
  .attr("y", (d, i) => HEIGHT - yScale(d[1]))
  .attr("width", 2)
  .attr("height", (d) => yScale(d[1]))
  .attr("class", "bar")

svg.selectAll('text')
  .data(data)
  .enter()
  .append("text")
  .text(d => d[0])
  .attr("x", (d, i) => i * 3)
  .attr("y", (d, i) => HEIGHT)
  .attr('class', 'label')
  .attr("transform", "translate(x,y) rotate(45)")


