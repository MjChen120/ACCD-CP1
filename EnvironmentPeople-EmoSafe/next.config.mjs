/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // GitHub Pages serves your site from `/<repo-name>/`.
  // We set this dynamically in the GitHub Actions workflow to keep local dev unchanged.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
