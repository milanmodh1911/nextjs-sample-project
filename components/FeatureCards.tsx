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
            className="group text-center p-6 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Filled Blue Circle Icon */}
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <IconComponent className="w-8 h-8 text-white" />
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
