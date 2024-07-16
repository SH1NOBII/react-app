import './App.css';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';
import Body from './layouts/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import { useLocalStorage } from './hooks/use-localstorage.hook.js';
import { UserContextProvider } from './context/user.context.jsx';
import { useState } from 'react';


function mapItems(items) {
	if(!items) {
		return [];
	}
	return items.map(i => ({
		...i,
		date: new Date(i.date)
	}));
}

function App() {

	
	const [items, setItems] = useLocalStorage('data');
	const [selectedItem, setSelectedItem] = useState({});


	const addItem = (item) => {
		setItems([...mapItems(items), {
			...item,
			date: new Date(item.date),
			id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
		}]);
	};
  
	

	return (
		<UserContextProvider >
			<div className='app'>
				<LeftPanel>
					<Header/>
					<JournalAddButton>
					
					</JournalAddButton>
					<JournalList items={mapItems(items)} setItem={selectedItem}>
					</JournalList>
				</LeftPanel>
				<Body>
					<JournalForm onSubmit={addItem}/>
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
