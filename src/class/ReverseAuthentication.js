const ConfigMap = require('./ConfigMap'),
    axios = require('axios')

class ReverseAuthentication extends ConfigMap {

    constructor () {
        super()
    }

    async login ({ metaData, expires, token }) {
        try {
            if((!expires || typeof expires !== 'number')) expires = 900

            const axiosInstance = axios

            const resp = await axiosInstance.post(`${this.getApiURL()}/v1/auth/reverse`,  {
                meta_data: !metaData ? { roles: [] } : metaData,
                expires,
                token
            }, {
                headers: {
                    'Authorization': `Bearer ${this.getSecretToken()}`
                }
            })

            if(resp.status === 401) throw 'The Secret Token is wrong'
            
            const { data } = resp.data

            return data
        } catch (error) {
            return error
        }
    }

    async logout ({ token }) {
        try {
            const axiosInstance = axios

            const resp = await axiosInstance.delete(`${this.getApiURL()}/v1/auth/reverse?token=${token}`,  {}, {
                headers: {
                    'Authorization': `Bearer ${this.getSecretToken()}`
                }
            })

            if(resp.status === 401) throw 'The Secret Token is wrong'
            
            const { data } = resp.data

            return data
        } catch (error) {
            return error
        }
    }

}

module.exports = ReverseAuthentication