//Klasse der Rotation-Buttons
class RotationTickButton {
  constructor(name,posX,posY,radius,stepValue,value, index,ctx,klickfunktion,minValue,maxValue) {
    this.name = name;
    this.posX = posX;
    this.posY = posY;
    this.radius = radius;
    this.stepValue = stepValue;
    this.value = value;
    this.index = index;
    this.angle=0;
    this.hasFocus=false;
    this.ctx=ctx;
    this.klickfunktion = klickfunktion;
    this.clicked = false;
    this.minValue = minValue;
    this.maxValue = maxValue;
  }
  //---------------------------------------
  HasFocus(xmouse,ymouse){
    const dX = this.radius;
    const dY = this.radius;
    let hasFocusOld = this.hasFocus;
    this.hasFocus=((xmouse >= this.posX-dX && xmouse <= this.posX+dX)
                &&(ymouse >= this.posY-dY && ymouse <= this.posY+dY));  
    if(this.hasFocus!=hasFocusOld){
      if(!this.hasFocus){this.clicked=false;}
      this.draw(this.hasFocus);
    }
    return this.hasFocus;
  } 
  //------------------------------------------
  MouseRotate(e){
    let x;
    if (e.deltaY <= 0 ) x = -1;
    else if(e.deltaY > 0) x = 1;
    this.onTick(x);
    this.draw(true);
  }
  //---------------------------------------------
  KeyClick(e){
    var x ;
      if (e.keyCode == 38) x = 1; //Wenn Arrow-Up
      else if (e.keyCode == 40) x = -1; //Wenn Arrow-Down
      else x=0;
    this.onTick(x);
    this.draw(true);  
  } 
  //---------------------------------------------
  Clicked(){
    if(this.klickfunktion == true){
      this.clicked =! this.clicked;
      this.draw(true);
    }
  }
  //--------------------------------------------
  draw(hasFocus) {
    let x= -this.angle;
    let ctx=this.ctx;
    let radius = this.radius;
    ctx.translate(this.posX,this.posY);
    ctx.clearRect( -radius*1.09,-radius*1.09,(radius*1.09)*2, (radius*1.09)*2);

    if(hasFocus){
      ctx.beginPath();
      ctx.arc (0, 0,radius*1.04, 0, Math.PI*2, false);
      ctx.stroke();
    }
    //äußerer Kreis
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    ctx.fillStyle = '#B4B3B3';
    ctx.arc (0, 0, radius, 0, Math.PI*2, false);
    ctx.fill();

    //äußere Zeiger
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle="black";
    ctx.fillRect(0,-radius,1.5,radius*2);
    ctx.fillStyle="black";
    ctx.fillRect(-radius,0,radius*2,1.5);

    // Erkennungskreis bei Klick
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    if(this.clicked){ctx.fillStyle = 'black';}
    else{ctx.fillStyle = 'white';}
    ctx.arc (0, 0, radius*0.918, 0, Math.PI*2, false);
    ctx.fill();

    //Innerer Kreis
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    if(this.clicked){
      ctx.fillStyle = 'whitesmoke';
      console.log("clicked")
      dispatchEvent(new CustomEvent('drehkopf', {
        detail:{name: this.name,wert: this.value},
      }));

    }
    else{
      ctx.fillStyle = 'white';}
    ctx.arc (0, 0,radius * 0.9, 0, Math.PI*2, false);
    ctx.fill();

    //Zeiger-Kreis
    ctx.beginPath();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#DBDADA';
    
    ctx.rotate(x);    
    ctx.arc(0, -radius*0.54,radius*0.18,0, Math.PI*2, false);
    ctx.fill();
    
    ctx.setTransform(1,0, 0, 1, 0, 0);     
  }
}

class NormalRotateButton extends RotationTickButton{

	onTick(value){
      this.value+=value*this.stepValue;
      if(value == -1){
        if (this.value >= this.minValue) this.angle-=100;// gegen Uhrzeigersinn drehen
        else this.value = this.minValue;
      }
      if (value == 1){
        if (this.value <= this.maxValue)this.angle+=100; // Mit Uhrzeigersinn drehen
        else this.value = this.maxValue;
      }
      console.log(this.name+" Element "+this.index+" Value: "+ this.value) 
  }
}

