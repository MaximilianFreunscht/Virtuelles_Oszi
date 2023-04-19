function newBackground(){
  
    //Erstellen des Canvas-Elements
    var canvas = document.getElementById('Background');       //variable canvas holt sich die Canvas Bezeichnung "Background" aus Newindex.html"
    let ctx = canvas.getContext('2d');                      //notwendig, um vorgefertigte Methoden im Canvas zu verwenden
  
        
    //grauer Hintergrund "Horizontal" Etage 1 links, "Push for Fine" & Sinuskurven
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle="lightgrey";
    ctx.fillRect(680,5,300,160);
    ctx.fillStyle="black";
    ctx.font = "18px Arial";
    ctx.fillText("Horizontal",685,20);
    ctx.font = "9px Arial";
    ctx.fillText("Push for Fine",700,150);
    ctx.fillText("Push to Zero",875,110);
  
  
   //Sinuskurven oben links und unten
    var i, counter, x, y, increase;
  
    increase = 1/2*Math.PI / 9;
  
    //bei Horizontal
    counter = 0, x=690,y=115;
    for(i=0; i<=18; i+=1/2){
    ctx.moveTo(x,y);
    x = i;
    x+=690;
    y=  115 - Math.sin(counter)*5;
    counter += increase;
    ctx.lineTo(x,y);
    }
    ctx.stroke();
  
  
    counter = 0, x=740,y=115;
    for(i=0; i<=18; i+=1/2){
    ctx.moveTo(x,y);
    x = i;
    x+=740;
    y=  115 - Math.sin(counter)*10;
    counter += increase;
    ctx.lineTo(x,y);
    }
    ctx.stroke();
  
    //bei den einzelnen Kanälen
    counter = 0, x=690,y=500;
    for(i=0; i<=18; i+=1/2){
    ctx.moveTo(x,y);
    x = i;
    x+=690;
    y=  500 - Math.sin(counter)*5;
    counter += increase;
    ctx.lineTo(x,y);
    }
    ctx.stroke();
  
  
    counter = 0, x=755,y=500;
    for(i=0; i<=18; i+=1/2){
    ctx.moveTo(x,y);
    x = i;
    x+=755;
    y=  500 - Math.sin(counter)*10;
    counter += increase;
    ctx.lineTo(x,y);
    }
    ctx.stroke();
  
    //kanal2
    counter = 0, x=795,y=500;
    for(i=0; i<=18; i+=1/2){
    ctx.moveTo(x,y);
    x = i;
    x+=795;
    y=  500 - Math.sin(counter)*5;
    counter += increase;
    ctx.lineTo(x,y);
    }
    ctx.stroke();
  
  
    counter = 0, x=855, y=500;
    for(i=0; i<=18; i+=1/2){
    ctx.moveTo(x,y);
    x = i;
    x+=855;
    y=  500 - Math.sin(counter)*10;
    counter += increase;
    ctx.lineTo(x,y);
    }
    ctx.stroke();
  
    //kanal3
    counter = 0, x=890,y=500;
    for(i=0; i<=18; i+=1/2){
    ctx.moveTo(x,y);
    x = i;
    x+=890;
    y=  500 - Math.sin(counter)*5;
    counter += increase;
    ctx.lineTo(x,y);
    }
    ctx.stroke();
  
  
    counter = 0, x=955,y=500;
    for(i=0; i<=18; i+=1/2){
    ctx.moveTo(x,y);
    x = i;
    x+=955;
    y=  500 - Math.sin(counter)*10;
    counter += increase;
    ctx.lineTo(x,y);
    }
    ctx.stroke();
  
    //kanal 4
    counter = 0, x=990,y=500;
    for(i=0; i<=18; i+=1/2){
    ctx.moveTo(x,y);
    x = i;
    x+=990;
    y=  500 - Math.sin(counter)*5;
    counter += increase;
    ctx.lineTo(x,y);
    }
    ctx.stroke();
  
  
    counter = 0, x=1055,y=500;
    for(i=0; i<=18; i+=1/2){
    ctx.moveTo(x,y);
    x = i;
    x+=1055;
    y=  500 - Math.sin(counter)*10;
    counter += increase;
    ctx.lineTo(x,y);
    }
    ctx.stroke();

  
    // "Run Control Etage 1 rechts"
    ctx.fillStyle="lightgrey";
    ctx.fillRect(1000,10,15,10);
    ctx.fillRect(1135,10,15,10);
    ctx.fillStyle="black";
    ctx.font = "18px Arial";
    ctx.fillText("Run Control",1025,20);
   
  
    // "Trigger" Etage 2 links mit "Push for 50%" & "Level"
    ctx.fillStyle="lightgrey";
    ctx.fillRect(680,175,70,10);
    ctx.fillRect(830,175,70,10);
    ctx.fillStyle="black";
    ctx.font = "18px Arial";
    ctx.fillText("Trigger",760,185);
    ctx.font = "9px Arial";
    ctx.fillText("Push for 50%",760,210);
    ctx.font = "12px Arial";
    ctx.fillText("Level",775,270);
  
  
    // "Measure" Etage 2 mittig mit "Push to Select"
    ctx.fillStyle="lightgrey";
    ctx.fillRect(940,175,40,10);
    ctx.fillRect(1070,175,40,10);
    ctx.fillStyle="black";
    ctx.font = "18px Arial";
    ctx.fillText("Measure",990,185);
    ctx.font = "9px Arial";
    ctx.fillText("Push to Select",1035,210);
    ctx.font = "12px Arial";
    ctx.fillText("Cursors",1040,270);
  
  
    // Dunkelgraue Box Etage 3 links mit "Push to Zero" und "Intensity"
    ctx.fillStyle="grey";
    ctx.fillRect(680,250,70,150);
    ctx.fillStyle="black";
    ctx.font = "9px Arial";
    ctx.fillText("Push to Zero",688,305);
    ctx.fillText("Intensity",698,390);
  
  
    // "Tools", "Waveform", "File" Etage 3 mittig
    ctx.fillStyle="lightgrey";
    ctx.fillRect(760,290,40,10);
    ctx.fillRect(860,290,40,10);
    ctx.fillRect(940,290,35,10);
    ctx.fillRect(1075,290,35,10);
    ctx.fillRect(940,345,60,10);
    ctx.fillRect(1050,345,60,10);
    ctx.fillRect(915,300,5,90);
    ctx.fillStyle="black";
    ctx.font = "18px Arial";
    ctx.fillText("Tools",808,300);
    ctx.fillText("Waveform",985,300);
    ctx.fillText("File",1010,355);
  
  
    //"Vertical" Etage 4, "Push for Fine", "Push to Zero"
    ctx.fillStyle="lightgrey";
    ctx.fillRect(680,415,185,10);
    ctx.fillRect(965,415,185,10);
    ctx.fillStyle="black";
    ctx.font = "18px Arial";
    ctx.fillText("Vertical",890,425);
    ctx.font = "9px Arial";
    //ctx.fillText("Push for Fine",810,465);
    //ctx.fillText("Push for Fine",1160,465);
    ctx.fillText("Push to Zero",755,583);
    ctx.fillText("Push to Zero",955,583);
  
}
