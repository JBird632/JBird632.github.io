setupCodeBoxes();

function setupCodeBoxes()
{
	var codeBoxes = document.getElementsByClassName('code-box');
	var length = codeBoxes.length;
	
	for( var i = 0; i < length; i++ )
	{
		createCodeBox(codeBoxes[i]);
	}
}

function createCodeBox(codeBox)
{
	if(codeBox.id != '')
	{
		$.get("scripts/" + codeBox.id + ".txt", function(data)
		{
			codeBox.innerHTML = data;
			fillCodeBox(codeBox);
		});
	}

	fillCodeBox(codeBox);
}

function fillCodeBox(codeBox)
{
	var text = codeBox.innerHTML;

	codeBox.innerHTML = '';
	var topText = document.createElement('span');
	var select = document.createElement('span');
	
	topText.className = 'body-text';
	select.className = 'link';
	select.innerHTML = '[select]';
	topText.innerHTML = 'Code: ';
	codeBox.appendChild(topText);
	
	var code = document.createElement('pre');
	code.className = 'codeBox well body-text';
	code.id = 'code-box';
	code.innerHTML = text;
	codeBox.appendChild(code);
	
	select.onclick = function() {
		selectCode(code);
	};
	
	topText.appendChild(select);

	setupGscSyntax();
	resizedEvent();
}

function selectCode(codeBox)
{
	clearSelection();
	
	if (document.selection)
	{
		var range = document.body.createTextRange();
		range.moveToElementText(codeBox);
		range.select();
	} 
	else if (window.getSelection)
	{
		var range = document.createRange();
		range.selectNode(codeBox);
		window.getSelection().addRange(range);
	}
}

function clearSelection()
{
	if ( document.selection )
		document.selection.empty();
	else if ( window.getSelection ) 
		window.getSelection().removeAllRanges();
}