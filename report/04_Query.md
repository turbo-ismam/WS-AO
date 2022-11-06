# Descrizione delle query

In questo capitolo verranno riportate alcune query per l'estrazione di dati, scritte in linguaggio SPAR-QL.
Il codice delle query che susseguono possono essere visualizzate ad eseguite sull'applicativo.

## Query senza reasoner

Le query in questa sotto sezione non necessitano del reasoner e sono semplici interrogazioni ...

* **Lista Record sensibili**
```
SELECT
  ?Record
FROM <https://wsao.ontology/>
WHERE {
  
}
```
* **Dato un dataset, trova tutti i record con elementi sensibili sensibili**
```
SELECT
  ?Record ?SensitiveThing
FROM <https://wsao.ontology/>
WHERE {
  ?Record 
    a ao:Record ;
    ao:isContainedIn "idDataset" ;
    ao:has ?SensitiveThing .
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

## Aggiungere un Sensitive Thing
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

## Verificare che un Sensitive Thing contenga un'Organizzazione
```

```

##
```

```

