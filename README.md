# Installation

## Schritt 1: Backend

* Bitte im Verzeichnis `backend` einmal das REST Backend installieren und starten
* Das Backend läuft auf Port 7000, d.h. dieser Port muss verfügbar sein!
* ```bash
  # Im Verzeichnis backend
  
  npm install
  npm start
  ```

* Wenn das Backend läuft, einmal zum Testen `http://localhost:7000/posts` im Browser (oder per curl, wget, ...) aufrufen
  * Es sollte eine Liste mit JSON-Objekten zurück kommen

## Schritt 2: Frontend

* Während der Schulung werden wir mehrere unterschiedliche Frontend-Stände und -Workspaces verwenden. Diese haben aber alle dasselbe Setup (gleiches Vite, gleiche npm-Packages etc.), deswegen exemplarisch bitte einmal `60_tanstack_query/workspace` installieren und starten
* Das Backend muss parallel laufen (s.o.)
* ```bash
  # Im Verzeichnis 60_tanstack_query/workspace
  
  npm install
  npm start
  ```
* Das Frontend läuft auf Port 3000. 
* Bitte einmal http://localhost:3000 im Browser öffnen, dort sollte die Seite "React Training Blog" mit einer Liste von Blog Posts erscheinen
* Wenn das geklappt hat, ist alles gut!
