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


Questo progetto rappresenta un'applicazione React moderna e ben strutturata, che replica la logica e l'estetica della homepage del New York Times. È stato sviluppato con un'attenzione particolare alla modularità, alla scalabilità e all’esperienza utente.

Sono stati utilizzati strumenti avanzati come Redux Toolkit per la gestione dello stato globale, React Query per il data fetching asincrono e ottimizzato, Wouter per il routing leggero e Firebase per l’autenticazione e la persistenza dei dati utente.

Inoltre, il progetto fa uso sia di React Hooks nativi (useState, useEffect, useContext, ecc.) che di custom hooks per astrarre logiche complesse e mantenere il codice più pulito e riutilizzabile.
