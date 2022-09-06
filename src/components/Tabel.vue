<template>
  <v-data-table v-if="windowWidth > 600 && isAddmin" hide-default-footer :headers="headers" :items="desserts"
    sort-by="calories" class="elevation-1 mx-auto my-12 " color="red" :loading='loadingTabel'>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title style="color: #DB0B00;" class="mr-xl-9 mr-lg-9 mr-0 mr-sm-1 mr-md-1 ml-3 ml-md-3 ml-lg-8"> {{
            subject
        }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="800px">
          <template v-if="isAddmin" v-slot:activator="{ on, attrs }">
            <v-btn dark color="#DB0B00" class="my-2" v-bind="attrs" v-on="on">
              افزودن فیلد جدید
            </v-btn>
          </template>
          <v-card class="pa-6">
            <v-icon large class="ml-2 red--text text--darken-2">
              mdi-pencil-circle-outline
            </v-icon>
            <h4 class="d-inline-block red--text text--darken-2 mb-6">{{ formTitle }}</h4>
            <v-row>
              <v-container>
                <v-row>
                  <v-col cols="4">
                    <span class="">{{ modalImage }}</span>
                    <input ref="imageUpload" @change="changeImage" type="file" id="fileupload" style="display: none;" />
                    <br>
                    <v-btn dark :color="modalImage ? 'green' : 'grey'" class="widthAll"
                      onclick="document.getElementById('fileupload').click();">
                      {{ modalImage ? 'تغییر تصویر' : 'انتخاب تصویر' }}
                    </v-btn>
                  </v-col>
                  <v-col cols="8">
                    <v-form ref="formValid" v-model="formValid">
                      <v-container>
                        <v-row>
                          <v-text-field outlined v-model="editedItem.Title" :rules="[rules.required]" label="نام">
                          </v-text-field>
                        </v-row>
                        <v-row>
                          <v-text-field type="number" outlined v-model="editedItem.Price" :rules="[rules.required]"
                            label="قیمت">
                          </v-text-field>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-col>
                </v-row>
                <v-row>
                  <v-textarea outlined v-model="editedItem.Description" label="توضیحات"
                    value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.">
                  </v-textarea>
                </v-row>
              </v-container>
            </v-row>
            <v-row justify="center">
              <v-btn color="#DB0B00" class="px-12 mx-4" dark @click="close">
                لغو
              </v-btn>
              <v-btn color="green" class="px-9" dark @click="uploadImage">
                ذخیره
              </v-btn>
            </v-row>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title>
              <h5 class="">آیا از حذف این فیلد اطمینان دارید؟</h5>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#DB0B00" text @click="closeDelete">لغو</v-btn>
              <v-btn color="#DB0B00" text @click="deleteItemConfirm">حذف</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.Image="{ item }">
      <v-img :height="windowWidth > 600 && windowWidth < 960 ? '70' :
    windowWidth > 960 && windowWidth < 1263 ? '90'
      : '150'" :width="windowWidth > 600 && windowWidth < 960 ? '90'
  : windowWidth > 960 && windowWidth < 1263 ? '90'
    : '140'"
        :src="item.Image ? 'https://ahuan.ir/menu/assets/' + item.Image : 'https://ahuan.ir/menu/assets/349d38da-c904-4145-9d2a-e57475e016c5.jpg'">
      </v-img>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon color="#DB0B00" class="ml-6 ml-sm-0 ml-md-3 " @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon class="" color="#DB0B00" @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <h3 class="text-center">داده ای وجود ندارد!</h3>
    </template>
  </v-data-table>
  <v-row v-else class="pl-12">
    <v-dialog v-model="dialog" max-width="800px">
      <v-card class="pa-6">
        <v-icon large class="ml-2 red--text text--darken-2">
          mdi-pencil-circle-outline
        </v-icon>
        <h4 class="d-inline-block red--text text--darken-2 mb-6">{{ formTitle }}</h4>
        <v-row>
          <v-container>
            <v-row>
              <v-col cols="4">
                <span class="">{{ modalImage }}</span>
                <input ref="imageUpload" @change="changeImage" type="file" id="fileupload" style="display: none;" />
                <br>
                <v-btn dark :color="modalImage ? 'green' : 'grey'" class="widthAll"
                  onclick="document.getElementById('fileupload').click();">
                  {{ modalImage ? 'تغییر تصویر' : 'انتخاب تصویر' }}
                </v-btn>
              </v-col>
              <v-col cols="8">
                <v-form ref="formValid" v-model="formValid">
                  <v-container>
                    <v-row>
                      <v-text-field outlined v-model="editedItem.Title" :rules="[rules.required]" label="نام">
                      </v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field outlined type="number" v-model="editedItem.Price" :rules="[rules.required]"
                        label="قیمت">
                      </v-text-field>
                    </v-row>
                  </v-container>
                </v-form>
              </v-col>
            </v-row>
            <v-row>
              <v-textarea outlined v-model="editedItem.Description" label="توضیحات"
                value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.">
              </v-textarea>
            </v-row>
          </v-container>
        </v-row>
        <v-row justify="center">
          <v-btn color="#DB0B00" class="px-12 mx-4" dark @click="close">
            لغو
          </v-btn>
          <v-btn color="green" class="px-9" dark @click="uploadImage">
            ذخیره
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title>
          <h5 class="">آیا از حذف این فیلد اطمینان دارید؟</h5>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#DB0B00" text @click="closeDelete">لغو</v-btn>
          <v-btn color="#DB0B00" text @click="deleteItemConfirm">حذف</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-col>
      <v-btn v-if="isAddmin" dark color="#DB0B00" class="my-2 mr-12" @click="dialog = true">
        افزودن فیلد جدید
      </v-btn>
      <v-row class="mr-12 mb-12" justify="center">
        <v-col v-for="(item, i) in desserts" :key="i" class="pa-3" cols="12" sm="6" md="4" lg="3" xl="2">
          <v-card class="white rounded-xl mb-6 pa-3">
            <v-row>
              <v-img width="100" height="300" class="rounded-xl"
                :src="item.Image ? 'https://ahuan.ir/menu/assets/' + item.Image : 'https://ahuan.ir/menu/assets/349d38da-c904-4145-9d2a-e57475e016c5.jpg'">
              </v-img>
            </v-row>
            <h3 class="text-center red--text text--darken-2 my-3">{{ item.Title }}</h3>
            <v-row justify="center" align="center">
              <h1 class="ml-2 red--text text--darken-1">{{ item.Price ?
                  item.Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : item.Price
              }}</h1>
              <span class="grey--text text--darken-1">
                تومان
              </span>
            </v-row>
            <v-card class="my-2 rounded-xl pa-4 grey--text text--darken-1">
              {{ item.Description }}
            </v-card>
            <v-row v-if="isAddmin" class="my-6" justify="center">
              <v-btn @click="editItem(item)" dark class="green ml-3 px-6">ویرایش</v-btn>
              <v-btn @click="deleteItem(item)" dark class="red px-6">حذف</v-btn>
            </v-row>
            <v-row v-if="!isAddmin" justify="center" class="mt-4">
              <v-btn dark class="red darken-2" @click="addToNotes(item)">افزودن به یادداشت</v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-row v-if="!isAddmin && notes.length" class="red darken-4 notes fixed widthAll" justify='center' align="center">
      <v-btn class="red " dark @click="showNotes">مشاهده یادداشت ها</v-btn>
    </v-row>
    <v-dialog v-model="noteDialog" width="90%">
      <v-row class="white pa-3">
        <v-col>
          <v-row class="mb-6">
            <v-icon @click="noteDialog = false" class="red--text text--darken-2">
              mdi-close
            </v-icon>
          </v-row>
          <v-row class="my-3 pa-4 elevation-3 rounded-xl grey--text text--darken-2" v-for="(note, i) in notes" :key="i">
            <v-icon small @click="removeNote(i)" class="mt-1 ml-2 red--text text--darken-2">
              mdi-close
            </v-icon>
            {{ note.Title }}
            <v-spacer></v-spacer>
            <div>
              <v-icon @click="plusNote(i)" class="mt-1 ml-2 green--text text--darken-2">
                mdi-plus-circle
              </v-icon>
              {{ note.number }}
              <v-icon @click="minusNote(i)" class="mt-1 mr-2 red--text text--darken-2">
                mdi-minus-circle
              </v-icon>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-dialog>
    <AlertText :success="true" v-if="alert" :text='alertText' />
  </v-row>
</template>

<script>
import axios from 'axios'
import '../components/main.css'
import $ from 'jquery'
import AlertText from './AlertText.vue'

export default {
  props: {
    subject: {
      type: String,
    }
  },
  components: { AlertText, },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    windowWidth: window.innerWidth,
    headers: [],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      Image: '../assets/img.jpg',
      Title: '',
      Price: null,
      Description: '',
    },
    defaultItem: {
      Image: '../assets/img.jpg',
      Title: '',
      Price: null,
      Description: '',
    },
    rules: {
      required: value => !!value || 'تکمیل این فیلد اجباریست.',
    },
    loadingTabel: false,
    modalImage: '',
    isAddmin: localStorage.getItem('isAddmin'),
    notes: [],
    noteDialog: false,
    alert: false,
    alertText: 'test text',
    formValid: true
  }),

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'ایجاد ' + this.subject + ' جدید ' : 'ویرایش فیلد قبلی'
    },
  },

  watch: {
    dialog(val) {
      this.modalImage = ''
      // $('#fileupload').val() = ''
      // if (val) {
      //   this.$refs.imageUpload.files = []
      // }
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    subject() {
      this.desserts = []
      this.loadingTabel = true
      setTimeout(() => {
        this.initialize()
        this.loadingTabel = false
      }, 1000);
    },
  },

  created() {
    this.onResize()
    this.initialize()
  },

  methods: {
    changeImage() {
      this.modalImage = this.$refs.imageUpload.files[0].name
    },

    onResize() {
      this.windowWidth = window.innerWidth
      if (this.isAddmin) {
        this.headers =
          window.innerWidth < 600 ? [
            { text: 'تصویر', align: 'center', value: 'Image', sortable: false },
            { text: 'نام ', align: 'center', value: 'Title' },
            { text: 'قیمت', align: 'center', value: 'Price' },
            { text: 'توضیحات', align: 'center', value: 'Description', sortable: false },
            { text: 'عملیات', align: 'center', value: 'actions', sortable: false },
          ]
            : window.innerWidth > 600 && window.innerWidth < 960 ? [
              { text: 'تصویر', align: 'center', width: '10%', value: 'Image', sortable: false },
              { text: 'نام ', align: 'center', width: '40%', value: 'Title' },
              { text: 'قیمت', align: 'center', width: '30%', value: 'Price' },
              { text: 'عملیات', align: 'center', width: '20%', value: 'actions', sortable: false },
            ]
              : window.innerWidth > 960 && window.innerWidth < 1263 ? [
                { text: 'تصویر', align: 'center', width: '8%', value: 'Image', sortable: false },
                { text: 'نام ', align: 'center', width: '15%', value: 'Title' },
                { text: 'قیمت', align: 'center', width: '15%', value: 'Price' },
                { text: 'توضیحات', align: 'center', value: 'Description', width: '50%', sortable: false },
                { text: 'عملیات', align: 'center', width: '12%', value: 'actions', sortable: false },
              ]
                : [
                  { text: 'تصویر', align: 'center', width: '8%', value: 'Image', sortable: false },
                  { text: 'نام ', align: 'center', width: '15%', value: 'Title' },
                  { text: 'قیمت', align: 'center', width: '15%', value: 'Price' },
                  { text: 'توضیحات', align: 'center', value: 'Description', width: '50%', sortable: false },
                  { text: 'عملیات', align: 'center', width: '12%', value: 'actions', sortable: false },
                ]
      } else {
        this.headers =
          window.innerWidth < 600 ? [
            { text: 'تصویر', align: 'center', value: 'Image', sortable: false },
            { text: 'نام ', align: 'center', value: 'Title' },
            { text: 'قیمت', align: 'center', value: 'Price' },
            { text: 'توضیحات', align: 'center', value: 'Description', sortable: false },
          ]
            : window.innerWidth > 600 && window.innerWidth < 960 ? [
              { text: 'تصویر', align: 'center', width: '10%', value: 'Image', sortable: false },
              { text: 'نام ', align: 'center', width: '40%', value: 'Title' },
              { text: 'قیمت', align: 'center', width: '30%', value: 'Price' },
            ]
              : window.innerWidth > 960 && window.innerWidth < 1263 ? [
                { text: 'تصویر', align: 'center', width: '8%', value: 'Image', sortable: false },
                { text: 'نام ', align: 'center', width: '15%', value: 'Title' },
                { text: 'قیمت', align: 'center', width: '15%', value: 'Price' },
                { text: 'توضیحات', align: 'center', value: 'Description', width: '50%', sortable: false },
              ]
                : [
                  { text: 'تصویر', align: 'center', width: '8%', value: 'Image', sortable: false },
                  { text: 'نام ', align: 'center', width: '15%', value: 'Title' },
                  { text: 'قیمت', align: 'center', width: '15%', value: 'Price' },
                  { text: 'توضیحات', align: 'center', value: 'Description', width: '50%', sortable: false },
                ]
      }
    },

    initialize() {
      axios.get('https://ahuan.ir/api/foods?type=' + (this.$route.path == '/coffeshop' ? 'c' : 'r') + '&cat=' + this.subject)
        .then((response) => this.desserts = response.data)
    },

    editItem(item) {
      this.modalImage = ''
      // this.$refs.imageUpload.files = []
      // $('#fileupload').val() = ''
      axios.get('https://ahuan.ir/api/foods/' + item.Id)
        .then((response) => {
          this.editedIndex = this.desserts.indexOf(item)
          this.editedItem = Object.assign({}, response.data)
          this.dialog = true
        })

    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      axios.delete('https://ahuan.ir/api/foods?id=' + this.editedItem.Id)
        .then(() => {
          this.initialize()
          this.closeDelete()
        })

    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save(image) {
      
      if (this.$refs.formValid.validate()) {
        var self = this
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
          var editOption = {
            Title: this.editedItem.Title,
            Description: this.editedItem.Description,
            Price: this.editedItem.Price,
            Category: this.subject,
            Image: image,
            C_OR_R: self.$route.path == '/cofe' ? "c" : "r"
          }

          axios.put('https://ahuan.ir/api/foods?id=' + this.editedItem.Id, editOption)
            .then(function (response) {
              console.log(response);
              self.close()
              self.initialize()
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          var option = {
            Title: this.editedItem.Title,
            Description: this.editedItem.Description,
            Price: this.editedItem.Price,
            Category: this.subject,
            Image: image,
            C_OR_R: self.$route.path == '/cofe' ? "c" : "r",

          }

          axios.post('https://ahuan.ir/api/foods', option)
            .then(function (response) {
              console.log(response);
              self.initialize()
              self.close()
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    },

    async uploadImage() {
      var self = this
      var image = ''
      var formdata = new FormData();
      if ($('#fileupload').val() == '' || self.modalImage == '') {
        image = '349d38da-c904-4145-9d2a-e57475e016c5.jpg'
        self.save(image)
      }
      else {
        var file = $('#fileupload')[0];
        formdata.append('file', file.files[0]);
        await axios.post('https://ahuan.ir/api/uploadfile', formdata)
          .then(function (response) {
            image = response.data
            self.save(image[0])
          })
          .catch(function (error) {
            console.log(error);
          });
      }

    },

    addToNotes(item) {
      var index = this.notes.indexOf(item)
      if (index === -1) {
        item.number = 1
        this.notes.push(item)
        this.alertText = 'یادداشت ' + item.Title + ' اضافه شد!'
        this.alert = true
        setTimeout(() => {
          this.alert = false
        }, 20000);
      }
      else {
        this.notes[index].number++
        this.alertText = 'به تعداد ' + this.notes[index].Title + ' اضافه شد!'
        this.alert = true
        setTimeout(() => {
          this.alert = false
        }, 20000);
      }

    },

    showNotes() {
      this.noteDialog = true
    },
    plusNote(index) {
      this.notes[index].number++
      var notes = this.notes
      this.notes = []
      this.notes = notes
    },
    minusNote(index) {
      if (this.notes[index].number > 1) {
        this.notes[index].number--
        var notes = this.notes
        this.notes = []
        this.notes = notes
      }
    },
    removeNote(index) {
      console.log(this.notes[index]);
      this.notes.splice(index, 1)
      var notes = this.notes
      this.notes = []
      this.notes = notes
      if (this.notes.length == 0) {
        this.noteDialog = false
      }
    }
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
}
</script>