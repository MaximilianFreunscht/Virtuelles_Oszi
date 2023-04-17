

class MenuButtonController {            // setzt aktives Menü des Oszilloskops
    constructor(menu, oszilloskop) {

        this.menu = menu;
        this.oszilloskop = oszilloskop;
    }
    onClick(control) {
        this.oszilloskop.setActiveMenu(this.menu);

        this.oszilloskop.draw();
    }

}
class Oszilloskop {                 // letzte aktive Menü control um verknüpfung zu Drehrad zu ergänzen

    // zum separaten Initiieren und Aufrufen des Scripts
    constructor() {

        this.triggerMenu = undefined;       // zur Initialisierung aller Einträge von Trigger-Menü
        this.triggerOpt1 = undefined;

        this.modeCouplingMenu = undefined;
        this.cursorMenu = undefined;
        this.measurementMenu = undefined;
        this.analyzeMenu = undefined;
        this.acquireMenu = undefined;
        this.displayMenu = undefined;
        this.saveRecallMenu = undefined;
        this.horizontalMenu = undefined;
        this.navigateMenu = undefined;
        this.calculationMenu = undefined;
        this.refWaveformMenu = undefined;
        this.channel1Menu = undefined;
        this.channel2Menu = undefined;
        this.channel3Menu = undefined;
        this.channel4Menu = undefined;
        this.helpMenu = undefined;

        // state Machine
        this.activeMenu = undefined;        // zunächst kein aktives Menü
        this.activeMenuControl = undefined; // zu ergänzen. verschwindet auch nicht wenn timer abläuft. letzte aktive Menü control um verknüpfung zu Drehrad zu ergänzen
        this.timerMenu = undefined;
        this.timer = undefined;

        // grafischen Attribute
        this.context = undefined;
        
        this.screen = undefined;

        this.menuBox1 = undefined;         // muss mit this im constructor erwähnt sein
        this.menuControl1 = undefined;

        this.menuBox2 = undefined;
        this.menuControl2 = undefined;

        this.menuBox3 = undefined;
        this.menuControl3 = undefined;

        this.menuBox4 = undefined;
        this.menuControl4 = undefined;

        this.menuBox5 = undefined;
        this.menuControl5 = undefined;

        this.menuBox6 = undefined;
        this.menuControl6 = undefined;

        this.activeMenuLabel = undefined;

        this.button1 = undefined;
        this.button2 = undefined;
        this.button3 = undefined;
        this.button4 = undefined;
        this.button5 = undefined;
        this.button6 = undefined;

        this.triggerButton = undefined;
        this.measurementButton = undefined;
        this.modeCouplingButton = undefined;



    }
    // init Model für Elemente der Menü-Struktur etc
    initModel() {

        /*   Trigger-Menü Einstellungen   */
        this.triggerMenu = new Menu("triggerMenu", "Menue: Trigger");                           // hinzufügen aller Menüpfade der Einstellungen

        let channelMenu = new Menu("channelMenu", "Channel");
        channelMenu.addMenuEntry(new MenuEntry("one", "1"));
        channelMenu.addMenuEntry(new MenuEntry("two", "2"));
        channelMenu.addMenuEntry(new MenuEntry("three", "3"));
        channelMenu.addMenuEntry(new MenuEntry("four", "4"));
        channelMenu.addMenuEntry(new MenuEntry("extern", "extern"));
        channelMenu.addMenuEntry(new MenuEntry("net", "net"));
        channelMenu.addMenuEntry(new MenuEntry("WavefGen", "Wavef.-Gen"));
        channelMenu.addMenuEntry(new MenuEntry("WavefGenMod", "Wavef.-Gen MOD (FSK/FM)"));

        let edgeMenu = new Menu("edgeMenu", "Edge");
        edgeMenu.addMenuEntry(new MenuEntry("rising", "Rising"));
        edgeMenu.addMenuEntry(new MenuEntry("falling", "Falling"));
        edgeMenu.addMenuEntry(new MenuEntry("alternating", "Alternating"));
        edgeMenu.addMenuEntry(new MenuEntry("either", "Either"));

        this.triggerMenu.addMenuEntry(new MenuEntry("edge", "Edge", [channelMenu, edgeMenu]));      // Menü-Definition-> wie ist struktur. aktives Menü hat aktiven Menü-Eintrag mit seinen submenus


        this.triggerMenu.addMenuEntry(new MenuEntry("edgeThenEdge", "Edge then Edge"));
        this.triggerMenu.addMenuEntry(new MenuEntry("pulswidth", "Pulswidth"));
        this.triggerMenu.addMenuEntry(new MenuEntry("bytepattern", "Bytepattern"));
        this.triggerMenu.addMenuEntry(new MenuEntry("or", "Or"));
        this.triggerMenu.addMenuEntry(new MenuEntry("riseFalltime", "Rise/Falltime"));
        this.triggerMenu.addMenuEntry(new MenuEntry("nEdgeBurst", "N Edge Burst"));
        this.triggerMenu.addMenuEntry(new MenuEntry("lowPulse", "Low Pulse"));
        this.triggerMenu.addMenuEntry(new MenuEntry("setupAndHold", "Setup and Hold"));
        this.triggerMenu.addMenuEntry(new MenuEntry("video", "Video"));
        this.triggerMenu.addMenuEntry(new MenuEntry("usb", "USB"));

        this.modeCouplingMenu = new Menu("modeCouplingMenu", "Menue: Trigger Mode and Coupling");
        this.modeCouplingMenu.addMenuEntry(new MenuEntry("auto", "Auto"));
        this.modeCouplingMenu.addMenuEntry(new MenuEntry("normal", "Normal"));
        /*this.modeCouplingMenu.addMenuEntry(new MenuEntry("mode", "Mode"));
        this.modeCouplingMenu.addMenuEntry(new MenuEntry("coupling", "Coupling"));
        this.modeCouplingMenu.addMenuEntry(new MenuEntry("noiseCancelling", "Noisecancelling"));*/

// zunächst alle Buttons die implementiert werden müssen hier initialisiert, jedoch nicht implementiert im Programm
        this.cursorMenu = new Menu("cursorMenu", "Menue: Cursor");
        this.measurementMenu = new Menu("measurementMenu", "Menue: Measurement");
        this.analyzeMenu = new Menu("analyzeMenu", "Menue: Analyze");
        this.acquireMenu = new Menu("acquireMenu", "Menue: Acquire");
        this.displayMenu = new Menu("displayMenu", "Menue: Display");
        this.saveRecallMenu = new Menu("saveRecallMenu", "Menue: SaveRecall");
        this.horizontalMenu = new Menu("horizontalMenu", "Menue: Horizontal");
        this.navigateMenu = new Menu("navigateMenu", "Menue: Navigate");
        this.calculationMenu = new Menu("calculationMenu", "Menue: Calculation");
        this.refWaveformMenu = new Menu("refWaveformMenu", "Menue: Reference Waveform");
        this.channel1Menu = new Menu("channel1Menu", "Menue: Channel 1");
        this.channel2Menu = new Menu("channel2Menu", "Menue: Channel 2");
        this.channel3Menu = new Menu("channel3Menu", "Menue: Channel 3");
        this.channel4Menu = new Menu("channel4Menu", "Menue: Channel 4");
        this.helpMenu = new Menu("helpMenu", "Menue: Help");

    };
    // init controls für Bedienelemente, Anzeigeelemente etc.
    initControls() {
        // canvas Einstellungen
        let canvas = document.getElementById("canvas");     // lokal um an Kontext zu kommen
        this.context = canvas.getContext("2d");

        var window_height = window.innerHeight;
        var window_width = window.innerWidth;

        canvas.width = window_width;
        canvas.height = window_height;

        canvas.style.background = "white";

        
        this.bildschirm = new OsziScreen("bildschirm");
        let bildschirmView = new Container();
        bildschirmView.addControl(this.bildschirm, new GridPosition(0, 0, 2, 1))

        // um in set active menu darauf zuzugreifen
        this.activeMenuLabel = new Label("activeMenuLabel");
        this.activeMenuLabel.setPosition(200, 475, 100, 100);

        // menü icons erstellen, bekommen kein onclickEvent
        this.menuBox1 = new Box("menuBox1");
        this.menuControl1 = new MenuControl("menuControl1", this.menuBox1);    // Menü Control zu Menü Box 1

        this.menuBox2 = new Box("menuBox2");
        this.menuControl2 = new MenuControl("menuControl2", this.menuBox2);

        this.menuBox3 = new Box("menuBox3");
        this.menuControl3 = new MenuControl("menuControl3", this.menuBox3);


        this.menuBox4 = new Box("menuBox4");
        this.menuControl4 = new MenuControl("menuControl4", this.menuBox4);

        this.menuBox5 = new Box("menuBox5");
        this.menuControl5 = new MenuControl("menuControl5", this.menuBox5);

        this.menuBox6 = new Box("menuBox6");
        this.menuControl6 = new MenuControl("menuControl6", this.menuBox6);



        // durch hinzufügen in controlListe des Containers wird das Element z.B. gezeichnet
        let menuBoxView = new Container();
        menuBoxView.addControl(this.menuBox1, new GridPosition(0, 0, 1, 1));        // new Gridposition wird an Constraint übergeben
        menuBoxView.addControl(this.menuControl1, new GridPosition(0, - 1 / 2, 1, 1));       // control wird über der Menü Box positioniert (aufklappendes Fenster)

        menuBoxView.addControl(this.menuBox2, new GridPosition(1, 0, 1, 1));
        menuBoxView.addControl(this.menuControl2, new GridPosition(1, - 1 / 2, 1, 1));

        menuBoxView.addControl(this.menuBox3, new GridPosition(2, 0, 1, 1));
        menuBoxView.addControl(this.menuControl3, new GridPosition(2, - 1 / 2, 1, 1));

        menuBoxView.addControl(this.menuBox4, new GridPosition(3, 0, 1, 1));
        menuBoxView.addControl(this.menuBox5, new GridPosition(4, 0, 1, 1));
        menuBoxView.addControl(this.menuBox6, new GridPosition(5, 0, 1, 1));


        // Buttons erstellen als Element 
        this.button1 = new Button("button1", "");
        //this.button1.setPosition(200, 600, 75, 50);
        this.button1.setOnClickEventListener(this); // wenn button1 ein event bekommt wird es an klasse Oszilloskop geschickt (notwendig für separation of concerns)

        this.button2 = new Button("button2", "");
        //this.button2.setPosition(300, 600, 75, 50);
        this.button2.setOnClickEventListener(this);

        this.button3 = new Button("button3", "");
        //this.button3.setPosition(400, 600, 75, 50);
        this.button3.setOnClickEventListener(this);

        this.button4 = new Button("button4", "");
        //this.button4.setPosition(500, 600, 75, 50);
        this.button4.setOnClickEventListener(this);

        this.button5 = new Button("button5", "");
        //this.button5.setPosition(600, 600, 75, 50);
        this.button5.setOnClickEventListener(this);

        this.button6 = new Button("button6", "");
        //this.button6.setPosition(700, 600, 75, 50);
        this.button6.setOnClickEventListener(this);

        // erstellt einen neuen Container namens ButtonView zu dem die buttons gehören
        let buttonView = new Container();
        buttonView.addControl(this.button1, new GridPosition(0, 0, 1 - 1 / 4, 1));
        buttonView.addControl(this.button2, new GridPosition(1, 0, 1 - 1 / 4, 1));
        buttonView.addControl(this.button3, new GridPosition(2, 0, 1 - 1 / 4, 1));
        buttonView.addControl(this.button4, new GridPosition(3, 0, 1 - 1 / 4, 1));
        buttonView.addControl(this.button5, new GridPosition(4, 0, 1 - 1 / 4, 1));
        buttonView.addControl(this.button6, new GridPosition(5, 0, 1 - 1 / 4, 1));

        // Settings-Buttons erstellen als Element
        this.triggerButton = new Button("triggerButton", "Trigger");        // jeder button hält sein eigenes passendes Menü TODO:
        //this.triggerButton.setPosition(900, 400, 125, 50);
        this.triggerButton.setOnClickEventListener(new MenuButtonController(this.triggerMenu, this));

        this.modeCouplingButton = new Button("modeCouplingbutton", "Mode Coupling");
        //this.modeCouplingButton.setPosition(900, 500, 125, 50);
        this.modeCouplingButton.setOnClickEventListener(new MenuButtonController(this.modeCouplingMenu, this));

        this.measurementButton = new Button("measurementButton", "Meas");
        //this.measurementButton.setPosition(900, 600, 125, 50);
        this.measurementButton.setOnClickEventListener(new MenuButtonController(this.measurementMenu, this));       // MVC Model View Controller. Model ist Menü und Oszilloskop. View ist Button. Controller entscheidet was passiert

        // Container für alle Settings-Buttons
        let settingView = new Container("settingView"); // ist lokal
        settingView.addControl(this.triggerButton, new GridPosition(0, 0, 1, 1)); // 
        settingView.addControl(this.modeCouplingButton, new GridPosition(0, 1, 1, 1));
        settingView.addControl(this.measurementButton, new GridPosition(0, 2, 1, 1));


        // neuer Container Screen, der die Container für das Menü, die buttons und die Settingsbuttons enthält
        this.screen = new Container("screen");
        this.screen.setLayoutConstraint(new GridPosition(0, 0, 20, 15));        // Layout Constraints um Größe auf dem gezeigten Bildschirm zu skalieren FRAGE: Wieso nicht auch constraints für alle anderen elemente?
        this.screen.addControl(bildschirmView, new GridPosition(2, 3, 6, 8))
        this.screen.addControl(menuBoxView, new GridPosition(2, 9 + 1 / 2, 2, 1));
        this.screen.addControl(this.activeMenuLabel, new GridPosition(2, 9, 1, 1));
        this.screen.addControl(buttonView, new GridPosition(2, 12, 2, 1));
        this.screen.addControl(settingView, new GridPosition(18, 5, 3, 1)); // beim hinzufügen zum container wird position übergeben
        

        // click Event listener für gesamten screen, bzw alle Controls im screen
        canvas.addEventListener("mouseup", (event) => {
            // um relative x und y Position im Fenster zu erhalten
            const rect = canvas.getBoundingClientRect();
            let scaleX = canvas.width / rect.width;    // relationship bitmap vs. element for x
            let scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;
            //ruft Funktion für jedes Element der (klickbaren) Liste auf wenn geklickt wird
            this.screen.mouseup(this.context, x, y);
        });
        // mouseover Event listener nur für zu klickende controls
        canvas.addEventListener("mousemove", (event) => {           // 
            // um relative x und y Position im Fenster zu erhalten
            const rect = canvas.getBoundingClientRect();
            let scaleX = canvas.width / rect.width;    // relationship bitmap vs. element for x
            let scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;
            //ruft Funktion für jedes Element der Liste auf wenn geklickt wird
            this.screen.highlight(this.context, x, y);

        });
        window.addEventListener("resize", (event) => {  // Event Listener um auf Größenänderung des Fensters zu skalieren
            canvas.width = window.innerWidth;
            canvas.height = window.innerWidth;

            const rect = canvas.getBoundingClientRect();
            this.resize();      // wenn sich Fenstergröße wird resize Funktion am Ende von Oszilloskop aufgerufen
            // zur Kontrolle:
            //console.log( rect.width + " " + rect.height);
        });

        this.resize(); // passe dich an den aktuellen canvas an bei Start. Geht über alle Elemente und ruft set Position von jedem Control
    }

