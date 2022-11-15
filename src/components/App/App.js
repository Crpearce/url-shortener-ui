import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [], 
      error: ''
    };
  };

  componentDidMount() {
    getUrls()
      .then(response => this.setState({urls: response.urls}))
      .catch(error => this.setState({error: 'Error getting data, please try again later'}))
  };

  addUrl = (newUrl) => {
    postUrl(newUrl)
    .then(response => response.json())
    .then(response => this.setState({urls: [...this.state.urls, response]}))
    .catch(error => this.setState({error: "Please make sure all input fields are filled out before submitting"}))
  };

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addUrl={this.addUrl}/>
        </header>
        {this.state.error && <h3>{this.state.error}</h3>}
        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  };
};

export default App;
