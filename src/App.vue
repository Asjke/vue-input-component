<template>
  <div id="app" class="wrapper">
    <header class="header">
      <nav class="header__nav">
        <!-- <router-link to="/">Home Page</router-link>
        <router-link :to="{ name: 'posts-page' }">Posts Page</router-link> -->

        <router-link
          class="header__nav-link"
          active-class="_active"
          exact
          v-for="item in navigation"
          :key="item.route"
          :to="{ name: item.route }"
          > {{ item.label }}</router-link>
      </nav>

    </header>

    <main>
      <router-view />
    </main>

  </div>
</template>

<script>

export default {
  name: 'App',

  data() {
    return {
      navigation: [
        { label: 'Главная', route: 'home-page' },
        { label: 'Посты', route: 'posts-page' }
      ]
    }
  }
}
</script>