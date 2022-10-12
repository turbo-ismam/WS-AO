# Modellazione dell'Ontologia

## Classi modellate

### identifiedDataset
Entità che rappresenta un Dataset al quale sono state aggiunte le informazioni riguardanti gli identificatori diretti/indiretti.
È implementata come sottoclasse di dcat:Dataset e viene utilizzata come dominio per la object-property hasPart per individuare le Column del Dataset.

**Attributi e associazioni**
-ao:usedTechnique (mlo:Applications): relazione atta a rappresentare un'eventuale tecnica di machine learning utilizzata per classificare la la colonna come identificatore

### Column


## Object-Properties modellate

## Ontologie esterne
Sulla base delle entità individuate sono state importate alcune ontologie esterne:
- DCAT (Data Catalog Vocabulary): vocabolario designato per descrivere cataloghi, dataset e dataservice. Utilizzato per modellare le sorgenti dei dati da anonimizzare.
- MLO (Machine Learning Ontology): ontologia che descrive tutto il dominio di machine learning. Utilizzata per descrivere eventuali tecniche di machine learning mediante le quali identificare gli identificatori diretti/indiretti.
