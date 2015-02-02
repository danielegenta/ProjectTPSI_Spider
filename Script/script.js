//Variabili globali
var carte=[0,0,0,0,0,0,0,0,0,0,0,0,0];
var distribuisci=0, num=0;
var nomeGiocatore="";
//
$(document).ready(function()
{	
	//inputGiocatore();
	creazioneTopDecks();
	distribuzionePrimoMazzo();
	tmpStatoArray();
	$("#btnNuovaPartita").click(function(){
		alert("Work in progress!")
	});
	$("#btnHint").click(function(){
		alert("Work in progress!")
	});
	$("#btnDemoVittoria").click(function(){
		alert("Work in progress!")
	});
});

//Funzione che gestisce il nome del nomeGiocatore
function inputGiocatore()
{
	nomeGiocatore=prompt("Inserire nome giocatore", nomeGiocatore);
	if (nomeGiocatore=="" || nomeGiocatore==null || nomeGiocatore==undefined)
		nomeGiocatore="Player 1";
	$("#nomeGiocatore").html(nomeGiocatore);
}

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
	var i,j, id="";
	for (j=0; j<5; j++)
	{
		for (i = 0; i < 10; i++) 
		{	
			generaNumeroCasuale();
			if (j==0)
			{
				var classeDiv = "coveredDeck0";
			}
			else
    			var classeDiv = "coveredDeck";
       	 	var contenutoDiv;
            contenutoDiv = i;
        	var cella = $('<div />');
        	id=j+""+i;
        	cella.attr("id", id);
        	cella.addClass(classeDiv);
        	cella.attr("value",num);
        	cella.html('<img src="img/carta_retro.jpg">');
        	//Appendo al padre i div figli
        	$("#"+i).append(cella);
        	if (j==4 && i>3)
        		mostraCarte(cella, id);
    	}
    }
    //prime 4 colonne hanno una carta di più
    for (i=0; i<4; i++)
    {
    		generaNumeroCasuale();
    		var classeDiv = "coveredDeck";
        	var cella = $('<div />');
        	id="5"+i;
        	cella.attr("id", id);
        	cella.addClass(classeDiv);
        	cella.attr("value",num);
        	cella.html('<img src="img/carta_retro.jpg">');
        	//Appendo al padre i div figli
        	$("#"+i).append(cella);
        	mostraCarte(cella,id )
    }
}



function distribuisciCarte()
{
	if (distribuisci<=4)
	{
		for (i=0; i<10; i++)
		{
			generaNumeroCasuale();
			tmpStatoArray();
			appendiCarta(i, num);
		}
		distribuisci++;
	}
	if (distribuisci==5)
	{
		$("#bottomDeck").html("Carte esaurite!");
	}
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

function appendiCarta(i, num)
{
	var classeDiv = "coveredDeck";
    var cella = $('<div />');
	var tmp=0;
	var id="";
	if (i<4)
	{
		id=(distribuisci+6)+""+i;
		cella.attr("id", id);
	}
	else
	{
		id=(distribuisci+5)+""+i;
		cella.attr("id", id);
    }
	cella.addClass(classeDiv);
    cella.attr("value",num);
    cella.html('<img src="img/carta_retro.jpg">');
    //Appendo al padre i div figli
     $("#"+i).append(cella);
	 mostraCarte(cella, id);
}

function mostraCarte(cella, id) 
{
	valore=$("#"+id).attr("value");
	cella.html('<img src="img/'+valore+'.jpg">');
}

function generaNumeroCasuale()
{
	do
	{
		num = Math.round(12*Math.random());
	}
	while (carte[num]>7)
	carte[num]++;
	
}
