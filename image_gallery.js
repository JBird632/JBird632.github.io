$(document).ready(function() 
{
	$('.thumbnail-img').click(function()
	{
		$('.modal-body').empty();
		var title = $(this).parent().attr("title");
		$('.modal-title').html(title);
		$($(this).parents('div').html()).appendTo('.modal-body');
		$('#image-model').modal({show:true});
	});


	setupImageGallery();
});

function setupImageGallery()
{
	var fileExt = {};
		fileExt[0] = ".png";
		fileExt[1] = ".jpg";
		fileExt[2] = ".gif";
	var gallery = document.getElementsByClassName('image-gallery')[0];

	$.ajax(
	{
		url: '/images/gallery/' + gallery.id + '/',
		type: 'GET',
		dataType: 'png',
		success: function (data) 
		{
			$(data).find("a:contains(" + fileExt[0] + "),a:contains(" + fileExt[1] + "),a:contains(" + fileExt[2] + ")").each(function () 
			{
				console.log(this);
			});
		}
	});
}