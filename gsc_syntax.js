setSyntaxColour();

function setSyntaxColour()
{
	var codeBlocks = document.getElementsByClassName('code-line');
	var replace = new RegExp('temp', 'g');
	var str = "";
	var comments = [];
	var blockComments = [];
	var strs = [];
	var idxStart = 0;
	var idxEnd = 0;
	var idx = 0;
	var i = 0;
	var j = 0;
	var keyWords = ['#using', '#namespace', 'function', 'wait', 'endon', 'notify', 'waittill', 'for', 'while', 'if', 'size', 'else', 'return'];
	var variables = ['false', 'true', 'level', 'self', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	var functions = ['AddZombieBoxWeapon', 'AllowActionSlotInput', 'AllowedStances', 'AnimScripted', 'ArraySort', 'Attach', 'AttachShieldModel', 'AttachWeapon', 'BulletTrace', 'BulletTracePassed'];

	for( i = 0; i < codeBlocks.length; i++ )
	{
		console.log("Converting Code Block");

		// Comments
		var strLength = codeBlocks[i].innerHTML.length;
	  	idxStart = 0;
	  	idxEnd = 0;
	  	idx = 0 ;

	  	while(idxStart != -1 && idxEnd != -1)
	  	{
	  		idxStart = codeBlocks[i].innerHTML.indexOf('//', idx);
	  		idxEnd = codeBlocks[i].innerHTML.indexOf('\n', idxStart + 1);

	  		if( idxStart == -1 || idxEnd == -1 )
	  			break;

	  		str = codeBlocks[i].innerHTML.substring(idxStart,idxEnd + 1);
	  		comments.push(str);

	  		idx = idxEnd + 1;

	  		if(idx > strLength)
	  			break;
	  	}

	  	// Block Comments
		strLength = codeBlocks[i].innerHTML.length;
	  	idxStart = 0;
	  	idxEnd = 0;
	  	idx = 0 ;

	  	while(idxStart != -1 && idxEnd != -1)
	  	{
	  		idxStart = codeBlocks[i].innerHTML.indexOf('/*', idx);
	  		idxEnd = codeBlocks[i].innerHTML.indexOf('*/', idxStart + 1);

	  		if( idxStart == -1 || idxEnd == -1 )
	  			break;

	  		str = codeBlocks[i].innerHTML.substring(idxStart,idxEnd + 2);
	  		blockComments.push(str);

	  		idx = idxEnd + 1;

	  		if(idx > strLength)
	  			break;
	  	}

	  	// Strings -- Orange
	  	strLength = codeBlocks[i].innerHTML.length;
	  	idxStart = 0;
	  	idxEnd = 0;
	  	idx = 0 ;

		while(idxStart != -1 && idxEnd != -1)
	  	{
	  		idxStart = codeBlocks[i].innerHTML.indexOf('"', idx);
	  		idxEnd = codeBlocks[i].innerHTML.indexOf('"', idxStart + 1);

	  		if( idxStart == -1 || idxEnd == -1 )
	  			break;

	  		str = codeBlocks[i].innerHTML.substring(idxStart,idxEnd + 1);

	  		if(!str.includes('color: '))
	  			strs.push(str);

	  		idx = idxEnd + 1;

	  		if(idx > strLength)
	  			break;
	  	}

	  	for( j = 0; j < blockComments.length; j++ )
	  	{
	  		codeBlocks[i].innerHTML = codeBlocks[i].innerHTML.replace(blockComments[j], '<span style="color: DIMGRAY">$&</span>');
	  	}

	  	for( j = 0; j < comments.length; j++ )
	  	{
	  		codeBlocks[i].innerHTML = codeBlocks[i].innerHTML.replace(comments[j], '<span style="color: DIMGRAY">$&</span>');
	  	}

	  	for( j = 0; j < strs.length; j++ )
	  	{
	  		codeBlocks[i].innerHTML = codeBlocks[i].innerHTML.replace(strs[j], '<span style="color: GOLDENROD">$&</span>');
	  	}

		// Common keyWords -- Purple
		for( j = 0; j < keyWords.length; j++ )
		{
			replace = new RegExp(keyWords[j], 'g');
			codeBlocks[i].innerHTML = codeBlocks[i].innerHTML.replace(replace, '<span style="color: INDIANRED">$&</span>');
		}

		// Common Variables -- Purple
		for( j = 0; j < variables.length; j++ )
		{
			replace = new RegExp(variables[j], 'g');
			codeBlocks[i].innerHTML = codeBlocks[i].innerHTML.replace(replace, '<span style="color: MEDIUMPURPLE">$&</span>');
		}

		// Functions
		for( j = 0; j < functions.length; j++ )
		{
			replace = new RegExp(functions[j], 'g');
			codeBlocks[i].innerHTML = codeBlocks[i].innerHTML.replace(replace, '<span style="color: DEEPSKYBLUE">$&</span>');
		}

		// Set String Priority
		removeSpansBetween( codeBlocks[i], '<span style="color: GOLDENROD">"', '"</span>' );

		// Set Comment Priority
		removeSpansBetween( codeBlocks[i], '//', '\n' );

		// Set Comment Block Priority
		removeSpansBetween( codeBlocks[i], '/*', '*/' );
	}
}

function removeSpansBetween( codeBlock, strA, strB )
{
	var strLength = codeBlock.innerHTML.length;
	var strs = [];
	var newStrs = [];
	var idxStart = 0;
	var idxEnd = 0;
	var idx = 0 ;
	var idxStartInner = 0;
	var idxEndInner = 0;
	var idxInner = 0 ;
	var strsInner = [];
	var strInnerLength = 0;

	while(idxStart != -1 && idxEnd != -1)
	{
		if(!codeBlock.innerHTML.includes(strA) || !codeBlock.innerHTML.includes(strB))
			break;

		idxStart = codeBlock.innerHTML.indexOf(strA, idx) + strA.length;
		idxEnd = codeBlock.innerHTML.indexOf(strB, idxStart);

		if( idxStart == strA.length - 1 || idxEnd == -1 )
			break;

		str = codeBlock.innerHTML.substring(idxStart,idxEnd);
		
		if(str.includes('<'))
		{
			strs.push(str);
			strInnerLength = str.length;

			while(idxStartInner != -1 && idxEndInner != -1)
			{
				idxStartInner = str.indexOf('<', idxInner);
				idxEndInner = str.indexOf('>', idxStartInner) + 1;

				if( idxStartInner == -1 || idxEndInner == 0 )
					break;

				strsInner.push(str.substring(idxStartInner,idxEndInner));
				idxInner = idxEndInner;

				if( idxInner >= strInnerLength )
					break;			
			}

			for( j = 0; j < strsInner.length; j++ )
			{
				str = str.replace(strsInner[j], '');
			}

			newStrs.push(str);
		}

		idx = idxEnd + 1;

		if(idx > strLength)
			break;
	}

	for( j = 0; j < newStrs.length; j++ )
	{
		codeBlock.innerHTML = codeBlock.innerHTML.replace(strs[j], newStrs[j]);
	}
}