    /*---------------------------- Funktionen des Oszilloskops-----------------------------*/

    // zum Unterteilen der Initialisierungen
    init() {
        this.initModel();
        this.initControls();
    }

    setActiveMenu(activeMenu) {     // aktives Menü, z.B. Trigger oder Mode Coupling
        this.activeMenu = activeMenu;
        this.activeMenuLabel.setText(this.activeMenu.title);
        this.activeMenu.setActiveMenuEntryIndex(0); // der erste Eintrag im Trigger Menü wird der erste Eintrag der angezeigt wird. Methode steht in Menü Klasse
        let activeMenuEntry = this.activeMenu.getActiveMenuEntry();
        this.menuBox1.setText(activeMenuEntry.title); // schreibe in Menübox den aktiven Eintrag vom aktiven Menü, erste Menü ist besonders
        this.menuControl1.setMenu(this.activeMenu);     // soll bei draw gezeichnet werden, kann voraussichtlich in for schl
        this.displayActiveMenuEntry();
    }

        // Submenüs des aktiven Menü-Eintrag im aktiven Menü
    displayActiveMenuEntry(){ // wenn Menü aufgerufen wird und wenn Menü Eintrag geändert wird
        let activeMenuEntry = this.activeMenu.getActiveMenuEntry();
        let submenus = activeMenuEntry.submenus; // ein großes Menü hat viele kleine Menüs, submenus als Menüs die abhängig von Eintrag in Triggertype sind (bsp)
        let submenuCount = 0;           // wieviele submenüs gibt es
        if (submenus !== undefined) {
            submenuCount = submenus.length;
        }
        //console.log(submenuCount);
        let menuControls = [this.menuControl2, this.menuControl3, this.menuControl4, this.menuControl5, this.menuControl6]; // jedem button der nicht der erste ist bekommt das passende submenu zugerdnet
        for (let i = 0; i < menuControls.length; i++) { 
            let menuControl = menuControls[i];
            if (submenuCount > i) {       // wie oben nur für nächste Ebene
                let submenu = submenus[i];
                submenu.setActiveMenuEntryIndex(0);
                menuControl.setMenu(submenu);
                menuControl.menuBox.setVisible(true);
                menuControl.menuBox.setText(submenu.activeMenuEntry.title);
            }
            else {
                menuControl.setMenu(undefined);
                menuControl.menuBox.setVisible(false);
            }
        }

    }

