export const signup = async(req, res )=>{
    try {
        const {fullname, username, password, comfirmPassword, gender} = req.body;
    } catch (error) {
        
    }
}
export const login = (req, res )=>{
    res.send('login')
}
export const logout = (req, res )=>{
    res.send('logout')
}
