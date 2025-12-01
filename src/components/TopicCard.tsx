// src/components/TopicCard.tsx
import Link from "next/link";
import { ExternalLink } from "lucide-react";

type ThreadTurn = {
  side: "left" | "right";
  text: string;
  sources?: { name: string; url: string }[];
};

type Argument = {
  id: string;
  left: string;
  right: string;
  thread: ThreadTurn[];
};

type Topic = {
  id: number;
  title: string;
  category: string;
  left: { title: string; points: string[]; sources: string[] };
  right: { title: string; points: string[]; sources: string[] };
  arguments?: Argument[];
  votes: { left: number; right: number };
};

export default function TopicCard({ topic }: { topic: Topic }) {
  const args = topic.arguments || [];

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
              <ul className="space-y-4">
                {topic.left.points.map((point, i) => {
                  const arg = args.find(a => a.left === point);
                  const isClickable = !!arg;
                  const Content = (
                    <li className={`flex items-start transition-all ${isClickable ? 'hover:bg-blue-50 dark:hover:bg-blue-900/20 p-3 -m-3 rounded-lg cursor-pointer' : ''}`}>
                      <span className="text-blue-500 mr-3 mt-0.5 flex-shrink-0">•</span>
                      <span className="text-gray-900 dark:text-gray-100">{point}</span>
                    </li>
                  );
                  return isClickable ? (
                    <Link key={i} href={`/debate/${topic.id}/${arg.id}?side=left`}>
                      {Content}
                    </Link>
                  ) : (
                    <div key={i}>{Content}</div>
                  );
                })}
              </ul>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Sources:</p>
                <div className="space-y-1">
                  {topic.left.sources.map((src, i) => (
                    <a key={i} href={`https://${src}`} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                      {src} <ExternalLink className="w-3 h-3" />
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
              <ul className="space-y-4">
                {topic.right.points.map((point, i) => {
                  const arg = args.find(a => a.right === point);
                  const isClickable = !!arg;
                  const Content = (
                    <li className={`flex items-start transition-all ${isClickable ? 'hover:bg-red-50 dark:hover:bg-red-900/20 p-3 -m-3 rounded-lg cursor-pointer' : ''}`}>
                      <span className="text-red-500 mr-3 mt-0.5 flex-shrink-0">•</span>
                      <span className="text-gray-900 dark:text-gray-100">{point}</span>
                    </li>
                  );
                  return isClickable ? (
                    <Link key={i} href={`/debate/${topic.id}/${arg.id}?side=right`}>
                      {Content}
                    </Link>
                  ) : (
                    <div key={i}>{Content}</div>
                  );
                })}
              </ul>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Sources:</p>
                <div className="space-y-1">
                  {topic.right.sources.map((src, i) => (
                    <a key={i} href={`https://${src}`} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-red-600 dark:text-red-400 hover:underline flex items-center gap-1">
                      {src} <ExternalLink className="w-3 h-3" />
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
