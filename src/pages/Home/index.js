import React, { useState } from 'react';
import Dropzone from '../../components/Dropzone';
import api from '../../services/api';

import './home.css';

const Home = () => {
	const [selectedFile, setSelectedFile] = useState();
	const [event, setEvent] = useState(null);

	async function handleOnSubmit(event) {
		event.preventDefault();

		const data = new FormData();

		if (selectedFile) {
			data.append('file', selectedFile);
		}

		const response = await api.post('events', data);
		setEvent(response.data);
	}

	return (
		<div id="organizerRootContainer">
			<img 
				src="event-organizer-full-logo.png" 
				alt="Event organizer logo" 
				className="logo"
			/>
			<form 
				onSubmit={handleOnSubmit}
				className="lecturesForm"
			>
				<Dropzone onFileUploaded={setSelectedFile} />
				<br />
				<button 
					type="submit"
					className="formButton"
				>
					Organize the event
				</button>
			</form> 

			{
				event &&
				<section className="event">
					<h1 className="eventTitle">Event:</h1>
					{
						event.map((track, index) => {
							
							return (
								<div 
									className="track"
									key={`${track.title}${index}`}
								>
									<h1>{track.title}</h1>
									<hr />
									<section className="lectures">
										{
											track.morning.lectures.map((lecture, index) => {
												return (
													<div 
														className="lecture"
														key={`${lecture.title}${index}`}
													>
														<h1 className="lectureTitle">{`${lecture.hour} ${lecture.rawTitle}`}</h1>
													</div>
												);
											})
										}
									</section>
									<section className="lectures">
											{
											track.afternoon.lectures.map((lecture, index) => {
												return (
													<div 
														className="lecture"
														key={`${lecture.title}${index}`}
													>
														<h1 className="lectureTitle">{`${lecture.hour} ${lecture.rawTitle}`}</h1>
													</div>
												);
											})
										}
									</section>
								</div> 
							);
						})
					} 
				</section>
			}
		</div>
	);
};

export default Home;