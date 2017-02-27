var newTutorialsCount = 0;

$.getJSON("../../json/tutorials.json", function(json)
{
	setupTutorialList(json);
    setupTutorialTemplate(json);
});

function setupTutorialList(json)
{
	var containers = document.getElementsByClassName('tutorial-listing');
	var length = containers.length;
	
	for(var i = 0; i < length; i++)
	{
		setupTutorialSection(containers[i], json);
	}
	
	if(newTutorialsCount == 0)
	{
		var newDiv = document.getElementById('newest');
		
		if(!(newDiv === null))
			newDiv.parentNode.removeChild(newDiv);
	}
}

function setupTutorialSection(container, tutorialLinks)
{
	var newestContainer = document.getElementById('newest');
	var id = container.id;
	var sectionHeader = document.createElement('h6');
	sectionHeader.className = 'list-group-item list-group-tutorial-title list-group-item-header';
	sectionHeader.innerHTML = id.toUpperCase();
	container.appendChild(sectionHeader);
	
	for( var key in tutorialLinks)
	{
		if(key == id)
		{
			for(var i = 0; i < tutorialLinks[key].length; i++)
			{
				var button = document.createElement('a');
				var difficulty = document.createElement('span');
				var info = document.createElement('span');
				var title = document.createElement('h6');
				var description = document.createElement('span');
				var date = document.createElement('span');
				
				button.className = 'list-group-tutorial';
				button.href = tutorialLinks[key][i].href;
				difficulty.className = 'list-group-item-difficulty-' + tutorialLinks[key][i].difficulty + ' left';
				difficulty.innerHTML = tutorialLinks[key][i].difficulty;
				button.appendChild(difficulty);
				title.className = 'list-group-item-header';
				title.innerHTML = tutorialLinks[key][i].title;
				
				if( tutorialLinks[key][i]['new'] )
					title.innerHTML += '&nbsp;<span class="badge">New</span>';
				
				info.appendChild(title);
				description.className = 'list-group-item-text';
				description.innerHTML = tutorialLinks[key][i].description;

				info.appendChild(description);
				button.appendChild(info);
				date.className = 'list-group-item-text right';
				date.innerHTML = tutorialLinks[key][i].date;
				button.appendChild(date);				
				container.appendChild(button);
				
				if( tutorialLinks[key][i]['new'] ) // Add to the "NEWEST" container
				{
					newTutorialsCount++;
					var button = document.createElement('a');
					var difficulty = document.createElement('span');
					var info = document.createElement('span');
					var title = document.createElement('h6');
					var description = document.createElement('span');
					var date = document.createElement('span');
					
					button.className = 'list-group-tutorial';
					button.href = tutorialLinks[key][i].href;
					difficulty.className = 'list-group-item-difficulty-' + tutorialLinks[key][i].difficulty + ' left';
					difficulty.innerHTML = tutorialLinks[key][i].difficulty;
					button.appendChild(difficulty);
					title.className = 'list-group-item-header';
					title.innerHTML = tutorialLinks[key][i].title;
					
					if( tutorialLinks[key][i]['new'] )
						title.innerHTML += '&nbsp;<span class="badge">New</span>';
					
					info.appendChild(title);
					description.className = 'list-group-item-text';
					description.innerHTML = tutorialLinks[key][i].description;

					info.appendChild(description);
					button.appendChild(info);
					date.className = 'list-group-item-text right';
					date.innerHTML = tutorialLinks[key][i].date;
					button.appendChild(date);				
					container.appendChild(button);
				
					newestContainer.appendChild(button);
				}
			}
		}
	}
}

