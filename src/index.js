import _ from "lodash"
import "./index.css"

import * as d3 from "d3"

//when importing a JSON with require, it already converts it into a JS object
const dataset = require('./GDP-data.json')
const DATA = dataset.data
const YEARS = dataset.data.map((d) => parseInt(d[0].slice(0, 4)))
const GDPS = dataset.data.map((d) => d[1])

const WIDTH = 600
const HEIGHT = 400
const PADDING = 40
const PADDINGLEFT = 60
const PADDINGRIGHT = 60

//set the scale for the height of the rectangles and y position
const yScale = d3.scaleLinear()
  // the domain of the data, from the smallest date to the biggest
  .domain([d3.min(GDPS), d3.max(GDPS)])
  //the output on the graph, where do i want it visualized (from zero to top in this case)
  .range([0, HEIGHT - 2 * PADDING])

//scale for the width of the rectangles an x position
const xScale = d3.scaleLinear()
  .domain([d3.min(YEARS), d3.max(YEARS)])
  .range([0, WIDTH - PADDINGLEFT - PADDINGRIGHT])

//creates and appends the svg to my div
let svg = d3.select("div")
  .append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)

// Define the div for the tooltip
var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);


svg.selectAll("rect")
  .data(DATA)
  .enter()
  .append("rect")
  //takes uses the years(parsed to integer) to position each rectangle along the x axis
  .attr("x", (d) => xScale(parseInt(d[0].slice(0, 4))) + PADDINGLEFT - 2)
  .attr("y", (d, i) => HEIGHT - yScale(d[1]) - PADDING)
  .attr("width", 6)
  .attr("height", (d) => yScale(d[1]))
  .attr("class", "bar")
  .attr("data-date", d => d[0])
  .attr("data-gdp", d => d[1])
  //event listener for the tooltip display
  .on("mouseover", function (d) {
    div.transition()
      .duration(200)
      .style("opacity", .9);
    div.html("Year " + d[0].slice(0, 4) + "<br/>" + " $ " + d[1] + " Billion")
      .style("left", "45%")
      .style("top", "45%");
  })
  .on("mouseout", function (d) {
    div.transition()
      .duration(500)
      .style("opacity", 0)
  })

//creates a new scale for the y axis in order to invert the values (for the bars we needed it upside down)
const yAxisScale = d3.scaleLinear()
  .domain([d3.min(GDPS), d3.max(GDPS)])
  .range([HEIGHT - 2 * PADDING, 0])


//creactes the axes, the tickFormat takes out the comma from the years
const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
const yAxis = d3.axisLeft(yAxisScale);


//append the axes to the two axes groups
svg.append("g")
  .attr("id", "x-axis")
  .attr("transform", `translate(${PADDINGLEFT},${HEIGHT - PADDING})`)
  .call(xAxis);
svg.append("g")
  .attr("id", "y-axis")
  .attr("transform", `translate(${PADDINGLEFT},${PADDING}) `)
  .call(yAxis);

