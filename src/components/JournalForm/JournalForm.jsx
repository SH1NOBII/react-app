import './JournalForm.css';
import Button from '../Button/Button';
import { useState } from 'react';


function JournalForm ( {onSubmit} ) {
	const [formValidState, setFormValidState] = useState({
		title: true,
		text: true,
		date: true
	});


	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		let isFormValid = true;
		if (!formProps.title?.trim().length) {
			setFormValidState(state => ({...state, title: false}));
			isFormValid = false;
		}
		if (!formProps.text?.trim().length) {
			setFormValidState(state => ({...state, text: false}));
			isFormValid = false;

		}
		if (!formProps.date) {
			setFormValidState(state => ({...state, date: false}));
			isFormValid = false;
		}
		if (!isFormValid) {
			return;
		}
		onSubmit(formProps);
		console.log(formProps);
	};



	return (
		<>
			<form className='journal-form' onSubmit={addJournalItem}>
				<input type="title" name='title'/>
				<input type="date" name='date'/>
				<input type="text" name='tag' />
				<textarea name="text" id=""></textarea>
				<Button text="Save"></Button>
			</form>
		</>
	);
}

export default JournalForm;