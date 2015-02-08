/*
*	Variabili globali
*/
var carte=[0,0,0,0,0,0,0,0,0,0,0,0,0];
var distribuisci=0, num=0, ultimoFiglio=0, mazziCompletati=0;
var nomeGiocatore="";


/*
*	Chiedo il nome del giocatore, creo dinamicamente i 10 mazzi superiori, distribuisco il primo mazzo e controllo eventi sui bottoni
*/
$(document).ready(function()
{	
	//Funzione che richiede tramite input-box in nome del giocatore
	inputGiocatore();
	//Funzione creante i 10 div padre che ospiteranno le carte
	creazioneTopDecks();
	//Funzione che distribuisci le prime 54 carte coperte (scoprendo poi l'ultima colonna)
	distribuzionePrimoMazzo();
	//Intercetto eventi click sui bottoni principali
	$("#btnNuovaPartita").click(function(){
		alert("Work in progress!")
	});
	$("#btnHint").click(function(){
		alert("Work in progress!")
	});
	$("#btnDemoVittoria").click(function(){
		alert("Work in progress!")
	});
	//Funzione che rende l'ultima carta di ogni colonna draggabile
	drag();
	//Funzione che rende tutte le carte droppabili
	drop();
});

/*
*	Funzione che gestisce il nome del nome del giocatore
*/
function inputGiocatore()
{
	nomeGiocatore=prompt("Inserire nome giocatore", nomeGiocatore);
	if (nomeGiocatore=="" || nomeGiocatore==null || nomeGiocatore==undefined)
		nomeGiocatore="Player 1";
	$("#nomeGiocatore").html(nomeGiocatore);
}

/*
*	Creazione dinamica div che conterranno le carte del mazzo superiore
*/
function creazioneTopDecks()
{
	var i=0;
	for (i = 0; i < 10; i++) 
	{	
    	var classeDiv = "topDecks";
        var cella = $('<div />');
        cella.attr("id",i);
        //Valore che rende la carta oggetto di drop da qualunque altra carta
        cella.attr("value","jolly")
        cella.addClass(classeDiv);
        //Appendo al padre i div figli
        $("#topDeck").append(cella);
    }
}

/*
*	Funzione che si occupa di generare un primo mazzo coperto formato da 54 carte, avente valori casuali 
*/
function distribuzionePrimoMazzo()
{
	var i,j,id="";
	for (j=0; j<5; j++)
	{
		for (i = 0; i < 10; i++) 
		{	
			//Funzione che assegna un valore casuale alla carta
			generaNumeroCasuale();
			if (j==0)
				//I div che compongono la prima riga non hanno margin-top
				var classeDiv = "coveredDeck0";
			else
				//I div che compongono tutte le altre righe hanno un margin top negativo (causa incastramento carte)
    			var classeDiv = "coveredDeck";
        	var cella = $('<div />');
        	id=j+""+i;
        	//Assegno gli id automaticamente
        	if (j>0)
        	{
        		var vecchioId=(j-1);
        		vecchioId+=""+i;
        	}
        	//Assegno proprietà ai div
        	cella.attr("id", id);
        	cella.addClass(classeDiv);
        	cella.attr("value",num);
        	//Visualizzo la carta coperta
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
        	//Mostra la carta (ovvero l'ultima delle prime 4 colonne)
        	mostraCarte(cella,id );
    }
}

/*
*	Funzione che si occupa della distribuzione di carte dal mazzo inferiore (avente 50 carte)
*/
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
		//Richiamo procedure di 'assestamento' e revisione delle carte
		azzeraDrag();
		checkID();
		drop();
		drag();
		checkDrag();
	}
	//Se il mazzo è esaurito
	if (distribuisci==5)
		$("#bottomDeck").html("Carte esaurite!");
}


/*
*	Funzione che gestisce l'aggiunta e l'appesa di carte
*/	
function appendiCarta(i, num)
{
	var classeDiv = "coveredDeck";
    var cella = $('<div />');
	var id="", id1="";
	//Individuo l'ultimo id (solo la riga)
	var contaFigli=$('#'+i+' div:last').attr("id");
	if (contaFigli.length==2)
		id1=parseInt(contaFigli.substring(0,1))+1;
	else if (contaFigli.length==3)
		id1=parseInt(contaFigli.substring(0,2))+1;
	//Costruisco il nuovo id
	id=id1+""+i;
	//Assegno proprietà al div e lo appendo al padre
	cella.attr("id", id);
	cella.addClass(classeDiv);
    cella.attr("value",num);
    cella.html('<img src="img/carta_retro.jpg">');
    $('#'+i+' div:last').append(cella);
	mostraCarte(cella, id);
}

