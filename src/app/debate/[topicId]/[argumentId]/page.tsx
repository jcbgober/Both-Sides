// src/app/debate/[topicId]/[argumentId]/page.tsx
import topicsData from "@/data/topics.json";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function DebateThread({ params, searchParams }: { params: { topicId: string; argumentId: string }; searchParams: { side?: string } }) {
  const topic = topicsData.find(t => t.id === Number(params.topicId));
  if (!topic || !topic.arguments) notFound();

  const argument = topic.arguments.find(a => a.id === params.argumentId);
  if (!argument) notFound();

  const side = searchParams.side === "right" ? "right" : "left";
  const openingText = side === "left" ? argument.left : argument.right;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-block mb-8 text-blue-600 dark:text-blue-400 hover:underline">
          ← Back to topics
        </Link>
        <h1 className="text-4xl font-bold mb-6">{topic.title}</h1>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-10 border-l-8 border-purple-600">
          <p className="text-2xl italic leading-relaxed">“{openingText}”</p>
        </div>

        <div className="space-y-8">
          {argument.thread.map((turn, i) => (
            <div key={i} className={`flex ${turn.side === "left" ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-2xl p-6 rounded-2xl ${
                turn.side === "left"
                  ? "bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-600"
                  : "bg-red-100 dark:bg-red-900/30 border-r-4 border-red-600"
              }`}>
                <div className={`font-bold text-sm mb-2 ${turn.side === "left" ? "text-blue-800" : "text-red-800"}`}>
                  {turn.side === "left" ? topic.left.title : topic.right.title}
                </div>
                <p className="text-lg">{turn.text}</p>
                {turn.sources && turn.sources.length > 0 && (
                  <div className="mt-3 text-sm">
                    {turn.sources.map((s, si) => (
                      <a key={si} href={s.url} target="_blank" rel="noopener noreferrer" className="underline mr-3">
                        {s.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
