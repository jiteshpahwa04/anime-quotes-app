import axios from "axios"

export const findQuotesForShows = async (shows, numberOfQuotes = 10) => {
    const url = `https://yurippe.vercel.app/api/quotes?show=${shows}&random=${numberOfQuotes}`

    const response = await axios.request({
        url
    });

    return response.data;
}