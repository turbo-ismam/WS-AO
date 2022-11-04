import { MLResponse } from '../models/MLResponse'

export function getAnonymizedRecord(record: string, sensitiveThings: MLResponse[]) {
    sensitiveThings.forEach((el)=>
        record = record.slice(0, el.start) + "****" + record.slice(el.end, record.length)
    )
    return record
}