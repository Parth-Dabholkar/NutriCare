export const test = (req, res) => {
    res.send("HELLO TO THE TEST ROUTE")
}

export const signout = (req, res, next) => {
    try{
        res.clearCookie('access_token').status(200).json("User has been signed out")
    }
    catch(err)
    {
        next(err)
    }
}