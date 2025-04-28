import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { webcrypto } from 'crypto'

declare global {
  interface Global {
    crypto?: typeof webcrypto
  }

  interface globalThis {
    crypto?: typeof webcrypto;
  }
}

// Polyfill for crypto.getRandomValues
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Bind to all network interfaces
    port: 5173,      // Ensure this matches the port in your Docker setup
    hmr: {
      clientPort: 5173, // Hot Module Replacement client port
    },
  },
})
