<template>
  <div class="container">
    <div class="card mb-2">
        <form @submit.prevent="createVacancy" >
          <h2 class="title"> Создайте вакансию</h2>

          <InputBox 
          :fieldData="model.title"
          v-model="model.title.value"
          @validate="model.title.validate()" />

          <InputBox 
          :fieldData="model.salary"
          v-model="model.salary.value"
          @validate="model.salary.validate()" 
          />
          <InputBox 
          :fieldData="model.discription"
          v-model="model.discription.value"
          />                       

          <!-- <div class="input-box">
            <label :for="model.title.id">{{ model.title.label }} </label>
            <input type="text" :id="model.title.id" v-model.trim="model.title.value"
            :placeholder="model.title.placeholder" :disabled="disableForms">
            <span v-if="model.title.error"
            > {{ model.title.error }}</span>
          </div>

          <div class="input-box">
            <label :for="model.salary.id">{{ model.salary.label }} </label>
            <input type="number" :id="model.salary.id" v-model.number="model.salary.value"
            :placeholder="model.salary.placeholder" :disabled="disableForms">
            <span v-if="model.salary.error"
            > {{ model.salary.error }}</span>
          </div>  -->

          <!-- <div class="input-box">
            <label :for="model.discription.id">{{ model.discription.label }} </label>
            <textarea
            :id="model.discription.id" 
            v-model.trim="model.discription.value"
            rows="6"
            :placeholder="model.discription.placeholder" 
            :disabled="disableForms" 
            />
          </div>           -->

          <button class="btn" type="submit" :disabled="disableForms"  >Опубликовать вакансию</button>
        </form>
    </div>
    <VLoader
    v-if="showPreload"
     />

    <ListVacancies
    v-else
    :vacancies="vacancies"
    @remove="removeVacancy"
    />
  </div>
</template>

<script>
import axios from 'axios'
import ListVacancies from '@/views/home-page/components/ListVacancies.vue'
import VLoader from '@/components/v-loader.vue'
import InputBox from '@/components/input-box.vue'

export default {
  name: 'PostsPage',
  components: {
    ListVacancies,
    VLoader,
    InputBox
    },

  data() {
    return {
      model: {
        title: {
          label: 'Название вакансии',
          value: '',
          placeholder: 'Введите название',
          id: 'title',
          type: 'text',
          error: null,
          validate () {
            this.value.length
              ? this.error = null
              : this.error = '*Обязательное поле'
          }
        },
        salary: {
          label: 'Зарплата',
          value: '',
          placeholder: 'Введите сумму',
          id: 'salary',
          type: 'number',
          error: null,
          validate () {
            this.value >= 1000
              ? this.error = null
              : this.error = '*Зарплата должна бы больше 1000'
          }
        },
        discription: {
          label: 'Название вакансии',
          value: '',
          placeholder: 'Введите название',
          id: 'title',
          type: 'textarea',
          error: null
        },
      },

      vacancies: [],
      disableForms: false,
      showPreload: false
    }
  },

  computed: {
    formData () {
      const data = {}
      for (let key in this.model) {
        data[key] = this.model[key].value
      }
      return data
    }
  },

  mounted () {
    this.getVacancies()
  },

  methods: {
    async createVacancy() {

      // Валидация полей (тех у кого есть валидация)
      for (const key in this.model ) {
        if (this.model[key].validate) {
          this.model[key].validate()
        }
      }

      // Проверка на возникшие ошибки
      for (const key in this.model ) {
        if (this.model[key].error) {
          // Если какая то ошибка существует функция останавливается
          return
        }
      } 
        // Если ошибок нет то происходит запрос
      try {
        this.disableForms = true
        await axios.post('https://asjke92lesson3-default-rtdb.europe-west1.firebasedatabase.app/vacancies.json', this.formData)
        await this.getVacancies()
        this.clearForm()
      } catch (error) {
        console.log(error)
      } finally {
        this.disableForms = false
      }
      },     

    async getVacancies() {
      try {
        this.showPreload = true
        const { data } = await axios.get('https://asjke92lesson3-default-rtdb.europe-west1.firebasedatabase.app/vacancies.json')
        this.vacancies = Object.keys(data).map(key => {
          return {
            id: key,
            ...data[key]
          }
        })
      } catch (err) {
        this.vacancies = []
      } finally {
        this.showPreload = false
      }

    },

    async removeVacancy(id) {
      await axios.delete(`https://asjke92lesson3-default-rtdb.europe-west1.firebasedatabase.app/vacancies/${id}.json`)
      try {
        await this.getVacancies()
      } catch (err) {
        console.log(err)
      }
    },

    //Служебные функции
    clearForm () {
      for (const key in this.model) {
        this.model[key].value = ''
      }
    }
  }
}
</script>

<style>

</style>