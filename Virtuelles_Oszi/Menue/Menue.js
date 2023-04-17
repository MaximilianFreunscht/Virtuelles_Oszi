class MenuEntry {
   // menuEntries
    constructor(id, title, submenus) {
        this.id = id;
        this.title = title;
        this.submenus = submenus;
    }
}

class Menu {                // ein Menü besteht aus vielen Einträgen und braucht liste von Menü Einträgen
    constructor(id, title) {
        // menüs haben id und einen text
        this.id = id;
        this.title = title;

        this.menuEntries = []; // zu beginn keine Menü einträge
        this.activeMenuEntry = undefined;
        this.activeMenuEntryIndex = undefined;
        this.opened = false;
    }
    addMenuEntry(menuEntry) {
        this.menuEntries.push(menuEntry);
    }

    setActiveMenuEntryIndex(activeMenuEntryIndex) {      // der wievielte Eintrag ist der aktive Eintrag, beim ersten sichtbar werden -> nullter Eintrag
        this.activeMenuEntryIndex = activeMenuEntryIndex;
        this.activeMenuEntry = this.menuEntries[this.activeMenuEntryIndex];
    }

    getActiveMenuEntry() {
        return this.activeMenuEntry;
    }

    activateNextMenuEntry() {
        if (this.opened === false) {  // wenn nicht schon offen war öffnen. Sonst Einträge durchschalten
            this.opened = true;
        }
        else {
            let nextIndex = this.activeMenuEntryIndex + 1;  // um in Liste einen Eintrag weiter zu gehen, fehlt nurnoch anzeige der ganzen Liste
            if (nextIndex === this.menuEntries.length) {      // wenn letzter Eintrag dann Index 0 um von vorne zu beginnen
                nextIndex = 0;                                          // jedem button die funktion selbst zuweisen, button soll wissen was zu tun ist. Wie event handler funktion zuweisen
            }                                                           // klasse trigger button, thissetActive Menü TriggerMenü. vielleicht control.id vermeiden
            this.setActiveMenuEntryIndex(nextIndex);
        }
    }
    close() {                    // Um Fenster mit allen Einträgen wieder zu schließen
        this.opened = false;
    }
}

class MenuControl extends Control {
    constructor(id, menuBox) {
        super(id);
        this.menuBox = menuBox;
        this.bordercolor = "black";
        this.thickness = 1;
        this.menu = undefined;

    }
    setBordercolor(bordercolor) {
        this.bordercolor = bordercolor;
    }
    setStrokeThickness(thickness) {
        this.thickness = thickness;
    }
    setMenu(menu) {
        this.menu = menu;
    }
    // draw für zB Menü Boxen hier neu definiert
    draw(context) {

        if (this.menu === undefined || this.visible === false || this.menu.opened === false) {   // menü hat menü Einträge
            return;                         // wenn es nicht geöffnet ist wird nichts gezeichnet
        }
        context.font = this.getFont();
        for (let i = 0; i < this.menu.menuEntries.length; i++) {
            if (i === this.menu.activeMenuEntryIndex) {
                context.fillStyle = "green";
            }
            else {
                context.fillStyle = "red";
            }
            context.fillText(this.menu.menuEntries[i].title, this.xpoint, this.ypoint - this.height / 2 * (this.menu.menuEntries.length - i), this.width);    // Oberster eintrag wird als erstes gezeichnet
        }
    }
}
