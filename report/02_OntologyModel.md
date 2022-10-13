# Modellazione dell'Ontologia

## Classi modellate

### anonymizedDataset
Entità che rappresenta un dataset alle cui colonne è stata applicata una ao:anonymizationTechnique. 
È implementata come sottoclasse di dcat:Dataset e viene utilizzata come dominio per la object-property hasPart per individuare le relative anonymizedColumn. È inoltre range della 

**Attributi e associazioni**

### anonymizationTechnique
Tecnica di anonimizzazione applicabile ad una ao:column.

### column
Entità che rappresenta la colonna di un dcat:Dataset. Tale colonna è già stata elaborata a mano o mediante una tecnica di Machine Learning pertanto è già marcata come identificatore diretto o indiretto.

**Attributi e associazioni**
- isDirectIdentifier (boolean): attributo booleano atto a etichettare la colonna come identificatore diretto 
- isIndirectIdentifier (boolean): attributo booleano atto a etichettare la colonna come identificatore indiretto
- identificationRisk (float): attributo float atto a misurare il grado di rischio della colonna, in percentuale

### identifiedDataset
Entità che rappresenta un Dataset al quale sono state aggiunte le informazioni riguardanti gli identificatori diretti/indiretti.
È implementata come sottoclasse di dcat:Dataset e viene utilizzata come dominio per la object-property hasPart per individuare le relative Column.

**Attributi e associazioni**
- ao:usedTechnique (mlo:Applications): relazione atta a rappresentare un'eventuale tecnica di machine learning utilizzata per classificare la colonna come identificatore


## Object-Properties modellate

## Ontologie esterne
Sulla base delle entità individuate sono state importate alcune ontologie esterne:
- DCAT (Data Catalog Vocabulary): vocabolario designato per descrivere cataloghi, dataset e dataservice. Utilizzato per modellare le sorgenti dei dati da anonimizzare.
- MLO (Machine Learning Ontology): ontologia che descrive tutto il dominio di machine learning. Utilizzata per descrivere eventuali tecniche di machine learning mediante le quali identificare gli identificatori diretti/indiretti.
