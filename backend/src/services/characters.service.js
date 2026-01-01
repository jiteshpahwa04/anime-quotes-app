import axios from "axios"

export const findQuotesForCharacters = async (characters, numberOfQuotes = 10) => {
    const url = `https://yurippe.vercel.app/api/quotes?character=${characters}&random=${numberOfQuotes}`

    const response = await axios.request({
        url
    });

    return response.data;
}