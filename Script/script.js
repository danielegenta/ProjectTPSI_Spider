//Variabili globali
var carte=[0,0,0,0,0,0,0,0,0,0,0,0,0];
var distribuisci=0, num=0;
var nomeGiocatore="";


//Controllo i vari eventi sui bottoni dopo aver creato i mazzi coperti superiori
$(document).ready(function()
{	
	//inputGiocatore();
	//Funzione creante i 10 div padre che ospiteranno le carte
	creazioneTopDecks();
	//Funzione che distribuisci le prime 54 carte coperte (scoprendo poi l'ultima colonna)
	distribuzionePrimoMazzo();
	//Intercetto eventi ck sui bottoni principali
	$("#btnNuovaPartita").click(function(){
		alert("Work in progress!")
	});
	$("#btnHint").click(function(){
		alert("Work in progress!")
	});
	$("#btnDemoVittoria").click(function(){
		alert("Work in progress!")
	});
	drag();
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

//Funzione che si occupa di generare un primo mazzo coperto formato da 54 carte
function distribuzionePrimoMazzo()
{
	var i,j, id="";
	for (j=0; j<5; j++)
	{
		for (i = 0; i < 10; i++) 
		{	
			generaNumeroCasuale();
			if (j==0)
				//Non hanno margine
				var classeDiv = "coveredDeck0";
			else
				//Margin top negativo (causa incastramento carte)
    			var classeDiv = "coveredDeck";
        	var cella = $('<div />');
        	id=j+""+i;
        	cella.attr("id", id);
        	cella.addClass(classeDiv);
        	cella.attr("value",num);
        	cella.html('<img src="img/carta_retro.jpg">');
        	//Appendo al padre i div figli
        	$("#"+i).append(cella);
        	//Se sono tra le colonne con 5 carte mostro l'ultima
        	if (j==4 && i>3)
        		mostraCarte(cella, id);
    	}
    }
    //Ciclo che gestisce le colonne con 6 carte
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

//Funzione che si occupa della distribuzione di 10 carte dal valore casuale
function distribuisciCarte()
{
	if (distribuisci<=4)
	{
		for (i=0; i<10; i++)
		{
			generaNumeroCasuale();
			appendiCarta(i, num);
		}
		distribuisci++;
	}
	if (distribuisci==5)
	{
		$("#bottomDeck").html("Carte esaurite!");
	}
}


//Funzione che permette di appendere carte al div
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

//Funzione che assegna immagine in base al valore della carta e la mostra
function mostraCarte(cella, id) 
{
	valore=$("#"+id).attr("value");
	cella.html('<img src="img/'+valore+'.jpg">');
}

//Funzione che genera un numero casuale e gestisce i valori delle carte attraverso un Array
function generaNumeroCasuale()
{
	do
	{
		num = Math.round(12*Math.random());
	}
	while (carte[num]>7)
	carte[num]++;
	
}

//rende l'ultima riga draggabless
function drag()
{
	var count = $("#0").children().length;
	alert($("#0").children().eq(count).attr("id"));
}