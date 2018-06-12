
// fetch parameters
let url = 'https://ghibliapi.herokuapp.com/';
let params = {
	method: 'GET',
	dataType: "jsonp",
};


// refactored handler function
function handler(event) {
	
	event.preventDefault();
	document.getElementById("show_content").innerHTML = "";
	fetchData(event.target.value.toLowerCase());
}

// binding buttons to listeners and passing in the handler function
document.getElementById("film_button").addEventListener("click", handler);

document.getElementById("people_button").addEventListener("click", handler);

document.getElementById("species_button").addEventListener("click", handler);

document.getElementById("locations_button").addEventListener("click", handler);

document.getElementById("vehicles_button").addEventListener("click", handler);
				
// fetch function
function fetchData(query) {
	fetchJsonp(url + query, params)
		.then(response => response.json())
		.then(data => {
			
			let display_data = document.getElementById("show_content");
			
			if (query === "films") {
			data.forEach(item => {
				
				// **** create node for description or summary ****
				let node = document.createElement("div");
				let description_node = document.createElement("p");
				let textnode = document.createTextNode(item.title);
				let description_textnode = document.createTextNode(item.description);
				node.appendChild(textnode);
				description_node.appendChild(description_textnode);
				node.appendChild(description_node);
				
				display_data.appendChild(node);
			})
			}
			
			if (query === "people" || query === "species" || query === "locations" || query === "vehicles") {
			data.forEach(item => {
				let node = document.createElement("div");
				let textnode = document.createTextNode(item.name);
				node.appendChild(textnode);
				
				display_data.appendChild(node);
				
				// TODO refactor these DOM methods into a function
				
				function create_content(content) {
					let description_node = document.createElement("p");
					let description_textnode = document.createTextNode(content);
					description_node.appendChild(description_textnode);
					node.appendChild(description_node);
				}
				
				if (item.description) {
					
					create_content(item.description);
					/*
					let description_node = document.createElement("p");
					let description_textnode = document.createTextNode(item.description);
					description_node.appendChild(description_textnode);
					node.appendChild(description_node);
					*/
				}
				
				if (item.classification) {
					
					create_content(`Type: ${item.classification}`);
					/*
					let description_node = document.createElement("p");
					let description_textnode = document.createTextNode(`Type: ${item.classification}`);
					description_node.appendChild(description_textnode);
					node.appendChild(description_node);
					*/
				}
				
				if (item.climate) {
					
					create_content(`Climate: ${item.climate}`);
					/*
					let description_node = document.createElement("p");
					let description_textnode = document.createTextNode(`Climate: ${item.climate}`);
					description_node.appendChild(description_textnode);
					node.appendChild(description_node);
					*/
				}
				
				if (item.age) {
					
					create_content(`Age: ${item.age}`);
					/*
					let description_node = document.createElement("p");
					let description_textnode = document.createTextNode(`Age: ${item.age}`);
					description_node.appendChild(description_textnode);
					node.appendChild(description_node);
					*/
				}
				
			})
			}	
		})
		.catch(error => document.getElementById("show_conent").innerHTML = error);
}