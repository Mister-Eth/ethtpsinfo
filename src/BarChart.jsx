import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export const BarChart = ({ data }) => {
  const d3Container = useRef(null)

  useEffect(() => {
    if (data && d3Container.current) {
      const svg = d3.select(d3Container.current)
      svg.selectAll('*').remove() // Clear svg content before adding new elements

      // Set up scales and axes
      const margin = { top: 20, right: 20, bottom: 30, left: 40 }
      const width = +svg.attr('width') - margin.left - margin.right
      const height = +svg.attr('height') - margin.top - margin.bottom
      const x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
      const y = d3.scaleLinear().rangeRound([height, 0])

      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      x.domain(data.map((d) => d.x))
      y.domain([0, d3.max(data, (d) => d.y)])

      // Add bars
      g.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d.x))
        .attr('y', (d) => y(d.y))
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - y(d.y))

      // Add axes
      g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))

      g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y).ticks(10, '%'))
    }
  }, [data]) // Redraw chart if data changes

  return <svg ref={d3Container} width={600} height={400} />
}