import { ExternalLink } from "lucide-react";

type Topic = {
  id: number;
  title: string;
  category: string;
  left: { title: string; points: string[]; sources: string[] };
  right: { title: string; points: string[]; sources: string[] };
};

export default function TopicCard({ topic }: { topic: Topic }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-red-500 p-1">
        <div className="bg-white dark:bg-gray-800 p-6">
          <h2 className="text-3xl font-bold mb-2">{topic.title}</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">{topic.category}</span>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* Left side */}
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                {topic.left.title}
              </h3>
              <ul className="space-y-4">
                {topic.left.points.map((point, i) => (
                  <li key={i} className="flex">
                    <span className="text-blue-500 mr-3">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="text-sm font-medium mb-2">Sources:</p>
                {topic.left.sources.map((src, i) => (
                  <a
                    key={i}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    {src} <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right side */}
            <div className="border-l-4 border-red-500 pl-6">
              <h3 className="text-2xl font-semibold mb-4 text-red-600 dark:text-red-400">
                {topic.right.title}
              </h3>
              <ul className="space-y-4">
                {topic.right.points.map((point, i) => (
                  <li key={i} className="flex">
                    <span className="text-red-500 mr-3">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="text-sm font-medium mb-2">Sources:</p>
                {topic.right.sources.map((src, i) => (
                  <a
                    key={i}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
                  >
                    {src} <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
