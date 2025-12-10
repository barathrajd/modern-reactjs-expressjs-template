import { defineConfig } from "@rsbuild/core";

export default defineConfig({
  // Set the source directory
  source: {
    entry: {
      index: "./src/index.ts", // Your Express app entry point
    },
  },

  // Configure output for Node.js
  output: {
    target: "node", // Target Node.js environment
    distPath: {
      root: "dist", // Output directory
    },
    filename: {
      js: "[name].js", // Simple filename without hash for Node.js
    },
    cleanDistPath: true, // Clean dist folder before build
    minify: process.env.NODE_ENV === "production", // Disable minification for better debugging in Node.js
    sourceMap: {
      js: "source-map", // Generate source maps for debugging
    },
  },

  // Tools configuration
  tools: {
    rspack: (config) => {
      // Configure externals to exclude node_modules from bundle
      config.externals = {
        express: "commonjs express",
      };

      // Set library target for Node.js
      config.output = {
        ...config.output,
        libraryTarget: "commonjs2",
      };

      // Node configuration
      config.node = {
        __dirname: false,
        __filename: false,
      };

      return config;
    },
  },

  // Development server configuration
  dev: {
    writeToDisk: true, // Write files to disk during development
  },

  // Performance optimizations
  performance: {
    chunkSplit: {
      strategy: "all-in-one", // Bundle everything together for Node.js
    },
  },
});
