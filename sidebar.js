function toggleSidebar()
{
	//$(".sidebar-slide").toggleClass("toggled");
	
	var sidebar = document.getElementsByClassName('sidebar-slide')[0];
	
	if(sidebar.className.includes('toggled'))
		sidebar.className = 'sidebar-slide';
	else
		sidebar.className = 'sidebar-slide toggled';
}