/*
*	Funzione che assegna e mostra l'immagine in base al valore della carta
*/
function mostraCarte(cella, id) 
{
	valore=$("#"+id).attr("value");
	cella.html('<img name='+valore+' src="img/'+valore+'.jpg">');
}

/*
*	Funzione che genera un numero casuale e gestisce i valori delle carte attraverso un array
*/
function generaNumeroCasuale()
{
	do
	{
		num = Math.round(12*Math.random());
	}
	while (carte[num]>7)
	carte[num]++;
}

/*
*	Funzione che rende l'ultima riga di ogni colonna draggable
*/
function drag()
{
	var count;
	for(var i=0;i<10;i++)
	{
        $('#'+i+' div:last').draggable({revert:true});
        $('#'+i+' div:last').draggable( 'enable' );
	}
	 
}


/*
*	Funzione che rende tutte le carte droppabili
*/
function drop()
{
	var i=0, confronta1, confronta2, idDrop, idDrag, count, lastId, tmp, nID, oldId;
	$(".coveredDeck, .coveredDeck0").droppable({
		tolerance: "touch",
     	drop: function( event, ui ){ 
     		//Individuo la colonna della nuova carta
			idDrop=$(this).parent().closest(".topDecks").attr("id");
			//Individuo id dellla carta spostata
			idDrag=ui.draggable.attr("id");
			//Individuo la lunghezza della nuova colonna
			count=($('#'+idDrop).find('div').length)
			//Individuo id dell'ultima carta della colonna su cui verra spostata la carta
			lastId=$('#'+idDrop+' div:last').attr("id");
			//Individuo i valori delle due carte interessate dallo spostamento
			confronta1=parseInt($("#"+lastId).find("img").attr("name"))-1;
			confronta2=$("#"+idDrag).find("img").attr("name");
			//Se sono uguali procedo allo spostamento
			if(confronta1==confronta2)
			{
				//Costruisco l'id della nuova carta
				tmp=parseInt(count)+1;
				nID=tmp+""+idDrop;
				//Costruisco id della vecchia carta
				oldID = idDrag;
				//Appendo la carta alla colonna desiderata, le assegno il nuovo id e la rendo draggable
				$('#'+idDrop+' div:last').append($("#"+idDrag));
				$("#"+idDrag).attr("id",nID);
				$( "#"+nID).draggable({revert:true});
				//!!fare controllo su scopri (ultima carta)
				//Se sto spostando la carta da una colonna vuota  cambio classe (margin-top)
				tmp=oldID.substring(0,1)
				if (tmp=="0")
				{
					$("#"+nID).removeClass("coveredDeck0").addClass("coveredDeck");
					console.log("cambio classe "+nID);
				}
				scopri(oldID);
				aumentaMosse();		
				}	
      		}
    	});
    	//Gestisco la proprietà droppable delle colonne vuote
    	for (i=0; i<10; i++)
    	{
    		$("#"+i).droppable({
    			tolerance: "touch",
     			drop: function( event, ui ){ 
     				//Individuo la colonna della nuova carta
					idDrop=$(this).attr("id");
					//Individuo id della carta spostata
					idDrag=ui.draggable.attr("id");
					//Individuo lunghezza della nuova colonna
				 	count=($('#'+idDrop).find('div').length);
					//Individuo l'id dell'ultima carta della colonna su cui verrà spostata la carta
				 	lastId=$('#'+idDrop+' div:last').attr("id"); 
					//Individuo valore della carta interessata dallo spostamento
					confronta1=$("#"+idDrop).attr("value");
					//Se la colonna è vuota procedo allo spostamento
					if(confronta1=="jolly" && count==0)
					{
						//Costruisco id nuova e vecchia carta, assegno il nuovo id dopo averla appesa e la rendo draggabile
						tmp=parseInt(count);
						nID=tmp+""+idDrop;
						oldID = idDrag;
						$('#'+idDrop).append($("#"+idDrag));
						$("#"+idDrag).attr("id",nID);
						$( "#"+nID).draggable({revert:true});
						//!!fare controllo su scopri (ultima carta)
						//Cambio dinamicamente la classe (margin-top)
						$("#"+nID).removeClass("coveredDeck").addClass("coveredDeck0");
						scopri(oldID);
						aumentaMosse();		
					}
				 }
			});
		}
}

