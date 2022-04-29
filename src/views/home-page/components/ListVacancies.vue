<template>
  <div>
    <ul class="list" v-if="vacancies.length">
      <li class="item card" v-for="vacancy in vacancies" :key="vacancy.id">
        <div class="item-header">
          <h2>{{ vacancy.title }}</h2>
          <button @click="$emit('remove', vacancy.id)">Удалить</button>
        </div>
        <div class="item-body">
          <span v-if="vacancy.salary">Зарплата {{ numberWithSpaces(vacancy.salary) }} ₽ </span>
          <span v-else> Зарплата не указана</span>

          <p> {{ vacancy.discription }} </p>
        </div>
      </li>
    </ul>
    
    <div class="card" v-else>
      <h2 class="placeholder">Нет вакансий</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListVacancies',

  props: {
    vacancies: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    numberWithSpaces (num) {
      if (num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");    }
      }
  }
}
</script>

<style>

</style>