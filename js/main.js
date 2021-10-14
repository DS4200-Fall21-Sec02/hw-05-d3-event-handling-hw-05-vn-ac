// write your javascript code here.
// feel free to change the pre-set attributes as you see fit

let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35,
  },
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

//SVG that will hold the visualization
let svg = d3
  .select("#vis")
  .append("svg")
  .attr("preserveAspectRatio", "xMidYMid meet") // this will scale your visualization according to the size of its parent element and the page.
  .attr("width", "100%") // this is now required by Chrome to ensure the SVG shows up at all
  .style("background-color", "white")
  .style("border", "solid")
  .attr(
    "viewBox",
    [
      0,
      0,
      width + margin.left + margin.right,
      height + margin.top + margin.bottom,
    ].join(" ")
  );

const colors1 = ["red", "blue", "green"];


// picks a random color from color1 array
function cClick() {
  const random = Math.floor(Math.random() * 3);
  circle.attr("fill", colors1[random]);
}

// puts one shape on top of another
function dragTop(event, d) {
  d3.select(this).raise().classed("active", true);
}

// drags the circle
function dragCircle(event, d) {
  var x = event.x;
  var y = event.y;
  d3.select(this).attr("cx", x).attr("cy", y);
}

// drags the square
function dragRect(event, d) {
  var x = event.x;
  var y = event.y;
  d3.select(this).attr("x", x).attr("y", y);
}

// Add a square
let rect = svg
  .append("rect")
  .attr("x", "100")
  .attr("y", "200")
  .attr("width", "20%")
  .attr("height", "20%")
  .attr("fill", "#a6cee3")
  .on("click", cClick)
  .call(d3.drag().on("start", dragTop).on("drag", dragRect))
  .on("mouseover", function () {
    // border when mouse hovers over
    d3.select(this).attr("stroke", "#FFFF00").attr("stroke-width", "10");
  })
  .on("mouseout", function () {
    // border disappears when mouse leaves the shape
    d3.select(this).attr("stroke", "none");
  });

// Add a circle
let circle = svg
  .append("circle")
  .attr("cx", "350")
  .attr("cy", "250")
  .attr("r", "60")
  .attr("fill", "#b2df8a")
  .on("click", cClick)
  .call(d3.drag().on("start", dragTop).on("drag", dragCircle))
  .on("mouseover", function () {
    // border when mouse hovers over
    d3.select(this).attr("stroke", "#FFFF00").attr("stroke-width", "10");
  })
  .on("mouseout", function () {
    // border disappears when mouse leaves the shape
    d3.select(this).attr("stroke", "none");
  })
  .on("dblclick", function () {
    // change both shapes' colors to random colors on double click
    d3.select(this).transition().attr("fill", colors1[random]);
    d3.select("rect").transition().attr("fill", colors1[random]);
    k++;
  });
