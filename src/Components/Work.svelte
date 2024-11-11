<script>
  import { widont } from 'journalize';
  import WorkCard from './WorkCard.svelte'
  export let data;
  let length = data.length - 1;
</script>

<div id="work">
  <div class="work__intro">
    <h1>My work:</h1>
    <p>These are some of my best work from my school work to my recent projects at the Texas Tribune. Stars <i class="fa-solid fa-star"></i> indicate the selection of work that I'm the most proud of. Other ones are arranged {widont("by date.")}</p>
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
  .work__intro {
    max-width: 600px;
    margin: 0 auto 2rem;
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