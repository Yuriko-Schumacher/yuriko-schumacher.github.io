<script>
  import { widont } from 'journalize';
</script>

<div class="about" id="about">
  <div class="about__container">
    <div class="about__img">
      <img src="./image/yuriko.png" alt="" width="350" />
    </div>
    <div class="about__info">
      <h1>Hi, I'm Yuriko.</h1>
      <p>
        I'm a data visualization journalist based in Austin, TX. Currently, I work as a data visuals designer/developer at the Texas Tribune. I am passionate about designing and producing meaningful (and beautiful &#10024;) graphics/data tools that tell {widont("important stories.")}
      </p>
      <br>
      <p>
        My skills currently include: front-end development with frameworks like React and Svelte, JavaScript libraries including d3.js and three.js, data analysis and statistical analysis in R, GIS analysis and production using QGIS, design tools like figma, and graphics prodution with Illustrator. I'm constantly exploring new technologies as I pursue the best ways to execute {widont("on projects!")}
      </p>
      <div class="about__lists">
        <ul class="about__list contact-info">
          <li class="font--special">
            <a href="mailto:yuriko.schumacher@gmail.com"
              ><i class="far fa-envelope"></i>
              yuriko.schumacher@gmail.com</a
            >
          </li>
          <li class="font--special">
            <a href="tel:6466680656"
              ><i class="fas fa-phone"></i> 646-668-0656</a
            >
          </li>
        </ul>
        <ul class="about__list">
          <li class="font--special">
            <a href="./pdf/resume.pdf" target="_blank">Resume</a>
          </li>
          <li class="font--special">
            <a href="#work">Work</a>
          </li>
          <li>
            <a href="https://twitter.com/yuriko_a_s" target="_blank"
              ><i class="fa-brands fa-x-twitter"></i></a>
          </li>
          <li>
            <a href="https://github.com/Yuriko-Schumacher" target="_blank"
              ><i class="fab fa-github"></i
            ></a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/yuriko-schumacher/?locale=en_US"
              target="_blank"
              ><i class="fab fa-linkedin"></i
            ></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<style>
  .about {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .about__container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .about__container > * {
    flex: 0 1 40%;
  }
  .about__img {
    display: flex;
    justify-content: flex-end;
    align-self: flex-end;
  }
  .about__img > img {
    max-width: 300px;
    width: 90%;
    margin-right: 5%;
  }
  .about__info {
    max-width: 600px;
    min-height: 480px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 0 1em 0;
  }
  .about__lists {
    margin-top: 1.5rem;
  }
  .about__list{
    padding: 0;
    display: flex;
    align-items: flex-end;
    font-family: var(--font-serif);
    font-style: italic;
    gap: 1rem;
    font-size: 0.8em;
  }
  .about__list > li {
    list-style: none;
  }
  @media only screen and (max-width: 950px) {
    .about {
      align-items: flex-end;
      width: 90%;
      margin: 0 auto;
    }
    .about__container {
      flex-direction: column-reverse;
      justify-content: flex-end;
    }
    .about__img {
      justify-self: flex-end;
      margin-right: 10%;
      width: 35%;
    }
    .about__info {
      width: 100%;
    }
  }
  @media only screen and (max-width: 600px) {
    .about {
      align-items: center;
      margin-top: 10vw;
    }
    .about__img > img {
      max-width: 165px;
      max-height: 206px;
    }
  }
</style>