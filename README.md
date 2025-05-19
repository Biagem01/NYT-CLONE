# 📰 New York Times Clone - React Project

Un clone moderno e responsive della homepage del **New York Times**, realizzato come progetto finale del corso di **React** di Start2Impact. L'obiettivo è stato ricreare una struttura simile al famoso quotidiano, utilizzando tecnologie moderne e best practice dello sviluppo front-end.

## 🚀 Demo

> Puoi vedere la demo live del progetto [QUI](https://newyorkclone.netlify.app) 

---

## 📌 Funzionalità principali

- 🌐 Navigazione per sezioni (World, Technology, Sports, etc.)
- ⭐ Salvataggio articoli preferiti con persistenza
- 🔐 Autenticazione utente (login, registrazione, logout)
- 🗃️ Sincronizzazione articoli salvati su Firestore
- ⚡ Caricamento dinamico con **React Query**
- 🧭 Routing gestito tramite **Wouter**

---

## 🧑‍💻 Tecnologie utilizzate

| Tecnologia        | Descrizione                                                                 |
|------------------|-----------------------------------------------------------------------------|
| **React**        | Libreria principale per lo sviluppo dell'interfaccia utente                 |
| **Vite**         | Bundler moderno per sviluppo veloce                                         |
| **Redux Toolkit**| Gestione dello stato globale, in particolare per gli articoli salvati       |
| **React Query**  | Fetching e caching degli articoli dalla New York Times API                  |
| **Wouter**       | Router leggero e moderno per React                                          |
| **Firebase Auth**| Gestione dell’autenticazione utente                                         |
| **Firestore**    | Database NoSQL per salvare gli articoli preferiti                           |
| **Axios**        | Client HTTP per richiamare la New York Times API                            |
| **Tailwind CSS** | Framework utility-first per lo styling e il responsive design               |
| **Framer Motion**| Animazioni fluide e moderne                                                 |


## Autenticazione e salvataggio preferiti
Gli utenti possono:

- Registrarsi e fare il login con Firebase Auth

- Salvare articoli nei preferiti

- Ritrovare i propri articoli anche dopo il logout grazie a Firestore


##  API utilizzate
New York Times API
Utilizzata per ottenere gli articoli aggiornati per sezione o parola chiave.

Documentazione ufficiale: https://developer.nytimes.com/

## Il sito è completamente responsive e ottimizzato per dispositivi mobili, tablet e desktop.

Inoltre, il progetto fa uso sia di React Hooks nativi (useState, useEffect, useContext, ecc.) che di custom hooks per astrarre logiche complesse e mantenere il codice più pulito e riutilizzabile.

Il progetto fa uso estensivo di React Hooks, sia nativi che personalizzati, per migliorare la chiarezza e la manutenibilità del codice.

🔧 Hooks nativi utilizzati
useState, useEffect → per gestire lo stato locale e le operazioni con effetti collaterali

useContext → per accedere ai context globali (es. autenticazione, sezione attiva)

useReducer → per la gestione strutturata dello stato complesso (es. sistema di toast)

📦 Hooks avanzati con librerie esterne
useQuery di React Query → utilizzato per il fetching asincrono, caching e aggiornamento automatico degli articoli dal New York Times API

### 🛠️ Custom Hooks sviluppati

| Hook                  | Descrizione                                                                                                   |
|-----------------------|---------------------------------------------------------------------------------------------------------------|
| `useIsMobile`         | Determina se l'utente sta utilizzando un dispositivo mobile in base alla larghezza dello schermo              |
| `useToast`            | Gestisce un sistema di notifiche (toast) con aggiunta, aggiornamento e rimozione centralizzata dello stato    |
| `useArticles`         | Recupera gli articoli di una specifica sezione dal New York Times tramite React Query con caching ottimizzato |
| `useArticlesBySection`| Riorganizza e categorizza gli articoli ricevuti (es. Main, Top Stories, Opinioni) per semplificare il rendering|


Questi hook permettono di mantenere un codice più modulare, leggibile e riutilizzabile, e sono fondamentali per mantenere la separazione delle responsabilità tra logica di business e presentazione.

## 📤 Funzionalità di Condivisione Articolo
All'interno della pagina di dettaglio di ciascun articolo è presente un sistema per condividerne il contenuto tramite le principali piattaforme social:

## 🔗 Piattaforme supportate
 Twitter

 Facebook

 WhatsApp

 Copia link negli appunti

## 🛠 Tecnologie utilizzate
- React – Per la gestione dello stato del componente e la logica del modal di condivisione.

- Clipboard API – Per copiare l’URL dell’articolo direttamente negli appunti dell’utente.

- Standard Social Share URLs – Utilizzo degli URL ufficiali per condivisione diretta:

https://twitter.com/intent/tweet

https://www.facebook.com/sharer/sharer.php

https://api.whatsapp.com/send

## 💡 Come funziona
Quando l'utente clicca sull'icona di condivisione (📤), si apre un modal con i pulsanti per condividere l'articolo corrente. Il link viene generato dinamicamente e permette all'utente di aprire direttamente l'app di destinazione con l’articolo già allegato nel messaggio.


## Questo progetto rappresenta un'applicazione React moderna e ben strutturata, che replica la logica e l'estetica della homepage del New York Times. È stato sviluppato con un'attenzione particolare alla modularità, alla scalabilità e all’esperienza utente.

## Sono stati utilizzati strumenti avanzati come Redux Toolkit per la gestione dello stato globale, React Query per il data fetching asincrono e ottimizzato, Wouter per il routing leggero e Firebase per l’autenticazione e la persistenza dei dati utente.
