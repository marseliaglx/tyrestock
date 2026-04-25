# Marek's Tyre Stock Manager

A lightweight mobile-first web app for day-to-day tyre stock control in a garage.

## What it does
- Add incoming tyres by size, brand, and quantity.
- Pick a brand quickly using tap-friendly brand chips or type it manually (no small phone dropdowns).
- See current stock instantly with low-stock highlighting.
- Mark tyres as sold in one tap (`-1 Sold`).
- Mark quick incoming stock in one tap (`+1 In`).
- Search by tyre size or brand.
- Track recent stock movements (incoming/sold) with timestamps.
- Personalized owner name (defaults to **Marek**).
- Works offline after first load via service worker.

## Data storage
All data is stored in the browser `localStorage` on the device:
- `tyreInventory`
- `tyreHistory`
- `tyreOwnerName`

## Run locally
Open `index.html` directly, or serve the folder with any static server.
