
import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest'
import { openInNewTab } from '../utils/helpers'

describe('openInNewTab', () => {
    let originalOpen: typeof window.open

    beforeEach(() => {
        originalOpen = window.open
    })

    afterEach(() => {
        window.open = originalOpen
        vi.restoreAllMocks()
    })

    test('calls window.open with correct parameters and sets opener to null when a window is returned', () => {
        const fakeWindow = { opener: {} }
        const openMock = vi.fn().mockReturnValue(fakeWindow)
        window.open = openMock

        openInNewTab('https://example.com')

        expect(openMock).toHaveBeenCalledWith(
            'https://example.com',
            '_blank',
            'noopener,noreferrer'
        )
        expect(fakeWindow.opener).toBeNull()
    })

    test('does nothing (no throw) when window.open returns null', () => {
        const openMock = vi.fn().mockReturnValue(null)
        window.open = openMock

        expect(() => openInNewTab('https://no-window/')).not.toThrow()
        expect(openMock).toHaveBeenCalledWith(
            'https://no-window/',
            '_blank',
            'noopener,noreferrer'
        )
    })
})
