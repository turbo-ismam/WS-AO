# Modellazione dell'Ontologia

## Classi modellate

### Record
Entità che rappresenta un record appartenente ad un dcat:Dataset.

**Attributi e associazioni**
- text (String): attributo che rappresenta il testo del Record
- has (SensibleThing): relazione atta ad individuare gli elementi che compongono il record.

### AnonymizedDataset
Entità che rappresenta un dataset ai cui record è stata applicata una ao:anonymizationTechnique. 
È implementata come sottoclasse di dcat:Dataset e si ottiene tramite la object property anonymizedAs partendo dall'ao:Dataset.

**Attributi e associazioni**
- isPseudoAnonymized (Boolean): attributo che indica se il dataset è pseudoanonimizzato.
- usedTechnique (AnonymizationTechnique): relazione atta ad individuare le tecniche di anonimizzazione utilizzate per anonimizzare il dataset.

### AnonymizationTechnique
Entità che rappresenta la tecnica di anonimizzazione che può essesre applicata ad un dataset.

**Attributi e associazioni**
- name (string): attributo che rappresenta il nome della tecnica di anonimizzazione
- description (string): attributo che rappresenta una descrizione della tecnica di anonimizzazione

### SensibleThing
Entità che rappresenta un elemento di un record che può essere un identificatore diretto o indiretto. SensibleThing permette di distinguere concetti potenzialmente sensibili, se presenti, e di metterli in relazione col soggetto che rappresentano. Si è scelto di modellare questa relazione col soggetto poichè le entità contenute nel dataset sono note soltanto a chi anonimizza il dataset, al quale potrebbe risultare utile ad es. data una foaf:Person collegarla con tutti i Dataset in cui è mezionata. 

**Attributi e associazioni**
- text (String): attributo che rappresenta il valore testuale della SensibleThing
- position (int): attributo che rappresenta la posizione all'interno del record della SensibleThing
- identifiedBy (foaf:Person, mlo:Applications): relazione atta ad individuare la persona o l'algoritmo di machine learning utilizzato per etichettare l'elemento come sensibile
- represents (owl:Thing): relazione atta ad individuare il dato sensibile a cui si fa riferimento

## Object-Properties modellate
In seguito le Object-Properties modellate, alcune sono state modellate come subProperty di altre in modo da poter sfruttare il Property Chain.

### contains
- descrizione: proprietà transitiva che mette in relazione un dataset con i record che lo compongono
- dominio: dcat:Dataset
- range: Record
- subProperty Of: hasPart
- proprietà inversa: isContainedIn

### isContainedIn
- descrizione: proprietà transitiva che mette in relazione un record col dataset a cui appartiene
- dominio: Record
- range: dcat:Dataset
- subProperty Of: mlo:isPart
- proprietà inversa: contains

### has
- descrizione: proprietà che mette in relazione un record con gli elementi sensibili che contiene
- dominio: Record
- range: SensibleThing
- subProperty Of: hasPart
- proprietà inversa: locatedIn

### locatedIn
- descrizione: proprietà che mette un elemento sensibile col record a cui appartiene
- dominio: SensibleThing
- range: Record
- subProperty Of: mlo:isPart
- proprietà inversa: has

### identifiedBy
- descrizione: proprietà che mette in relazione un elemento sensibile con l'elemento che lo ha classificato come tale. Nel nostro dominio non viene mai utilizzata direttamente ma solamente come "interfaccia" per le subProperties.
- dominio: owl:Thing
- range: owl:Thing
- proprietà inversa: identifies

### identifiedByPerson
- descrizione: proprietà che mette in relazione un elemento sensibile con la persona che lo ha classificato come tale
- dominio: Record
- range: foaf:Person
- subProperty Of: identifiedBy
- proprietà inversa: identifies

### identifiedByMLTechnique
- descrizione: proprietà che mette in relazione un elemento sensibile con l'algoritmo di Machine Learing che lo ha classificato come tale
- dominio: Record
- range: mlo:Applications
- subProperty Of: identifiedBy
- proprietà inversa: identifies

### identifies
- descrizione: proprietà che mette in relazione una persona o un algoritmo di machine learning con gli elementi che ha classificato come sensibili
- dominio: foaf:Person, mlo:Applications
- range: SensibleThing
- proprietà inversa: identifiedBy

### represents
- descrizione: proprietà funzionale che mette in relazione un elemento sensibile col soggetto che esso rappresenta
- dominio: SensibleThing
- range: owl:Thing
- proprietà inversa: isRepresentedAs

### isRepresentedAs
- descrizione: proprietà che mette in relazione un'entità con l'elemento di un record che la rappresenta
- dominio: owl:Thing
- range: SensibleThing
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

### mlo:isPart
- descrizione: proprietà dell'ontologia mlo, è l'inversa di hasPart ed è stata modificata in modo da essere transitiva
- dominio: owl:Thing
- range: owl:Thing
- proprietà inversa: hasPart

## Ontologie esterne
Sulla base delle entità individuate sono state importate alcune ontologie esterne:
- DCAT (Data Catalog Vocabulary): vocabolario designato per descrivere cataloghi, dataset e dataservice. Utilizzato per modellare le sorgenti dei dati da anonimizzare.
- MLO (Machine Learning Ontology): ontologia che descrive tutto il dominio di machine learning. Utilizzata per descrivere eventuali tecniche di machine learning mediante le quali identificare gli identificatori diretti/indiretti.
- FOAF (Friend Of A Friend): ontologia atta a descrivere persone, organizzazioni, le loro caratteristiche e le relazioni con altre persone. Utilizzata per referenziare i dati individuati riguardanti persone/organizzazioni.
