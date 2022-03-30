<script>
  export let data;
  export let index;
  export let length;
  let skills = [data.skill1, data.skill2, data.skill3];
  skills = skills.filter(skill => skill !== "")
</script>

<div class="works__work">
  <div class="works__img">
    <a href="{data.link}" target="_blank"><img class="" src="./image/{data.image}" width="400" alt="{data.title}"/></a>
  </div>
  <div class="works__description">
    <h2>{data.title}</h2>
    {#if data.link !== ""}
      <p>
        <strong>
          <a href="{data.link}" target="_blank"><i class="fas fa-external-link-alt"></i> Jump to this story</a
          >
        </strong>
      </p>
      <br />
    {/if}
    {@html data.description}
    <div class="works__info">
      <ul class="works__tools font--special">
        {#each skills as skill}
          <li>{skill}</li>
        {/each}
      </ul>
      <ul class="works__date font--special">
        <li>{data.time}</li>
      </ul>
    </div>
  </div>
</div>
{#if index !== length}
  <hr class="devide" size="3px" color="#f1eae2" /> 
{/if}

<style>
  .works__work {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding: 10rem 0;
  }
  .works__work:link {
    text-decoration: none;
  }
  .works__work:hover {
    position: relative;
    z-index: 0;
    color: unset;
  }
  .works__work > * {
    flex-basis: 45%;
  }
  .works__description {
    position: relative;
  }
  .works__img {
    position: sticky;
    top: 30vh;
  }
  .works__img img {
    width: 100%;
    outline: 1px solid #b0a297;
  }
  .works__info {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    color: #b0a297;
  }
  .works__info > * {
    list-style: none;
  }
  .works__tools > * {
    padding: 0.1em 0.3em;
    border: #b0a297 solid 1px;
    border-radius: 0.3em;
  }
  .works__date {
    padding: 0;
  }
  .devide {
    margin: 0 auto;
  }
  @media only screen and (max-width: 950px) {
    .works__work {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 3rem;
      flex-direction: column;
      position: unset;
    }
    .works__img {
      position: unset;
    }
    .works__info {
      display: block;
    }
    .works__date {
      margin-top: 1em;
    }
    .devide {
      width: calc(100% - 6rem);
    }
  }
</style>