//Variabili globali
var carte=[0,0,0,0,0,0,0,0,0,0,0,0,0];
distribuisci=0;
//
$(document).ready(function()
{	
	creazioneTopDecks();
	distribuzionePrimoMazzo();
	tmpStatoArray();

});

//Creazione dinamica div che compongono il mazzo superiore
function creazioneTopDecks()
{
	var i=0;
	for (i = 0; i < 10; i++) 
	{	
    	var classeDiv = "topDecks";
        var cella = $('<div />');
        cella.attr("id",i);
        cella.addClass(classeDiv);
        //Appendo al padre i div figli
        $("#topDeck").append(cella);
    }
}

function distribuzionePrimoMazzo()
{
	var i,j;
	for (j=0; j<5; j++)
	{
		for (i = 0; i < 10; i++) 
		{	
			do
			{
				var num = Math.round(12*Math.random());
			}
			while (carte[num]>7)
			carte[num]++;
    		var classeDiv = "coveredDeck";
       	 	var contenutoDiv;
            contenutoDiv = i;
        	var cella = $('<div />');
        	cella.attr("id", j+""+i);
        	//cella.attr("onclick","clickCell(" +i+ ")");
        	cella.addClass(classeDiv);
        	cella.html(num);
        	//Appendo al padre i div figli
        	$("#"+i).append(cella);
    	}
    }
    //prime 4 colonne hanno una carta di più
    for (i=0; i<4; i++)
    {
    		do
			{
				var num = Math.round(12*Math.random());
			}
			while (carte[num]>7)
			carte[num]++;
    		var classeDiv = "coveredDeck";
       	 	var contenutoDiv;
            contenutoDiv = "6";
        	var cella = $('<div />');
        	cella.attr("id", "6"+i);
        	//cella.attr("onclick","clickCell(" +i+ ")");
        	cella.addClass(classeDiv);
        	cella.html(num);
        	//Appendo al padre i div figli
        	$("#"+i).append(cella);
    }
}

function distribuisciCarte()
{
	if (distribuisci<5)
		distribuisci++;
	else 
		alert("carte finite!");
}

//Funzione temporanea che mostra quante carte sono uscite
function tmpStatoArray(){

	var tmp="";
	var somma=0,i=0;
	for (i=0; i<13;i++)
	{
	
		tmp+=carte[i];
		somma+=carte[i];
	}
	$("#tmpArray").html(tmp+" "+somma);

}

