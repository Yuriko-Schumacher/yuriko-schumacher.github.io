<div class="about" id="about">
  <div class="about__container">
    <div class="about__img">
      <img src="./image/yuriko.png" alt="" width="350" />
    </div>
    <div class="about__info">
      <h1>Hi, I'm Yuriko.</h1>
      <p>
        I'm a journalism graduate student based in Boston, MA. I produce
        data-driven and visual content for the
        <a href="https://www.jsonline.com/staff/7702894002/yuriko-schumacher/" target="_blank"
          >Milwaukee Journal Sentinel</a
        >
        as a data-visual intern.
      </p>
      <br />
      <p>
        I'm from Osaka Japan, and I previously worked for a Japanese national
        newspaper as a staff writer. Now, I'm focusing on interactive data
        visualization for the web.
      </p>
      <div class="about__lists">
        <ul class="about__list contact-info">
          <li class="font--special">
            <a href="mailto:schumacher.y@northeastern.edu"
              ><i class="far fa-envelope"></i>
              schumacher.y@northeastern.edu</a
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
              ><i class="fab fa-twitter"></i
            ></a>
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
    height: 100vh;
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
  }
  .about__img > img {
    max-width: 300px;
    width: 90%;
    margin-right: 5%;
  }
  .about__info {
    max-width: 800px;
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .about__lists {
    margin-top: 1.5rem;
  }
  .about__list{
    padding: 0;
    display: flex;
    align-items: flex-end;
    gap: 1rem;
  }
  .about__list > li {
    list-style: none;
  }
  @media only screen and (max-width: 950px) {
    .about {
      align-items: flex-end;
    }
    .about__container {
      flex-direction: column-reverse;
      justify-content: flex-end;
    }
    .about__img {
      justify-self: flex-end;
      width: 50%;
    }
    .about__info {
      max-width: 500px;
      width: 70%;
    }
  }
  @media only screen and (max-width: 576px) {
    .about {
      align-items: center;
    }
    .about__img > img {
      max-width: 165px;
      max-height: 206px;
    }
    .contact-info {
      display: block;
    }
  }
</style>