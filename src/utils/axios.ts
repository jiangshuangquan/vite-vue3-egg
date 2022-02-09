// http.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export interface ResponseData<T = any> {
    code: number
    result: T
    message: string
}
// 错误状态码信息
export const ERROR_CODE_MESSAGE = {
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求是不存在的记录，服务器没有进行操作。',
    406: '请求的格式有误，无法接受。',
    410: '请求的资源被永久删除，且不会再得到。',
    500: '服务器遇到错误，无法完成请求。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
}

const axiosInstance = axios.create({
    // 联调
    baseURL: process.env.NODE_ENV === 'production' ? '/' : '/nodeApi',
    // 是否跨站点访问控制请求
    withCredentials: true,
    timeout: 30000
})

// 请求拦截器
axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 获取token，并将其添加至请求头中
        // let token = localStorage.getItem('token')
        // if (token) {
        //     config.headers.Authorization = `${token}`;
        // }
        return config
    },
    (error) => {
        // 错误抛到业务代码
        error.data = {}
        error.data.msg = '服务器异常，请联系管理员！'
        return Promise.resolve(error)
    }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
    (response: AxiosResponse<ResponseData>) => {
        const { code } = response.data
        // 请求返回状态码  rc==0代表业务接口成功 其他均为业务接口请求失败
        if (code && code !== 0) {
            ElMessage.error(response.data.message)
        }
        return response
    },
    (error) => {
        if (axios.isCancel(error)) {
            console.log('repeated request: ' + error.message)
        } else {
            const originalRequest = error.config
            // 网络不可用
            if (error.message === 'Network Error') {
                ElMessage.error('网络不可用，请检查网络！！！')
            }
            // 超时处理
            else if (
                error.code === 'ECONNABORTED' &&
                error.message.indexOf('timeout') !== -1 &&
                !originalRequest._retry
            ) {
                ElMessage.error('请求超时，请稍后重试！！！')
            } else {
                // 响应错误处理
                const errorText =
                    ERROR_CODE_MESSAGE[error.response.status] ||
                    error.response.statusText
                ElMessage.error(errorText)
            }
            return Promise.reject(new Error(error))
        }
        return Promise.reject(error)
    }
)

export const service = {
    get: <T>(url: string) => {
        return axiosInstance.get<ResponseData<T>>(url).then((response) => response.data)
    },
    post: <T, Extra = Record<string, never>>(url: string, data: any) => {
        return axiosInstance
            .post<ResponseData<T> & Extra>(url, data)
            .then((response) => response.data)
    },
    put: <T, Extra = Record<string, never>>(url: string, data: any) => {
        return axiosInstance
            .put<ResponseData<T> & Extra>(url, data)
            .then((response) => response.data)
    }
}

export default axiosInstance