function setupTutorialTemplate(tutorialLinks)
{
	if(document.getElementsByClassName('tutorial-format').length == 0)
		return;
	
	var container = document.getElementsByClassName('tutorial-format')[0];
	
	var id = container.id;
	var tutorial = getObject(tutorialLinks, id, 'title');
	
	document.title = 'JBird632 | ' + tutorial.title;
	var breadcrumb = document.getElementsByClassName('sub-header')[0];
	var currentCrumb = document.createElement('span');
	currentCrumb.className = 'breadcrumb-text';
	currentCrumb.innerHTML = ' / ' + tutorial.title;
	breadcrumb.appendChild(currentCrumb);
	
	var titleDiv = document.createElement('div');
	titleDiv.className = 'container-title';
	container.appendChild(titleDiv);
	var title = document.createElement('span');
	title.className = 'title-text';
	title.innerHTML = tutorial.title;
	
	if(tutorial['new'])
		title.innerHTML += '&nbsp;<span class="badge">New</span>';
	
	var titleTab = document.createElement('span');
	titleTab.className = 'list-group-side left';
	titleTab.innerHTML = 'Information';
	titleDiv.appendChild(titleTab);
	
	titleDiv.appendChild(title);
	var table = document.createElement('table');
	var row = document.createElement('tr');
	table.appendChild(row);
	var td1 = document.createElement('td');
	var difficulty = document.createElement('span');
	difficulty.className = 'difficulty-warning ' + tutorial.difficulty.toLowerCase();
	difficulty.innerHTML = tutorial.difficulty;
	td1.appendChild(difficulty);
	row.appendChild(td1);
	var td2 = document.createElement('td');
	var difficultyDescription = document.createElement('span');
	
	switch(tutorial.difficulty)
	{
		case "Beginner":
			difficultyDescription.innerHTML = 'This tutorial is for all skill levels. There are no requirements to be able to do this tutorial.';
			break;
		case "Intermediate":
			difficultyDescription.innerHTML = 'This tutorial is for modders who know the basics. Some previous mapping, scripting and modding knowledge may be required.';
			break;
		case "Advanced":
			difficultyDescription.innerHTML = 'This tutorial recommends that you know a good amount of modding, mapping and scripting.';
			break;
		case "Expert":
			difficultyDescription.innerHTML = 'This tutorial is not to be taken lightly. If you don\'t understand the content, this tutorial is too much for you.';
			break;
		default:
			difficultyDescription.innerHTML = 'This tutorial is for all skill levels. There are no requirements to be able to do this tutorial.';
	}
	
	difficultyDescription.className = 'list-group-item-text';
	td2.appendChild(difficultyDescription);
	row.appendChild(td2);
	titleDiv.appendChild(table);
	container.appendChild(titleDiv);
	
	var descriptionDiv = document.createElement('div');
	
	var descriptionTab = document.createElement('span');
	descriptionTab.className = 'list-group-side left';
	descriptionTab.innerHTML = 'Description';
	descriptionDiv.appendChild(descriptionTab);
	
	descriptionDiv.className = 'container-title';
	var title = document.createElement('span');
	title.className = 'title-text breadcrumb-text';
	title.innerHTML = 'Description:';
	descriptionDiv.appendChild(title);
	var description = document.createElement('p');
	description.className = 'list-group-item-text';
	description.innerHTML = tutorial.description;
	descriptionDiv.appendChild(description);
	container.appendChild(descriptionDiv);
	
	if(tutorial.downloads.length > 0)
	{
		var downloadDiv = document.createElement('div');
		downloadDiv.className = 'container-title';
		var downloadsTab = document.createElement('span');
		downloadsTab.className = 'list-group-side left';
		downloadsTab.innerHTML = 'Downloads';
		downloadDiv.appendChild(downloadsTab);
		
		var title = document.createElement('span');
		title.className = 'title-text breadcrumb-text';
		title.innerHTML = 'Downloads:';
		downloadDiv.appendChild(title);
		
		var table = document.createElement('table');
		downloadDiv.appendChild(table);
		
		for(var i = 0; i < tutorial.downloads.length; i++ )
		{
			var row = document.createElement('tr');
			table.appendChild(row);
			var td1 = document.createElement('td');
			td1.className='col-lg-11 table-spacing';
			row.appendChild(td1);
			var td2 = document.createElement('td');
			td2.className='col-lg-1 table-spacing';
			row.appendChild(td2);
		
			var bg = document.createElement('div');
			var info = document.createElement('span');
			var title = document.createElement('h6');
			var description = document.createElement('span');
			var download = document.createElement('a');
			var downloadSpan = document.createElement('span');
			
			title.className = 'list-group-item-header';
			title.innerHTML = tutorial.downloads[i].name;
			
			if(tutorial.downloads[i].linkDown)
				title.innerHTML += '&nbsp;<span class="badge">Link is Down</span>';
			
			bg.className = 'tutorial-download-bg';
			
			info.appendChild(title);
			description.className = 'list-group-item-text';
			description.innerHTML = tutorial.downloads[i].description;

			info.appendChild(description);
			td1.appendChild(info);
			download.className = 'list-group-item-text right';
			download.innerHTML = 'Download';
			download.className = 'btn btn-download right';
			download.href = tutorial.downloads[i].href;
			download.target = '_blank';
			downloadSpan.appendChild(download);
			td2.appendChild(downloadSpan);
		}
		
		container.appendChild(downloadDiv);
	}
	
	if(tutorial.videos.length > 0)
	{
		var contentDiv = document.createElement('div');
		contentDiv.className = 'container-title';
		var contentTab = document.createElement('span');
		contentTab.className = 'list-group-side left';
		contentTab.innerHTML = 'Tutorial';
		contentDiv.appendChild(contentTab);
			
		for(var i = 0; i < tutorial.videos.length; i++ )
		{					
			var videoDiv = document.createElement('div');
			videoDiv.className = 'video-container';
			contentDiv.appendChild(videoDiv);
			var video = document.createElement('iframe');
			video.className = 'tutorial-video';
			video.src = tutorial.videos[i];	
			videoDiv.appendChild(video);
			container.appendChild(contentDiv);		
		}
	}
	
	resizedEvent();
}

function getObject(json, searchFor, property)
{
	var keys = Object.keys(json);
	var length = keys.length;
	
    for(var i=0; i < length; i++)
	{
		var keys2 = Object.keys(json[keys[i]]);
		var length2 = keys2.length;
	
		for( var j=0; j < length2; j++)
		{
			var item = json[keys[i]][keys2[j]];
			
			if (item[property].toLowerCase() === searchFor.toLowerCase())
					return item;
		}
    }
	
    return "";
}

window.onresize = function(event)
{
	resizedEvent();
};

function resizedEvent()
{
	var tabs = document.getElementsByClassName('list-group-side');
	var length = tabs.length;
	
	for( var i = 0; i < length; i++ )
	{
		tabs[i].style.height = tabs[i].parentNode.offsetHeight + 'px';
	}
}
