<template>
  <v-sheet
    tabindex="0"
    :title="title"
    color="grey lighten-4"
    width="100%"
    height="200"
    class="pa-2"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <v-file-input 
      v-model="uploadfile"
      label="Any file"
      type="file"
      ref="file"
      @change="handleFileLoad"
      :success="uploadsuccess"
      success-messages="File ready to upload!"
      />
  </v-sheet>
</template>
<script>
export default {
  name: 'FileDragAndDrop',
  components: {},
  props: [ "title"],
  data () {
    return {
      uploadfile: null,
      uploadsuccess: false,
    }
  },
  computed: {

  },
  mounted () {
  },
  methods: {
    handleFileLoad() {
      if( this.$refs.file.files) {
        this.uploadfile = [...this.$refs.file.files][0];
      }
      console.log( this.uploadfile)
      this.$emit("filedropped", this.uploadfile)
      this.uploadsuccess = true;
    },
    dragover(event) {
      event.preventDefault();
      if( !event.currentTarget.classList.contains( "lighten-4" )) {
        event.currentTarget.classList.remove("lighten-4");
        event.currentTarget.classList.add("lighten-2");
      }
    },
    dragleave(event) {
        event.currentTarget.classList.remove("lighten-2");
        event.currentTarget.classList.add("lighten-4");
    },
    drop(event) {
      event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;
      this.handleFileLoad();
      event.currentTarget.classList.add("lighten-2")
      event.currentTarget.classList.remove("lighten-4")
    },

  }
}
</script>

