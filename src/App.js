import Player from './components/Player';
import Song from './components/Song';
import Particles from 'react-particles-js';
import { useState } from 'react';

import data from './data';

import './styles/app.scss';
import Library from './components/Library';

const greenParticles = {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 551.3981882630954,
			},
		},
		color: {
			value: '#15e8fa',
		},
		shape: {
			type: 'circle',
		},
		opacity: {
			value: 1,
			random: true,
			anim: {
				enable: true,
				speed: 1,
				opacity_min: 0,
				sync: false,
			},
		},
		size: {
			value: 3,
			random: true,
		},
		line_linked: {
			enable: true,
			distance: 94.52540370224494,
			color: '#15e8fa',
			opacity: 0.15754233950374158,
			width: 2,
		},
		move: {
			enable: true,
			speed: 1,
			direction: 'left',
			random: true,
			straight: false,
			out_mode: 'out',
			bounce: false,
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 600,
			},
		},
	},
};
const blueParticles = {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 551.3981882630954,
			},
		},
		color: {
			value: '#4982f5',
		},
		shape: {
			type: 'circle',
		},
		opacity: {
			value: 1,
			random: true,
			anim: {
				enable: true,
				speed: 1,
				opacity_min: 0,
				sync: false,
			},
		},
		size: {
			value: 3,
			random: true,
		},
		line_linked: {
			enable: true,
			distance: 94.52540370224494,
			color: '#4982f5',
			opacity: 0.15754233950374158,
			width: 2,
		},
		move: {
			enable: true,
			speed: 1,
			direction: 'left',
			random: true,
			straight: false,
			out_mode: 'out',
			bounce: false,
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 600,
			},
		},
	},
};

function App() {
	const [songs, setSongs] = useState(data);
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<div className="App">
			<Particles className="particles" params={greenParticles} />
			<Particles className="particles" params={blueParticles} />
			<Song currentSong={currentSong} />
			<Player
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
			/>
			<Library setCurrentSong={setCurrentSong} songs={songs} />
		</div>
	);
}

export default App;
