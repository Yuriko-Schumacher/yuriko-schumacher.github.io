<div id="nav">
  <div class="nav__container">
    <nav>
      <ul class="nav__logo">
        <li>
          <a href="#about"><strong>Yuriko Schumacher</strong></a>
        </li>
      </ul>
      <ul class="nav__menu">
        <li><a href="#about">About</a></li>
        <li><a href="#work">Work</a></li>
      </ul>
    </nav>
  </div>
</div>

<style>
  #nav {
    background: #f1eae2;
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
  }
  .nav__container {
    width: 80%;
    margin: 0 auto;
  }
  nav {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  nav > * {
    flex: 0 0 40%;
    text-transform: uppercase;
  }
  nav > ul {
    padding: 0.5rem 0;
    list-style: none;
  }
  nav li {
    display: inline-block;
    margin: 0 2rem 0 0;
  }
  nav li:last-of-type {
    margin: 0;
  }
  .nav__logo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.2rem;
  }
  .nav__logo a:link,
  .nav__logo a:visited {
    text-decoration: none;
  }
  .nav__menu {
    font-size: 0.8rem;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  @media (max-width: 600px) {
    #nav {
      display: none;
    }
  }
</style>