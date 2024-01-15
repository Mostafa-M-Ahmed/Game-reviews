'use strict'

let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let btn3 = document.getElementById('btn3');
let btn4 = document.getElementById('btn4');
let btn5 = document.getElementById('btn5');
let btn6 = document.getElementById('btn6');
let btnClose = document.getElementById("btnClose");

//pressing the close button gets you back to main page
btnClose.addEventListener("click", function () {
	document.getElementById("infoPage").classList.replace("d-block", "d-none");
	document.getElementById("homePage").classList.replace("d-none", "d-block");
});


//globals
let activeTab = btn1;

//switching navbar tabs
btn1.addEventListener("click", function () {
	activeTab.classList.remove('active');
	btn1.classList.add('active');
	activeTab = btn1
	getGamesList("mmorpg")
});
btn2.addEventListener("click", function () {
	activeTab.classList.remove('active');
	btn2.classList.add('active');
	activeTab = btn2
	getGamesList("shooter")
});
btn3.addEventListener("click", function () {
	activeTab.classList.remove('active');
	btn3.classList.add('active');
	activeTab = btn3
	getGamesList("sailing")
});
btn4.addEventListener("click", function () {
	activeTab.classList.remove('active');
	btn4.classList.add('active');
	activeTab = btn4
	getGamesList("permadeath")
});
btn5.addEventListener("click", function () {
	activeTab.classList.remove('active');
	btn5.classList.add('active');
	activeTab = btn5
	getGamesList("superhero")
});
btn6.addEventListener("click", function () {
	activeTab.classList.remove('active');
	btn6.classList.add('active');
	activeTab = btn6
	getGamesList("pixel")
});




//fetch method
async function getGamesList(genre) {
	const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${genre}`;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'e9507de212mshddf69f833bac3cbp1d1bc9jsna40e94e7c71a',
			'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
		}
	};


	const response = await fetch(url, options);
	const result = await response.json();
	cleanList("gamesList");
	displayList(result);
	// console.log(result);

}


function cleanList(list) {
	document.getElementById(list).innerHTML = '';
}

function displayList(game) {
	let box = "";
	for (let i = 1; i < game.length; i++)
		box += `
	<div class="col">
		<div class="card h-100 bg-transparent" onclick="getGameDetails(${game[i].id})">
			<div class="card-body">
				<figure>
					<img class="card-img-top object-fit-cover h-100"
					src=${game[i].thumbnail} alt="">
				</figure>
				
				<figcaption>
					<div class="justify-content-between d-flex align-items-center">
						<h3 class="h6">${game[i].title}</h3>
						<span class="badge text-bg-primary p-2">Free</span>
					</div>
					<p class="card-text small opacity-75 pt-2">${game[i].short_description}</p>
				</figcaption>

			</div>
			<div class="card-footer small d-flex align-items-center justify-content-between">
				<span class="badge bg-info-subtle">${game[i].genre}</span>
				<span class="badge bg-info-subtle">${game[i].platform}</span>
			</div>
		</div>
	</div>`;
	document.getElementById("gamesList").innerHTML += box
	// console.log(game[i].title);
}





async function getGameDetails(gameID) {
	const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameID}`;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'e9507de212mshddf69f833bac3cbp1d1bc9jsna40e94e7c71a',
			'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
		}
	};

	const response = await fetch(url, options);
	const result = await response.json();
	cleanList("gameDetails");
	displayDetails(result);
	// console.log(result);

}

function displayDetails(gameInfo) {
	document.getElementById("homePage").classList.replace("d-block", "d-none");
	document.getElementById("infoPage").classList.replace("d-none", "d-block");


	let box = `
				<div class="col-4">
                    <img src="${gameInfo.thumbnail}" class="w-100 border border-2 rounded-3 border-info" alt="game thumbnail">
                </div>
                <div class="col-8 d-flex flex-column ">
                    <div class="titleGameDetail">
                        <h2 class="d-inline-flex fw-light me-2">Title:</h2>
                        <span class="h2 fw-bold">${gameInfo.title}</span>
                    </div>

                    <div>
                        <h5 class="d-inline-flex fw-light me-2">Category:</h5>
                        <span class="fw-bold badge bg-info text-black">${gameInfo.genre}</span>
                    </div>
                    <div>
                        <h5 class="d-inline-flex fw-light me-2">Platform:</h5>
                        <span class="fw-bold badge bg-info text-black">${gameInfo.platform}</span>
                    </div>
                    <div>
                        <h5 class="d-inline-flex fw-light me-2">Status:</h5>
                        <span class="fw-bold badge bg-info text-black">${gameInfo.status}</span>
                    </div>
                    <hr>
                    <p class="small">${gameInfo.description}</p>
                    <!-- <button class="btn btn-success">Show game</button> -->
                    <a href="${gameInfo.freetogame_profile_url}" target="_blank" class="mb-5 btn btn-success" style="width: 18%;">Show game</a>
                </div>
				`

	document.getElementById("gameDetails").innerHTML += box

}



getGamesList("mmorpg");
