export function getUserData(){
    let users = JSON.parse(sessionStorage.getItem("user"));
  
    if(users){
        return users;
    }else{
        return undefined;
    }
}

export function setUserData(data){
    return sessionStorage.setItem('user', JSON.stringify(data));
}

export function clearUserData(){
    sessionStorage.removeItem('user');
}