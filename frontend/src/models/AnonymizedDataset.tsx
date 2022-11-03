import { DcatDataset } from "./DcatDataset"

export interface AnonymizedDataset extends DcatDataset {
    dataset: string,
    technique: string,
}