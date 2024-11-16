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
    workD = workD.map(d => {
      const newD = {};
      newD.date = d.date;
      newD.description = d.description;
      newD.id = d.id;
      newD.img = d.img;
      newD.is_featured = d.is_featured;
      newD.is_interactive = d.is_interactive;
      newD.link = d.link;
      newD.media = d.media;
      newD.role = [d.role_1, d.role_2, d.role_3, d.role_4].filter(r => r != "");
      newD.skill = [d.skill_1, d.skill_2, d.skill_3].filter(s => s != "");
      newD.viz = [d.viz_1, d.viz_2, d.viz_3, d.viz_4, d.viz_5].filter(v => v != "");
      newD.title = d.title;

      return newD;
    })
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