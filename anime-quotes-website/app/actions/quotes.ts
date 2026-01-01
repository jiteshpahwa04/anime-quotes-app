"use server";

import axios from "axios";

export async function getQuotesByCharacter(characters: string, count: number) {
  const response = await axios.post(
    "http://localhost:3000/api/v1/quotes/character",
    {
      characters,
      numberOfQuotes: count,
    }
  );

  return response.data.data;
}

export async function getQuotesByShow(shows: string, count: number) {
  const response = await axios.post(
    "http://localhost:3000/api/v1/quotes/show",
    {
      shows,
      numberOfQuotes: count,
    }
  );

  return response.data.data;
}
