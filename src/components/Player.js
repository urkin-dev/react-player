import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from '@fortawesome/free-solid-svg-icons';

export default function Player({
	currentSong,
	isPlaying,
	setIsPlaying,
	songs,
	setCurrentSong,
}) {
	//Ref
	const audioRef = useRef(null);

	//Event Handlers
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};

	const timeUpdateHandler = (e) => {
		const currentTime = e.target.currentTime;
		const duration = e.target.duration;

		//Calculate Percentage
		const roundedCurrent = Math.round(currentTime);
		const roundedDuration = Math.round(duration);
		const animationPercentage = Math.round(
			(roundedCurrent / roundedDuration) * 100
		);

		setSongInfo({ ...songInfo, currentTime, duration, animationPercentage });
	};

	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};

	const autoPlayHandler = () => {
		if (isPlaying) {
			audioRef.current.play();
		}
	};

	const skipTrackHandler = (direction) => {
		const currentIndex = songs.findIndex((song) => song.id === currentSong.id);

		if (direction === 'skip-forward') {
			setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		}

		if (direction === 'skip-back') {
			if (currentIndex === 0) {
				setCurrentSong(songs[songs.length - 1]);
				return;
			}
			setCurrentSong(songs[(currentIndex - 1) % songs.length]);
		}
	};

	//Functions
	const getTime = (time) => {
		return (
			Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
		);
	};

	//State
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
		animationPercentage: 0,
	});

	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<div
					className="track"
					style={{
						background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
					}}
				>
					<input
						min={0}
						max={songInfo.duration || 0}
						value={songInfo.currentTime}
						type="range"
						onChange={dragHandler}
					/>
					<div
						className="animate-track"
						style={{
							transform: `translateX(${songInfo.animationPercentage}%)`,
						}}
					></div>
				</div>
				<p>{getTime(songInfo.duration)}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon
					onClick={() => skipTrackHandler('skip-back')}
					className="skip-back"
					size="2x"
					icon={faAngleLeft}
				/>
				<FontAwesomeIcon
					onClick={playSongHandler}
					className="play"
					size="2x"
					icon={isPlaying ? faPause : faPlay}
				/>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler('skip-forward')}
					className="skip-forward"
					size="2x"
					icon={faAngleRight}
				/>
			</div>
			<audio
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				onLoadedData={autoPlayHandler}
				ref={audioRef}
				src={currentSong.audio}
				onEnded={() => skipTrackHandler('skip-forward')}
			></audio>
		</div>
	);
}
