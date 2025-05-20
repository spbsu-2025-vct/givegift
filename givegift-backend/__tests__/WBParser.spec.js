import { getProductInfo } from '../parser/WBParser.mjs'

describe('WBParser Utility Functions', () => {
    beforeEach(() => {
        global.fetch = jest.fn()
    })

    describe('getProductInfo', () => {

        it('should return product info on successful lookup', async () => {
            const fakeWB = {
                data: {
                    products: [{ id: 555, name: 'ProdName', isAdult: false }]
                }
            }
            global.fetch.mockResolvedValue({
                json: () => Promise.resolve(fakeWB)
            })

            const info = await getProductInfo('test', 5, 10)

            expect(info).toEqual({
                market_link: 'https://www.wildberries.ru/catalog/555/detail.aspx',
                title: 'ProdName',
                // we know getImageLink(555) === vol=0,part=0,basket=01
                img_link: 'https://basket-01.wbbasket.ru/vol0/part0/555/images/big/1.webp'
            })
        })

        it('should pick the first product when isAdult=true even if it is marked adult', async () => {
            const fakeWB = {
                data: {
                    products: [
                        { id: 111, name: 'AdultProd', isAdult: true },
                        { id: 222, name: 'NonAdultProd', isAdult: false }
                    ]
                }
            };
            global.fetch.mockResolvedValue({
                json: () => Promise.resolve(fakeWB)
            });

            const info = await getProductInfo('whatever', 1, 2, true);

            expect(info).toEqual({
                market_link: 'https://www.wildberries.ru/catalog/111/detail.aspx',
                title: 'AdultProd',
                img_link: 'https://basket-01.wbbasket.ru/vol0/part0/111/images/big/1.webp'
            });
        });

        it('should return null if there is no non-adult products for isAdult=false', async () => {
            const fakeWB = {
                data: {
                    products: [
                        { id: 111, name: 'AdultProd1', isAdult: true },
                        { id: 222, name: 'AdultProd2', isAdult: true },
                        { id: 333, name: 'AdultProd3', isAdult: true }
                    ]
                }
            };
            global.fetch.mockResolvedValue({
                json: () => Promise.resolve(fakeWB)
            });

            const info = await getProductInfo('whatever', 1, 2, false);

            expect(info).toBeNull();
        });

        it('should return null if the response data is causes an error', async () => {
            const badResponse = {}
            Object.defineProperty(badResponse, 'data', {
                get() {
                    throw new Error("Invalid response")
                }
            })

            global.fetch.mockResolvedValue({
                json: () => Promise.resolve(badResponse)
            })

            const info = await getProductInfo('anything', 1, 2)
            expect(info).toBeNull()
        })


        it('should return null when no products match', async () => {
            global.fetch.mockResolvedValue({
                json: () => Promise.resolve({ data: { products: [] } })
            })
            expect(await getProductInfo('test', 5, 10)).toBeNull()
        })

        it('should return null on fetch error', async () => {
            global.fetch.mockRejectedValue(new Error('boo'))
            expect(await getProductInfo('test', 5, 10)).toBeNull()
        })
    })
})