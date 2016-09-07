import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      data: {}
    };

    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(e) {
    e.preventDefault();

    const value = this.inputRef.value;
    const location = encodeURIComponent(value);
    const urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    const urlSuffix = '&APPID=51123fe56641db2371a40b70d56b3194&units=metric';
    const url = urlPrefix + location + urlSuffix;

    // This will only works on Chrome and Firefox
    fetch(url).then(function(response) {
      return response.json();
    }).then((data) => {
      this.setState({ data });
    });
  }

  render() {
    let currentTemp = 'no data';
    const { list } = this.state.data;

    if (list) {
      currentTemp = list[0].main.temp;
    }

    return (
      <div>
        <h1>Welcome to React-Weather</h1>
        <form onSubmit={this.fetchData}>
          <label>I want to know the weather for
            <input
              type="text"
              placeholder={"City, Country"}
              ref={(input) => this.inputRef = input} />
          </label>
        </form>
        <p className="temp-wrapper">
          <span className="temp">{ currentTemp }</span>
          <span className="temp-symbol">°C</span>
        </p>
      </div>
    );
  }
}

export default App;
