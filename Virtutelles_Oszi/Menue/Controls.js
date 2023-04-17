/* TODO: -  Welche Eigenschaften gehören zu control? farbe(control), hintergrund (control),strichstärke (box), text(button,box)
         -  this.label für button und box, Menü wieder separate Box
*/
class GridPosition      // zur Bestimmung der Position auf dem gesamten Bildschirm
{
    constructor(xpoint, ypoint, width, height) {     // relative Gridpositionen im Container

        this.xpoint = xpoint;
        this.ypoint = ypoint;
        this.width = width;
        this.height = height;
    }
}
// grundlegende Klasse, enthält die Grundfunktionen wie draw, isInside, etc. die auf alle weiteren Klassen angewendet werden können
class Control // abstrakte Klasse (gibt zB kein new control, ist nur die gemeinsamkeit)
{
    constructor(id) // im Construktor nur unverändliche formale Parameter
    {
        this.id = id;

        this.container = undefined;
        this.layoutConstraint = undefined;

        this.xpoint = 0;
        this.ypoint = 0;
        this.width = 0;
        this.height = 0;

        this.visible = true;
        this.enabled = true;

        this.font = undefined;
        this.color = "black";
        this.background = "white";

        this.onClickEventListener = undefined;
    }

    setContainer(container) {     // wo steckt ein Control drin?
        this.container = container;
    }

    setLayoutConstraint(layoutConstraint) {      // wo die elemente relativ auf den Container bezogen liegen
        this.layoutConstraint = layoutConstraint;
    }

    // auslagern aus Konstruktor für Skalierung, im Construktor am besten nur unveränderliche Eigenschaften, bzw leerer Construktor
    setPosition(xpoint, ypoint, width, height) {
        this.xpoint = xpoint;
        this.ypoint = ypoint;
        this.width = width;
        this.height = height;

    }

    // wird in draw ausgewertet
    setVisible(visible) {
        this.visible = visible;
    }

    setEnabled(enabled) {            // an oder aus? zB buttons ausgegraut
        this.enabled = enabled;
    }

    setColor(color) {
        this.color = color;
    }

    getColor() {             // wenn nicht explizit gesetzt gibt Default-Wert für Container
        if (this.color !== undefined) {
            return this.color;
        }
        if (this.container !== undefined) {
            return this.container.getColor();
        }
        return "black";
    }

    setBackground(background) {
        this.background = background;
    }

    getBackground() {             // wenn nicht explizit gesetzt gibt Default-Wert für Container
        if (this.background !== undefined) {
            return this.background;
        }
        if (this.container !== undefined) {
            return this.container.getBackground();
        }
        return "white";
    }

    setFont(font) {
        this.font = font;
    }

    getFont() {             // wenn nicht explizit gesetzt gibt Default-Wert für Container
        if (this.font !== undefined) {
            return this.font;
        }
        if (this.container !== undefined) {
            return this.container.getFont();
        }
        return "15px Arial";
    }

    setOnClickEventListener(onClickEventListener) {
        this.onClickEventListener = onClickEventListener;
    }


