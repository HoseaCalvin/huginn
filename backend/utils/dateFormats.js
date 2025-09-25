export const dateOfBirthFormat = (dob) => {
    return new Date(dob).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });        
}

export const internationalFormat = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    })
}