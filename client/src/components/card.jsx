import React from 'react';
import EachCard from './eachCard.jsx';


export default function Cards(props) {
	console.log(props)
	return (
		<div className="gridContainer">
			{props.restaurants.map(restaurant =>
				<EachCard key={restaurant._id} restaurant={restaurant} onClick={(e) => props.onClick(e)} />
			)}
		</div>
	)
}

//Cards expexts an array of objects 