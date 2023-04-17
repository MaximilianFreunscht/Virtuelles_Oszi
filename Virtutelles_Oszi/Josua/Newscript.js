//Klasse der Rotation-Buttons
class RotationTickButton {
      constructor(posX,posY,radius,stepValue,value, index,ctx,klickfunktion,minValue,maxValue) {
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
    }//---------------------------------------
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
  } //------------------------------------------
	MouseRotate(e){
	  let x;
    if (e.deltaY <= 0 ) x = -1;
    else if(e.deltaY > 0) x = 1;
    this.onTick(x);
    this.draw(true);
  }//---------------------------------------------
  KeyClick(e){
	  var x ;
	    if (e.keyCode == 38) x = 1; //Wenn Arrow-Up
      else if (e.keyCode == 40) x = -1; //Wenn Arrow-Down
      else x=0;
		 this.onTick(x);
		 this.draw(true);  
	} //---------------------------------------------
  Clicked(){
    if(this.klickfunktion == true){
      this.clicked =! this.clicked;
        this.draw(true);
      }
    }//--------------------------------------------
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
      console.log("Element "+this.index+" Value: "+ this.value) 
  }
}

class RotateButtonTwoStep extends RotationTickButton{
  constructor(posX,posY,radius,stepValue1,stepValue2,value, index,ctx,klickfunktion,minValue,maxValue) {
    super(posX,posY,radius,stepValue1,value, index,ctx,klickfunktion,minValue,maxValue);
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
      console.log("Element "+this.index+" Value: "+ this.value)
    }
  }

class AchsenSkalierungButton extends RotationTickButton{
  constructor(posX,posY,radius,stepValue,value,ctx,klickfunktion,Button,minValue,maxValue,einheit) { //10**-9 //50
    super(posX,posY,radius,stepValue,value,0,ctx,true);
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
          //console.log(this.Button);
          this.Button.StepValue(this.ausgabewert,this.basis);
        }
      let buttonValue = SiPraefix(this.basis,this.exponent);
      console.log(buttonValue[0]+buttonValue[1]+this.einheit);

    }
}
class AbhängigerButton extends RotationTickButton{
  constructor(posX,posY,radius,stepValue,value,ctx,klickfunktion,Achse) {
    super(posX,posY,radius,stepValue,value, 0,ctx,klickfunktion);
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
          console.log(ausgabe[0]+ausgabe[1]);
        }
  }
  
//NewKnob erstellt ein neues Objekt, welches ausgewählt und gedreht werden kann
function newElement(){

    //Erstellen des Canvas-Elements
    var canvas = document.getElementById('Element1');
    let ctx = canvas.getContext('2d');
    let XposMouse,YposMouse; 
  
  // Drehknöpfe in Array einfügen und alle zeichnen lassen
  var objekts = [];// g einfügen zum zeigen
  objekts.push(new NormalRotateButton(425,50,25, 1, 0, 1,ctx,false,-10,10));
	objekts.push(new NormalRotateButton(575,50,25, 1, 0, 2,ctx,true,-100,100));
	objekts.push(new RotateButtonTwoStep(350,150,40, 100,5,0, 3,ctx,false,-500,500));
  let a=new AbhängigerButton(650,250,20, 100,0,ctx,true,"X")
  let b=new AbhängigerButton(500,250,20, 100,0,ctx,true,"Y")
  objekts.push(a);
  objekts.push(b);
  objekts.push(new AchsenSkalierungButton(650,150,40, 1, 0,ctx,0,a,10**-9,50,"s",50));
  objekts.push(new AchsenSkalierungButton(500,150,40, 1, 0,ctx,0,b,10**-3,5,"v",5));
  objekts.push(new AchsenSkalierungButton(75,300,55, 1, 0,ctx,0,null,10**-9,50,"s",50));
  for ( let objekt of objekts) objekt.draw();

    //Event-Listener
    canvas.addEventListener('mousemove', Fokus,false);
    canvas.addEventListener('keydown', TasteGedrueckt,false);
    canvas.addEventListener('wheel', MausDrehen, false);
    canvas.addEventListener('click', DrehknopfKlick, false);
    
  
    //Ausgabe der aktuellen Cursor Position
    function Fokus(evt) {
      let rect = canvas.getBoundingClientRect();
      XposMouse = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
      YposMouse = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
      for ( let objekt of objekts)
      {
        objekt.HasFocus(XposMouse,YposMouse,ctx);  
      }
    };
  

    //Maus-Wheel Funktion: Beim drehen mit dem Mausrad bewegt sich der Zeiger des Objekts
    function MausDrehen(evt){ 
      for ( let objekt of objekts)
      {
        if( objekt.HasFocus(XposMouse,YposMouse,ctx))
          objekt.MouseRotate(evt);
      }
	}	  
    //Tasten-Funktion: Beim drücken von Arrow-Up und Arrow-Down bewegt sich der Zeiger des Objekts
  function TasteGedrueckt(evt){
    for ( let objekt of objekts)
		{
		  if( objekt.HasFocus(XposMouse,YposMouse,ctx))
		    objekt.KeyClick(evt);
		}    
	}

  function DrehknopfKlick (evt){
    for ( let objekt of objekts)
		{
		  if( objekt.HasFocus(XposMouse,YposMouse,ctx))
		    objekt.Clicked(evt);
		}    
	}

}
function SiPraefix(basis,exponent)
{
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

