<template>
  <div class="input-box"
  :class="{'_error': fieldData.error }" >

    <label :for="fieldData.id">{{ fieldData.label }} </label>

    <template v-if="fieldData.type === 'text'" >

      <input
      :type="fieldData.type" 
      :id="fieldData.id" 
      v-model="valueSetter"
      :placeholder="fieldData.placeholder" >

    </template>

    <template v-if="fieldData.type === 'number'" >

      <input
      :type="fieldData.type" 
      :id="fieldData.id" 
      v-model="valueSetter"
      :placeholder="fieldData.placeholder" >

    </template> 

    <template v-if="fieldData.type === 'textarea'" >

      <textarea
      rows="6"
      :id="fieldData.id" 
      v-model.trim="valueSetter"
      :placeholder="fieldData.placeholder" />

    </template>           

    <span v-if="fieldData.error"> {{ fieldData.error }}</span>

  </div>   
</template>

<script>
export default {
  name: 'InputBox',

  props: {
    value: {
      required: true
    },
    fieldData: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    valueSetter: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
        if (this.fieldData.error) {
          this.$emit('validate')
        }
      }
    }
  }
}
</script>

<style>

</style>