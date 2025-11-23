tsx

import TopicCard from "@/components/TopicCard";
import topics from "@/data/topics.json";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Both Sides</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          The strongest arguments from left and right — clearly presented, no spin.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
