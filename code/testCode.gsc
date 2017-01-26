#using scripts/zm/hud;

#namespace test;

function main()
{
	players = GetPlayers();

	for( i = 0; i < players.size; i ++ )
	{
		players[i] thread testFunc( "This is a string" );
	}
}

function testFunc( str )
{
	iprintlnBold(str);
}