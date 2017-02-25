$(".dropdown-content").slideToggle(0);
$(".header-blocker"). css('height', $(".header-bar").height());

function toggleDropDown()
{
	$(".dropdown-content").slideToggle();
}

/*function openContact()
{
	var modal = document.getElementById('contact-model');
    modal.style.display = "block";
}

var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById('contact-model');

span.onclick = function()
{
    modal.style.display = "none";
}

window.onclick = function(event)
{
    if (event.target == modal)
    {
        modal.style.display = "none";
    }
}*/

setupTextBoxes();

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
	$.get("https://jbird632.github.io/text/" + id + ".txt", function(data)
	{
		var textBox = document.getElementById(id);
		textBox.innerHTML = data;
	}, 'text');
}