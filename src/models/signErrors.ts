enum SignErrors {
    MobileAuth = 1,
    EmailAuth,
    WrongUserPass,
    CodeExpire,
    WrongCode,
    NoUserFound,
    Success,
    UserExists,
    PassFormatNotMatched,
    TokenFailed
}

export{
    SignErrors
}