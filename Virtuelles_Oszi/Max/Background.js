function newBackground(){
  
    //Erstellen des Canvas-Elements
    var canvas = document.getElementById('Background');       //variable canvas holt sich die Canvas Bezeichnung "Background" aus Newindex.html"
    let ctx = canvas.getContext('2d');                      //notwendig, um vorgefertigte Methoden im Canvas zu verwenden
  
        
    //grauer Hintergrund "Horizontal" Etage 1 links, "Push for Fine" & Sinuskurven
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle="lightgrey";
    ctx.fillRect(680,5,400,160);
    ctx.fillStyle="black";
    ctx.font = "18px Arial";
    ctx.fillText("Horizontal",685,20);
    ctx.font = "9px Arial";
    ctx.fillText("Push for Fine",700,150);
  
  
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
    counter = 0, x=710,y=500;
    for(i=0; i<=18; i+=1/2){
    ctx.moveTo(x,y);
    x = i;
    x+=710;
    y=  500 - Math.sin(counter)*5;
    counter += increase;
    ctx.lineTo(x,y);
    }
    ctx.stroke();
  
  
    counter = 0, x=775,y=500;
    for(i=0; i<=18; i+=1/2){
    ctx.moveTo(x,y);
    x = i;
    x+=775;
    y=  500 - Math.sin(counter)*10;
    counter += increase;
    ctx.lineTo(x,y);
    }
    ctx.stroke();
  
  
    counter = 0, x=885,y=500;
    for(i=0; i<=18; i+=1/2){
    ctx.moveTo(x,y);
    x = i;
    x+=885;
    y=  500 - Math.sin(counter)*5;
    counter += increase;
    ctx.lineTo(x,y);
    }
    ctx.stroke();
  
  
    counter = 0, x=950, y=500;
    for(i=0; i<=18; i+=1/2){
    ctx.moveTo(x,y);
    x = i;
    x+=950;
    y=  500 - Math.sin(counter)*10;
    counter += increase;
    ctx.lineTo(x,y);
    }
    ctx.stroke();
  
  
    counter = 0, x=1060,y=500;
    for(i=0; i<=18; i+=1/2){
    ctx.moveTo(x,y);
    x = i;
    x+=1060;
    y=  500 - Math.sin(counter)*5;
    counter += increase;
    ctx.lineTo(x,y);
    }
    ctx.stroke();
  
  
    counter = 0, x=1125,y=500;
    for(i=0; i<=18; i+=1/2){
    ctx.moveTo(x,y);
    x = i;
    x+=1125;
    y=  500 - Math.sin(counter)*10;
    counter += increase;
    ctx.lineTo(x,y);
    }
    ctx.stroke();
  
  
    counter = 0, x=1235,y=500;
    for(i=0; i<=18; i+=1/2){
    ctx.moveTo(x,y);
    x = i;
    x+=1235;
    y=  500 - Math.sin(counter)*5;
    counter += increase;
    ctx.lineTo(x,y);
    }
    ctx.stroke();
  
  
    counter = 0, x=1300,y=500;
    for(i=0; i<=18; i+=1/2){
    ctx.moveTo(x,y);
    x = i;
    x+=1300;
    y=  500 - Math.sin(counter)*10;
    counter += increase;
    ctx.lineTo(x,y);
    }
    ctx.stroke();

  
    // "Run Control Etage 1 rechts"
    ctx.fillStyle="lightgrey";
    ctx.fillRect(1100,10,50,10);
    ctx.fillRect(1265,10,50,10);
    ctx.fillStyle="black";
    ctx.font = "18px Arial";
    ctx.fillText("Run Control",1160,20);
   
  
    // "Trigger" Etage 2 links mit "Push for 50%" & "Level"
    ctx.fillStyle="lightgrey";
    ctx.fillRect(690,175,70,10);
    ctx.fillRect(840,175,70,10);
    ctx.fillStyle="black";
    ctx.font = "18px Arial";
    ctx.fillText("Trigger",770,185);
    ctx.font = "9px Arial";
    ctx.fillText("Push for 50%",790,210);
    ctx.font = "12px Arial";
    ctx.fillText("Level",805,270);
  
  
    // "Measure" Etage 2 mittig mit "Push to Select"
    ctx.fillStyle="lightgrey";
    ctx.fillRect(950,175,40,10);
    ctx.fillRect(1080,175,40,10);
    ctx.fillStyle="black";
    ctx.font = "18px Arial";
    ctx.fillText("Measure",1000,185);
    ctx.font = "9px Arial";
    ctx.fillText("Push to Select",1055,210);
    ctx.font = "12px Arial";
    ctx.fillText("Cursors",1075,270);
  
  
    // Dunkelgraue Box Etage 3 links mit "Push to Zero" und "Intensity"
    ctx.fillStyle="grey";
    ctx.fillRect(690,250,70,150);
    ctx.fillStyle="black";
    ctx.font = "9px Arial";
    ctx.fillText("Push to Zero",695,305);
    ctx.fillText("Intensity",715,390);
  
  
    // "Tools", "Waveform", "File" Etage 3 mittig
    ctx.fillStyle="lightgrey";
    ctx.fillRect(770,290,40,10);
    ctx.fillRect(870,290,40,10);
    ctx.fillRect(950,290,35,10);
    ctx.fillRect(1085,290,35,10);
    ctx.fillRect(950,345,60,10);
    ctx.fillRect(1060,345,60,10);
    ctx.fillRect(925,300,5,90);
    ctx.fillStyle="black";
    ctx.font = "18px Arial";
    ctx.fillText("Tools",818,300);
    ctx.fillText("Waveform",995,300);
    ctx.fillText("File",1020,355);
  
  
    //"Vertical" Etage 4, "Push for Fine", "Push to Zero"
    ctx.fillStyle="lightgrey";
    ctx.fillRect(700,415,250,10);
    ctx.fillRect(1060,415,250,10);
    ctx.fillStyle="black";
    ctx.font = "18px Arial";
    ctx.fillText("Vertical",975,425);
    ctx.font = "9px Arial";
    ctx.fillText("Push for Fine",810,465);
    ctx.fillText("Push for Fine",1160,465);
    ctx.fillText("Push to Zero",810,605);
    ctx.fillText("Push to Zero",1160,605);
  
}
  
  
  
  
    //for (let objekt of objekts) objekt.draw();  // Zeichnet alle pushten Objekte aus dem Array in das Canvas
