### Timeline Animations using Javascript

## Introduction
An animation timeline allows a user to create chronological order of movement and position of objects on a webpage. It's also simple since its build is similar to CSS animation and it supports both JavaScript and CSS play methods. Well, be able to caption any point of the animation for Cloudinary upload.

## Codesandbox

Check the sandbox demo on  [Codesandbox](/).

<CodeSandbox
title=""
id=" "
/>

You can also get the project GitHub repo using [Github](/).

## Prerequisites

Entry-level javascript and React/Nextjs knowledge.

## Setting Up the Sample Project

Create a Nextjs app `npx create-next-app terminal` .
Head to your project `cd terminal`
 

We will begin by setting up [Cloudinary](https://cloudinary.com/?ap=em) integration of our serverside backend. We will use it to configure the Cloudinary media file upload procedure.

Create your Cloudinary account using [Link](https://cloudinary.com/console) and log into it. Each user account will have a dashboard containing environmental variable keys necessary for the integration into the project.

In your project directory, Include Cloudinary in your project dependencies `npm install cloudinary`
 create a new file named `.env.local` and paste the following code. Fill the blanks with your environment variables from the Cloudinary dashboard.

```
CLOUDINARY_CLOUD_NAME =

CLOUDINARY_API_KEY =

CLOUDINARY_API_SECRET =
```

Restart your project: `npm run dev`.

In the `pages/api` folder, create a new file named `upload.js`. 
Configure the environment keys and libraries.

```
var cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

Create a handler function to execute the POST request. The function will receive media file data and post it to the Cloudinary website. It then captures the media file's Cloudinary link and sends it back as a response.

```
export default async function handler(req, res) {
    if (req.method === "POST") {
        let url = ""
        try {
            let fileStr = req.body.data;
            const uploadedResponse = await cloudinary.uploader.upload_large(
                fileStr,
                {
                    resource_type: "video",
                    chunk_size: 6000000,
                }
            );
            url = uploadedResponse.url
        } catch (error) {
            res.status(500).json({ error: "Something wrong" });
        }

        res.status(200).json({data: url});
    }
}
```

 

Our backend is concluded.

In the front end, start by pasting the following in the front end.

```
"pages/index.js"


    import anime from "animejs";
    import { useEffect, useRef, useState } from "react";
    import html2canvas from "html2canvas";

export default function Home() {
    const captionRef = useRef();
 
    const captionHandler = () => {
    }
  return (
    <>
      <nav>
        <h2>Timeline Animations using Javascript</h2>
        <button onClick={captionHandler}>Caption</button>
      </nav>
      <section id="section" ref={captionRef}>
        <div >
          <img src="desert.jpg" id="desert" />
          <img src="wolf.png" id="wolf" />
          <a href="#" id="btn">Play</a>
          <img src="cave.png" id="cave" />
          <h2 id="text"><span>A</span>wesome</h2>
        </div>
      </section>
    </>
  )
}
```

In the code above, note the two dependencies `html2canvas` and `anime`. We use `anime` to animate our dom elements. Animejs is a lightweight JavaScript animation library with a simple, and powerful API. `html2canvas` will be used to caption the final result for backend upload. We will also involve react hooks to access the DOM elements in our functions. We use the `useEffect` hook to manage the animation side effects and finally, we have a function `captionHandler` that will manage the caption online upload.

In the return statement, we will have to merge 3 pictures. A `dog`, a `cave`, and a `desert` backend. We can also add text just to showcase. You can locate the images in the examples below and use the css files in the `styles/global` folder in the Github repo.


![desert](https://res.cloudinary.com/dogjmmett/image/upload/v1655218735/desert_vyi5on.jpg "desert")
![wolf](https://res.cloudinary.com/dogjmmett/image/upload/v1655218728/wolf_xficul.png "wolf")
![cave](https://res.cloudinary.com/dogjmmett/image/upload/v1655218726/cave_upzxju.png "cave")


Now let us begin. Inside a `useEffect` hook, paste the following:

```
"pages/index"

  useEffect(() => {
    var animation = anime.timeline({
      autoplay: false
    });

    animation.add({
      targets: '#btn',
      top: '1500px',
      duration: 500,
      easing: 'easeInOutSine'
    });


    animation.add({
      targets: '#wolf',
      top: '50px',
      duration: 500,
      easing: 'easeInOutSine'
    });

    animation.add({
      targets: '#cave',
      top: '10px',
      duration: 500,
      easing: 'easeInOutSine'
    });

    animation.add({
      targets: '#text',
      top: '35%',
      left: '50%',
      duration: 500,
      easing: 'easeInOutSine'
    });

    document.querySelector('#btn').onclick = animation.play;

  }, []);

```

In the code above, we first instantiate anime library and configure it not to run automatically when the web page is rendered. This is because we want the animation to begin only when instructed. There will be a button onl=click lister to make that happen. We will use the `add` property to include the 3 images and the button. When the button is clicked, It should move down below the screen and the dog, text, and cave appear from the top screen. The desert image will be placed in the background. 

When adding each animation, use the `targets ` parameter to reference the element. the `top` property shows how many pixels the object should be placed from the top of the page. you can use any direction on this property e.g `left`, `right`, and `bottom`. `duration` determines the milliseconds the object will take to animate, and finally `easing` is the process of making an animation not so severe or pronounced.


The final image should look like the below:

![UI](https://res.cloudinary.com/dogjmmett/image/upload/v1655302752/UI_zhkwcf.png "UI").

That completes it. We have succesfully created a timeline animation in a webpage. Enjoy!