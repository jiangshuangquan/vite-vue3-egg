import { Getters, VuexFunc } from './types'
import { useStore } from '../../store'

// 对于store的再次封装，让其有ts提示
export const useOwnStore = () => {
    const store = useStore()
    return store
}

export const useGetter = () => {
    const store = useOwnStore()
    return store.getters as Getters
}

export const useDispatch = () => {
    const store = useOwnStore()
    const dispatch: VuexFunc<'actions'> = (type, payload?) => {
        store.dispatch(type, payload)
    }
    return dispatch
}

export const useCommit = () => {
    const store = useOwnStore()
    const commit: VuexFunc<'mutations'> = (type, payload?) => {
        store.commit(type, payload)
    }

    return commit
}
