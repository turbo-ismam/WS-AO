# Descrizione dell'applicativo
L'applicativo è stato realizzato con l'obiettivo di mostrare come l'ontologia creata aiuti a comprendere come funzionino i processi di anonimizzazione dei dati, permettendo in prima persona di provare tali processi. 
Per l'implementazione è stato scelto il linguaggio TypeScript attraverso il framework Node.js e le seguenti librerie:
1. Solid: libreria per la creazione di interfacce utente
2. Stardog.js: pacchetto npm ufficiale per comunicare con un'istanza di Stardog
3. bert-large-NER: una libreria ML sviluppata dalla community di Hugging Face utilizzata per identificare all'interno di un testo i dati sensiblii

Il sistema è stato riempito di dati che un normale utente non può inserire dall'applicazione (per esempio tecniche di anonimizzazione supportate dall'applicativo).
Dalla parte utente, è possibile anonimizzare delle informazioni passando in input una stringa dalla quale verranno estratte le variabili sensibili e dato in outputi l testo anonimizzato, la procedura che si segue all'interno dell'applicazione è:
1. Viene creato il dataset
2. All'interno della tabella record viene inserito un record che corrisponde alla stringa da anonimizzare.
3. Tramite la richiesta Api al ML, vengono identificate i dati sensibili all’interno del record
4. Questi dati sensibili vengono inseriti all’interno della tabella/classe sensitive thing.
5. Viene poi inserito un record all’interno di AnomizedDataset che corrisponde al dataset anonimizzato con La tecnica di anonimizzazione utilizzata 

E' possibile eseguire le query elencate nei capitoli precedenti.


# Mettere le foto dell'applicazione
