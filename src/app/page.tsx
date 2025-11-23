"use client";
import { useState } from "react";
import topicsData from "../data/topics.json";
import TopicCard from "../components/TopicCard";

type Topic = typeof topicsData[number];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const allTopics = topicsData as Topic[];
  const categories = ["All", ...new Set(allTopics.map(t => t.category))];

  const filteredTopics = allTopics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.left.points.some(p => p.toLowerCase().includes(searchTerm.toLowerCase())) ||
      topic.right.points.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
          Both Sides
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Clear arguments from left and right — no spin, just facts.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search topics or arguments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Topics Grid */}
      {filteredTopics.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
          {filteredTopics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
          No topics match your search. Try something else!
        </p>
      )}
    </div>
  );
}