    // Trennung von Darstellung (controls etc) und Verhalten( Controller kontrolliert unsere Controls) separation of concerns
    onClick(control) {
        if (this.activeMenu === undefined) {
            return;
        }
        //console.log(control.id);
        switch (control.id) {      // unterscheidet viele Positionen gleichzeitig
            case "button1":
                this.activateNextMenuEntry(this.menuControl1);
                this.displayActiveMenuEntry();
                break;
            case "button2":
                this.activateNextMenuEntry(this.menuControl2);
                break;
            case "button3":
                this.activateNextMenuEntry(this.menuControl3);
                break;
            case "button4":
                this.activateNextMenuEntry(this.menuControl4);
                break;
            case "button5":
                this.activateNextMenuEntry(this.menuControl5);
                break;
            case "button6":
                this.activateNextMenuEntry(this.menuControl6);
                break;
        }
        this.draw();
    }

    activateNextMenuEntry(menuControl) {        // um Liste auf Bildschirm anzuzeigen
        let menu = menuControl.menu;
        menu.activateNextMenuEntry();
        menuControl.menuBox.setText(menu.getActiveMenuEntry().title);  // menü weiß nicht welche menü box es darstellt. Menü ist Modell und Controller verknüpft Menü und Menübox
        if (this.timer !== undefined) {
            window.clearTimeout(this.timer);
        };
        if (menu !== this.timerMenu) {       // wenn es ein menü gab was nicht das jetzige ist. Dann muss das alte geschlossen werden
            if (this.timerMenu !== undefined) {    // wenn es nicht das selbe menü ist und es gab vorher eins. mach das alte zu und merke dir das neue
                this.timerMenu.close();
            }
            this.timerMenu = menu;
        }
        this.activeMenuControl = menuControl;
        this.timer = window.setTimeout(this.onMenuItemTimeout, 3000, [this]);
    }

    onMenuItemTimeout(args) {       // an funktion muss übergeben werden, dass an dem Oszilloskop gearbeitet wird. Simuliert eigentlich, dass oszilloskop übergeben wird
        let oszilloskop = args[0];
        oszilloskop.timer = undefined;  // wenn abgearbeitet ist wird Timer nicht mehr gemerkt
        oszilloskop.timerMenu.close();      // oszilloskop weiß, welches das letzte geöffnete Menü ist und schließt es
        oszilloskop.timerMenu = undefined;
        oszilloskop.draw();
    }

    resize() {
        const rect = canvas.getBoundingClientRect();
        this.screen.computePositions(rect.width, rect.height);  // Rekursion die über jeden Container und für jedes Element die Größe berechnet. Compute-> setPositions-> Draw
        this.draw();
    }

    draw() {
        /* this.context.strokeStyle = "green";
        this.context.fillStyle = "green"; */
        this.screen.draw(this.context);
        //console.log(Date.now())
    }
}
