import anime from "animejs";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";


export default function Home() {
  const captionRef = useRef();
  const [link, setLink] = useState('');
  const [url, setUrl] = useState('');

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

  const captionHandler = () => {
    const section = captionRef.current;
    console.log(section);

    html2canvas(section).then(function (canvas) {
      console.log(canvas.toDataURL())
      try {
        fetch('/api/upload', {
          method: 'POST',
          body: JSON.stringify({ data: canvas.toDataURL() }),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((response) => response.json())
          .then((data) => {
            setLink(data.data);
          });
      } catch (error) {
        console.error(error);
      }
    })
  }

  return (
    <>
      <nav>
        <h2>Timeline Animations using Javascript</h2>
        {url && <a href={link}><h3>Caption</h3></a>}
        <button onClick={captionHandler}>Caption</button>
      </nav>
      <section id="section" ref={captionRef}>
        <div >
          <img src="https://res.cloudinary.com/dogjmmett/image/upload/v1655218735/desert_vyi5on.jpg" id="desert" />
          <img src="https://res.cloudinary.com/dogjmmett/image/upload/v1655218728/wolf_xficul.png" id="wolf" />
          <a href="#" id="btn">Play</a>
          <img src="https://res.cloudinary.com/dogjmmett/image/upload/v1655218726/cave_upzxju.png" id="cave" />
          <h2 id="text"><span>A</span>wesome</h2>
        </div>
      </section>
    </>
  )
}