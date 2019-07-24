const Sentencer = require('sentencer');
const faker = require('faker');
const fs = require('fs');

Sentencer.configure({
  nounList: ["ingredients", "cuisine", "cocktails", "food", "craft beer", 
  "ciders", "fine wines", "space", "kitchen" ],

  adjectiveList: ["Sophisticated", "Stylish", "elevated", "American", "Polished",
  "Innovative", "Farm-to-table", ]

});

let randomSentence = () => {

let num = Math.ceil(Math.random()*3)
	
  	if (num === 3) {
			let sentence = Sentencer.make("{{ adjective }}, locally sourced {{ noun }} with {{ noun }} & {{ noun }}.");
			return sentence;
		} 
	 	 if (num === 2) {
			let sentence = Sentencer.make("{{ adjective }} with changing menu using local ingredients in {{ noun }} & {{ noun }}.");
			return sentence;
		} 
		if (num === 1) {
			let sentence = Sentencer.make("{{ adjective }} {{noun}} a seasonal menu of {{ adjective }} {{ noun }}, {{ adjective }} {{ noun }} & {{ noun }}.");
			return sentence;
		} 
	}


let randomScore = () => {
	
		let rating = ((Math.random()*3) + 2);
		return Number(rating.toFixed(1));
}

let restaurantNames = ["LETTUCE EAT", "FILLED OF DREAMS", "BITE ME SANDWICHES", "LATTETUDE", "DOWNTOWN DINER", "LATE NIGHT DINE RIGHT",
"OVER EASY DINER", "THAI TANIC", "CHOPS & HOPS", "JUST FALAFS", "GOCHEW GRILL", "CHICKEN ITZA RESTAURANT", "THE HUNGRY PIG", "FAMOUS LUNCH",
"PU PU HOT POT", "PIG\'N PANCAKE", "MUNCH BOX", "A FOOD AFFAIR", "MY TWO CENTS", "THE CUP", "THE LITTLE EASY", "BREWED AWAKENING", "THE MUNCHY QUEEN",
"MAD FOR CHICKEN", "FISHCOTHEQUE", "COMMON GROUNDS", "LOVE YOU A LATTE", "TWO MEN AND A GRIDDLE", "THE GOLDEN SPOON", "LOX STOCK & BAGEL",
"EN THAI SING", "THE CRISPY BISCUIT", "GOOD EATS DINER", "NO WAIT DINER", "GRUB N\' STUFF DINER", "JUAN IN A MILLION", "THAI THE KNOT", "PITA PAN",
"YAKUZA SUSHI", "RUNNING GOOSE", "BOURBON STREET DINER", "NOODLE BAR", "MEAT U THERE", "SUNSHINE DINER", "A TASTE OF HEAVEN", "DINE RIGHT DINER", "EAT, PRAY, LOVE",
"BEAN AROUND THE WORLD COFFEES", "NIM COM SOUP", "BACON BROS. DINER", "BELLY & SNOUT", "THE BAGERLY", "THE SIZZLING GRIDDLE", "THAT\`S A WRAP", "RABBIT FOOD",
"BELLYFUL", "WOK THIS WAY", "BLIND WEASEL", "THE EATERY", "WALLFLOWER DINER", "CHAI TEA SHOP", "BURRITO BELLY", "HIBACHI HEROES", "COFFEE NUT", "BACKYARD BOWLS", 
"PEKING INN", "PARADISE FOUND", "LA LATTE DA", "PHO KING NOODLES", "BOTTOMS UP", "CURRY FAVOR"]


let coordinateGenerator = () => {
	
	let latitude = Math.random()*0.05 + 40;
	let longitude = Math.random()*(-0.07) - 105.22;

	return [Number(latitude.toFixed(6)), Number(longitude.toFixed(6))]
}

let syleGenerator = () => {
	let styles = ["Armican", "Vegan", "Brunch", "Thai", "Seafood", "Bakery", "Coffee House", "Grill"];
	let index = Math.floor(Math.random()*styles.length);
	return styles[index];
}

let imageGenerator = () => {
	return faker.image.food();
}

let priceGenerator = () => {
	let num = Math.ceil(Math.random()*3);
	if (num === 3) return "$$$";
	if (num == 2) return "$$";
	else return "$";
}

let dataGenerator = () => {
	let jsonArray = [];

	restaurantNames.forEach(name => {

		jsonArray.push({
			name: name,
			description: randomSentence(),
			style: syleGenerator(),
			price: priceGenerator(),
			rating: randomScore(),
			img_url: imageGenerator(),
			location: coordinateGenerator()
		})
	})
	let jsonData = JSON.stringify(jsonArray);
	fs.writeFile("restaurantData.json", jsonData, 'utf8', () => {
		console.log('done')
	})
	return jsonArray;
}

module.exports.dataGenerator = dataGenerator;