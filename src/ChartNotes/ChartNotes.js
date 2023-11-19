import React, { useRef, useEffect, useState } from 'react';
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from 'd3';

const ChartNotes = () => {
    const svgRef = useRef();
    /* values of columns */
    const [data, setData] = useState([25, 30, 45, 60, 20, 60, 75]);
    useEffect(() => {
        /* select and element for further manipulations with styles and events */
        const svg = select(svgRef.current);

        const xScale = scaleBand().domain(data.map((_, index) => index)).range([0, 600]).padding(0.5)
        /* 
            domain is number minimal and max elems of y axis
            range is responsible for the position of the y axis
        */
        const yScale = scaleLinear().domain([0, 150]).range([300, 0])
        /* set colours for respective levels */
        const colorScale = scaleLinear().domain([10, 150, 300]).range(['blue', 'yellow', 'red']).clamp(true)
        const xAxis = axisBottom(xScale).ticks(data.length)
        const yAxis = axisRight(yScale);

        /* positions and styles */
        svg.select('.x-axis').style('transform', 'translateY(300px').call(xAxis);
        svg.select('.y-axis').style('transform', 'translateX(600px').call(yAxis)
        svg.selectAll('.bar')
            .data(data)
            .join('rect')
            .attr('class', 'bar')
            .attr('x', (value, index) => xScale(index))
            .attr('y', -300)
            .style('transform', 'scale(1,-1')
            .attr('width', xScale.bandwidth())
            .on('mouseenter', (value, index) => {
                svg.selectAll('.tooltip').data([value]).join('text').attr('class', 'tooltip').text(value).attr('x', xScale(index) + xScale.bandwidth() / 2).attr('y', yScale(value + 10)).attr('text-anchor', 'middle').transition().attr('opacity', 1)
            })
            .on('mouseleave', () => svg.select('.tooltip').remove())
            .transition()
            .attr('height', value => 300 - yScale(value))
            .attr('fill', colorScale)

    }, [data]);

    return (
        <div id='root'>
            <svg ref={svgRef}>
                <g className='x-axis' />
                <g className='y-axis' />
            </svg>
            <button onClick={() => setData(data.map(value => value + 5))}>
                Update data
      </button>
            <button onClick={() => setData(data.filter(value => value < 35))}>
                Filter fakeData
      </button>
        </div>
    );
};

export default ChartNotes;
