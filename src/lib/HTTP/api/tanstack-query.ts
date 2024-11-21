import { QueryClient, useMutation } from '@tanstack/react-query'

import { ExtractValueByKey } from '../../utils/typeUtils'
import { Login, Register, Unregister } from './auth/api'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 0,
      // 10분으로 staleTime 지정하기
      staleTime: 1 * 60 * 1000 * 10,
    },
    mutations: {
      retry: 1,
      retryDelay: 0,
    },
  },
})

/*
 * Mutation Keys to use Mutations convenient
 */
export const MUTATION_KEYS = {
  AUTH: {
    LOGIN: {
      key: ['login'],
      function: Login,
    },
    REGISTER: {
      key: ['register'],
      function: Register,
    },
    UNREGISTER: {
      key: ['unregister'],
      function: Unregister,
    },
  },
} as const

/**
 * data: mutate return value
 * variables: mutate 인자
 */
/**
 * 프로젝트 전반적인 로직에 필요한  Mutation 설정을 다룹니다.
 * 컴포넌트 내부 필요 로직은 useMutation의 return 값인 mutation의 options를 사용해주세요
 */
// User
queryClient.setMutationDefaults(MUTATION_KEYS.AUTH.LOGIN.key, {
  mutationFn: MUTATION_KEYS.AUTH.LOGIN.function,
  onSuccess(data, variables, context) {
    // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.PLANS.INDEX })
  },
})
queryClient.setMutationDefaults(MUTATION_KEYS.AUTH.REGISTER.key, {
  mutationFn: MUTATION_KEYS.AUTH.REGISTER.function,
  onSuccess(data, variables, context) {
    // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.PLANS.INDEX })
  },
})
queryClient.setMutationDefaults(MUTATION_KEYS.AUTH.UNREGISTER.key, {
  mutationFn: MUTATION_KEYS.AUTH.UNREGISTER.function,
  onSuccess(data, variables, context) {
    // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.PLANS.INDEX })
  },
})
export type MutationKeyType = ExtractValueByKey<typeof MUTATION_KEYS, 'key'>

export const useMutationStore = <T>(mutationKey: MutationKeyType) => {
  return useMutation<unknown, Error, T, unknown>({ mutationKey })
}
