setupLeaderboards();

function setupLeaderboards()
{
	var leaderboards = document.getElementsByClassName('leaderboard');
	var length = leaderboards.length;

	for( var i = 0; i < length; i++ )
	{
		createLeaderboard(leaderboards[i]);
	}
}

function createLeaderboard(leaderboard)
{
	var searchForm = document.createElement("div");
	searchForm.className = "form-group pull-right";

	var searchBar = document.createElement("input");
	searchBar.type = "text";
	searchBar.className = "search form-control";
	searchBar.placeholder = "Search...";
	searchForm.appendChild(searchBar);

	leaderboard.appendChild(searchForm);

	var results = document.createElement("span");
	searchBar.className = "results pull-right";
	leaderboard.appendChild(results);

	var table = document.createElement("table");
	table.className = "table table-responsive";
	var thread = document.createElement("thread");
	var tr = document.createElement("tr");
	table.appendChild(thread);
	tr.className = "leaderboard-header";
	thread.appendChild(tr);
	var number = document.createElement("th");
	number.innerHTML = "Rank";
	number.className = "col-md-1 center";
	tr.appendChild(number);
	var player = document.createElement("th");
	player.innerHTML = "Player";
	player.className = "col-md-8";
	tr.appendChild(player);
	var round = document.createElement("th");
	round.innerHTML = "Round";
	round.className = "col-md-1 center";
	tr.appendChild(round);
	var score = document.createElement("th");
	score.innerHTML = "Score";
	score.className = "col-md-1 center";
	tr.appendChild(score);
	var headshots = document.createElement("th");
	headshots.innerHTML = "Headshots";
	headshots.className = "col-md-1 center";
	tr.appendChild(headshots);
	leaderboard.appendChild(table);

	loadLeaderBoard(thread);
}

function loadLeaderBoard(thread)
{
	for(var i = 1; i < 11; i++ )
	{
		var tr = document.createElement("tr");
		tr.className = "leaderboard-table";
		thread.appendChild(tr);
		var number = document.createElement("td");
		number.innerHTML = i;
		number.className = "col-md-1 center";
		tr.appendChild(number);
		var player = document.createElement("td");
		player.innerHTML = "-";
		player.className = "col-md-8";
		tr.appendChild(player);
		var round = document.createElement("td");
		round.innerHTML = "-";
		round.className = "col-md-1 center";
		tr.appendChild(round);
		var score = document.createElement("td");
		score.innerHTML = "-";
		score.className = "col-md-1 center";
		tr.appendChild(score);
		var headshots = document.createElement("td");
		headshots.innerHTML = "-";
		headshots.className = "col-md-1 center";
		tr.appendChild(headshots);
	}
}