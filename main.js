video = "";
status1  = "";
objects = [];
function preload()
{
    video = createVideo("video.mp4");
    video.hide();
}
function setup()
{
    canvas = createCanvas(400, 400);
    canvas.center();
}
function draw()
{
    image(video, 0, 0, 400, 400);
    if(status1 != "")
    {
        objectDetector.detect(video, gotResult);
        for( i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are " + objects.length;

            fill("white");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + percent + " " + "%" , objects[i].x + 15, objects[i].y + 15 );
            noFill();
            stroke("black");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function modelLoaded()
{
    console.log("Model Loaded");
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function start()
{
    objectDetector =  ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = " Status : Detecting Objects";
}
function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}