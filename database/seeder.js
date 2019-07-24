const Sentencer = require('sentencer');
const faker = require('faker');
const fs = require('fs');
const db = require('./db');
const axios = require('axios');
const API_KEY = require('../config.js').API_KEY

Sentencer.configure({
	nounList: ["ingredients", "cuisine", "cocktails", "food", "craft beer",
		"ciders", "fine wines", "space", "kitchen", "courses", "entrees", "hors d\'oeuvre",
		"dishes", "desserts"],

	adjectiveList: ["acclaimed", "affordable", "american", "asian", "casual", "celebrated", "charming", "class", "decent", "downtown", "elegant",
		"ethnic", "excellent", "fabulous", "famous", "fancy", "fine", "formal", "french", "friendly", "great", "independent", "interesting", "mexican",
		"outdoor", "outstanding", "parisian", "popular", "posh", "high quality", "renowned", "romantic", "simple", "smart", "sophisticated", "spanish",
		"stylish", "superb", "themed", "traditional", "trendy", "upscale", "vietnamese", "wonderful", "family-run"]

});

let randomSentence = () => {

	let num = Math.ceil(Math.random() * 3)

	if (num === 3) {
		let sentence = Sentencer.make("{{ adjective }}, locally sourced {{ noun }} with {{ noun }} & {{ noun }}.");
		return sentence;
	}
	if (num === 2) {
		let sentence = Sentencer.make("{{ adjective }}, with changing menu using local ingredients in {{ noun }} & {{ noun }}.");
		return sentence;
	}
	if (num === 1) {
		let sentence = Sentencer.make("{{ adjective }} {{noun}}, a seasonal menu of {{ adjective }} {{ noun }}, {{ adjective }} {{ noun }} & {{ noun }}.");
		return sentence;
	}
}


let randomScore = () => {
	let rating = ((Math.random() * 3) + 2);
	return rating.toFixed(1);
}

let restaurantNames = ["CENTRO", "JULEP", "DIO MIO", "SAFTA", "BARTACO", "BRASSERIE TEN TEN", "RVER & WOODS", "THE MED", "CHINA GOURMET", "HAPA SUSHI",
	"BOULDER CHOPHOUSE", "SUSHI ZAN MAI", "DENVER CHOPHOUSE", "TACOS TEQUILA WHISKEY", "OHANA ISLAND KITCHEN", "ROCKY FIN POKE BAR", "COMMUNITY", "RIOJA", "OAK",
	"THE KITCHEN", "DARK HORSE", "ACREAGE", "TAVERNETTA", "OSTERIA MARCO", "RACINES", "LINGER", "RIO GRANDE", "MCDEVITT TACO SUPPLY", "SANITA BREWING COMPANY", "BOULDER BEER COMPANY",
	"AVERY BREWING COMPANY", "ARCANA", "BRU HANDBUILT ALES & EATS", "VIA PEARLA", "SNOOZE AN A.M. EATERY, BLD", "SNOOZE AN A.M. EATERY", "THE POST BREWING CO. - BOULDER", "THE POST BREWING CO. - BOULDER",
	"THE YELLOW DELI", "THE POST BREWING CO. - LONGMONT", "SALT", "GB FISH AND CHIPS", "PINTS PUB - BRITISH GASTRO BREWPUB", "CUBA CUBA CAFE & BAR", "MIZUNA", "THE FAINTING GOAT", "TABLE 6",
	"FRUITION RESTAURANT", "SUSHI DEN", "IZAKAYA DEN", "OTOTO", "VENICE ITALIAN RESTAURANT", "MERCANTILE DINING AND PROVISIONS", "VILLAGE COFFEE SHOP", "THE PARKWAY CAFE", "LUCKY\'S CAFE", "SAM'S NO.3",
	"OFFICERS CLUB", "DENVER BISCUIT COMPANY", "ANNETTE", "BEAST AND BOTTLE", "STAR KITCHEN", "OPHELIA'S ELECTRIC SOAP BOX", "QUALITY ITALIAN", "TOKYO PREMIUM BAKERY", "YANNI'S GREEK RESTAURANT",
	"THE SINK", "BIKER JIM'S", "THE LOBBY", "ELWAY\'S", "THE CAPITAL GRILL", "OCEAN PRIME", "THIRSTY LION GASTROPUB - UNION STATION", "MELLOW MUSHROOM", "RIALTO CAFE", "FRASCA FOOD AND WINE",
	"IL PASTAIO RISTORANTE", "SFORNO TRATTORIA ROMANA", "ELLYNGTON'S", "PARK & CO", "CITY GRILLE", "TORCHY\'S TACOS", "FLAGSTAFF HOUSE", "BLACK CAT", "NEXT DOOR", "CURRY N KEBOB", "JAPANGO",
	"WILD STANDARD", "ZOLO SOUTHWESTERN GRILL", "JAX FISHOUSE & OYSTER BAR - BOULDER", "THE WEST END TAVERN", "THE BOULDER DUSHANBE TEAHOUSE", "HUMBOLDT FARM, FISH, WINE", "ACORN", "BANG UP TO THE ELEPHANT!",
	"ALOY MODERN THAI", "THE POPULIST", "MORIN", "RYE SOCIETY", "BECKON"]

