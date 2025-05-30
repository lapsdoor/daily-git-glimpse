
import { Star, GitFork, ExternalLink, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GitHubProject {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  forks_count: number;
  created_at: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface ProjectCardProps {
  project: GitHubProject;
}

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

const getLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    JavaScript: 'bg-yellow-500',
    TypeScript: 'bg-blue-500',
    Python: 'bg-green-500',
    Java: 'bg-orange-500',
    'C++': 'bg-blue-600',
    C: 'bg-gray-600',
    'C#': 'bg-purple-500',
    PHP: 'bg-indigo-500',
    Ruby: 'bg-red-500',
    Go: 'bg-cyan-500',
    Rust: 'bg-orange-600',
    Swift: 'bg-orange-400',
    Kotlin: 'bg-purple-600',
  };
  return colors[language] || 'bg-gray-500';
};

export function ProjectCard({ project }: ProjectCardProps) {
  const createdDate = new Date(project.created_at).toLocaleDateString();
  
  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors group hover:shadow-lg hover:shadow-purple-500/10">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <img 
              src={project.owner.avatar_url} 
              alt={project.owner.login}
              className="w-10 h-10 rounded-full border-2 border-gray-700"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-white text-lg truncate group-hover:text-purple-400 transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-gray-400 truncate">
                {project.owner.login}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={() => window.open(project.html_url, '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
          {project.description || 'No description available'}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-yellow-400">
              <Star className="h-4 w-4" />
              <span>{formatNumber(project.stargazers_count)}</span>
            </div>
            <div className="flex items-center space-x-1 text-blue-400">
              <GitFork className="h-4 w-4" />
              <span>{formatNumber(project.forks_count)}</span>
            </div>
          </div>
          
          {project.language && (
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getLanguageColor(project.language)}`}></div>
              <span className="text-gray-400 text-xs">{project.language}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <Calendar className="h-3 w-3" />
          <span>Created {createdDate}</span>
        </div>
      </CardContent>
    </Card>
  );
}