    // Jedes Element muss irgendwie gezeichnet werden können
    draw(context) { }
    // draw highlighted für einzelnes control element, jedes Element kann theoretisch gehighlighted werden
    drawHighlighted(context) { }
    // ob maus auf Element ist kann theoretisch für jedes Element geprüft werden, hier aber nur für Buttons
    isInside(xmouse, ymouse) {
        const distanceX = this.xpoint + this.width;
        const distanceY = this.ypoint + this.height;
        if ((xmouse >= this.xpoint) && (xmouse <= distanceX) && (ymouse >= this.ypoint) && (ymouse <= distanceY))
            return true;
        else
            return false;
    }
}
// Container beinhaltet die verschiedenen Elemente, z.B. die mit denen interagiert werden muss
class Container extends Control {
    constructor() {
        super("");
        this.controlList = [];
    }
    // Jeder Container besitzt eine Control-Liste um die zugehörigen Elemente zu verwalten
    addControl(control, layoutConstraint) {
        control.setContainer(this);     // ich bin dein Parent
        control.setLayoutConstraint(layoutConstraint); // set layout constraint um Werte zu merken in this.constraint 
        this.controlList.push(control); // füge control in Liste ein (Buttons werden in Container view eingefügt)
    }
    computePositions(width, height) {     // muss gerufen werden um Positionen zu setzen, bevor gezeichnet wird -> screen bekommt größe des Canvas, so viel platz zum zeichnen
        let layoutConstraint = this.layoutConstraint;       // berechnet grundsätzlich alle Startpixel
        if (layoutConstraint !== undefined) {
            let widthPixels = Math.trunc(width / layoutConstraint.width);   // width und height von gesammten Fenster
            let heightPixels = Math.trunc(height / layoutConstraint.height);
            if (widthPixels < heightPixels) {     // um  Pixel zu Rechtecken zu machen Höhe und Breite sollen in gleichem Verhältnis zoomen
                heightPixels = widthPixels;
            }
            else {
                widthPixels = heightPixels;
            }
            this.setPositions(0, 0, widthPixels, heightPixels);
        }
    }

    setPositions(xpoint, ypoint, widthPixels, heightPixels) {    // Anfangsposition der Elemente auf dem Grid
        let layoutConstraint = this.layoutConstraint;       // positioniere dich selbst

        this.setPosition(xpoint, ypoint, layoutConstraint.width * widthPixels, layoutConstraint.height * heightPixels);     // Positionieren

        for (const control of this.controlList) {   	        // positioniere deine Elemente aus deiner controlList
            let layoutConstraint = control.layoutConstraint;
            if (layoutConstraint !== undefined) {
                if (control instanceof Container) {     //wenn Container ist dann muss erneut in nächste Ebene geschaut werden
                    // aus relativer Position in Grid-Punkten wird absolute Position des Containers erzeugt, bisher in kästchen, jetzt koordinaten
                    // ist eine Rekursion. Setzt noch keine Position sondern ruft nochmal set Positions. Xpoint und Ypoint werden geändert
                    control.setPositions(xpoint + (layoutConstraint.xpoint * widthPixels), ypoint + (layoutConstraint.ypoint * heightPixels), layoutConstraint.width * widthPixels, layoutConstraint.height * heightPixels);
                    //                  x-koord absolut+ Kästchen * skalierte Menge an Pixeln pro Kästchen                                             
                }
                else {
                    // hier werden die Koordinaten des Controls gespeichert
                    control.setPosition(xpoint + (layoutConstraint.xpoint * widthPixels), ypoint + (layoutConstraint.ypoint * heightPixels), layoutConstraint.width * widthPixels, layoutConstraint.height * heightPixels);
                }
            }
        }
    }


    draw(context) // zeichnet container indem die leere draw methode aus der Control-Klasse hier für Container-Elemente definiert wird. Z.B. wird die Methode der Buttons-Klasse aufgerufen
    {
        context.fillStyle = this.getBackground();
        context.fillRect(this.xpoint, this.ypoint, this.width, this.height);

        for (const control of this.controlList) {
            control.draw(context);                  // ruft für jedes Control-Element das in einem Container enthalten ist die entsprechende Draw-Methode auf
        }
    }

    // highlighted für alle elemente der Control Liste, falls Bedingung erfüllt ist (für Container, die Menge)
    highlight(context, x, y) {
        for (const control of this.controlList) {
            //wenn Container ist dann muss erneut in nächste Ebene geschaut werden 
            if (control instanceof Container) {
                control.highlight(context, x, y);
            }
            else {
                // wenn maus im bereich eines controls ist, dann wird highlight aufgerufen
                if (control.isInside(x, y) === true && control.enabled === true) {
                    control.drawHighlighted(context);
                }
                // sonst einfach button neu zeichnen
                else {
                    control.draw(context);
                }
            }
        }
    };
    // generelle Abfrage
    mouseup(context, x, y) {
        for (const control of this.controlList) {
            //wenn Container ist dann muss erneut in nächste Ebene geschaut werden 
            if (control instanceof Container) {
                control.mouseup(context, x, y);
            }
            else {
                // wenn maus im bereich eines controls ist, dann wird highlight aufgerufen
                if (control.onClickEventListener !== undefined && control.isInside(x, y) === true && control.enabled === true) {
                    control.onClickEventListener.onClick(control);
                }
            }
        }
    }


}

