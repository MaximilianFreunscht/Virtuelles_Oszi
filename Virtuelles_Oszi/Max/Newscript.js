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

    // Fokuskreis bei Klick
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    if(this.clicked){ctx.fillStyle = 'black';}
    else{ctx.fillStyle = 'white';}
    ctx.arc (0, 0, radius*0.918, 0, Math.PI*2, false);
    ctx.fill();

    //Innerer Kreis
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    if(this.clicked){ctx.fillStyle = 'whitesmoke';console.log("clicked")}
    else{ctx.fillStyle = 'white';}
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
        if (this.value >= this.minValue) this.angle-=100;// Mit Uhrzeigersinn drehen
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
  }
}
//---------------------------Knöpfe-----------------------------------------

class EckigerButton {
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
  //--------------------
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
      console.log(this.name + " Is not clicked")
    }
    else{
      ctx.fillStyle = fillstyle2;
      console.log(this.name + " Is clicked")
    }
    ctx.fillRect(this.posX,this.posY,this.widthX,this.widthY);
    ctx.font = "10px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(this.description, this.posX+(this.widthX/2),this.posY+(this.widthY/2));
  }
}

//------------- Taster ----------------
class EckigerTaster {
  constructor(name,id,posX,posY,widthX,widthY,ctx,klickfunktion,fillstyle,fillstyle2,description){
    this.name = name;
    this.id = id;
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
  //-------------------
  Clicked(){
    const taster = this.id;
      taster.onmousedown = function() {
        console.log('Der Button wurde gedrückt!');
      }
      this.draw();
      
    
  }
      

  /*Clicked(){
    var elem = document.getElementByClass("EckigerTaster");
    elem.addEventListener("mousedown", mouseDown);
    elem.addEventListener("mouseup", mouseUp);	
    this.draw();
  }*/
  	

  
  //------------------------------------------
  draw(){ 
    let ctx=this.ctx;
    let fillstyle=this.fillstyle;
    let fillstyle2=this.fillstyle2;
    ctx.fillStyle = fillstyle;
  
    if(this.clicked){  
      ctx.fillStyle = fillstyle2;
    }

    ctx.fillRect(this.posX,this.posY,this.widthX,this.widthY);
    ctx.font = "10px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(this.description, this.posX+(this.widthX/2),this.posY+(this.widthY/2));
  }
}


//-------------------- Sammel Klasse-----------------











//NewElement erstellt ein neues Objekt, welches ausgewählt und gedreht werden kann
function newElement(){

  //Erstellen des Canvas-Elements
  var canvas = document.getElementById('Element1');       //variable canvas holt sich die Canvas Bezeichnung "Element1 aus Newindex.html"
  let ctx = canvas.getContext('2d');                      //notwendig, um vorgefertigte Methoden im Canvas zu verwenden
  let XposMouse,YposMouse;                               

 // Verwendete Canvas-Größe: 1200 * 650
  var objekts = []; // g einfügen zum zeigen

  objekts.push(new NormalRotateButton("Triggerlevel",790,240,15, 1, 0, 3,ctx,true,-100,100)); // Triggerlevel Drehknopf
  objekts.push(new NormalRotateButton("Cursors",1060,240,15, 1, 0, 4,ctx,true,-100,100)); //Curser Drehknopf
  objekts.push(new NormalRotateButton("Intesity",715,345,15, 1, 0, 5,ctx,true,-100,100)); //intensity Drehknopf

  let a=new AbhängigerButton("H1",900,80,15, 100, 0,ctx,true,"X")//kleiner Drehknopf Horizonzal
  let b=new AbhängigerButton("K1",730,580,15, 100,0,ctx,true,"Y")//kleiner Grehknopf Kanal 1
  let c=new AbhängigerButton("K2",830,580,15, 100,0,ctx,true,"Y")//kleiner Grehknopf Kanal 2
  let d=new AbhängigerButton("K3",930,580,15, 100,0,ctx,true,"Y")//kleiner Grehknopf Kanal 3
  let e=new AbhängigerButton("K4",1030,580,15, 100,0,ctx,true,"Y")//kleiner Grehknopf Kanal 4

  objekts.push(a);
  objekts.push(b);
  objekts.push(c);
  objekts.push(d);
  objekts.push(e);
  
  objekts.push(new AchsenSkalierungButton("H",725,70,30, 1, 0,ctx,0,a,10**-9,50,"s",50)); //großer Drehknopf Horizontal

  objekts.push(new AchsenSkalierungButton("K11",730,465,30, 1, 0,ctx,0,b,10**-3,5,"v",5));// großer Drehknopf Kanal 1
  objekts.push(new AchsenSkalierungButton("K21",830,465,30, 1, 0,ctx,0,c,10**-3,5,"v",5));// großer Drehknopf Kanal 2
  objekts.push(new AchsenSkalierungButton("K31",930,465,30, 1, 0,ctx,0,d,10**-3,5,"v",5));// großer Drehknopf Kanal 3
  objekts.push(new AchsenSkalierungButton("K41",1030,465,30, 1, 0,ctx,0,e,10**-3,5,"v",5));// großer Drehknopf Kanal 4

  //Horizontal
  objekts.push(new EckigerTaster("Horizontal","Horizontal",770, 30, 60, 30, ctx, true,"darkgrey","grey","Horizontal"));
  objekts.push(new EckigerButton("Search",770, 70, 60, 30, ctx, true,"darkgrey","grey","Search"));
  objekts.push(new EckigerButton("Navigation",770, 110, 60, 30, ctx, true,"darkgrey","grey","Navigation"));
  //Run Control
  objekts.push(new EckigerButton("Run Stop",1000, 30, 65, 30, ctx, true,"lightgreen","red","Run Stop"));//
  objekts.push(new EckigerButton("Single",1085, 30, 65, 30, ctx, true,"darkgrey","yellow","Single"));//
  objekts.push(new EckigerButton("Default Setup",1000, 70, 65, 30, ctx, true,"darkgrey","grey","Default Setup"));
  objekts.push(new EckigerButton("Autoscale",1085, 70, 65, 30, ctx, true,"darkgrey","lightgreen","Autoscale"));//
  //Trigger
  objekts.push(new EckigerButton("Trigger",680, 190, 60, 30, ctx, true,"darkgrey","grey","Trigger"));
  objekts.push(new EckigerButton("Force Trigger",825, 190, 75, 30, ctx, true,"darkgrey","grey","Force Trigger"));
  objekts.push(new EckigerButton("Mode Coupling",825, 240, 75, 30, ctx, true,"darkgrey","grey","Mode Coupling"));
  //Measure
  objekts.push(new EckigerButton("Cursors",940, 190, 60, 30, ctx, true,"darkgrey","grey","Cursors"));
  objekts.push(new EckigerButton("Meas",940, 240, 60, 30, ctx, true,"darkgrey","grey","Meas"));
  //Tools
  objekts.push(new EckigerButton("Utility",760, 305, 60, 30, ctx, true,"darkgrey","grey","Utility"));
  objekts.push(new EckigerButton("Wave Gen",760, 355, 60, 30, ctx, true,"darkgrey","blue","Wave Gen"));//
  objekts.push(new EckigerButton("Quick Action",840, 305, 60, 30, ctx, true,"darkgrey","grey","Quick Action"));
  objekts.push(new EckigerButton("Analyze",840, 355, 60, 30, ctx, true,"darkgrey","grey","Analyze"));
  //Waveform
  objekts.push(new EckigerButton("Acquire",940, 305, 60, 30, ctx, true,"darkgrey","grey","Acquire"));
  objekts.push(new EckigerButton("Display",1050, 305, 60, 30, ctx, true,"darkgrey","grey","Display"));
  //File
  objekts.push(new EckigerButton("Save Recall",940, 360, 60, 30, ctx, true,"darkgrey","grey","Save Recall"));
  objekts.push(new EckigerButton("Print",1050, 360, 60, 30, ctx, true,"darkgrey","grey","Print"));
  //Kanäle
  objekts.push(new EckigerButton("Kanal 1",720, 520, 20, 30, ctx, true,"lightgrey","yellow","1"));//
  objekts.push(new EckigerButton("Kanal 2",820, 520, 20, 30, ctx, true,"lightgrey","lightgreen","2"));//
  objekts.push(new EckigerButton("Kanal 3",920, 520, 20, 30, ctx, true,"lightgrey","lightblue","3"));//
  objekts.push(new EckigerButton("Kanal 4",1020, 520, 20, 30, ctx, true,"lightgrey","pink","4"));//
  //Help und Label
  objekts.push(new EckigerButton("Label",1090, 450, 60, 30, ctx, true,"darkgrey","grey","Label"));
  objekts.push(new EckigerButton("Help",1090, 500, 60, 30, ctx, true,"darkgrey","grey","Help"));


  for (let objekt of objekts) objekt.draw();  // Zeichnet alle pushten Objekte aus dem Array in das Canvas



  //Event-Listener
  canvas.addEventListener('mousemove', Fokus, false);
  canvas.addEventListener('keydown', TasteGedrueckt, false);
  canvas.addEventListener('wheel', MausDrehen, false);
  canvas.addEventListener('click', DrehknopfKlick, false);
  

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

  function DrehknopfKlick (evt){
    for ( let objekt of objekts){
      if( objekt.HasFocus(XposMouse,YposMouse,ctx))
        objekt.Clicked(evt);
      }    
  }
}

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

//------------------------------------------------------------------------------
function start() {
  document.querySelector('#this.id').onclick = klickverarbeitung;
}

function klickverarbeitung() {
  console.log('this.name ist geclickt');
}