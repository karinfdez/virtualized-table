# 📊 Virtualized Product Table

A high-performance **React + TypeScript** product table that demonstrates:
- **Virtualized rendering** with [React Virtuoso](https://virtuoso.dev/) (smooth scrolling with thousands of rows)
- **Data table logic** with [TanStack Table](https://tanstack.com/table/latest)
- **Infinite scroll + API pagination** (fetches new rows as you scroll)
- **Loading states & spinners** (initial load + fetch-more states)
- **Responsive UI** with [Tailwind CSS](https://tailwindcss.com/)

This project is designed to showcase frontend engineering skills for handling **large datasets** in a smooth and professional way.

---

## 🚀 Tech Stack
- **React 18** with **TypeScript**
- **TanStack Table** – column definitions, header/cell rendering
- **React Virtuoso** – virtualized table rows + infinite scroll
- **Tailwind CSS** – styling
- **DummyJSON API** – mock API with pagination (`limit` + `skip`)

---

## ✨ Features
✅ **Virtualized rows** – renders only visible items in the DOM  
✅ **Infinite scroll** – fetches the next page of results when scrolling down  
✅ **API pagination** – uses `limit` + `skip` query params to avoid duplicates  
✅ **Loading indicators** – spinner for first load + small loader when fetching more  
✅ **No more data state** – graceful message when all data is loaded  
✅ **Responsive & styled** – works across desktop & mobile  


## 🌐 Live Demo
👉 Try it here: [Live on Vercel](https://your-demo-url.vercel.app)  

---

## 🛠️ Installation & Setup

Clone the repo:
```bash
git clone https://github.com/karinfdez/virtualized-table.git
cd virtualized-table
```

Install Dependencies:
```bash
npm install
```

Run locally
```bash
npm start
```