class RotateButtonTwoStep extends RotationTickButton{
  constructor(name,posX,posY,radius,stepValue1,stepValue2,value, index,ctx,klickfunktion,minValue,maxValue) {
    super(name,posX,posY,radius,stepValue1,value, index,ctx,klickfunktion,minValue,maxValue);
    this.stepValue2 = stepValue2;
    this.klickfunktion = true;
    // Überladen des Konstruktors für feinen Drehstep
  }
  onTick(value){
    if(!this.clicked)
      this.value+=value*this.stepValue;
    else if(this.clicked)
      this.value+=value*this.stepValue2;
    if(value == -1){
      if (this.value >= this.minValue) this.angle-=100; 
      else this.value = this.minValue;
    }
    if (value == 1){
      if (this.value <= this.maxValue) this.angle+=100;
      else this.value = this.maxValue;
    }
    console.log(this.name+" Element "+this.index+" Value: "+ this.value)
  }
}

class AchsenSkalierungButton extends RotationTickButton{
  constructor(name,posX,posY,radius,stepValue,value,ctx,klickfunktion,Button,minValue,maxValue,einheit) { 
    super(name,posX,posY,radius,stepValue,value,0,ctx,true);
    this.basis = 1;
    this.exponent = 0;
    this.minValue = minValue;
    this.maxValue = maxValue; 
    this.einheit = einheit;
    this.ausgabewert;
    this.Button = Button;
  }
  onTick(value){
    if(value == -1 && this.ausgabewert > this.minValue){
      this.angle-=100;
      switch (this.basis){
        case 5:
          this.basis = 2;
        break;
        case 2:
          this.basis = 1;
        break;
        case 1:
          this.basis = 5; this.exponent -= 1; 
        break;
      }
    }
    else if (value == 1 && this.ausgabewert < this.maxValue){
      this.angle+=100;
      switch (this.basis){
        case 1:
          this.basis = 2;
        break;
        case 2:
          this.basis = 5;
        break;
        case 5:
          this.basis = 1; this.exponent += 1;
        break;
      }
    }
    this.ausgabewert = this.basis*10**this.exponent;
    if(this.Button!=null){
      this.Button.StepValue(this.ausgabewert,this.basis);
    }
    let buttonValue = SiPraefix(this.basis,this.exponent);
    console.log(this.name+" "+buttonValue[0]+buttonValue[1]+this.einheit);
  
  }
}

class AbhängigerButton extends RotationTickButton{
  constructor(name,posX,posY,radius,stepValue,value,ctx,klickfunktion,Achse) {
    super(name,posX,posY,radius,stepValue,value, 0,ctx,klickfunktion);
    this.stepValue = stepValue;
    this.value = 0;
    this.Achse = Achse;
  }
  StepValue(value,basis) { 
    if(this.Achse =="X"||this.Achse=="x")this.stepValue = value/50;
      if(this.Achse =="Y"||this.Achse=="y"){
        switch(basis){
          case 1 : this.stepValue = value/80;
          break;
          case 2 : this.stepValue = value/160;
          break;
          case 5 : this.stepValue = value/200;
          break;
        }
      }
  }
  //----------------------------------------------
  Clicked(){
    this.value = 0;
    console.log(this.value);
  }
  //----------------------------------------------
  onTick(value){
    if(value == -1){
      this.angle-=100;
      this.value -=this.stepValue;
    }
    else if (value == 1){
      this.angle+=100;
      this.value +=this.stepValue;;
    }
    let bas_ex = GetBasisExponent(this.value);
    let ausgabe = SiPraefix(bas_ex[0],bas_ex[1]);
    console.log(this.name+" "+ausgabe[0]+ausgabe[1]);
    dispatchEvent(new CustomEvent('Button aus', {detail:{name: this.name,},}));

  }
}
//--------------------------- Knöpfe -----------------------------------------

class EckigeDynamischeElemente {
  constructor(name,posX,posY,widthX,widthY,ctx,klickfunktion,fillstyle,fillstyle2,description){
    this.name = name;
    this.posX = posX;
    this.posY = posY;
    this.widthX = widthX;
    this.widthY = widthY;
    this.ctx = ctx;
    this.klickfunktion = klickfunktion;
    this.fillstyle = fillstyle;
    this.fillstyle2 = fillstyle2;
    this.description = description;
    this.hasFocus = false;
    this.clicked = false;
  }
  //--------------------
  HasFocus(xmouse,ymouse){
    let hasFocusOld = this.hasFocus;
    this.hasFocus=((xmouse >= this.posX && xmouse <= this.posX+this.widthX)
             &&(ymouse >= this.posY && ymouse <= this.posY+this.widthY));

  return this.hasFocus;
  } 
}

class EckigerButton extends EckigeDynamischeElemente{
  
