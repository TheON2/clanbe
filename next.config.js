// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  // 다른 Next.js 설정들이 여기 올 수 있습니다.

  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "theon2blog.s3.ap-northeast-2.amazonaws.com" },
      { hostname: "velog.velcdn.com" },
      { hostname: "avatars.githubusercontent.com" },
    ],
  },
};

module.exports = nextConfig;
