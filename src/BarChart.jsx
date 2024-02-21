import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export const Streamgraph = ({ data, width = 600, height = 400 }) => {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!data || data.length === 0) return

    // Select the SVG element and clear it
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove() // Clear any previous SVG content

    // Set up margins
    const margin = { top: 20, right: 20, bottom: 30, left: 50 },
      chartWidth = width - margin.left - margin.right,
      chartHeight = height - margin.top - margin.bottom

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.x))
      .range([0, chartWidth])

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.y)])
      .range([chartHeight, 0])

    // Append the SVG object to the body of the page
    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Generate the area for the Streamgraph
    const area = d3
      .area()
      .x((d) => xScale(d.x))
      .y0(chartHeight)
      .y1((d) => yScale(d.y))
      .curve(d3.curveBasis) // This makes the streamgraph shapes smooth

    // Add the area to the chart
    chart
      .append('path')
      .data([data]) // Bind data
      .attr('class', 'streamgraph-area')
      .attr('fill', 'steelblue')
      .attr('d', area)

    // Add the X Axis
    chart
      .append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale))

    // Add the Y Axis
    chart.append('g').call(d3.axisLeft(yScale))
  }, [data, height, width]) // Redraw chart if data or dimensions change

  return <svg ref={svgRef} width={width} height={height} />
}
