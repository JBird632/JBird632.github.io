window.requestAnimFrame = (function(callback)
{
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback)
	{
		window.setTimeout(callback, 1000 / 60);
	};
})();

setupProgressCircles();

function setupProgressCircles()
{
	var circles = document.getElementsByClassName("progressCircle");
	var length = circles.length;

	for( var i = 0; i < length; i++ )
	{
          createProgressCircle(circles[i], 0);
	}
}

function createProgressCircle(canvas, time)
{
	var context = canvas.getContext("2d");
	var x = canvas.width / 2;
	var y = canvas.height / 2;
	var str = canvas.id.split("-");
	var message = str[0];
	var percentage = str[1] * time / 300;
	var thickness = 12;

	context.clearRect(0, 0, canvas.width, canvas.height);

	if( x < y )
		var radius = x - thickness;
	else
		var radius = y - thickness;

	if( percentage > 0 )
	{
		context.beginPath();
		context.lineWidth = thickness;
		context.arc(x, y, radius, getStartRadian(true), getRadiansFromPercentage(percentage, true), false);
		context.strokeStyle = "rgb(66, 244, 75)";
		context.stroke();
		context.closePath();
	}

	if( percentage < 100 )
	{
		context.beginPath();
		context.lineWidth = thickness;
		context.arc(x, y, radius, getStartRadian(false), getRadiansFromPercentage(percentage, false), true);
		context.strokeStyle = "darkgrey";
		context.stroke();
		context.closePath();
	}

	context.font = "bold 30px Arial";
	context.textAlign = "center";
	context.fillStyle = "rgb(66, 244, 75)";
	context.fillText(parseInt(percentage) + "%", x, y);

	context.font = "bold 14px Arial";
	context.textAlign = "center";
	context.fillStyle = "darkgrey";
	context.fillText(message, x, y + 20);

	if(time < 300)
	{
		requestAnimFrame(function() {
          createProgressCircle(canvas, time + 10);
        });
    }
}

function getStartRadian(offsetLeft)
{
	if(offsetLeft)
		offset = 0.025;
	else
		offset = -0.025;

	return Math.PI/2 + offset;
}

function getRadiansFromPercentage(percentage, offsetLeft)
{
	if(offsetLeft)
		offset = -0.025;
	else
		offset = 0.025;

	if(percentage == 0)
		return getStartRadian(offsetLeft) - 2 * Math.PI;
	else if(percentage == 100)
		return getStartRadian(!offsetLeft) + 2 * Math.PI;
	else
		return (percentage * 2 * Math.PI / 100) + Math.PI/2 + offset;
}