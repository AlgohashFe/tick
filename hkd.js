const endpoint = 'wss://stream.binance.com:9443/ws/!ticker@arr';
           const socket = new WebSocket(endpoint);
           socket.addEventListener('message', (event) => {
               const tickers = JSON.parse(event.data);
               const targetSymbols = ['btcusdt', 'ethusdt', 'busdusdt'];

               tickers.forEach((ticker) => {
                   if (targetSymbols.includes(ticker.s.toLowerCase())) {
                       const price = parseFloat(ticker.c);
                       const buyPrice = price * 1.01 * 7.80 ;
                       const sellPrice = price * 0.99* 7.80 ;
                       updatePrice(ticker.s.toUpperCase(), buyPrice, sellPrice);
                   }
              
               });
           });

           function updatePrice(symbol, buyPrice, sellPrice) {
                     const symbolFormatted = symbol.slice(0, -4) + '-' + symbol.slice(-4);
                     const buyElement = document.getElementById(`buy-${symbolFormatted}`);
                     const sellElement = document.getElementById(`sell-${symbolFormatted}`);

                     const oldBuyPrice = parseFloat(buyElement.dataset.price);
                     const oldSellPrice = parseFloat(sellElement.dataset.price);

                     if (oldBuyPrice !== buyPrice) {
                         buyElement.dataset.price = buyPrice;
                         buyElement.textContent = buyPrice.toFixed(2);
                         animatePriceChange(buyElement, buyPrice > oldBuyPrice);
                     }
                     if (oldSellPrice !== sellPrice) {
                         sellElement.dataset.price = sellPrice;
                         sellElement.textContent = sellPrice.toFixed(2);
                         animatePriceChange(sellElement, sellPrice > oldSellPrice);
                     }
                 }

                 function animatePriceChange(element, isPriceUp) {
                     element.classList.add('animate__animated', 'animate__pulse', isPriceUp ? 'price-up' : 'price-down');
                     setTimeout(() => {
                         element.classList.remove('animate__animated', 'animate__pulse', 'price-up', 'price-down');
                     }, 1000);
                 }
