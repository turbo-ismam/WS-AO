export interface StardogQueryOptions {
    reasoning: boolean
    limit: number
    offset: number
}

export const defaultOptions: StardogQueryOptions = {
    reasoning: false,
    limit: Number.MAX_SAFE_INTEGER,
    offset: 0
}

export interface StardogQueryResult {
    head: {
        vars: string[]
    }
    results: {
        bindings: unknown[]
    }
}