/*
*	Funzione che si occupa di scoprire una carta qualora quella prima di lei venga spostata ed essa sia coperta
*/
function scopri(oldID) 
{
	var riga, scopri;
	//Individuo la riga della carta da scoprire
	if (oldID.length==2)
		riga=oldID.substring(1,2);
	if (oldID.lenght==3)
		riga=oldID.substring(2,3);
	var scopri=$('#'+riga+' div:last').attr("id");
	//Giro la carta assegnandole una immagine il base al suo valore e la rendo draggabile
	$("#"+scopri).html('<img name='+$("#"+scopri).attr("value")+' src="img/'+$("#"+scopri).attr("value")+'.jpg">');
	$("#"+scopri).draggable({revert:true,revertDuration:200});
	$("#"+scopri).draggable('enable');
	checkDrag();				
}

/*
*	Funzione che gestisce la ricerca di scale e la loro draggabilità 
*/
function checkDrag()
{
	var scala=true;
	var valoreScala=0, contenuto=0,colonna=0, i=0;
	//Aggiorno gli ID
	checkID();
	//Scorro le 10 colonne
	for (colonna=0; colonna<10; colonna++)
	{
		scala=true;
		//Individuo la lunghezza della colonna (quante carte sono appese)
		var count= ($('#'+colonna).find('div').length)-1;
		//Effettuo una prima lettura fuori ciclo dell'ultima carta
		contenuto=$('#'+colonna+ ' div:last').attr("value");
		//Assegno il valore di confronto
		valoreScala=parseInt(contenuto)+1;
		//Scorro ogni riga di ogni colonna
		for (i=count-1; i>=0; i--)
		{
			contenuto=$("#"+i+colonna).children().attr("name");
			//Se la carta è scoperta controllo il suo valore
			if (contenuto != undefined && scala==true)
			{
				//Se il valore continua la scala rendo la carta draggabile
				if (parseInt(contenuto)==(valoreScala))
				{
					$("#"+i+colonna).draggable( 'enable' );
					valoreScala+=1;	
				}
				//Se il valore non continua la scala rendo la carta non draggabile
				else
				{
					scala=false;
					$("#"+i+colonna).draggable( 'disable' );
				}
			}
		}
	}
	drag();
}

/*
*	Funzione che si occupa di azzerare la proprietà draggable al fine di evitare errori dopo la distribuzione delle carte
*/
function azzeraDrag()
{
	var i,j;
	var contenuto;
	//Ogni riga di ogni colonna (se la carta è scoperta) viene resa non draggabile
	for (i=0; i<10;i++)
	{
		var count= ($('#'+i).find('div').length)-1;
		for (j=0; j<count; j++)
		{
			contenuto=$("#"+j+i).children().attr("name");
			if (contenuto!=undefined)
				$("#"+j+i).draggable('disable');
		}
	}
}

/*
*	Funzione che si occupa di aggiornare gli ID delle carte qualora vi siano errori
*/
function checkID ()
{
	var supporto=0, contenuto=0,i, j, count, id;
	//Scorro ogni riga di ogni colonna e controllo il suo ID con quello desiderato
	for (i=0; i<10;i++)
	{
		count= $('#'+i).find('div').length;
		id=i;
		for (j=0; j<count; j++)
		{
			contenuto=$("#"+id).children('div').attr("id");
			supporto=(j+""+i);
			id=supporto;
			//Se gli ID non corrispondono, l'id viene aggiornato
			if (contenuto!=supporto) 
				$("#"+contenuto).attr( 'id', supporto );
		}
	}
}

/*
*	Funzione che gestisce l0aumento delle mosse
*/
function aumentaMosse()
{
	var nMosse=0;
	nMosse=$("#numeroMosse").html();
	nMosse++;
	nMosse=$("#numeroMosse").html(nMosse);
}

/*
*	Funzioni ancora da fare/finire
*/

function nuovaPartita()
{}

function hint()
{}

function animazioneVittoria()
{}


function controlloVittoria()
{
	//controllo mazzo completato
	//se completato aumento mazzi completati e progressbar
	//controllo vittoria
	if (mazziCompletati==8)
	{
		alert("hai vinto!")
	}
}


