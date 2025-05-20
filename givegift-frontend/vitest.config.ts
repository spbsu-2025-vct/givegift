import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        environment: 'jsdom',
        coverage: {
            include: ['src/utils/**/*.{ts,js}', '!src/utils/constants.{ts,js}'],
        }
    }
})