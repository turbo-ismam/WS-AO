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



