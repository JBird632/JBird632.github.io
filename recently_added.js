$.getJSON("json/recently_added.json", function(json)
{
    loadRecentlyAdded(json);
});

function loadRecentlyAdded(json)
{
    var div = document.getElementsByClassName('recently-added')[0];

    for( var data in json )
    {
        var recentlyAddedDiv = document.createElement('div');
        var image = document.createElement('img');
        var title = document.createElement('h2');
        var date = document.createElement('span');
        var description = document.createElement('p');
        var infoButton = document.createElement('a');
        var downloadButton = document.createElement('a');

        var table = document.createElement('table');
        var row = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');

        td1.className = 'col-lg-6';
        td1.id = 'td-override';
        td2.className = 'col-lg-6';

        recentlyAddedDiv.className = 'container-title';
        image.className = 'clickable-image';
        title.className = 'title-text breadcrumb-text';
        description.className = 'list-group-item-text';
        infoButton.className = 'btn btn-request right space-up';
        downloadButton.className = 'btn btn-download right space-left space-up';

        image.src = json[data].src;
        title.innerHTML = json[data].title + '&nbsp;<span class="badge">' + json[data].date + '</span>';
        description.innerHTML = json[data].description;
        infoButton.innerHTML = 'Information';
        infoButton.href = json[data].href;
        downloadButton.innerHTML = 'Download';
        downloadButton.href = json[data].download;

        table.appendChild(row);
        row.appendChild(td1);
        row.appendChild(td2);
        recentlyAddedDiv.appendChild(table);
        div.appendChild(recentlyAddedDiv);

        td1.appendChild(image);

        td2.appendChild(title);
        td2.appendChild(description);

        if(json[data].download != "")
            td2.appendChild(downloadButton);

        if(json[data].href != "")
            td2.appendChild(infoButton);
    }

    setupClickableImages();
}

function setupClickableImages()
{
    var images = document.getElementsByClassName('clickable-image');

    for( var i = 0; i < images.length; i++ )
    {
        images[i].onclick = function()
        {
            var modal = document.getElementsByClassName('image-model')[0];
            var modalImg = document.getElementsByClassName("model-display-image")[0];
            var span = document.getElementById("close");

            modal.style.display = "block";
            modalImg.src = this.src;

            span.onclick = function()
            { 
                modal.style.display = "none";
            }
        }
    }
}
