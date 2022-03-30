<script>
  import WorkCard from './WorkCard.svelte'
  export let data;
  let length = data.length - 1;
</script>

<div id="work">
  <h1>My work:</h1>
  <div class="work-cards">
    {#each data as d, i}
      <WorkCard data={d} index={i} length={length}/>
    {/each}
  </div>
</div>

<style>
  #work {
    width: 90%;
    max-width: 1000px;
    margin: 5rem auto 0;
  }
  .work-cards {
    position: relative;
  }
  @media only screen and (max-width: 576px) {
    #work {
      margin-top: 3rem;
    }
  }
</style>