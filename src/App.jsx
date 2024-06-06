import './App.css';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';
import Body from './layouts/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import { useState } from 'react';

function App() {

	const INITIAL_DATA = [
		// {
		// 	id: 1,
		// 	title: 'Test',
		// 	text: 'Hi',
		// 	date: new Date()
		// }
	];
	
	const [items, setItems] = useState(INITIAL_DATA);
	const addItem = (item) => {
		setItems(oldItems => [...oldItems, {
			text: item.text,
			title: item.title,
			date: new Date(item.date),
			id: oldItems.length > 0 ? Math.max(...oldItems.map(i => i.id)) + 1 : 1
		}]);
	};
  
	

	return (
		<div className='app'>
			<LeftPanel>
				<Header/>
				<JournalAddButton>
					
				</JournalAddButton>
				<JournalList items={items}>
				</JournalList>
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem}/>
			</Body>
		</div>
	);
}

export default App;
