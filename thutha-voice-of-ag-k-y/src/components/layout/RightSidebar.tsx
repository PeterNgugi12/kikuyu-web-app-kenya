 import { trendingTopics, suggestedCreators, proverbOfTheDay, formatNumber } from '@/data/dummy';
import { Link } from 'react-router-dom';

const RightSidebar = () => {
  return (
    <aside className="hidden lg:block w-80 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto no-scrollbar py-4 pr-4 space-y-4">
      {/* Proverb of the Day — editorial highlight */}
      <div className="bg-card p-5 border-b border-border">
        <div className="thutha-accent-bar mb-3" />
        <p className="text-xs font-heading font-semibold text-accent uppercase tracking-widest mb-2">Proverb of the Day</p>
        <p className="text-base font-heading font-semibold text-foreground italic leading-relaxed">"{proverbOfTheDay.kikuyu}"</p>
        <p className="text-sm text-muted-foreground mt-1.5">{proverbOfTheDay.english}</p>
      </div>

      {/* Trending */}
      <div className="bg-card p-5 border-b border-border">
        <p className="text-xs font-heading font-semibold text-foreground uppercase tracking-widest mb-3">Trending Now</p>
        <div className="space-y-3">
          {trendingTopics.slice(0, 5).map((topic, i) => (
            <div key={topic.id} className="flex justify-between items-start">
              <div className="flex gap-3 items-start">
                <span className="text-lg font-heading font-bold text-accent/40">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{topic.tag}</p>
                  <p className="text-xs text-muted-foreground">{formatNumber(topic.posts)} posts</p>
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded">{topic.category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Creators */}
      <div className="bg-card p-5 border-b border-border">
        <p className="text-xs font-heading font-semibold text-foreground uppercase tracking-widest mb-3">Creators to Follow</p>
        <div className="space-y-3">
          {suggestedCreators.map(creator => (
            <div key={creator.id} className="flex items-center gap-3">
              <img src={creator.avatar} alt={creator.username} className="w-10 h-10 rounded-full object-cover ring-2 ring-accent/20" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{creator.username}</p>
                <p className="text-xs text-muted-foreground">{formatNumber(creator.followers)} followers</p>
              </div>
              <button className="text-xs font-semibold text-accent hover:text-accent/80 transition-colors">Follow</button>
            </div>
          ))}
        </div>
      </div>

      {/* Sponsored */}
      <div className="bg-card p-5">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Sponsored</p>
        <p className="text-sm font-semibold text-foreground">Reach 1M+ Agĩkũyũ users with Thutha Ads 📈</p>
        <Link to="/promote" className="text-xs font-semibold text-accent mt-2 inline-block hover:underline">
          Start promoting →
        </Link>
      </div>
    </aside>
  );
};

export default RightSidebar;
 
