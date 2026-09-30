/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  ...(isProd && { output: "export" }),
  basePath: isProd ? "/Arun_profile--" : "",
  assetPrefix: isProd ? "/Arun_profile--/" : "",
};

export default nextConfig;
