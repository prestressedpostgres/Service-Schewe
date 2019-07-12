console.log('Hello Node.js project.');
import React from 'react';
import ReactDOM from 'react-dom';
import sampleRestaurants from '../../database/sampleData.json';
import Card from './components/card.jsx';
import axios from 'axios';

class App extends React.Component{
  constructor(props) {
  super(props) 
  this.state = {
    restaurants: [],
    hover: false
  }
    //   name: 'THE KITCHEN',
    //   syle: "American",
    //   price: "$$$",
    //   description: "Farm-to-table American food in an urban space, plus drinks from the upstairs community bar.",
    //   rating: 4.5,
    //   img_url: "https://zagat-photos.imgix.net/ChIJbfI25Sbsa4cRMz0wQhLNRB4/b9a42b5a9b40f75163bd15ab4ae19e59.jpg?max-w=1400&auto=format",
    //   location: [40.0178, -105.2817]
    // }
  }
  handleClick (e) {
    e.preventDefault();
// console.log(this)
    axios.get(`/restaurant`, {
      params: {
        name: e.currentTarget.getElementsByTagName("b")[0].innerHTML
      }
    })
    .then(result => {
      this.setState({
        restaurants: result.data
      })
    })
    console.log(this.state.restaurants)
  }

  toggleHover() {
    console.log(this.state.hover)
    this.setState({hover: !this.state.hover})
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


  render () {
    // console.log(this.state.restaurants.data)
    return (
    <div>
      <Card restaurants={this.state.restaurants} onClick={(e) => this.handleClick(e)} state={this.state}
      onMouseOver={() => this.toggleHover()}/>
    </div>
    )
  }
}


ReactDOM.render(
  <App />, document.getElementById('app')
);