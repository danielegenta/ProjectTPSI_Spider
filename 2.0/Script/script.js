//Variabili globali
var carte=[0,0,0,0,0,0,0,0,0,0,0,0,0];
var distribuisci=0, num=0, ultimoFiglio=0;
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
	//cercaUltimoFiglio();
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
        	if (j>0)
        	{
        		var vecchioId=(j-1);
        		vecchioId+=""+i;
        	}
        	cella.attr("id", id);
        	cella.addClass(classeDiv);
        	cella.attr("value",num);
        	cella.html('<img src="img/carta_retro.jpg">');
        	//Appendo al padre i div figli
        	if (j>0)
        		$("#"+vecchioId).append(cella);
        	else
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
        	$("#4"+i).append(cella);
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
		drop();
		drag();
		checkDrag();
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
	var id="", id1="";
		//var contaFigli = $("#"+i).children().length;
	var contaFigli=$('#'+i+' div:last').attr("id");
		id1=parseInt(contaFigli.substring(0,1))+1;
		id=id1+""+i;
		cella.attr("id", id);
	cella.addClass(classeDiv);
    cella.attr("value",num);
    cella.html('<img src="img/carta_retro.jpg">');
    //Appendo al padre i div figli
     $('#'+i+' div:last').append(cella);
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
		//count = $("#"+i).children().length;
		$('#'+i+' div:last').draggable({revert:true});//revertDuration:200});
	}
}


//rende tutti i mazzi droppabili
function drop()
{
	var i;
		$(".coveredDeck, .coveredDeck0" ).droppable({
			tolerance: "touch",
     		drop: function( event, ui ){ 
     		//Id colonna della nuova carta
				var idDrop=$(this).parent().closest(".topDecks").attr("id");//id colonna
			//Id dellla carta spostata
				var idDrag=ui.draggable.attr("id");//id carta spostata
			//Lunghezza della nuova colonna
				var count=String($("#"+idDrop+" div:last").attr("id")).substring(0,1)//lunghezza nuova colonna

			//Id dell'ultima carta della nuova colonna
				var lastId=$('#'+idDrop+' div:last').attr("id");    //id ultima carta nuova colonna
			//Valori delle due carte interessate dallo spostamento
				var confronta1=parseInt($("#"+lastId).find("img").attr("name"))-1;//valore ultima carta nuova colonna-1
				var confronta2=$("#"+idDrag).find("img").attr("name");//valore carta spostata
				if(confronta1==confronta2)
				{
					var tmp=parseInt(count)+1;
					var nID=tmp+""+idDrop;//id della carta nella nuova colonna NO
					var oldID = idDrag;//id vecchia colonna OK
					//$( "#"+idDrag).draggable({revert:false});
					//$("#"+oldID).remove();
					$('#'+idDrop+' div:last').append($("#"+idDrag));
					$("#"+idDrag).attr("id",nID);
					$( "#"+nID).draggable({revert:true});
					scopri(oldID);		
				}	
      		}
    	});
}

//Funzione che si occupa di scoprire una carta qualora quella prima di lei venga spostata ed essa sia coperta
function scopri(oldID) 
{
					//var oldCount=oldID.substring(0,1);//lunghezza vecchia colonna
					//var oldCount2=oldID.substring(1,2);//lunghezza vecchia colonna
					//oldCount2=parseInt(oldCount)-1;
					var riga=oldID.substring(1,2);
					var scopri=$('#'+riga+' div:last').attr("id");//id ultima carta vecchia colonna
					//$("#"+scopri).attr("value");
					//Gira la carta
					$("#"+scopri).html('<img name='+$("#"+scopri).attr("value")+' src="img/'+$("#"+scopri).attr("value")+'.jpg">');
					$("#"+scopri).draggable({revert:true,revertDuration:200});
					
					//multipleDrag();
}

//Funzione aggiornata 

function checkDrag()
{
	var scala=1;
	var valoreScala=0;
	var contenuto=0;
	var colonna=0, i=0;
	for (colonna=0; colonna<10; colonna++)
	{
		var count= $('#'+colonna+' div:last').attr("id").substring(0,1);
		//prima lettura fuori ciclo della carta scoperta
		contenuto=$('#'+colonna+ ' div:last').attr("value");
		//alert(contenuto);
		valoreScala=parseInt(contenuto);
		valoreScala+=1;
		scala=1;
		for (i=count-1; i>=0; i--)
		{
			contenuto=$("#"+i+colonna).children().attr("name");
			//alert(contenuto);
			//La carta è scoperta
			if (contenuto != undefined)
			{
				//alert("colonna:"+colonna+",contenuto: "+contenuto +", contenuto desiderato:"+valoreScala)
				if (parseInt(contenuto)==(valoreScala))
				{
					valoreScala=parseInt(contenuto);
					valoreScala+=1;	
				}
				else
				{
					scala=0;
					$("#"+i+colonna).draggable( 'disable' );
				}
			}
		}
		if (scala==1)	
		{
			alert(colonna+" scalare");
		}
		//else
			//alert(j+" non è sclare");
	}
}

function cercaUltimoFiglio()
{
	alert($('#0 div:last').attr("id"));
}
