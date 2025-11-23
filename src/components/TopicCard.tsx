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
    <div className="topic-card">
      <div className="gradient-header p-0.5">
        <div className="bg-white dark:bg-gray-800 p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{topic.title}</h2>
              <span className="inline-block text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                {topic.category}
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 border-b-2 border-blue-200 dark:border-blue-800 pb-2">
                {topic.left.title}
              </h3>
              <ul className="space-y-3">
                {topic.left.points.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-0.5 flex-shrink-0">•</span>
                    <span className="text-gray-900 dark:text-gray-100">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Sources:</p>
                <div className="space-y-1">
                  {topic.left.sources.map((src, i) => (
                    <a
                      key={i}
                      href={`https://${src}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 group"
                    >
                      {src} <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-red-600 dark:text-red-400 border-b-2 border-red-200 dark:border-red-800 pb-2">
                {topic.right.title}
              </h3>
              <ul className="space-y-3">
                {topic.right.points.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-red-500 mr-3 mt-0.5 flex-shrink-0">•</span>
                    <span className="text-gray-900 dark:text-gray-100">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Sources:</p>
                <div className="space-y-1">
                  {topic.right.sources.map((src, i) => (
                    <a
                      key={i}
                      href={`https://${src}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 flex items-center gap-1 group"
                    >
                      {src} <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
