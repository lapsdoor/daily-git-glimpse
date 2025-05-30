
import { Github, TrendingUp } from 'lucide-react';

export function GitStatsHeader() {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
              <Github className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                GitHub Trending
                <TrendingUp className="h-6 w-6 text-green-400" />
              </h1>
              <p className="text-gray-400">Discover today's most popular repositories</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Updated every 5 minutes</p>
            <p className="text-xs text-gray-500">Data from GitHub API</p>
          </div>
        </div>
      </div>
    </header>
  );
}
