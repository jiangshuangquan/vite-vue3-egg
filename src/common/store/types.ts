import { modules } from '../../store'

type Keys = keyof typeof modules

export type Getters = {
    [key in Keys]: typeof modules[key]['getters']
}

type VuexKeys = 'mutations' | 'actions'

type PayloadMap<VuexKey extends VuexKeys> = {
    [key in Keys]: {
        [subKey in keyof typeof modules[key][VuexKey]]: typeof modules[key][VuexKey][subKey] extends (
            ...args: infer P
        ) => any
            ? P[1]
            : void
    }
}

type CombinedType<
    ModuleName extends string,
    Key extends string
> = `${ModuleName}/${Key}`

export type VuexFunc<VuexKey extends VuexKeys> = <
    K extends Keys,
    S extends keyof PayloadMap<VuexKey>[K]
>(
    ...params: undefined extends PayloadMap<VuexKey>[K][S]
        ?
              | [CombinedType<K, S extends string ? S : never>]
              | [
                    CombinedType<K, S extends string ? S : never>,
                    PayloadMap<VuexKey>[K][S]
                ]
        : PayloadMap<VuexKey>[K][S] extends void
        ? [CombinedType<K, S extends string ? S : never>]
        : [CombinedType<K, S extends string ? S : never>, PayloadMap<VuexKey>[K][S]]
) => void
