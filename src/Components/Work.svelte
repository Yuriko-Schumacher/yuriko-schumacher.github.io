<script>
  import { widont } from 'journalize';
  import WorkCard from './WorkCard.svelte'
  export let data;
  let length = data.length - 1;
</script>

<div id="work">
  <div class="work__intro">
    <h1>My work:</h1>
    <p>This selection showcases some of my best work, ranging from my academic projects at Northeastern University to my recent contributions at the Texas Tribune. Stars <i class="fa-solid fa-star"></i> indicate the selection of work that I'm the most proud of. Other ones are sorted {widont("by date.")}</p>
    <p>Each card represents a project and contains the publication date, the organization I worked with, a brief description, the skills applied, my roles, and the types of visualizations used in the project.</p>
  </div>
  <div class="work-cards">
    {#each data as d, i}
      <WorkCard data={d} index={i}/>
    {/each}
  </div>
</div>

<style>
  #work {
    width: 90%;
    margin: 5rem auto 0;
  }
  #work h1 {
    margin: 0 0 1.5rem 0;
  }
  .work__intro {
    max-width: 600px;
    margin: 0 auto 2rem;
  }
  .work__intro p {
    margin: 1rem 0;
  }
  .work-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
  }
  @media only screen and (max-width: 576px) {
    #work {
      margin-top: 3rem;
    }
  }
</style>