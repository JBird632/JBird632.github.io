var activeID = "ref-all";
var jsonObj = null;
var oldDisplay = null;

$.getJSON("bo3_reference.json", function(json) {
    jsonObj = json;
    var sections = document.getElementsByClassName('ref-block');
    oldDisplay = sections[0].display;

    addFunctionsBySection(json, "ai");
    addFunctionsBySection(json, "animation");
    addFunctionsBySection(json, "client");
    addFunctionsBySection(json, "effect");
    addFunctionsBySection(json, "entity");
    addFunctionsBySection(json, "hud");
    addFunctionsBySection(json, "level");
    addFunctionsBySection(json, "motion");
    addFunctionsBySection(json, "objective");
    addFunctionsBySection(json, "physics");
    addFunctionsBySection(json, "player");
    addFunctionsBySection(json, "sound");
    addFunctionsBySection(json, "trigger");
    addFunctionsBySection(json, "turret");
    addFunctionsBySection(json, "utility");
    addFunctionsBySection(json, "vehicle");
    addFunctionsBySection(json, "weapon");
    addFunctionsBySection(json, "zombie");
});

function addAllFunctions(json)
{

}

function addFunctionsByCategory(json, cat)
{
	var count = 0;
	var functions= [];

	for( var data in json)
    {
    	if(json[data].category == cat)
    		functions[count] = json[data];

    	count++;
    }

    return functions;
}

function addFunctionsBySection(json, sec)
{
	var count = 0;
	var functions= [];
	var div = document.getElementById("category-ref-" + sec);

	for( var data in json)
    {
    	if(json[data].Section == sec)
    	{
		    var title = document.createElement("h1");
		    title.innerHTML = "<b>" + sec.toUpperCase() + "</b>";
		    title.className = "bodyTitle";

		    var container = document.createElement("div");
		    container.className = "bodyFormat-inset";
		    div.appendChild(container);

		    var func = document.createElement("h3");
		    func.style = "cursor: pointer";
		    func.addEventListener("click", function()
		    	{
		    		console.log(this.parentElement);
		    		var parent = this.parentElement;
		    		var children = parent.childNodes;
		    		
		    		if(children[1].style.display === 'none')
		    		{
		    			children[1].style.display = 'block';
		    		}
		    		else
		    		{
		    			children[1].style.display = 'none';
		    		}

		    		if(children[0].innerHTML.includes("fa-chevron-right"))
		    		{
		    			children[0].innerHTML = children[0].innerHTML.replace("fa-chevron-right", "fa-chevron-down");
		    			children[0].innerHTML = children[0].innerHTML.replace("&nbsp;", "");
		    		}
		    		else
		    		{
		    			children[0].innerHTML = children[0].innerHTML.replace("fa-chevron-down", "fa-chevron-right");
		    			children[0].innerHTML = "&nbsp;" + children[0].innerHTML;
		    		}
		    	});

		    var functionTitle = json[data].Function + "( ";
		    var str = "";

		    for( var v in json[data].Variables )
		    {
		    	str = json[data].Variables[v].toString();
		    	str = str.replace("<", "&lt");
		    	str = str.replace(">", "&gt");

		    	functionTitle = functionTitle + str + ", ";
		    }

		    if(functionTitle[functionTitle.length-2] == ',')
		    {
		    	functionTitle = "<span style='cursor:text'>" + functionTitle.substring(0, functionTitle.length - 2) + "</span>" + "&nbsp;";
		    }

		    func.innerHTML = "&nbsp;<i class='fa fa-chevron-right' id='icon-" + sec + "' aria-hidden='true'></i> | " + functionTitle + ")";
		    func.className = "function-title";

		    container.appendChild(func);

		    str = "";
		    var descriptions = "";

		    for( var v in json[data].VariableDescriptions )
		    {
		    	str = json[data].VariableDescriptions[v].toString();
		    	str = str.replace("<", "&lt");
		    	str = str.replace(">", "&gt");
		    	descriptions += "\t" + str + "\n";
		    }

		    var description = document.createElement("pre");
		    description.style.display = 'none';

		    if(json[data].VariableDescriptions.length > 0)
		    {
		    	description.innerHTML = "<b>Variables:</b>\n" + descriptions;
		    }

		    description.innerHTML += "<b>Category:</b> " + json[data].Category + "\n"
		    						+ "<b>Return Value:</b> " + json[data].ReturnValue + "\n"
		    						+ "<b>Description:</b> " + json[data].Description + "\n"
		    						+ "<b>Example:</b> " + json[data].Example;
		    description.className = "function-text";
		    container.appendChild(description);
		}
	}
}

function setActiveTab(id)
{
	var newTab = document.getElementById(id);
	var oldTab = document.getElementById(activeID);
	var sections = document.getElementsByClassName("ref-block");
	oldTab.className = '';
	newTab.className = 'active';
	activeID = id;

	clearFunctions(id);

	if(id == 'ref-all')
	{
		for( var i = 0; i < sections.length; i++ )
		{
			sections[i].style.display = 'inherit';
		}
	}
	else
	{
		var section = document.getElementById('category-' + id);

		for( var i = 0; i < sections.length; i++ )
		{
			sections[i].style.display = 'none';
		}

		section.style.display = 'inherit';
	}
}

function clearFunctions(id)
{
	var div = document.getElementsByClassName("bodyFormat")[0];

	for( var i = 0; i < div.length; i++ )
	{
		if(div.item(i).className != "category-ref-" + id)
		{
			for( var j = 0; j < div.item(i).length; j++ )
			{
				div.item(i).removeChild(div.item(i).item(j));
			}
		}
	}
}