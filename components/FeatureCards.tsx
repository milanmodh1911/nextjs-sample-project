import { Car, ThumbsUp, Users } from 'lucide-react';
import { USP_FEATURES } from '@/lib/constants';

const iconMap = {
  car: Car,
  'thumbs-up': ThumbsUp,
  users: Users,
};

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {USP_FEATURES.map((feature, index) => {
        const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
        
        return (
          <div
            key={feature.title}
            className="group feature-card animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="feature-icon">
              <IconComponent className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-display font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
