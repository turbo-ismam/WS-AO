# Web Semantico - Anonimation Ontology

# Installazione

- Clonare la repo mediante il seguente comando:  
` git clone https://github.com/turbo-ismam/WS-AO.git `

- Sostituire i dati nel file StardogQuery.tsx con quelli relativi alla propria istanza di Stardog

- Dalla propria istanza di Stardog Studio creare il DB `ao`

- Importare o inserire manualemente i namespace contenuti nel file `namespaces.ttl`

- Importare nel DB appena creato il file `AO.owl` selezionando come formato `RDF/XML`, senza nessuna compressione

- Importare le ontologie
  - DCAT (Data Catalog Vocabulary)
  - MLO (Machine Learning Ontology)
  - FOAF (Friend Of A Friend)

- Eseguire la query contenuta nel file `data.rq` nel DB creato in precedenza

- Navigare nella cartella `frontend` ed eseguire i seguenti comandi:  
`nmp i
npm run start`

- Utilizzare l'applicativo dall'indirizzo `localhost:3000/`
