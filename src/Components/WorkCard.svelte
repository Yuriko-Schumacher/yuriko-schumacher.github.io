<script>
  const formatDate = (dateString) => {
    const [month, year] = dateString.split('-');
    const date = new Date(year, month - 1); // month is zero-based
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }

  export let data;
  export let index;
  export let length;
  let skills = [data.skill_1, data.skill_2, data.skill_3];
  skills = skills.filter(skill => skill !== "");
  let roles = [data.role_1, data.role_2, data.role_3, data.role_4];
  roles = roles.filter(role => role !== "");
  let vizs = [data.viz_1, data.viz_2, data.viz_3, data.viz_4, data.viz_5];
  vizs = vizs.filter(viz => viz != "");
  console.log(vizs)

</script>

<a href="{data.link}" target="_blank">
  <div class="works__work">
    <div class="works__img">
      <img class="" src="./image/{data.id}.{data.img}" width="400" alt="{data.title}"/>
    </div>
    <div class="works__description">
      <div class="works__info works__info__top">
        <div class="works__date font--special">{formatDate(data.date)}</div>
        <div class="works__media font--special">{data.media}</div>
      </div>
      <h2>{data.title}{#if data.is_featured == "TRUE"}<i class="fa-solid fa-star"></i>{/if}</h2>
      {@html data.description}
      <div class="works__info works__info__bottom">
        <ul class="works__tools">
          Skills:
          {#each skills as skill}
            <li>{skill}</li>
          {/each}
        </ul>
        <ul class="works__tools">
          Roles:
          {#each roles as role}
            <li>{role}</li>
          {/each}
        </ul>
        {#if vizs.length != 0}
          <ul class="works__tools">
            Visualization types:
            {#each vizs as viz}
              <li>{viz}</li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  </div>
</a>

<style>
  .works__work {
    width: 100%;
    max-width: 350px;
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid #b0a297;
    transition: 0.4s;
  }
  a {
    text-decoration: none;
    transition: 0;
    width: fit-content;
    height: fit-content;
  }
  a:hover {
    color: inherit;
  }
  .works__work h2 {
    font-size: 18px;
    margin: 0.8rem 0;
  }
  .works__work:hover {
    color: unset;
    -webkit-box-shadow: 0px 0px 10px 10px var(--theme-baige);
    -moz-box-shadow: 0px 0px 10px 10px var(--theme-baige);
    box-shadow: 0px 0px 10px 10px var(--theme-baige);
  }
  .works__img img {
    width: 100%;
    outline: 1px solid var(--theme-baige);
  }
  .works__info {
    margin-top: 0.5rem;
    color: #b0a297;
  }
  .works__info__top {
    display: flex;
    justify-content: space-between;
  }
  .works__info > * {
    list-style: none;
  }
  .works__tools {
    padding: 0;
  }
  .works__tools > * {
    padding: 0.05em 0.3em;
    margin: 0 0.3em;
    display: inline-block;
    background-color: #b0a297;
    color: white;
    border-radius: 0.3em;
    font-size: 0.8em;
  }
  .works__date {
    padding: 0;
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
    .works__info__top {
      display: block;
    }
    .works__date {
      margin-top: 1em;
    }
  }
  i {
    font-size: 0.8rem;
    padding: 0 0 0.2rem 0.2rem;
  }
</style>