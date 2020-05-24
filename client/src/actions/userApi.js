import axios from "axios";

const baseUrl = 'http://localhost:3500/'

export default {

    user(url = baseUrl + 'user/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            email: msg => axios.post(url+"/email", msg),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

}