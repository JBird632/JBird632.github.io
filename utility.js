var activeID = "kepler-default";
setActiveTab(activeID);

setupTextBoxes();
randomizeValues();

function setupTextBoxes()
{
	var textBoxes = document.getElementsByClassName("fill-text");
	var i;
	var length = textBoxes.length;

	for( i = 0; i < length; i++ )
	{
		setupTextBoxType(textBoxes[i].id);
	}
}

function setupTextBoxType(id)
{
	$.get("\\text\\" + id + ".txt", function(data)
	{
		var textBox = document.getElementById(id);
		textBox.innerHTML = data;
	}, 'text');
}

function randomizeValues()
{
	var text = document.getElementsByClassName("randomize-letters");
	var i = 0;
	var j = 0;
	var length = text.length;
	var str = "";
	var charsUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var charsLower = "abcdefghijklmnopqrstuvwxyz";
	var numbers = "0123456789";

	for(i = 0; i < length; i++)
	{
		str = "";
		var strLength = text[i].innerHTML.length;
		str += charsUpper.charAt(Math.floor(Math.random() * charsUpper.length));

		for( j = 1; j < strLength; j++)
		{
			str += charsLower.charAt(Math.floor(Math.random() * charsLower.length));
		}

		text[i].innerHTML = str;
	}

	text = document.getElementsByClassName("randomize-numbers");
	length = text.length;

	for(i = 0; i < length; i++)
	{
		str = "";
		var strLength = text[i].innerHTML.length;

		for( j = 0; j < strLength; j++)
		{
			str += numbers.charAt(Math.floor(Math.random() * numbers.length));
		}

		text[i].innerHTML = str;
	}
}

function setActiveTab(id)
{
	var newTab = document.getElementById(id);
	var oldTab = document.getElementById(activeID);
	var sections = document.getElementsByClassName("funcFormat");
	oldTab.className = '';
	newTab.className = 'active';
	activeID = id;

	//clearTabs(id);

	console.log("ref-block category-" + id);
	var sectionsShow = document.getElementsByClassName("funcFormat " + id);

	for( var i = 0; i < sections.length; i++ )
	{
		sections[i].style.display = 'none';
	}

	for( var i = 0; i < sectionsShow.length; i++ )
	{
		sectionsShow[i].style.display = 'inherit';
	}
}

function openImageModel(id)
{
	var img = document.getElementById(id);
	var modal = document.getElementById('image-model');
	var modalImg = document.getElementById("image-model-picture");
	var captionText = document.getElementById("caption");
	console.log(img);

	modal.style.display = "block";
	modalImg.src = img.src;
	captionText.innerHTML = img.alt;
}
