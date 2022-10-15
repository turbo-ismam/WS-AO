# Modellazione dell'Ontologia

## Classi modellate

### identifiedDataset
Entità che rappresenta un Dataset al quale sono state aggiunte le informazioni riguardanti gli identificatori diretti/indiretti, partendo da una sorgente rappresentata da un dcat:Dataset.
È implementata come sottoclasse di dcat:Dataset e viene utilizzata come dominio per la object property hasColumn per individuare le relative Column.

**Attributi e associazioni**
- ao:usedTechnique (mlo:Applications): relazione atta a rappresentare un'eventuale tecnica di machine learning utilizzata per classificare la colonna come identificatore

### column
Entità che rappresenta la colonna di un dcat:Dataset. Tale colonna è già stata elaborata a mano o mediante una tecnica di Machine Learning pertanto è già marcata come identificatore diretto o indiretto.

**Attributi e associazioni**
- isDirectIdentifier (boolean): attributo booleano atto a etichettare la colonna come identificatore diretto 
- isIndirectIdentifier (boolean): attributo booleano atto a etichettare la colonna come identificatore indiretto
- identificationRisk (float): attributo float atto a misurare il grado di rischio della colonna, in percentuale

### anonymizedDataset
Entità che rappresenta un dataset alle cui colonne è stata applicata una ao:anonymizationTechnique. 
È implementata come sottoclasse di dcat:Dataset e viene utilizzata come dominio per la object property hasColumn per individuare le relative column. Tramite la object property anonymizedAs l'ao:Dataset viene anonimizzato in un ao:anonymizedDataset. Non tutte le colonne dell'ao:anonymizedDataset devono essere anonimizzate, ma deve contenere almeno una anonymizedColumn.

**Attributi e associazioni**
- hasColumn (column): relazione atta ad individuare le colonne del dataset anonimizzato

### anonymizedColumn
Entità che rappresenta una colonna di un ao:anonymizedDataset che è stata anonimizzata mediante una anonymizationTechnique. È implementata come sottoclasse di ao:column.

**Attributi e associazioni**
- anonymizedBy (ao:anonymizationTechnique): tecnica di anonimizzazione utilizzata per anonimizzare la column

### anonymizationTechnique
Entità che rappresenta la tecnica di anonimizzazione che può essesre applicata ad una ao:column.

## Object-Properties modellate

### hasColumn
- descrizione: proprietà che mette in relazione un Dataset con le relative colonne
- dominio: dcat:Dataset
- range: ao:column
- proprietà inversa: isColumnOf

### isColumnOf
- descrizione: proprietà che mette in relazione una colonna col relativo Dataset
- dominio: ao:column
- range: dcat:Dataset
- caratteristiche: è una proprietà inverse functional in quanto una colonna è relativa ad un solo Dataset
- proprietà inversa: hasColumn

### usedTechnique
- descrizione: proprietà che mette in relazione un identifiedDataset con l'eventuale tecnica di Machine Learning utilizzata per categorizzare le colonne
- dominio: ao:identifiedDataset
- range: mlo:Applications
- proprietà inversa: usedBy

### usedBy
- descrizione: proprietà che mette in relazione un mlo:Applications, ossia una tecnica di machine learning, con un'eventuale Dataset al quale è stata applicata 
- dominio: mlo:Applications
- range: ao:identifiedDataset
- proprietà inversa: usedTechnique

### identifiedAs
- descrizione: proprietà che mette in relazione un dcat:Dataset con la sua controparte le cui colonne sono state categorizzate in identificatori diretti/indiretti
- dominio: dcat:Dataset
- range: ao:identifiedDataset
- proprietà inversa: identifiedFrom

### identifiedFrom
- descrizione: proprietà che mette in relazione un ao:identifiedDataset col dcat:Dataset dal quale è stato ricavato
- dominio: ao:identifiedDataset
- range: dcat:Dataset
- caratteristiche: è una proprietà inverse functional in quanto il dcat:Dataset dal quale è stato ricavato l'ao:identifiedDataset può essere uno solo
- proprietà inversa: identifiedAs

### anonymizedBy
- descrizione: proprietà che mette in relazione un ao:anonymizedColumn con la relativa tecnica di anonimizzazione utilizzata
- dominio: ao:anonymizedColumn
- range: ao:anonymizationTechnique
- proprietà inversa: anomyzes

### anomyzes
- descrizione: proprietà che mette in relazione un ao:anonymizationTechnique con tutte le colonne alle quali è stata applicata
- dominio: ao:anonymizationTechnique
- range: ao:anonymizedColumn
- proprietà inversa: anonymizedBy

## Ontologie esterne
Sulla base delle entità individuate sono state importate alcune ontologie esterne:
- DCAT (Data Catalog Vocabulary): vocabolario designato per descrivere cataloghi, dataset e dataservice. Utilizzato per modellare le sorgenti dei dati da anonimizzare.
- MLO (Machine Learning Ontology): ontologia che descrive tutto il dominio di machine learning. Utilizzata per descrivere eventuali tecniche di machine learning mediante le quali identificare gli identificatori diretti/indiretti.
- FOAF (Friend Of A Friend): ontologia atta a descrivere persone, organizzazioni, le loro caratteristiche e le relazioni con altre persone. Utilizzata per referenziare i dati individuati riguardanti persone/organizzazioni.
- Location Ontology (ArCo network): ontologia atta a descrivere luoghi geografici. Utilizzata per referenziare i dati individuati riguardanti luoghi. 
