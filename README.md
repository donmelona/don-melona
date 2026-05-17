# Sheets Menu SPA

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Sheets](https://img.shields.io/badge/Google%20Sheets-34A853?style=for-the-badge&logo=google-sheets&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

**SheetBite Menu** is a lightweight, high-performance Single Page Application (SPA) designed for small food businesses to manage their digital menu and automate orders with **zero infrastructure and maintenance costs**.

---

## 🚀 Key Technologies

*   **Frontend:** **React** powered by **Vite** for ultra-fast bundling.
*   **Language:** **TypeScript** ensuring strict type-safety across custom orders.
*   **Styling:** **Tailwind CSS** for a highly optimized, modern UI layout.
*   **Database / CMS:** **Google Sheets API** acting as a serverless, real-time data source.
*   **Deployment:** **Vercel** for global edge distribution and instant loading.

---

## 🏗️ Software Architecture

The system is architected as a fully stateless frontend application, shifting data-management responsibilities to client-side fetching and cloud-based spreadsheets to eliminate backend expenses.

### System Modules
1.  **Catalog:** Dynamic product rendering grouped by custom business categories.
2.  **Product Configurator:** Custom ordering engine with strict logic limits for bases, ingredients, and extra toppings.
3.  **Pricing Engine:** Real-time arithmetic handler calculating base product rates plus progressive topping/sauce extras.
4.  **Cart Management:** Local order consolidation allowing custom item modifications or removals.
5.  **WhatsApp Integration:** Text compiler and URL encoder that structures the final checkout data into a clear WhatsApp API message string.
6.  **Admin CMS:** Google Sheets integration, enabling the business owner to update prices and stock directly from their phone.

---

## 🛠️ Local Installation

To spin up the frontend development environment locally:

**1**. Clone the repository

```bash
git clone https://github.com/DeusNoctifer/sheets-menu-spa.gitsheetbite-menu.git
```

**2**. Change your route

```bash
cd sheets-menu-spa
```
**3**. Install Dependencies

```bash
npm install
```

**4**. Run the local development server

```bash
npm run dev
```