import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/constants';

export default function AppStoreButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      {/* Google Play Store */}
      <a
        href={`${SITE_CONFIG.url}/redirect.php?url=android`}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-105"
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
          alt="Get it on Google Play"
          width={160}
          height={48}
          className="h-12 w-auto"
        />
      </a>

      {/* Apple App Store */}
      <a
        href={`${SITE_CONFIG.url}/redirect.php?url=iphone`}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-105"
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
          alt="Download on the App Store"
          width={160}
          height={48}
          className="h-12 w-auto"
        />
      </a>
    </div>
  );
}