  Clicked(){
    if(this.klickfunktion == true){
      this.clicked =! this.clicked;
      this.draw();
    }
    return this.clicked;
  }
  //------------------------------------------
  draw(){ 
    let ctx=this.ctx;
    let fillstyle=this.fillstyle;
    let fillstyle2=this.fillstyle2;
  
    if(!this.clicked){  
      ctx.fillStyle = fillstyle;
      //console.log(this.name + " Is not clicked")
      dispatchEvent(new CustomEvent('Button aus', {detail:{name: this.name,},}));

    }
    else{
      ctx.fillStyle = fillstyle2;
      //console.log(this.name + " Is clicked")
      dispatchEvent(new CustomEvent('Button an', {detail:{name: this.name,},}));
    }
    ctx.fillRect(this.posX,this.posY,this.widthX,this.widthY);
    ctx.font = "10px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(this.description, this.posX+(this.widthX/2),this.posY+(this.widthY/2));
  }
}

//------------- Taster ----------------
class EckigerTaster extends EckigeDynamischeElemente{
  mousegedrueckt(){
    this.colorchanged = true;
    this.draw();
  }
  mouseloslassen(){
    this.colorchanged = false;
    this.draw();
  }
  //------------------------------------------
  draw(){ 
    let ctx=this.ctx;
    let fillstyle=this.fillstyle;
    let fillstyle2=this.fillstyle2;
    ctx.fillStyle = fillstyle;
  
    if(this.colorchanged == true){  
      ctx.fillStyle = fillstyle2;
      dispatchEvent(new CustomEvent('Taster an', {detail:{name: this.name,},}));
    }
    if(this.colorchanged == false){
      ctx.fillstyle = fillstyle;
      console.log(this.name+ " ist nicht da");
    }
    
    ctx.fillRect(this.posX,this.posY,this.widthX,this.widthY);
    ctx.font = "10px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(this.description, this.posX+(this.widthX/2),this.posY+(this.widthY/2));
  }
}


//-------------------- Sammel Klasse-----------------
/*
class events{
  constuctor(){
    this.drehknopf = {};
    this.button = {};
    this.taster = {};
  }
  //--------------
  addEventListener('Taster an', (e) => console.log(e.detail.name+ " wurde gedrückt" ));
  addEventListener('Button an', (e) => console.log(e.detail.name+ " wurde angeschalten" ));
  addEventListener('Button aus', (e) => console.log(e.detail.name+ " wurde ausgeschaltet" ));
  addEventListener('Drehknopf', (e) => console.log(e.detail.name+ " wurde auf " + e.detail.wert+ " gedreht"));
*/


