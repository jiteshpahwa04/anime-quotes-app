import { findQuotesForCharacters } from "../services/characters.service.js";
import { findQuotesForShows } from "../services/shows.service.js";

export const getQuotesByCharactersHandler = async (req, res) => {
    const { characters, numberOfQuotes } = req.body;
    const quotes = await findQuotesForCharacters(characters, numberOfQuotes);
    res.status(200).json({
        success: true,
        message: "Quotes fetched successfully",
        data: quotes
    });
}

export const getQuotesByShowsHandler = async (req, res) => {
    const { shows, numberOfQuotes } = req.body;
    const quotes = await findQuotesForShows(shows, numberOfQuotes);
    res.status(200).json({
        success: true,
        message: "Quotes fetched successfully",
        data: quotes
    });
}