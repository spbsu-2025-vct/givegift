
import { expect, test, describe } from 'vitest'
import { checkPrice, checkZoom } from '../utils/checkers'

describe('checkPrice', () => {
    test('returns same range when within bounds', () => {
        const result = checkPrice(10, 100, [20, 80])
        expect(result).toEqual([20, 80])
    })

    test('clamps start below minPrice', () => {
        const result = checkPrice(10, 100, [5, 50])
        expect(result).toEqual([10, 50])
    })

    test('clamps end above maxPrice', () => {
        const result = checkPrice(10, 100, [20, 150])
        expect(result).toEqual([20, 100])
    })

    test('handles reversed newPrice by adjusting start to end - 1', () => {
        // newPrice [30, 20] => start = 20 - 1 = 19
        const result = checkPrice(10, 100, [30, 20])
        expect(result).toEqual([19, 20])
    })

    test('reversed range then clamps below minPrice', () => {
        // newPrice [12, 10] => start = 10 - 1 = 9 => clamped to minPrice=10
        const result = checkPrice(10, 100, [12, 10])
        expect(result).toEqual([10, 10])
    })

    test('reversed range then clamps end above maxPrice', () => {
        // newPrice [150, 140] => start = 140 - 1 = 139, end=140 => clamp end to maxPrice=100
        const result = checkPrice(10, 100, [150, 140])
        expect(result).toEqual([139, 100])
    })
})

describe('checkZoom', () => {
    test('returns same scale when within bounds', () => {
        expect(checkZoom(1, 5, 3)).toBe(3)
    })

    test('clamps below minScale', () => {
        expect(checkZoom(2, 5, 1)).toBe(2)
    })

    test('clamps above maxScale', () => {
        expect(checkZoom(1, 4, 10)).toBe(4)
    })

    test('exactly at minScale returns unchanged', () => {
        expect(checkZoom(2, 6, 2)).toBe(2)
    })

    test('exactly at maxScale returns unchanged', () => {
        expect(checkZoom(2, 6, 6)).toBe(6)
    })
})
