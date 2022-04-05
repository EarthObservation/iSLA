<template>
  <q-scroll-area style="height: 20rem">
    <div class="dropper">
      <input
        type="file"
        multiple
        accept="image/*"
        @change="addFiles($event.target.files)"
      />
      <span>Sem odložite datoteke</span>
    </div>
    <q-list>
      <q-item-label header v-if="getNewAnswer.docs.length > 0">Dodane datoteke:</q-item-label>
      <q-item-label header v-else>Tu ni nobene datoteke.</q-item-label>

      <q-item clickable v-for="(item, index) in getNewAnswer.docs" :key="index">
        <q-item-section avatar top>
          <q-avatar color="primary" text-color="white">{{item.name.split('.')[item.name.split('.').length - 1]}}</q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{item.name.split('.')[0]}}</q-item-label>
          <q-item-label caption>{{(item.size / (1024*1024)).toFixed(2)}} MB</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn round flat icon="delete" @click="removeFile(index)"/>
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
  <p></p>
  <q-separator />
</template>

<script>
//import {mapActions} from 'vuex';
import { ref } from "vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "NewAnswerFile",

  data() {
    return {
      fileArray: ref([]),
    };
  },

    computed: {
    ...mapGetters(["getNewAnswer"]),
  },

  methods: {
    ...mapMutations(['docs']),
    addFiles(files) {
      for (let file of files) {
        this.fileArray.push(file);
      }
      this.docs(this.fileArray)
    },
    
    removeFile(index) {
        this.fileArray.splice(index, 1);
        this.docs(this.fileArray)
    }
  },
};
</script>

<style scoped>
.dropper {
  height: 30vh;
  border: 2px dashed black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.dropper:hover {
  background-color: #eee;
}
input {
  width: 100%;
  height: 30vh;
  position: absolute;
  opacity: 0;
}
</style>