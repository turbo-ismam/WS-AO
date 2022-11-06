# Differenze tra Stardog e Protege
In questa sezione sono riportate le principali differenze che abbiamo riscontrato nell’utilizzo di Stardog rispetto a quanto visto a lezione con Protégé, suddivise in vantaggi dell’uno e dell’altro.

## Vantaggi di Stardog
* Ha un supporto più esteso alle query SPARQL, ad esempio supporta nativamente INSERT DATA e UPDATE, che su Protégé richiedono un plugin esterno
* L’immagine Docker è più leggera rispetto a quella di Protégé (1,3GB contro 3GB)
* Integra un set di API tramite il quale è possibile interagire con l’istanza ed effettuare query usando semplici richieste HTTP. Pertanto può essere usato come backend di un applicativo, a differenza di Protégé che supporta unicamente la creazione e la gestione di un’ontologia
* Mette a disposizione librerie ufficiali in vari linguaggi di programmazione (Java, Python, JavaScript, .NET, ...) per semplificare l’interazione con le sue API HTTP
* Permette di integrare il knowledge graph con sorgenti di dati esterne
* È in grado di supportare un numero di triple più elevato rispetto a Protégé
* L’interfaccia di Stardog Studio risulta più moderna e intuitiva rispetto a quella di Protégé
* È più attivamente supportato rispetto a Protégé

## Vantaggi di Protege
* Utilizza un sistema di plugin che che permette di estenderne le funzionalità
* La sua interfaccia ha un miglior supporto al data modelling rispetto a quella di Stardog
Studio, anche se per quest’ultimo le funzionalità necessarie sono in fase di sviluppo.
* Permette di configurare estensivamente il reasoner tramite interfaccia utente

## Scelta della piattaforma
Dalle caratteristiche sopra riportate emerge come i due sistemi abbiano degli scope leggermente differenti, in quanto Stardog è più incentrato sull’integrazione di sistemi e ontologie esterne, mentre Protégé offre un miglior supporto al data modelling. In un’ottica operativa, potrebbe risultare efficace l’utilizzo di Protégé per la creazione dell’ontologia, che può essere poi trasferita su Stardog per l’integrazione con sorgenti esterne (applicativi, ontologie e sorgenti dati).
