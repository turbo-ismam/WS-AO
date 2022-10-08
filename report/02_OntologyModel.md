# Modellazione dell'Ontologia

## Classi modellate

Column
	isDirectIdentifier
	isInDirectIdentifier
	identificationRisk
	
AnonymizedDataset
	AnonymizedColumn
		AnonymizationTechnique
	AnonymizedRecord
	isPseudoAnonymize

## Object-Properties modellate

SourceFile -reFormattedAs-> Dataset

Dataset -hasPart-> Column
Dataset -hasPart-> Record
Record -isPartOf-> Dataset

Dataset -anonymizedAs-> AnonymiziedDataset
AnonymizedDataset -hasPart-> AnonymizedColumn
AnonymizedDataset -hasPart-> AnonymizedRecord

## Ontologie esterne
Sulla base delle entità individuate sono state importate alcune ontologie esterne:
- FOAF (Friend Of A Friend): ontologia atta a descrivere persone, con le loro attività e le relazioni con altre persone e oggetti. Utilizzata per modellare i dati di persone/organizzazioni.
- DCAT (Data Catalog Vocabulary): vocabolario designato per descrivere cataloghi, dataset e dataservice. Utilizzato per modellare le sorgenti dei dati da anonimizzare.
