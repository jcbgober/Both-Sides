"use client";
import { useState } from "react";
import topicsData from "../data/topics.json";
import TopicCard from "../components/TopicCard";

type Topic = typeof topicsData[number];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const allTopics = topicsData as Topic[];
  const categories = ["All", ...Array.from(new Set(allTopics.map(t => t.category)))];

  const filteredTopics = allTopics.filter(topic => {
  // Search inside every claim and rebuttal text
  const searchHaystack = topic.debate.rounds
    .flatMap(round => {
      const texts = [round.claim]
      if (round.rebuttal?.text) texts.push(round.rebuttal.text)
      if (round.rebuttal?.counterRebuttal?.text) texts.push(round.rebuttal.counterRebuttal.text)
      return texts.filter(Boolean) as string[]
    })
    .join(" ")
    .toLowerCase()

  const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    searchHaystack.includes(searchTerm.toLowerCase())

  const matchesCategory = selectedCategory === "All" || topic.category === selectedCategory
  return matchesSearch && matchesCategory
})
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
               <h1 className="text-6xl font-bold mb-4 inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent bg-[length:100%_100%]">
          Both Sides
</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Clear arguments from left and right — no spin, just facts.
        </p>
      </div>

      <div className="mb-8 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search topics or arguments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-blue-500 dark:focus:border-blue-400 transition-colors outline-none hover:border-blue-400 dark:hover:border-blue-500 "
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {categories.map(cat => (
          <button
  key={cat}
  onClick={() => setSelectedCategory(cat)}
  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200
    ${
      selectedCategory === cat
        ? 'bg-blue-600 text-white shadow-md ring-4 ring-blue-600/30'   // ← SELECTED: solid blue + white text + strong ring
        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 hover:shadow-sm'
    }`}
>
  {cat}
</button>
        ))}
      </div>

      <div className="grid gap-8">
        {filteredTopics.length > 0 ? filteredTopics.map(topic => (
          <TopicCard key={topic.id} topic={topic} />
        )) : (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
            No topics match your search.
          </p>
        )}
      </div>
    </div>
  );
}
