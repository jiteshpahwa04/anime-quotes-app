"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Quote, User, Tv, Sparkles, ArrowRight } from "lucide-react";
import { getQuotesByCharacter, getQuotesByShow } from "@/app/actions/quotes";

// Hardcoded lists as requested
const CHARACTERS = ["lelouch", "oscar jarjayes", "spike spiegel"];
const SHOWS = ["code geass", "rose of versailles", "violet evergarden"];

interface AnimeQuote {
  quote: string;
  character: string;
  show: string;
}

export function AnimeQuotes() {
  const [quotes, setQuotes] = React.useState<AnimeQuote[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [count, setCount] = React.useState(3);
  const [activeTab, setActiveTab] = React.useState<"character" | "show">(
    "character"
  );
  const [userCharacters, setUserCharacters] = React.useState(
    CHARACTERS.join(", ")
  );
  const [userShows, setUserShows] = React.useState(SHOWS.join(", "));

  const fetchQuotes = async (type: "character" | "show") => {
    setLoading(true);
    setQuotes([]); // Clear current quotes to show loading state clearly
    try {
      const data =
        type === "character"
          ? await getQuotesByCharacter(userCharacters, count)
          : await getQuotesByShow(userShows, count);
      setQuotes(data);
    } catch (error) {
      console.error("[v0] Action error:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetDefaults = () => {
    setUserCharacters(CHARACTERS.join(", "));
    setUserShows(SHOWS.join(", "));
    setCount(3);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex flex-col items-center justify-center border-b border-border overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 text-8xl font-serif rotate-12">
            ANIME
          </div>
          <div className="absolute bottom-20 right-10 text-8xl font-serif -rotate-12">
            WORDS
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-serif text-center mb-8 tracking-tighter text-balance">
          CASA <br /> <span className="italic">ANIME</span> <br /> QUOTES
        </h1>

        <p className="max-w-md text-center text-muted-foreground mb-12 text-balance leading-relaxed">
          Dedicated to the wisdom, culture, and growth found within the most
          iconic stories of our time.
        </p>

        <div className="flex gap-4">
          <Button
            variant={activeTab === "character" ? "default" : "outline"}
            onClick={() => setActiveTab("character")}
            className="rounded-full px-8 py-6 text-lg"
          >
            By Character
          </Button>
          <Button
            variant={activeTab === "show" ? "default" : "outline"}
            onClick={() => setActiveTab("show")}
            className="rounded-full px-8 py-6 text-lg"
          >
            By Show
          </Button>
        </div>
      </section>

      {/* Marquee/Ticker Inspired Section */}
      <div className="w-full py-4 border-b border-border bg-muted/30 overflow-hidden whitespace-nowrap">
        <div className="flex gap-8 animate-marquee">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <span
                key={i}
                className="flex items-center gap-2 uppercase text-xs tracking-widest font-bold"
              >
                <Sparkles className="w-3 h-3" /> STORYTELLING +++ WISDOM +++
                GROWTH +++ LEGACY
              </span>
            ))}
        </div>
      </div>

      {/* Controls & Results */}
      <section className="container max-w-5xl mx-auto py-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16">
          {/* Sidebar Controls */}
          <div className="space-y-12">
            <div>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-sm uppercase tracking-widest font-bold text-muted-foreground">
                  Preferences
                </h2>
                <Button
                  variant="link"
                  onClick={resetDefaults}
                  className="h-auto p-0 text-xs uppercase tracking-widest"
                >
                  Reset
                </Button>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="search-input" className="text-lg capitalize">
                    {activeTab === "character"
                      ? "Enter Characters"
                      : "Enter Shows"}
                  </Label>
                  <Input
                    id="search-input"
                    value={
                      activeTab === "character" ? userCharacters : userShows
                    }
                    onChange={(e) =>
                      activeTab === "character"
                        ? setUserCharacters(e.target.value)
                        : setUserShows(e.target.value)
                    }
                    placeholder={
                      activeTab === "character"
                        ? "e.g. Lelouch, Spike"
                        : "e.g. Code Geass, Cowboy Bebop"
                    }
                    className="bg-transparent border-t-0 border-x-0 border-b-2 border-primary rounded-none focus:ring-0 px-0 h-12 text-lg font-serif"
                  />
                  <p className="text-xs text-muted-foreground italic">
                    Separate multiple items with commas
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quote-count" className="text-lg">
                    Number of Quotes
                  </Label>
                  <Input
                    id="quote-count"
                    type="number"
                    min={1}
                    max={10}
                    value={count}
                    onChange={(e) =>
                      setCount(
                        Math.min(
                          10,
                          Math.max(1, Number.parseInt(e.target.value) || 1)
                        )
                      )
                    }
                    className="bg-transparent border-t-0 border-x-0 border-b-2 border-primary rounded-none focus:ring-0 px-0 h-12 text-2xl font-serif"
                  />
                  <p className="text-xs text-muted-foreground italic">
                    Maximum of 10 quotes per request
                  </p>
                </div>

                <Button
                  onClick={() => fetchQuotes(activeTab)}
                  disabled={loading}
                  className="w-full rounded-none py-8 text-xl font-serif group"
                >
                  {loading ? "Searching archives..." : `Fetch ${activeTab}s`}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            <div className="pt-8 border-t border-border">
              <h3 className="text-sm uppercase tracking-widest font-bold mb-4">
                Current Targets
              </h3>
              <div className="flex flex-wrap gap-2">
                {(activeTab === "character" ? userCharacters : userShows)
                  .split(",")
                  .filter((item) => item.trim() !== "")
                  .map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-muted rounded-full text-xs capitalize"
                    >
                      {item.trim()}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="space-y-8">
            {loading ? (
              Array(count)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-[100px] w-full" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                ))
            ) : quotes.length > 0 ? (
              quotes.map((quote, i) => (
                <div
                  key={i}
                  className="group border-b border-border pb-8 last:border-0"
                >
                  <div className="flex gap-4 items-start">
                    <Quote className="w-8 h-8 text-muted shrink-0 mt-1" />
                    <div className="space-y-4">
                      <p className="text-3xl md:text-4xl font-serif leading-tight italic tracking-tight">
                        "{quote.quote}"
                      </p>
                      <div className="flex items-center gap-6 text-sm">
                        <span className="flex items-center gap-2 font-bold uppercase tracking-widest">
                          <User className="w-4 h-4" /> {quote.character}
                        </span>
                        <span className="flex items-center gap-2 text-muted-foreground uppercase tracking-widest">
                          <Tv className="w-4 h-4" /> {quote.show}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed border-muted rounded-xl">
                <p className="text-muted-foreground font-serif text-xl italic text-center px-10">
                  Select your preference and fetch quotes to begin your journey
                  through the archives.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Accordion Info Section */}
      <section className="bg-card py-20">
        <div className="container max-w-3xl mx-auto px-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-2xl font-serif py-6">
                Our Philosophy
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-8">
                We believe that the stories we watch shape the people we become.
                These quotes are more than just lines from a script; they are
                the distilled wisdom of characters who have faced insurmountable
                odds.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-2xl font-serif py-6">
                The Characters
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-8">
                From the strategic brilliance of Lelouch Lamperouge to the
                melancholic cool of Spike Spiegel, we curate voices that
                resonate with truth and complexity.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-2xl font-serif py-6">
                The Shows
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-8">
                Code Geass, Rose of Versailles, and Cowboy Bebop represent the
                pinnacle of thematic storytelling in anime history.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-20 border-t border-border">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="text-[12rem] font-serif leading-none opacity-10 select-none">
            CASA
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-12 mt-12 text-sm uppercase tracking-widest font-bold">
            <div className="space-y-4">
              <p>Explore</p>
              <ul className="space-y-2 text-primary-foreground/60 font-normal">
                <li>Characters</li>
                <li>Series</li>
                <li>Legacy</li>
              </ul>
            </div>
            <div className="space-y-4">
              <p>Connect</p>
              <ul className="space-y-2 text-primary-foreground/60 font-normal">
                <li>Twitter / X</li>
                <li>Instagram</li>
                <li>Discord</li>
              </ul>
            </div>
            <div className="space-y-4">
              <p>Contact</p>
              <ul className="space-y-2 text-primary-foreground/60 font-normal">
                <li>archives@casanime.com</li>
                <li>Tokyo, Japan</li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-primary-foreground/10 w-full text-center text-[10px] uppercase tracking-[0.2em] opacity-50">
            © 2026 CASA ANIME QUOTES. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
