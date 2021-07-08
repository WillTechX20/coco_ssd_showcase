var canvas=null;
var img=null;
var newObjectDetector=null;
var statusDiv=document.querySelector('.status');
var statusBoolean=false;
var detectedObjectArray=[];

function preload(){
    img=loadImage('images/'+document.documentElement.dataset.testImgName+'.jpg');
}

function gotResult(results, error){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        detectedObjectArray=results;
        statusBoolean=true;
    }
}

function onModelLoaded(){
    console.log('Model Loaded!');
    statusDiv.innerText='Status: Detecting Objects';
    newObjectDetector.detect(img, gotResult);
}

function setup(){
    canvas=createCanvas(320, 180);
    canvas.center();
    newObjectDetector=ml5.objectDetector('cocossd', onModelLoaded);
}    

Math.toFlooredPercent=function(num){
    return toString(this.floor(num*100))+'%';
}

function draw(){
    image(img, 0, 0, 640, 420);

    if(statusBoolean){
        for(i=0; i<detectedObjectArray.length; i++){
            statusDiv.innerText='Status: Objects Detected';
            fill('green');
            stroke('green');
            text(detectedObjectArray[i].label+' Percent: '+Math.toFlooredPercent(detectedObjectArray[i].confidence), detectedObjectArray[i].x+15, detectedObjectArray[i].y+15);
            noFill();
            rect(detectedObjectArray[i].x, detectedObjectArray[i].y, detectedObjectArray[i].width, detectedObjectArray[i].height);
        }
    }
}