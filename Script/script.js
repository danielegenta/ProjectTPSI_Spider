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
	drop();
	//multipleDrag();
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
	var i,j,id="";
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
	var contaFigli = $("#"+i).children().length;
		id=contaFigli+""+i;
		cella.attr("id", id);
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
	cella.html('<img name='+valore+' src="img/'+valore+'.jpg">');
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

//rende l'ultima riga draggable (per ogni riga ottiene la lunghezza e gli applica tale proprietà)
function drag()
{
	var count;
	for(var i=0;i<10;i++)
	{
		count = $("#"+i).children().length;
		$("#"+$("#"+i).children().eq(count-1).attr("id")).draggable({revert:true});//revertDuration:200});
	}
}


//rende tutti i mazzi droppabili
function drop()
{
	var i;
	for(i=0;i<10;i++)
	{
		$("#"+i ).droppable({
			tolerance: "touch",
     		drop: function( event, ui ){ 
				var idDrop=$(this).attr("id");//id colonna
				var idDrag=ui.draggable.attr("id");//id carta spostata
				var count=$("#"+idDrop).children().length;//lunghezza nuova colonna
				var lastId=$("#"+idDrop).children().eq(count-1).attr("id");//id ultima carta nuova colonna
				var confronta1=parseInt($("#"+lastId).find("img").attr("name"))-1;//valore ultima carta nuova colonna-1
				var confronta2=$("#"+idDrag).find("img").attr("name");//valore carta spostata
				if(confronta1==confronta2)
				{
					var nID=count+""+idDrop;//id della carta nella nuova colonna
					var oldID = idDrag.split("");//id vecchia colonna
					$( "#"+idDrag).draggable({revert:false});
					$("#"+oldID).remove(":last-child");
					$("#"+idDrop).append($("#"+idDrag));
					$("#"+idDrag).attr("id",nID);
					$( "#"+nID).draggable({revert:true});
					scopri(oldID);		
				}		
      		}
    	});
	}
}

//Funzione che si occupa di scoprire una carta qualora quella prima di lei venga spostata ed essa sia coperta
function scopri(oldID) 
{
	var oldCount=$("#"+oldID[1]).children().length;//lunghezza vecchia colonna
					var scopri=$("#"+oldID[1]).children().eq(oldCount-1).attr("id");//id ultima carta vecchia colonna
					//$("#"+scopri).attr("value");
					//Gira la carta
					$("#"+scopri).html('<img name='+$("#"+scopri).attr("value")+' src="img/'+$("#"+scopri).attr("value")+'.jpg">');
					$("#"+scopri).draggable({revert:true,revertDuration:200});
					multipleDrag();
}

//Funzione aggiornata 
function multipleDrag()
{
	var scala=1;
	var valoreScala=0;
	var contenuto=0;
	var count= $("#"+0).children().length;
	//prima lettura fuori ciclo della carta scoperta
	contenuto=$("#"+(count-1)+"0").children().attr("name");
	valoreScala=parseInt(contenuto);
	valoreScala+=1;
	for (i=count-2; i>=0; i--)
	{
		contenuto=$("#"+i+"0").children().attr("name");
		//La carta è scoperta
		if (contenuto != undefined)
		{
			if (parseInt(contenuto)==(valoreScala))
			{
			valoreScala=parseInt(contenuto);
			valoreScala+=1;
			}
			else
				scala=0;
		}
	}
	if (scala==1)
			
		{
			
			$("#50").append($("#"+0).children().eq(count-1));
			$("#"+0).remove(":last-child");
		}
}