# Modellazione dell'Ontologia

## Classi modellate

### Record
Entità che rappresenta un record appartenente ad un dcat:Dataset.

**Attributi e associazioni**
- contains (Thing): relazione atta ad individuare gli elementi che compongono il record.

### AnonymizedDataset
Entità che rappresenta un dataset ai cui record è stata applicata una ao:anonymizationTechnique. 
È implementata come sottoclasse di dcat:Dataset e viene utilizzata come dominio per la object property contains per individuare i relativi AnonymizedRecord. Tramite la object property anonymizedAs l'ao:Dataset viene anonimizzato in un ao:anonymizedDataset.

**Attributi e associazioni**
- contains (AnonymizedRecord): relazione ad individuare i record anonimizzati che compongono il dataset.
- usedTechnique (AnonymizationTechnique): relazione atta ad individuare le tecniche di anonimizzazione utilizzate per anonimizzare il dataset.

### AnonymizedRecord
Entità che rappresenta un record al quale è stata applicata una tecnica di anonimizzazione. È implementata come sottoclasse di Record.

### AnonymizationTechnique
Entità che rappresenta la tecnica di anonimizzazione che può essesre applicata ad un dataset.

**Attributi e associazioni**
- name (string): attributo che rappresenta il nome della tecnica di anonimizzazione
- description (string): attributo che rappresenta una descrizione della tecnica di anonimizzazione

### SensitiveThing
Entità che rappresenta un elemento di un record che può essere un identificatore diretto o indiretto. SensitiveThing permette di distinguere concetti potenzialmente sensibili senza precludere la possibilità di trattare tutti gli elementi allo stesso modo (essendo subClassOf Thing).

**Attributi e associazioni**
- identifiedBy (foaf:Person, mlo:Applications): relazione atta ad individuare la persona o l'algoritmo di machine learning utilizzato per etichettare l'elemento come sensibile
- represents (foaf:Person, foaf:Organization, http://www.ontologydesignpatterns.org/cp/owl/place.owl, Misc): relazione atta ad individuare la categoria di dati sensibili a cui appartiene l'elemento

### Misc
Entità che rappresenta una categoria di elementi sensibili differente da tutte le altre.

## Object-Properties modellate

### contains
- descrizione: proprietà transitiva che mette in relazione un dataset o record con gli elementi di cui son composti
- dominio: dcat:Dataset, Record
- range: Thing
- proprietà inversa: isContainedIn

### isContainedIn
- descrizione: proprietà transitiva che mette in relazione un record o Thing con l'entità a cui appartengono
- dominio: Thing
- range: Record, dcat:Dataset
- proprietà inversa: contains

### identifiedBy
- descrizione: proprietà che mette in relazione un elemento sensibile del record con la persona o tecnica che lo ha classificato come tale
- dominio: SensitiveThing
- range: foaf:Person, mlo:Applications
- proprietà inversa: identifies

### identifies
- descrizione: proprietà che mette in relazione una persona o un algoritmo di machine learning con gli elementi che ha classificato come sensibili
- dominio: foaf:Person, mlo:Applications
- range: SensitiveThing
- proprietà inversa: identifiedBy

### represents
- descrizione: proprietà funzionale che mette in relazione un elemento sensibile con la categoria di dati sensibili a cui appartiene
- dominio: SensitiveThing
- range: foaf:Person, foaf:Organization, http://www.ontologydesignpatterns.org/cp/owl/place.owl, Misc
- proprietà inversa: isRepresentedAs

### isRepresentedAs
- descrizione: proprietà che mette in relazione una persona, organizzazione, luogo o altro dato sensibile con l'elemento di un record che la rappresenta
- dominio: foaf:Person, foaf:Organization, http://www.ontologydesignpatterns.org/cp/owl/place.owl, Misc
- range: SensitiveThing
- proprietà inversa: represents

### anonymizedAs
- descrizione: proprietà inversamente funzionale che mette in relazione una dataset con la sua versione anonimizzata
- dominio: dcat:Dataset
- range: AnonymizedDataset
- proprietà inversa: anonimizedFrom

### anonimizedFrom
- descrizione: proprietà funzionale che mette in relazione un dataset anonimizzato col dataset dal quale è stato ricavato
- dominio: AnonymizedDataset
- range: dcat:Dataset
- proprietà inversa: anonymizedAs

### usedTechnique
- descrizione: proprietà che mette in relazione un dataset anonimizzato con le tecniche di anonimizzazione utilizzate
- dominio: AnonymizedDataset
- range: AnonymizationTechnique
- proprietà inversa: usedFor

### usedFor
- descrizione: proprietà che mette in relazione una tecnica di anonimizzazione con i dataset che la utilizzano
- dominio: AnonymizationTechnique
- range: AnonymizedDataset
- proprietà inversa: usedTechnique

## Ontologie esterne
Sulla base delle entità individuate sono state importate alcune ontologie esterne:
- DCAT (Data Catalog Vocabulary): vocabolario designato per descrivere cataloghi, dataset e dataservice. Utilizzato per modellare le sorgenti dei dati da anonimizzare.
- MLO (Machine Learning Ontology): ontologia che descrive tutto il dominio di machine learning. Utilizzata per descrivere eventuali tecniche di machine learning mediante le quali identificare gli identificatori diretti/indiretti.
- FOAF (Friend Of A Friend): ontologia atta a descrivere persone, organizzazioni, le loro caratteristiche e le relazioni con altre persone. Utilizzata per referenziare i dati individuati riguardanti persone/organizzazioni.
- Location Ontology (ArCo network): ontologia atta a descrivere luoghi geografici. Utilizzata per referenziare i dati individuati riguardanti luoghi. 
