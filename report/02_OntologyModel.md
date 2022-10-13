# Modellazione dell'Ontologia

## Classi modellate

### identifiedDataset
Entità che rappresenta un Dataset al quale sono state aggiunte le informazioni riguardanti gli identificatori diretti/indiretti.
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
- anonymizedBy (anonymizationTechnique): tecnica di anonimizzazione utilizzata per anonimizzare la column

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

## Ontologie esterne
Sulla base delle entità individuate sono state importate alcune ontologie esterne:
- DCAT (Data Catalog Vocabulary): vocabolario designato per descrivere cataloghi, dataset e dataservice. Utilizzato per modellare le sorgenti dei dati da anonimizzare.
- MLO (Machine Learning Ontology): ontologia che descrive tutto il dominio di machine learning. Utilizzata per descrivere eventuali tecniche di machine learning mediante le quali identificare gli identificatori diretti/indiretti.
