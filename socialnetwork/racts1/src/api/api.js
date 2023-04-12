import axios from "axios";
const instance =axios.create({
    withCredentials:true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers : {
        "API-KEY":"1cdf76fd-b55c-47f3-a1a7-7cb6d9227c89"
    }
});
export const authAPI ={
    login(email,password,rememberMe=false) {
        return instance.post('auth/login',{email,password,rememberMe}).then(response => response.data) 
    },
    logout() {
        return instance.delete('auth/login').then(response => response.data)
    }
}
export const userAPI ={
 getUsers(currentPage=1,pageSize=10) {

  return  instance.get(`users?page=${currentPage}&count=${pageSize}`
    )
    .then(response => response.data)
     
},


getAuth() {
    return instance.get('auth/me').then(response => response.data)
},
getUnfollow(id){
    return instance.delete(`follow/${id}`).then(response=>response.data)
},
getFollow(id){
    return instance.post(`follow/${id}`).then(response=>response.data)
}}
export const profileAPI ={
    getProfile(userId) {
        return instance.get(`profile/`+userId)
        .then(response=>response.data)
    },
 getStatus(userId) {
    return instance.get(`profile/status/`+userId)
        .then(response=>response.data)
 }   ,
 updateStatus(status) {
    return instance.put(`profile/status/`,{status:status})
        .then(response=>response.data)
 } 

}