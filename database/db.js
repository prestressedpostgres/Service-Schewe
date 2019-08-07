const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/zagatdb', { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to database')
}).on('error', (error) => {
  console.log(error);
})

let restuarantSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, required: true },
  description: String,
  style: String,
  price: String,
  rating: String,
  img_url: String,
  location: Array
});

let Restaurants = mongoose.model('Cities', restuarantSchema);

//check to see if a particular restaurant exists in the DB already
let save = (restaurant, callback) => {
  Restaurants.find({ name: this.name }).exec((err, result) => {
    if (err) return err;
    if (result.length) return;
    else {
      //if not already in DB, create a new object with information and save it to the DB
      let newRestaurants = new Restaurants({
        'id': id,
        'name': name,
        'description': description,
        'style': style,
        'price': price,
        'rating': rating,
        'img_url': img_url,
        'location': location
      });
      newRestaurants.save(err => {
        if (err) console.log(err)
      })
    }
  })
}

// GET request - findById
let findById = (id, callback) => {
  Restaurants.find({ID: id}, (err, results) => {
    if (err) {return callback(err, 'error finding record')}
      return results;
  })
  .then((restaurantResult) => {
    return callback(restaurantResult)
  });
}

// LOAD 6 images
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
module.exports.findById = findById;
module.exports.nearby = nearby;