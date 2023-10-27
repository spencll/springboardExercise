
const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

//putting results in empty array as letters typed
function search(str) {
	let results = [];
	if (str ===``){
		return
	}
	results.push(fruit.filter((f) => f.includes(str)))
	return results;
}

//what should happen after each key press, runs showSuggestion
function searchHandler(e) {
	//clearing previous selections
	suggestions.innerHTML= ``
	//array of suggestions
	let sugArr= search(e.target.value)
	//adding each fruit as list element 
	for (let i=0;i<sugArr[0].length;i++) {
		const sugg = document.createElement("li")
		sugg.classList.add(`has-suggestions`)
		sugg.innerText = sugArr[0][i]
		suggestions.append(sugg)
		
	}
}


//takes whatever input and showing suggestion results, displaying in drop down
function showSuggestions(results, inputVal) {


}

//making the suggestion the actual input 
function useSuggestion(e) {
	input.value = e.target.innerText
	//clearing previous selections
	suggestions.innerHTML= ``
}

//everytime key pressed, searchHandler should show suggestions
input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);