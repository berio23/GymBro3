# GymBro - Trainingsplaner #

GymBro ist eine einfache Trainingsplaner-Anwendung, die mit Angular für das Frontend und Flask für das Backend entwickelt wurde. Mit dieser Anwendung können Benutzer Trainings erstellen, anzeigen und verwalten.
## Installation ##

Folgen Sie diesen Schritten, um die Anwendung auf Ihrem lokalen System zu installieren:
### Voraussetzungen ###

    Node.js (https://nodejs.org)
    Python (https://www.python.org)
    Git (https://git-scm.com)

### Schritte

    Klonen Sie das Repository:

bash

`git clone https://github.com/yourusername/gymbro.git
cd gymbro `

   Installieren Sie die notwendigen Pakete für das Angular-Frontend:

bash

`cd frontend
npm install`

    Installieren Sie die notwendigen Pakete für das Flask-Backend:

bash

`cd ../backend
python -m venv venv
source venv/bin/activate  # Für Windows: venv\Scripts\activate
pip install -r requirements.txt`

## Anwendung starten

Um die Anwendung zu starten, führen Sie die folgenden Befehle aus:

   Starten Sie das Angular-Frontend:

bash

`cd frontend
npm start`

    In einem neuen Terminalfenster starten Sie das Flask-Backend:

bash

`cd backend
source venv/bin/activate  # Für Windows: venv\Scripts\activate
python app.py`

Die Anwendung ist nun unter http://localhost:4200 erreichbar.
## Funktionen

   *Trainings erstellen
   *Trainings anzeigen
   *Trainings verwalten

## Lizenz

Diese Anwendung steht unter der MIT-Lizenz. Weitere Informationen finden Sie in der LICENSE-Datei.
