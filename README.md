# React 18 Workshop

## Voraussetzungen

**Für dein Laptop/PC**

Auf deinem Laptop/PC sollte installiert sein:

- Git (zum klonen des Workspaces)
- [NodeJS](https://nodejs.org/en/download/). Am besten LTS-Version oder mind. Node.JS 18, aber mit Node.JS 16 sollte es auch funktionieren.
- Browser (am besten Firefox oder Chrome)
- Eine IDE oder ein Texteditor. Wenn Du bereits einen "Lieblingseditor" verwendest, benutze diesen während des Trainings, damit Du nicht auch noch ein neues Tool lernen musst. Ansonsten funktionieren folgende Tools zum Beispiel:
  - [Visual Studio Code](https://code.visualstudio.com/)
  - [Webstorm](https://www.jetbrains.com/webstorm/download/) (Evaluationsversion reicht)
  - [IntelliJ IDEA](https://www.jetbrains.com/idea/download/) (Ultimate Edition, Evaluationsversion reicht aber)
- Für Schulungen, die wir über **Zoom** machen: bitte den Zoom **Client** installieren (und nicht die Web-Version von Zoom verwenden). Du benötigst aber _keinen_ Zoom-Account.

**Optional: Browser Erweiterungen für React**

- Für das Arbeiten mit React empfehle ich, die [React Developer Tools](https://github.com/facebook/react/tree/master/packages/react-devtools) zu installieren. Es gibt sie für [Chrome/Edge](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=2ahUKEwjE14vhq-rmAhVGblAKHbgOC1sQFjAAegQICRAK&url=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Freact-developer-tools%2Ffmkadmapgofadopljbjfkapdkoienihi&usg=AOvVaw3YJDg7kXgeeChgKN88s0Sx) und [Firefox](https://addons.mozilla.org/de/firefox/addon/react-devtools/). Für den Workshop sind die Developer Tools nicht notwendig.

**Während des Trainings**

- Da wir vor und während des Trainings ggf. noch Aktualisierungen installieren müssen, bitte sicherstellen, dass auch während des Trainings auf deinem Computer der Internet-Zugang (logisch, online-Schulung 🙃) funktioniert.
  - Bitte stelle sicher, dass das Installieren von npm-Paketen und das Klonen von Git-Repositories **auch während der Schulung** funktioniert
  - Dazu kontrollieren, dass keine Proxy, VPN- oder Firewall- oder andere Einstellungen den Zugang zu Git und npm verhindern.
  - Informationen zum Einrichten eines Proxies für npm findest Du bei Bedarf [zum Beispiel hier](http://wil.boayue.com/blog/2013/06/14/using-npm-behind-a-proxy/).
- **Bitte lass während des Trainings deine Kamera an! 🙏**. Ich kann sonst nur schwer einschätzen, ob ich euch langweile oder euch vielleicht abgehängt habe. Und wir sind ja nicht im Radio 😉
  - Dein Mikrofon brauchst Du nur anmachen, wenn Du etwas sagen oder fragen möchtest (was Du natürlich jederzeit darfst!)
- W-LAN ist bequem, aber gerade bei (langen) Streamings ist ein Kabel-gebundenes Netzwerk stabiler als W-LAN, also im Zweifel lieber das Kabel einstecken (und W-LAN deaktivieren) 😊

# Installation und Vorbereitung des Workspaces für die Schulung

Damit wir sicher sind, dass während des Workshops alles funktioniert, möchte ich dich bitten, im Vorweg schon einmal die folgenden Schritte durchzuführen
  - Wir werden während des Workshops noch weitere "Unter-Workspaces" installieren, deswegen bitte sicherstellen, dass git und npm auch _während_ des Workshops funktionieren. Die Packages sind identisch in den einzelnen "Unter-Workspaces"



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

* Während der Schulung werden wir mehrere unterschiedliche Frontend-Stände und -Workspaces verwenden. Diese haben aber alle dasselbe Setup (gleiches Vite, gleiche npm-Packages etc.), deswegen exemplarisch bitte einmal `60_tanstack_query/45_suspense_preload` installieren und starten
* Das Backend muss parallel laufen (s.o.)
* ```bash
  # Im Verzeichnis 60_tanstack_query/45_suspense_preload
  
  npm install
  npm start
  ```
* Das Frontend läuft auf Port 3000. 
* Bitte einmal http://localhost:3000 im Browser öffnen, dort sollte die Seite "React Training Blog" mit einer Liste von Blog Posts erscheinen
* Wenn das geklappt hat, ist alles gut!

## Schritt 3 (optional): Tests ausführen
* Es gibt zwei Jest Tests, diese könnt ihr probehalber einmal ausführen:
* ```bash
  # Im Verzeichnis 60_tanstack_query/45_suspense_preload
  
  npm test
  ```

**Das ist alles 😊**

Bei Fragen oder Problemen melde dich gerne bei mir.