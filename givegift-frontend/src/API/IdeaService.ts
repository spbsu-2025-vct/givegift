import axios from "axios";
import type { IUserIdeaProperties } from "../types";

const mockedData = {
  "data": [
    {
      "img_link": "https://basket-13.wb.ru/vol3396/part339651/339651683/images/big/1.jpg",
      "market_link": "https://www.wildberries.ru/catalog/0/search.aspx?page=1&sort=popular&search=Набор экзотических шоколадных конфет&priceU=000%3B15000000",
      "title": "Набор конфет Экзотические фрукты в шоколаде ассорти 1кг"
    },
    {
      "img_link": "https://basket-13.wb.ru/vol2516/part251643/251643731/images/big/1.jpg",
      "market_link": "https://www.wildberries.ru/catalog/0/search.aspx?page=1&sort=popular&search=Спортивный плавательный костюм&priceU=000%3B15000000",
      "title": "Купальный костюм раздельный"
    },
    {
      "img_link": "https://basket-02.wb.ru/vol189/part18978/18978100/images/big/1.jpg",
      "market_link": "https://www.wildberries.ru/catalog/0/search.aspx?page=1&sort=popular&search=Подарочная коробка ассорти из медовых сладостей&priceU=000%3B15000000",
      "title": "Подарок маме на ДР букет из чая и сладостей"
    },
    {
      "img_link": "https://basket-10.wb.ru/vol1560/part156091/156091864/images/big/1.jpg",
      "market_link": "https://www.wildberries.ru/catalog/0/search.aspx?page=1&sort=popular&search=Водонепроницаемые наушники для плавания&priceU=000%3B15000000",
      "title": "Наушники с костной проводимостью для плавания бассейна"
    },
    {
      "img_link": "https://basket-12.wb.ru/vol1886/part188674/188674789/images/big/1.jpg",
      "market_link": "https://www.wildberries.ru/catalog/0/search.aspx?page=1&sort=popular&search=Плавающие резиновые утки с конфетами внутри&priceU=000%3B15000000",
      "title": "Жидкая конфета спрей \"Ручка\" 30 шт по 16 мл"
    },
    {
      "img_link": "https://basket-13.wb.ru/vol3761/part376109/376109786/images/big/1.jpg",
      "market_link": "https://www.wildberries.ru/catalog/0/search.aspx?page=1&sort=popular&search=Подарочный сертификат в кондитерскую&priceU=000%3B15000000",
      "title": "Открытка кондитеру"
    },
    {
      "img_link": "https://basket-13.wb.ru/vol2230/part223068/223068284/images/big/1.jpg",
      "market_link": "https://www.wildberries.ru/catalog/0/search.aspx?page=1&sort=popular&search=Пляжное полотенце с изображением сладостей&priceU=000%3B15000000",
      "title": "Шоппер сумка cо стильным принтом Сладости подарок на 8 марта"
    },
    {
      "img_link": "https://basket-13.wb.ru/vol2647/part264715/264715400/images/big/1.jpg",
      "market_link": "https://www.wildberries.ru/catalog/0/search.aspx?page=1&sort=popular&search=Специальные энергетические батончики для пловцов&priceU=000%3B15000000",
      "title": "Спортивное питание Что есть до, во время и после тренировки"
    },
    {
      "img_link": "https://basket-13.wb.ru/vol3038/part303882/303882257/images/big/1.jpg",
      "market_link": "https://www.wildberries.ru/catalog/0/search.aspx?page=1&sort=popular&search=Книга рецептов сладостей с морской тематикой&priceU=000%3B15000000",
      "title": "ПРОСТОЙ ХЛЕБ + Аскеза в новую жизнь + Сара 1"
    },
    {
      "img_link": "https://basket-13.wb.ru/vol2070/part207039/207039781/images/big/1.jpg",
      "market_link": "https://www.wildberries.ru/catalog/0/search.aspx?page=1&sort=popular&search=Подарочный набор для горячего шоколада с маршмеллоу&priceU=000%3B15000000",
      "title": "Шоколадные бомбочки с маршмеллоу и какао сладости для детей"
    }
  ],
  "status": 200,
  "statusText": "OK",
  "headers": {
    "content-length": "7020",
    "content-type": "application/json"
  },
  "config": {
    "transitional": {
      "silentJSONParsing": true,
      "forcedJSONParsing": true,
      "clarifyTimeoutError": false
    },
    "adapter": [
      "xhr",
      "http",
      "fetch"
    ],
    "transformRequest": [
      null
    ],
    "transformResponse": [
      null
    ],
    "timeout": 0,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1,
    "maxBodyLength": -1,
    "env": {},
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    "method": "post",
    "url": "http://127.0.0.1:5000/generate_ideas",
    "data": "{\"interests\":[\"сладости\",\"плавание\"],\"price_range\":[0,150000],\"is_adult\":false}",
    "allowAbsoluteUrls": true
  },
  "request": {}
}


// TODO: MOCKED
export default class IdeaService {
  static async generateIdeas(userIdeaProperties: IUserIdeaProperties, is_adult: boolean) {
    console.log("Mock generateIdeas called with:", {
      userIdeaProperties,
      is_adult,
    });

    const response = await axios.post("http://127.0.0.1:5000/ideas/generate", {
      ...userIdeaProperties,
      is_adult: is_adult,
    });
    console.log(response);

    // TODO: still mocked but we r close
    return mockedData;
  }
}
