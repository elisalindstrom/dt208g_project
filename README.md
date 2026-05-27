# DT208G projektuppgift - Norruniversitetet
Applikation skapad i Angular som hämtar kursdata från JSON-fil. Möjlighet att söka, filtrera och sortera kursdata samt spara kurser i ett ramschema.

## Installation
Efter nedklonat repository installera beroenden med kommando npm install. Utvecklingsserver startas med ng serve.

## Länk liveversion
https://norruniversitetet.onrender.com/home

## Funktionalitet
- Kursdata hämtas från lokal JSON-fil
- Filtrera data utifråm kursnamn och kurskod
- Sortera data på kursnamn, kurskod, ämne och poäng
- Visa kurser utifrån ämne
- Se antal kurser som visas i sökresultatet
- Spara kuser i localStorage
- Visa sparade kurser i ett ramschema

Extra funktionaliteter:
- Visa antalet sparade kurser i menyvalet "Mina kurser"
- Begränsad rendering av kurser med möjlighet att successivt visa fler kurser

## Projektstruktur
```bash
public/
├── /api
├── /images
src/
├── app
│   ├── /components
│   ├── /interfaces
│   ├── /pages
│   ├── /services
│   ├── app.routes.ts
│   ├── app.scss
│   └── app.html
```

Av Elisa L. 2026