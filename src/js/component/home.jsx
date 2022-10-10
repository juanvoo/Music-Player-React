import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
let API = "https://assets.breatheco.de/apis/sound/songs";

function Home() {
	let [canciones, setCanciones] = useState([]);
	let [url, setUrl] = useState(null);
	let [onPlay, setOnPlay] = useState(false);
	let audios = document.querySelector("#audio");

	useEffect(() => {
		fetch(API)
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(function(responseAsJson) {
				setCanciones(responseAsJson);
				console.log(responseAsJson);
			})
			.catch(function(err) {
				console.log(err);
			});
	}, []);
	function pauseAudio() { 
		if (onPlay) {
		audios.pause(); 
		setOnPlay(false);
	}else {
		audios.play();
		setOnPlay(true);
	}
	  } 

	const playStop = () => {
		if (onPlay) {
			audios.pause();
			setOnPlay(false);
		} else {
			audios.load();
			audios.play();
			setOnPlay(true);
		}
	};

	const next = () => {
		for (let index = 0; index < canciones.length; index++) {
			if (
				"https://assets.breatheco.de/apis/sound/" + canciones[index].url ==
				url
			) {
				setUrl(
					"https://assets.breatheco.de/apis/sound/" +
						canciones[index + 1].url
				);
				audios.load();
				audios.play();
				setOnPlay(true);
			}
		}
	};

	const previous = () => {
		for (let index = 0; index < canciones.length; index++) {
			if (
				"https://assets.breatheco.de/apis/sound/" + canciones[index].url ==
				url
			) {
				setUrl(
					"https://assets.breatheco.de/apis/sound/" +
						canciones[index - 1].url
				);
				audios.load();
				audios.play();
				setOnPlay(true);
			}
		}
	};

	return (
		<div className="col-mt-4 bg-black display-4 text-center text-danger">
			<div>
				<p>Playlist</p>
			</div>
			<div className="row">
				<ol>
					{canciones.map(song => {
						return (
							<li
								key={song.url}
								onClick={() => {
									setUrl(
										"https://assets.breatheco.de/apis/sound/" +
											song.url
									);
									audios.load();
									setOnPlay(true);
									audios.play();
								}}>
								<span><button className="btn btn-lg w-75 text-light column-mb-3">{song.name}</button></span>
							</li>
						);
					})}
				</ol>
			</div>
			<div className="container-footer bg-black">
				<button className="btn btn-outline-light"
					onClick={() => {
						previous();
					}}>
					<i className="fa fa-backward" />
				</button>
				<button className="btn btn-outline-light"
					onClick={() => {
						pauseAudio();
					}}>
					<i className="fa fa-pause" />
				</button>
				<button className="btn btn-outline-light"
					onClick={() => {
						playStop();
					}}>
					<i className="fa fa-play" />
				</button>
				<button className="btn btn-outline-light"
					onClick={() => {
						next();
					}}>
					<i className="fa fa-forward" />
				</button>
			</div>
			<div>
				<audio id="audio">
					<source src={url} type="audio/mpeg" />
				</audio>
			</div>
		</div>
	);
}







// 	//create your first component
// const Home = () => {
// 	return (
// 		<div className="text-center">
// 			<h1 className="text-center mt-5">Hello Rigo!</h1>
// 			<p>
// 				<img src={rigoImage} />
// 			</p>
// 			<a href="#" className="btn btn-success">
// 				If you see this green button... bootstrap is working...
// 			</a>
// 			<p>
// 				Made by{" "}
// 				<a href="http://www.4geeksacademy.com">4Geeks Academy</a>, with
// 				love!
// 			</p>
// 		</div>
// 	);
// };

export default Home;
