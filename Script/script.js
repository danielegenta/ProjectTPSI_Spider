//Variabili globali


//
$(document).ready(function()
{	
	creazioneTopDecks();
});

//Creazione dinamica div che compongono il mazzo superiore
function creazioneTopDecks()
{
	var i=0;
	for (i = 0; i < 10; i++) 
	{	
    	var classeDiv = "topDecks";
        var contenutoDiv;
        //if(i == 15) 
            contenutoDiv = "p";
        //else
        	//contenutoDiv = i+1;
        var cella = $('<div />');
        cella.attr("id",i);
        cella.attr("onclick","clickCell(" +i+ ")");
        cella.addClass(classeDiv);
        cella.html(contenutoDiv);
        //Appendo al padre i div figli
        $("#topDeck").append(cella);
    }
}