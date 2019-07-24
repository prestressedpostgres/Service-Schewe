import React from 'react';
import ReactDOM from 'react-dom';
import Card from './components/card.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants: [],
      name: "The Kitchen",
      style: "Food"

    }
  }


  handleClick(e) {
    e.preventDefault();
    let decoded = (e.currentTarget.getElementsByTagName("b")[0].innerHTML).replace('amp;', '')
    let currentStyle = e.currentTarget.getElementsByClassName("styleAndPrice")[0].innerHTML.split(' ')
    console.log(decoded)
    function camelCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }

    axios.get(`/restaurant`, {
      params: {
        name: decoded
      }
    })
      .then(result => {
        this.setState({
          restaurants: result.data,
          name: camelCase(decoded),
          style: currentStyle[0]
        })
      })
  }

  componentDidMount() {
    axios.get('/api/cities')
      .then(result => this.setState({
        restaurants: result.data
      }))
      .catch(error => this.setState({
        error
      }));
  }

  render() {
    return (
      <div className="nearbyService">
        <div className="ribbon">More {this.state.style} Near {this.state.name}</div>
        <Card restaurants={this.state.restaurants} onClick={(e) => this.handleClick(e)} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />, document.getElementById('app')
);