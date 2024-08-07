import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useContext, useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import { Input } from '../Input/Input';
import { UserContext } from '../../context/user.context';




function JournalForm ( { onSubmit, data } ) {
	
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();
	const { userId } = useContext(UserContext);

	const focusError = (isValid) => {
		switch(true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		
		case !isValid.date:
			dateRef.current.focus();
			break;
		
		case !isValid.text:
			textRef.current.focus();
			break;
		}
	};

	useEffect(() => {	
		dispatchForm({type: 'SET_VALUE', payload: {...data}});
	}, [data]);
	
	
	useEffect(() => {
		let timerId;
		if(!isValid.text || !isValid.date || !isValid.title) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({type: 'RESET_VALIDITY' });
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if(isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({type: 'CLEAR' });
			dispatchForm({type: 'SET_VALUE', payload: {userId}});
		}
	}, [isFormReadyToSubmit, values, onSubmit, userId]);


	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({type: 'SUBMIT'});
	};

	useEffect(() => {
		dispatchForm({type: 'SET_VALUE', payload: {userId}});
	}, [userId]);

	const onChange = (e) => {
		dispatchForm({type: 'SET_VALUE', payload: {[e.target.name]: e.target.value}});
	};

	return (
		
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<Input type="title"  ref={titleRef} isValid={isValid.title} onChange={onChange} value={values.title} name='title' appearence='title'/>
			</div>
				
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="/calendar.svg" alt="calendar icon" />
					<span>Date</span>
				</label>
				<Input type="date" ref={dateRef} isValid={isValid.date} onChange={onChange} value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''} name='date' id='date' /> 
			</div>	

			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/folder.svg" alt="folder icon" />
					<span>Tags</span>
				</label>
				<Input type="text"  onChange={onChange} value={values.tag} name='tag' id='tag' />
			</div>
				
			<textarea name="text" ref={textRef} onChange={onChange} value={values.text} id="" className={cn(styles['input'], {
				[styles['invalid']]: !isValid.text,
			})}></textarea>
			<Button>Save</Button>
		</form>
			
	);
}

export default JournalForm;
