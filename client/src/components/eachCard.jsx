import React from 'react';
import { useState } from 'react';

export default function EachCard(props) {

	let restName;
	let cursor;
	let restDescription = props.restaurant.description;
	let firstLetter = restDescription.charAt(0).toUpperCase();
	let updatedDescription = firstLetter + restDescription.slice(1);

	const [hover, setHover] = useState(false);

	if (hover) {
		restName = {
			transition: " all 300ms ease-in",
			borderBottom: "1px solid #B7385E"
		};
		cursor = { "cursor": "pointer" }
	} else {
		restName = {
			transition: " all 300ms ease-out",
			borderBottom: "1px solid white",
		}
		cursor = { "cursor": "arrow" }
	}
	console.log(restName)
	return (
		<div className="card" onClick={(e) => props.onClick(e)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
			style={cursor}>
			<img className="restImg" src={props.restaurant.img_url}></img>
			<div className="container">
				<h4>
					<div><b className="restName" style={restName}>{props.restaurant.name}</b></div>
					<div className="styleAndPrice">{props.restaurant.style} · {props.restaurant.price}</div>
				</h4>
				<div className="zagatImg">
					<img src="https://www.zagat.com/assets/img/z-logo-icon-red.svg"></img>
					<span className="foodRating">FOOD</span>
					<span className="rating">{props.restaurant.rating}</span>
				</div>
				<p className="description">{updatedDescription}</p>
			</div>
		</div>
	)
}

//EachRestaurant expects an object