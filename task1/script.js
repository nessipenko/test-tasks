document.addEventListener('DOMContentLoaded', function () {
    const mainAPI = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1';
    const reserveAPI = 'https://fanated.com/coingecko_markets.json';
    const localJSON = './currency.json';

    fetch(mainAPI)
        .then(response => {
            if (!response.ok) {
                throw new Error('Main API request failed');
            }
            return response.json();
        })
        .then(data => {
            handleData(data);
        })
        .catch(mainError => {
            console.error('Error fetching data from main API:', mainError);
            fetch(reserveAPI)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Reserve API request failed');
                    }
                    return response.json();
                })
                .then(data => {
                    handleData(data);
                })
                .catch(reserveError => {
                    console.error('Error fetching data from reserve API:', reserveError);
                    fetch(localJSON)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Local JSON data loading failed');
                            }
                            return response.json();
                        })
                        .then(data => {
                            handleData(data);
                        })
                        .catch(localError => {
                            console.error('Error loading data from local JSON:', localError);
                        });
                });
        });

    function handleData(data) {
        console.log(data);
        const table = document.querySelector('#currency tbody');
        data.forEach((currency, index) => {
            const row = document.createElement('tr');

            row.appendChild(createTableCell(currency.id));
            row.appendChild(createTableCell(currency.symbol, currency.symbol === 'usdt' ? 'usdt' : null));
            row.appendChild(createTableCell(currency.name));

            if (index < 5) {
                row.classList.add('maincurr');
            }

            table.appendChild(row);
        });
    }

    function createTableCell(text, className) {
        const cell = document.createElement('td');
        cell.textContent = text;
        if (className) {
            cell.classList.add(className);
        }
        return cell;
    }
});
