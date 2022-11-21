# Descrizione delle query

In questo capitolo verranno riportate alcune query per l'estrazione di dati, scritte in linguaggio SPARQL.
Il codice delle query che susseguono possono essere visualizzate ed eseguite sull'applicativo.

* **Dato un Dataset, lista Record inseriti**
```
SELECT ?record ?text
FROM ${from}
WHERE {
    ?record
        a ao:Record ;
        ao:text ?text ;
        ao:isContainedIn ${dataset}.
}
```
* **Dato un Dataset, lista Record Anonimizzati**
```
SELECT ?record ?text
FROM ${from}
WHERE {
    ?record
        a ao:Record ;
        ao:text ?text ;
        ao:isContainedIn ${anonymizedDS}.
}
```
* **Dato un dataset, numero di record sensibili e non sensibili**
```
SELECT (COUNT(?record) as ?NotSensibleRecords) (COUNT(?recordSens) as ?SensibleRecords)
FROM ${from}
WHERE {
    {
    ?record
        a ao:Record ;
        ao:isContainedIn ${dataset}.
        MINUS {?record ao:has ?sens}
    } UNION {
    ?recordSens
        a ao:Record ;
        ao:has ?sens;
        ao:isContainedIn ${dataset}.
    }
}
```

* **Dato un dataset, tutte le organizzazioni menzionate**
* La query utilizza il reasoner per il Property chain della Object property isPart 
```
SELECT ?name
FROM ${from}
WHERE {
    ?org
        a foaf:Organization ;
        foaf:name ?name ;
        ao:isRepresentedAs ?thing .
    ?thing
        mlo:isPart ${dataset} .
}
```

* **Dato un dataset anonimizzato, le tecniche usate per anonimizzarlo**
```
SELECT ?techniqueName ?techniqueDescription
FROM ${from}
WHERE {
    ?technique
        a ao:AnonymizationTechnique ;
        ao:name ?techniqueName;
        ao:description ?techniqueDescription;
        ao:usedFor ${anonymizedDS}.
}
```

## Creare un Dataset
```
PREFIX dcat: <https://www.w3.org/TR/vocab-dcat-2/>
        INSERT DATA {
            GRAPH <https://github.com/turbo-ismam/WS-AO/> {
                <#DS_${newID}> 
                    a dcat:Dataset .
            }
        }
```

## Creare un Record
```
PREFIX dcat: <https://www.w3.org/TR/vocab-dcat-2/>
        INSERT DATA {
            GRAPH <https://github.com/turbo-ismam/WS-AO/> {
                <${record.id}>
                    a ao:Record ;
                    ao:text "${record.text}" ;
                    ao:isContainedIn <${StardogPrefix(record.dataset)}> .
                <${StardogPrefix(record.dataset)}>
                    ao:contains <${StardogPrefix(record.id)}> .
            }
        }
```

## Aggiungere una Sensitive Thing
```
INSERT DATA {
            GRAPH <https://github.com/turbo-ismam/WS-AO/> {
                <${sensitiveThing.id}>
                    a ao:SensitiveThing ;
                    ao:text "${sensitiveThing.text}" ;
                    ao:position ${sensitiveThing.position} ;
                    ao:locatedIn <${StardogPrefix(sensitiveThing.record)}> ;
                    ${sensitiveThing.represents ? "ao:represents <" + sensitiveThing.represents + "> ;" : ""}
                    ao:identifiedByMLTechnique <http://www.a2rd.net.br/mlo#Text_Classification> .
                <http://www.a2rd.net.br/mlo#Text_Classification>
                    ao:identifies <${StardogPrefix(sensitiveThing.id)}> .
                <${StardogPrefix(sensitiveThing.record)}>
                    ao:has <${StardogPrefix(sensitiveThing.id)}> .
                ${sensitiveThing.represents ? "<" + sensitiveThing.represents + "> ao:isRepresentedAs <" + StardogPrefix(sensitiveThing.id) + "> .": ""}
            }
        }
```

## Creare un Dataset Anonimizzato
```
PREFIX dcat: <https://www.w3.org/TR/vocab-dcat-2/>
        INSERT DATA {
            GRAPH <https://github.com/turbo-ismam/WS-AO/> {
                <${anonymizedDataset.id}>
                    a ao:AnonymizedDataset ;
                    ao:usedTechnique <${StardogPrefix(anonymizedDataset.technique)}> ;
                    ao:anonymizedFrom <${StardogPrefix(anonymizedDataset.dataset)}> .
                <${anonymizedDataset.dataset}>
                    ao:anonymizedAs <${StardogPrefix(anonymizedDataset.id)}> .               
                <${anonymizedDataset.technique}>
                    ao:usedFor <${StardogPrefix(anonymizedDataset.id)}> .
            }
        }
```
