import { ExternalLink } from "lucide-react";

type Round = {
  side: "left" | "right";
  claim?: string;
  sources?: string[];
  rebuttal?: {
    text: string;
    sources?: string[];
    counterRebuttal?: { text: string; sources?: string[] };
  };
};

type Topic = {
  id: number;
  title: string;
  category: string;
  debate: { rounds: Round[] };
  votes: { left: number; right: number };
};

export default function TopicCard({ topic }: { topic: Topic }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 p-1">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{topic.title}</h2>
              <span className="inline-block text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                {topic.category}
              </span>
            </div>
          </div>

          <div className="space-y-8">
            {topic.debate.rounds.map((round, idx) => (
              <div
                key={idx}
                className={`pl-6 border-l-4 ${
                  round.side === "left" ? "border-blue-500" : "border-red-500"
                }`}
                style={{ marginLeft: round.rebuttal ? "2rem" : "0" }}
              >
                {/* Main claim */}
                {round.claim && (
                  <div className="mb-4">
                    <p className={`font-medium ${round.side === "left" ? "text-blue-700 dark:text-blue-400" : "text-red-700 dark:text-red-400"}`}>
                      {round.side === "left" ? "Left:" : "Right:"} {round.claim}
                    </p>
                    {round.sources && round.sources.length > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        {round.sources.map((src, i) => (
                          <a key={i} href={`https://${src}`} target="_blank" rel="noopener noreferrer" className="underline flex items-center gap-1">
                            {src} <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Rebuttal */}
                {round.rebuttal && (
                  <div className="mt-4 pl-6 border-l-4 border-gray-400">
                    <p className={`text-sm italic ${round.side === "right" ? "text-blue-600 dark:text-blue-400" : "text-red-600 dark:text-red-400"}`}>
                      {round.side === "right" ? "Left rebuttal:" : "Right rebuttal:"} {round.rebuttal.text}
                    </p>
                    {round.rebuttal.sources && round.rebuttal.sources.length > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        {round.rebuttal.sources.map((src, i) => (
                          <a key={i} href={`https://${src}`} target="_blank" rel="noopener noreferrer" className="underline flex items-center gap-1">
                            {src} <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Counter-rebuttal (3rd level) */}
                    {round.rebuttal.counterRebuttal && (
                      <div className="mt-4 pl-6 border-l-4 border-gray-300">
                        <p className="text-sm italic font-medium text-gray-700 dark:text-gray-300">
                          Counter: {round.rebuttal.counterRebuttal.text}
                        </p>
                        {round.rebuttal.counterRebuttal.sources && (
                          <div className="text-xs text-gray-500 mt-1">
                            {round.rebuttal.counterRebuttal.sources.map((src, i) => (
                              <a key={i} href={`https://${src}`} target="_blank" rel="noopener noreferrer" className="underline flex items-center gap-1">
                                {src} <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
