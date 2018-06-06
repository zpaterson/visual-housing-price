import React, { Component } from 'react';
import { Col, Input, ProgressBar, Row } from 'react-materialize';

// import D3 from './d3';
import Chart from './Component/Chart';
import TopNav from './Component/TopNav';
import BottomNav from './Component/BottomNav';
import './App.css';
import FetchData from './FetchData';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      year: '2017'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      year: e.target.value
    });
  }

  render() {   
    // let optionsArr = [];
    // for (let yr = 2017; yr >= 1975; yr--) {
    //   optionsArr.push(<option value={yr} key={yr}>{yr}</option>);
    // }
    
    // maybe put rangeInput in Chart.js? 
    // so I can change min and max according to the actural data range.
    // city data in certain year is missing, now it shows blank in chart. 
    const rangeInput = () => (
      <Row>
          <Input 
            defaultValue={this.state.year} 
            onChange={this.handleChange} 
            s={12} type='range' label='Year 1975 - 2017' min='1975' max='2017'>
            {/* {optionsArr} */}
          </Input>
      </Row>
    );

    return (
      <div>
        <TopNav />

        {rangeInput()}

        {/* todo: add a button to animate the Chart, change this.state.year automatically */}
        {/* <D3 data={this.state.stateData} /> */}

        { this.props.error && (<p>{this.props.error.message}</p>) }
        
        { this.props.isLoading && (<Col s={12}><ProgressBar /></Col>) }  
        
        { !this.props.error 
          && !this.props.isLoading 
          && (<Chart data={this.props.data} year={this.state.year} />) }

        <BottomNav />
      </div>
    )
  }
};

export default FetchData('/states/alldata')(App);