let imageUrls = ["https://zagat-photos.imgix.net/ChIJdzSU5Sbsa4cRWOQomlwYqxI/9c269383b4cc2b2909264457f42bcb4b.jpg?h=224&w=224&fit=crop&q=75&fm=jpg&auto=format", "http://juleprino.com/wp-content/uploads/2018/02/menu.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/0e/43/f5/fb/photo1jpg.jpg",
	"https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/40883757_1548306981981738_7043764687770484736_o.jpg?_nc_cat=108&_nc_oc=AQn4b_QVWLf6L9UYgbv4caApTp_9RJSuTtoZppH8P5DsdU0Av6P_S6BOyE1cCXeLtQ8&_nc_ht=scontent-sjc3-1.xx&oh=ef5093bb5a48781fa37dcba886637465&oe=5DAF78B0",
	"https://cdn.vox-cdn.com/thumbor/leJUx_9YvcyuN_aUhbT4syzI8tA=/0x0:1920x1280/1520x1013/filters:focal(807x487:1113x793):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/62704908/bartaco.0.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/09/0e/a0/f4/brasserie-ten-ten.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/17/ac/a1/1b/photo1jpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-l/15/01/7f/48/beet-salad-with-interesting.jpg",
	"https://s3-media2.fl.yelpcdn.com/bphoto/xWeTMKkjf90N_MJh-BxpuA/l.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/15/ae/7f/3c/something-so-simple-but.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/16/47/37/f0/chicken-tortilla-soup.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-o/03/c3/05/db/sushi-boat.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-l/14/e8/12/9e/chophouse-brewery-boulder.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/06/b1/9b/ba/the-tacos-four-amazing.jpg",
	"https://cdn.vox-cdn.com/uploads/chorus_asset/file/7479099/OHANA_6497e.0.jpeg",
	"https://media-cdn.tripadvisor.com/media/photo-s/11/f4/65/8b/best-poke-in-town.jpg",
	"https://www.eatatcommunity.com/wp-content/uploads/2018/11/Ban-Salad_5-2.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/10/de/51/7b/emmerson.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-l/14/05/20/6c/to-die-for.jpg",
	"https://zagat-photos.imgix.net/ChIJH68pxyfsa4cRmlqp7By1XYE/36521024c481478c8a24cb24a5d45f3a.jpg?max-w=1400&auto=format",
	"https://media-cdn.tripadvisor.com/media/photo-f/17/c3/47/5a/photo0jpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/18/33/10/9d/photo1jpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/10/80/a7/6c/frasca-food-and-wine.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/10/32/0f/e8/salumi-and-cheese.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/10/61/c9/d0/chile-rellenos.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-l/17/f0/b5/08/photo2jpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/04/5d/ee/c9/rio-grande-mexican-restaurant.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/0e/91/d8/3d/tacos-on-the-mall.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/17/6c/8d/45/flight-of-four.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/17/66/15/24/view-from-parking-lot.jpg",
	"http://lifestylepubs.wordpress.s3-us-west-2.amazonaws.com/app/uploads/prod/2015/09/Avery_Anniversary_Edition_beers.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/0f/a2/05/2d/brunch-arcana.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/07/e7/f0/0a/bru-handbuilt-ales-eats.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-l/17/c5/6c/21/photo0jpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/18/3a/16/97/photo3jpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/18/28/18/43/photo0jpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-l/12/f3/1f/6b/ham-egg-and-gruyere-on.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/12/f3/1f/78/sliders.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-l/0c/35/e9/19/the-yellow-deli.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-l/12/f3/1f/6b/ham-egg-and-gruyere-on.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/12/de/ed/b4/photo0jpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/10/3a/cb/37/dsc-0512-largejpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/15/97/62/5b/photo2jpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/0e/4b/ea/f4/seafood-paella-sweet.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/10/32/05/6d/lobster-mac-cheese.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/08/62/ed/c7/the-original-chicken.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/15/00/a2/c0/20181008-201800-largejpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/01/b9/1a/a6/grilled-steak.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/17/ea/af/70/spider-roll.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/05/c0/b9/0e/sushi-deluxe.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/0e/c7/70/19/mochis.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-o/0a/b4/08/b4/lamb-chop.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/06/e1/49/d0/mercantile-dining-and.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/11/1e/05/9a/coffee-counter.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/17/f9/8d/90/20190618-124154-largejpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/0e/a9/0a/24/lucile-s-creole-cafe.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/18/2e/89/ec/photo1jpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/17/ab/e9/0a/20190508-175143-largejpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/03/3d/1b/59/denver-biscuit-company.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/0f/4a/61/b4/enjoy-a-drink-at-the.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/02/3c/b4/05/new-york-strip-steak.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/07/9d/d9/73/a-variety-of-dim-sum.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/0f/68/a9/5a/photo1jpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/0f/bd/b8/a6/the-central-dining-area.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/15/bc/97/e5/20181215-141722-largejpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/17/5d/66/96/moussaka.jpg",
	"https://thesink.com/wp-content/uploads/2016/01/The_Sink_Food-2.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-p/08/49/1c/20/duck-hot-dog-fried-mac.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/07/f4/fd/17/the-lobby-denver-co.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/0e/2e/e4/90/photo0jpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/01/3b/a8/dc/chilled-seafood-platter.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/0f/a7/95/7e/photo0jpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/09/c7/25/98/nw-pub-burger.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/0f/41/2b/4d/photo1jpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-o/04/76/5c/0f/fish-tacos.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/10/6c/78/b3/the-frasca-main-dining.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/15/08/1d/1c/chicken-francaise-and.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-o/06/0a/d0/6b/sforno-trattoria-romana.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/02/59/67/4c/dine-at-ellyngton-s.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-w/0a/32/fd/a3/rock-cut-brewing-company.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/0e/33/e1/a4/the-dam-grille.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/16/5a/63/ca/photo0jpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/13/a9/2a/55/photo5jpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/0c/c1/3c/19/oops-started-eating-there.jpg",
	"https://zagat-photos.imgix.net/ChIJdzSU5Sbsa4cRWOQomlwYqxI/9c269383b4cc2b2909264457f42bcb4b.jpg?max-w=1400&auto=format",
	"https://media-cdn.tripadvisor.com/media/photo-s/04/39/b0/ce/curry-n-kebob.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-o/02/ea/7d/9c/tuesday-all-you-can-way.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/0d/cc/ff/fd/20161202-125044-largejpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/12/f4/f3/46/outdoor-space.jpg",
	"https://zagat-photos.imgix.net/ChIJH68pxyfsa4cRmlqp7By1XYE/36521024c481478c8a24cb24a5d45f3a.jpg?max-w=1400&auto=format",
	"https://media-cdn.tripadvisor.com/media/photo-f/12/f2/dd/02/brisket.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/07/08/31/e4/getlstd-property-photo_rotated_90.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/05/b4/05/f9/humboldt-farm-fish-wine.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/05/96/21/44/acorn.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/14/9a/de/e9/20180912-155332-largejpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-f/13/a8/69/47/drunken-noodles-level.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-w/0f/19/7c/80/photo0jpg.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-p/16/06/03/1c/morin.jpg",
	"http://diningoutwp.funjuczse.maxcdn-edge.com/denverboulder/wp-content/uploads/sites/13/2018/07/IMG_4108.jpg",
	"https://media-cdn.tripadvisor.com/media/photo-s/17/a1/f2/de/photo3jpg.jpg"
]

let coordinateGenerator = () => {

	let latitude = Math.random() * 0.05 + 40;
	let longitude = Math.random() * (-0.07) - 105.22;

	return [Number(latitude.toFixed(6)), Number(longitude.toFixed(6))]
}

let syleGenerator = () => {
	let styles = ["American", "Vegan", "Brunch", "Thai", "Seafood", "Bakery", "Coffee House", "Grill"];
	let index = Math.floor(Math.random() * styles.length);
	return styles[index];
}

let priceGenerator = () => {
	let num = Math.ceil(Math.random() * 3);
	if (num === 3) return "$$$";
	if (num == 2) return "$$";
	else return "$";
}

let dataGenerator = () => {

	for (var i = 0; i < restaurantNames.length; i++) {
		db.save({
			name: restaurantNames[i],
			description: randomSentence(),
			style: syleGenerator(),
			price: priceGenerator(),
			rating: randomScore(),
			img_url: imageUrls[i],
			location: coordinateGenerator()
		})
	}
}

dataGenerator();

module.exports.dataGenerator = dataGenerator;