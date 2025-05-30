
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GitStatsHeader } from '@/components/GitStatsHeader';
import { ProjectCard } from '@/components/ProjectCard';
import { FilterBar } from '@/components/FilterBar';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

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

const fetchTrendingProjects = async (language = 'all', period = 'daily'): Promise<GitHubProject[]> => {
  const today = new Date();
  const pastDate = new Date();
  
  // Expand date range to get more results
  if (period === 'daily') {
    pastDate.setDate(today.getDate() - 7); // Changed from 1 day to 7 days
  } else if (period === 'weekly') {
    pastDate.setDate(today.getDate() - 30); // Changed from 7 days to 30 days
  } else {
    pastDate.setMonth(today.getMonth() - 3); // Changed from 1 month to 3 months
  }

  const dateString = pastDate.toISOString().split('T')[0];
  const languageQuery = language !== 'all' ? ` language:${language}` : '';
  const query = `created:>${dateString}${languageQuery}`;
  
  console.log('GitHub API Query:', query); // Debug log to see what we're searching for
  
  // Build URL manually to avoid over-encoding
  const baseUrl = 'https://api.github.com/search/repositories';
  const searchParams = new URLSearchParams({
    q: query,
    sort: 'stars',
    order: 'desc',
    per_page: '30'
  });
  
  const response = await fetch(`${baseUrl}?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch trending projects');
  }
  
  const data = await response.json();
  console.log('GitHub API Response:', data); // Debug log to see the response
  return data.items || [];
};

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [timePeriod, setTimePeriod] = useState('daily');
  const { toast } = useToast();

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['trending-projects', selectedLanguage, timePeriod],
    queryFn: () => fetchTrendingProjects(selectedLanguage, timePeriod),
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch trending projects. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <div className="min-h-screen bg-gray-950">
      <GitStatsHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Trending GitHub Projects
          </h2>
          <p className="text-gray-400">
            Discover the most popular projects on GitHub today
          </p>
        </div>

        <FilterBar 
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          timePeriod={timePeriod}
          onTimePeriodChange={setTimePeriod}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))
          ) : projects && projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No trending projects found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