// Button erbt Grundfunktionen von control 
class Button extends Control {

    constructor(id, text) {
        super(id);
        this.setColor("grey");
        this.bordercolor = "grey";
        this.textColor = "red";
        this.text = text;
    }
    setText(text) {
        this.text = text;
    }

    // Methode draw
    draw(context) {
        // beginpath um Pfad neu anzusetzen (neues Element)
        //Button ausfüllen
        context.fillStyle = this.getColor();
        context.fillRect(this.xpoint, this.ypoint, this.width, this.height);
        // Rahmen des Buttons zeichnen
        context.strokeStyle = this.bordercolor;
        context.lineWidth = this.thickness;
        context.strokeRect(this.xpoint, this.ypoint, this.width, this.height);
        // Beschriftung der Buttons
        context.font = this.getFont();
        context.fillStyle = this.textColor;
        context.fillText(this.text, this.xpoint, this.ypoint + 40, this.width);
    }

    // Methode die Button highlighted wenn der Benutzer mit der Maus über dem Button ist
    drawHighlighted(context) {
        // zeichnen des highlights
        context.strokeStyle = "black";
        context.lineWidth = "2";
        context.strokeRect(this.xpoint, this.ypoint, this.width, this.height - context.lineWidth / 2);
    }
}

// Klasse Box für alle Elemente die durch eine einfache Box dargestellt werden
class Box extends Control {
    constructor(id) {
        super(id);
        this.bordercolor = "black";
        this.thickness = 1;
        this.text = undefined;
    }
    setBordercolor(bordercolor) {
        this.bordercolor = bordercolor;
    }
    setStrokeThickness(thickness) {
        this.thickness = thickness;
    }
    setText(text) {
        this.text = text;
    }
    // draw für zB Menü Boxen hier neu definiert
    draw(context) {
        // beginpath um Pfad neu anzusetzen (neues Element)
        // Box ausfüllen
        if(this.visible === false){
            return;
        }
        context.fillStyle = this.getColor();
        context.fillRect(this.xpoint, this.ypoint, this.width, this.height);
        // Box umrahmen
        context.strokeStyle = this.bordercolor;
        context.lineWidth = this.thickness;
        context.strokeRect(this.xpoint, this.ypoint, this.width, this.height);


        if (this.text !== undefined) {
            context.font = this.getFont();
            context.fillStyle = "red";
            context.fillText(this.text, this.xpoint, this.ypoint + 40, this.width);
        }
    }
}

class OsziScreen extends Box { // einfache box um Bildschirm darzustellen
    constructor(id) {
        super(id);
        this.bordercolor = "black";
        this.thickness = 1;
    }
    setBordercolor(bordercolor) {
        this.bordercolor = bordercolor;
    }
    setStrokeThickness(thickness) {
        this.thickness = thickness;
    }
    draw(context) {
        // Bildschirm zeichnen  TODO: (neue klasse extends control box)
        context.strokeStyle = this.bordercolor;
        context.lineWidth = this.thickness;
        context.strokeRect(this.xpoint, this.ypoint, this.width, this.height);
    }
}

class Label extends Control {   // Label welches unten links im Bildschirm das aktive Menü anzeigt
    constructor(id) {
        super(id);
        this.text = "";
    }
    // um etwas zu beschriften (label)
    setText(text) {
        this.text = text;
    }
    draw(context) {
        context.font = this.getFont();
        context.fillStyle = "red";
        context.textAlign = "middle";
        context.fillText(this.text, this.xpoint, this.ypoint + 20);
    }
}
