export const emailValidator = function(email)
{
    //gmail.check
    let size = email.length;
    if(size < 11) {return false}
    else{
        return (email.substring(size - 10) === "@gmail.com");
    }
}

export const dateOfBirthValidator = function(date)
{
    return true;
}

export const passwordValidator = function(password)
{
    return true;
}

export const phoneNumberValidator = function(number)
{
    return (number.length === 10);
}

//helper (await in usage must)
export const enchrypt = async(password) => {
    return password;
}