<script>
  import { csv, json } from 'd3'

  import NavBar from './Components/NavBar.svelte'
  import About from './Components/About.svelte'
  import Work from './Components/Work.svelte'
  import Other from './Components/Other.svelte'
  import Footer from './Components/Footer.svelte'

  export let datasets = [];

  let promise = getData();
  async function getData() {
    let workD = await csv("data/work.csv");
    workD = workD.sort((a, b) => a.is_featured - b.is_featured);
    console.log(workD)
    let otherD = await csv("data/other.csv");
    datasets = [workD, otherD];
  }
</script>

<main>
  <NavBar />
  <About />
  {#await promise then data}
    <Work data={datasets[0]} />
    <!-- <Other data={datasets[1]} /> -->
  {/await}
  <Footer />
</main>

<style>
</style>