const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/zagat', { useNewUrlParser: true });

let db = mongoose.connection

db.once('open', () => {
  console.log('you made a database connection')
}).on('error', (error) => {
  console.log(error);
})

let restuarantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  style: String,
  price: String,
  rating: String,
  img_url: String,
  location: Array
});

let Restaurants = mongoose.model('Cities', restuarantSchema);

let save = (restaurant, callback) => {

  Restaurants.find({ name: restaurant.name }).exec((err, result) => {
    if (err) return err;
    if (result.length) return;
    else {
      let newRestaurants = new Restaurants({
        name: restaurant.name,
        description: restaurant.description,
        style: restaurant.style,
        price: restaurant.price,
        rating: restaurant.rating,
        img_url: restaurant.img_url,
        location: restaurant.location
      })
      newRestaurants.save(err => {
        if (err) console.log(err)
      })
    }
  })
}

let load = callback => {
  let cb = (err, result) => { callback(result) };
  Restaurants.find(cb).limit(6);
}

let nearby = (query, callback) => {
  Restaurants.find(query).exec((err, result) => {
    if (err) return err;
    else {
      return Restaurants.find({ style: result[0].style }).exec((err, restaurantsWithSameStyle) => {
        if (err) return err;
        else {
          let restaurantNameArray = [];
          let restaurantCoordinateArray = [];
          for (var i = 0; i < restaurantsWithSameStyle.length; i++) {
            if (restaurantsWithSameStyle[i].name !== query.name) {
              restaurantNameArray.push(restaurantsWithSameStyle[i])
            }
          }
          restaurantNameArray.forEach(restaurant => {
            if (Math.abs(restaurant.location[0] - result[0].location[0]) <= 0.02 && Math.abs(restaurant.location[1] - result[0].location[1]) <= 0.02) {
              if (restaurantCoordinateArray.length < 6) {
                restaurantCoordinateArray.push(restaurant)
              }
              else return
            }
          })
          if (restaurantCoordinateArray.length) callback(restaurantCoordinateArray);
          else callback(result)
        }
      })
    }
  })
}

module.exports.Restaurants = Restaurants;
module.exports.save = save;
module.exports.load = load;
module.exports.nearby = nearby;