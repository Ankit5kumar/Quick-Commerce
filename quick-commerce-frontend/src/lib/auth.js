export const setToken = (token)=>{
    if(typeof window!=='undefined'){
        localStorage.setItem("token",token);
    }
};

export const gettoken = () =>{
    if(typeof window!=="undefined"){
        return localStorage.getItem("token");
    }
    return null;
};
export const logout = () =>{
    if(typeof window!=="undefined"){
        return localStorage.getItem("token");
    }
    return null;
};