/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
  output: "export",
  images: {
    unoptimized: true,
  },
}

export default nextConfig