//NewElement erstellt ein neues Objekt, welches ausgewählt und gedreht werden kann
function newForeground(){

  //Erstellen des Canvas-Elements
  var canvas = document.getElementById('Foreground');       //variable canvas holt sich die Canvas Bezeichnung "Element1 aus Newindex.html"
  let ctx = canvas.getContext('2d');                      //notwendig, um vorgefertigte Methoden im Canvas zu verwenden
  let XposMouse,YposMouse;                               

 // Verwendete Canvas-Größe: 1160 * 605
  var objekts = []; // array für die Buttons und Drehknöpfe 
  var tasters = []; // array für die Taster


  //objekts.push(new NormalRotateButton(name,posX,posY,radius,stepValue,value, index,ctx,klickfunktion,minValue,maxValue))
  objekts.push(new NormalRotateButton("Triggerlevel",790,240,15, 1, 0, 3,ctx,true,-100,100));// Triggerlevel Drehknopf

  //tasters.push(new EckigerTaster(name,posX,posY,widthX,widthY,ctx,klickfunktion,fillstyle,fillstyle2,description))
  tasters.push(new EckigerTaster("Horizontal",770, 30, 60, 30, ctx, true,"darkgrey","grey","Horizontal"));//Taster für Horizontal



  objekts.push(new NormalRotateButton("Cursors",1060,240,15, 1, 0, 4,ctx,true,-100,100)); //Curser Drehknopf
  objekts.push(new NormalRotateButton("Intesity",715,345,15, 1, 0, 5,ctx,true,-100,100)); //intensity Drehknopf

  let a=new AbhängigerButton("H1",900,80,15, 100, 0,ctx,true,"X")//kleiner Drehknopf Horizonzal
  let b=new AbhängigerButton("Kanal1",730,580,15, 100,0,ctx,true,"Y")//kleiner Grehknopf Kanal 1
  let c=new AbhängigerButton("Kanal2",830,580,15, 100,0,ctx,true,"Y")//kleiner Grehknopf Kanal 2
  let d=new AbhängigerButton("Kanal3",930,580,15, 100,0,ctx,true,"Y")//kleiner Grehknopf Kanal 3
  let e=new AbhängigerButton("Kanal4",1030,580,15, 100,0,ctx,true,"Y")//kleiner Grehknopf Kanal 4

  objekts.push(a);
  objekts.push(b);
  objekts.push(c);
  objekts.push(d);
  objekts.push(e);
  
  objekts.push(new AchsenSkalierungButton("H",725,70,30, 1, 0,ctx,0,a,10**-9,50,"s",50)); //großer Drehknopf Horizontal

  objekts.push(new AchsenSkalierungButton("Kanal11",730,465,30, 1, 0,ctx,0,b,10**-3,5,"v",5));// großer Drehknopf Kanal 1
  objekts.push(new AchsenSkalierungButton("Kanal21",830,465,30, 1, 0,ctx,0,c,10**-3,5,"v",5));// großer Drehknopf Kanal 2
  objekts.push(new AchsenSkalierungButton("Kanal31",930,465,30, 1, 0,ctx,0,d,10**-3,5,"v",5));// großer Drehknopf Kanal 3
  objekts.push(new AchsenSkalierungButton("Kanal41",1030,465,30, 1, 0,ctx,0,e,10**-3,5,"v",5));// großer Drehknopf Kanal 4

  //Horizontal
  tasters.push(new EckigerTaster("Horizontal",770, 30, 60, 30, ctx, true,"darkgrey","grey","Horizontal"));          //Taster für Horizontal
  tasters.push(new EckigerTaster("Search",770, 70, 60, 30, ctx, true,"darkgrey","grey","Search"));                  //Taster für Search
  tasters.push(new EckigerTaster("Navigation",770, 110, 60, 30, ctx, true,"darkgrey","grey","Navigation"));         //Taster für Navigation
  //Run Control
  objekts.push(new EckigerButton("Run Stop",1000, 30, 65, 30, ctx, true,"lightgreen","red","Run Stop"));            //Knopf für Run Stop
  objekts.push(new EckigerButton("Single",1085, 30, 65, 30, ctx, true,"darkgrey","yellow","Single"));               //Knopf für Single
  tasters.push(new EckigerTaster("Default Setup",1000, 70, 65, 30, ctx, true,"darkgrey","grey","Default Setup"));   //Taster für Default Setup
  objekts.push(new EckigerButton("Autoscale",1085, 70, 65, 30, ctx, true,"darkgrey","lightgreen","Autoscale"));     //Taster für Autoscale
  //Trigger
  tasters.push(new EckigerTaster("Trigger",680, 190, 60, 30, ctx, true,"darkgrey","grey","Trigger"));               //Taster für Trigger
  tasters.push(new EckigerTaster("Force Trigger",825, 190, 75, 30, ctx, true,"darkgrey","grey","Force Trigger"));   //Taster für Force Trigger
  tasters.push(new EckigerTaster("Mode Coupling",825, 240, 75, 30, ctx, true,"darkgrey","grey","Mode Coupling"));   //Taster für Modecoupling
  //Measure
  tasters.push(new EckigerTaster("Cursors",940, 190, 60, 30, ctx, true,"darkgrey","grey","Cursors"));               //Taster für die Cursor
  tasters.push(new EckigerTaster("Meas",940, 240, 60, 30, ctx, true,"darkgrey","grey","Meas"));                     //Taster für Maesure
  //Tools
  tasters.push(new EckigerTaster("Utility",760, 305, 60, 30, ctx, true,"darkgrey","grey","Utility"));               //Taster für Utility
  objekts.push(new EckigerButton("Wave Gen",760, 355, 60, 30, ctx, true,"darkgrey","blue","Wave Gen"));             //Knopf für den Wave Generator
  tasters.push(new EckigerTaster("Quick Action",840, 305, 60, 30, ctx, true,"darkgrey","grey","Quick Action"));     //Taster für die Quick Action
  tasters.push(new EckigerTaster("Analyze",840, 355, 60, 30, ctx, true,"darkgrey","grey","Analyze"));               //Taster für den Analyzer
  //Waveform
  tasters.push(new EckigerTaster("Acquire",940, 305, 60, 30, ctx, true,"darkgrey","grey","Acquire")); 	            //Taster für  Acquire
  tasters.push(new EckigerTaster("Display",1050, 305, 60, 30, ctx, true,"darkgrey","grey","Display"));              //Taster fürs Display
  //File
  tasters.push(new EckigerTaster("Save Recall",940, 360, 60, 30, ctx, true,"darkgrey","grey","Save Recall"));       //Taster für Save Recall
  tasters.push(new EckigerTaster("Print",1050, 360, 60, 30, ctx, true,"darkgrey","grey","Print"));                  //Taster für Print
  //Kanäle
  objekts.push(new EckigerButton("Kanal 1",720, 520, 20, 30, ctx, true,"lightgrey","yellow","1"));                  //Knopf für Kanal 1
  objekts.push(new EckigerButton("Kanal 2",820, 520, 20, 30, ctx, true,"lightgrey","lightgreen","2"));              //Knopf für Kanal 2
  objekts.push(new EckigerButton("Kanal 3",920, 520, 20, 30, ctx, true,"lightgrey","lightblue","3"));               //Knopf für Kanal 3
  objekts.push(new EckigerButton("Kanal 4",1020, 520, 20, 30, ctx, true,"lightgrey","pink","4"));                   //Knopf für Kanal 4
  //Help und Label
  tasters.push(new EckigerTaster("Label",1090, 450, 60, 30, ctx, true,"darkgrey","grey","Label"));                  //Taster für Label
  tasters.push(new EckigerTaster("Help",1090, 500, 60, 30, ctx, true,"darkgrey","grey","Help"));                    //Taster für Help


  for (let objekt of objekts) objekt.draw();  // Zeichnet alle gepushten Objekte aus dem Array in das Canvas
  for (let taster of tasters) taster.draw();  // Zeichnet alle gepushten Taster aus dem Array in das Canvas


  //Event-Listener
  canvas.addEventListener('mousemove', Fokus, false);
  canvas.addEventListener('keydown', TasteGedrueckt, false);
  canvas.addEventListener('wheel', MausDrehen, false);
  canvas.addEventListener('click', DrehknopfKlick, false);
  canvas.addEventListener('mousedown', mousedown, false);
  canvas.addEventListener('mouseup', mouseup, false);



  //Ausgabe der aktuellen Cursor Positionf
  function Fokus(evt) {
    let rect = canvas.getBoundingClientRect();
    XposMouse = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    YposMouse = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    for ( let objekt of objekts){
      objekt.HasFocus(XposMouse,YposMouse,ctx);  
    }
  };

  //Maus-Wheel Funktion: Beim drehen mit dem Mausrad bewegt sich der Zeiger des Objekts
  function MausDrehen(evt){ 
    for ( let objekt of objekts){
      if( objekt.HasFocus(XposMouse,YposMouse,ctx))
      objekt.MouseRotate(evt);
    }
  }	  

  //Tasten-Funktion: Beim drücken von Arrow-Up und Arrow-Down bewegt sich der Zeiger des Objekts
  function TasteGedrueckt(evt){
    for ( let objekt of objekts){
      if( objekt.HasFocus(XposMouse,YposMouse,ctx))
      objekt.KeyClick(evt);
    }    
  }
  // Drehknopf wird geklickt
  function DrehknopfKlick (evt){
    for ( let objekt of objekts){
      if( objekt.HasFocus(XposMouse,YposMouse,ctx))
      objekt.Clicked(evt);
    }    
  }
  //--------- taster funktion -> mousedown -----------
  function mousedown (evt){
    for (let taster of tasters){
      if( taster.HasFocus(XposMouse,YposMouse,ctx))
        taster.mousegedrueckt(evt);
    }
  }
  //--------- taster funktion -> mouseup -----------
  function mouseup (evt){
    for (let taster of tasters){
      if( taster.HasFocus(XposMouse,YposMouse,ctx))
        taster.mouseloslassen(evt);

      }
  } 
}

//---- Anpassung für Einheiten
function SiPraefix(basis,exponent){
  var siPraefix = ["p","n","µ","m","","K","M","G"];
  var index = Math.floor(exponent/3) + 4;
  var nachkomma = (exponent/3 - Math.floor(exponent/3)).toFixed(1);
  switch (nachkomma){
    case "0.7":return [basis *100, siPraefix[index]];
      break;
    case "0.3":return [basis *10, siPraefix[index]];
      break;
    case "0.0":return [basis, siPraefix[index]];
      break;
  }
}

function GetBasisExponent(zahl){
  let zahlString = String(zahl.toExponential(2));
  const array = zahlString.split("e")
  return array;
}

