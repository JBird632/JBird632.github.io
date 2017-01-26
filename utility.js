function messageAlert( type )
{
	var element = document.getElementById("snackbar");
	var message = "";
	var loading = false;

	switch(type)
	{
		case "loading_reference":
			message = "Loading References";
			loading = true;
			break;
		case "download":
			message = "Download Started";
			break;
		default:
			message = "Alert!";
	}

	element.innerHTML = message;
	element.className = "show";
}

function clearAlert()
{
	var element = document.getElementById("snackbar");
	element.className = "";
}