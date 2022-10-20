<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.</p>
          <p>
            For more information on Vuetify, check out the <a
              href="https://vuetifyjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation
            </a>.
          </p>
          <p>
            If you have questions, please join the official <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="chat"
            >
              discord
            </a>.
          </p>
          <p>
            Find a bug? Report it on the github <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              rel="noopener noreferrer"
              title="contribute"
            >
              issue board
            </a>.
          </p>
          <p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3">
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br>
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/inspire"
          >
            Continue
          </v-btn>
        </v-card-actions>
        <div>
          <ul>
            <!--
              <li v-for="(list,index) in name_list" :key="index">
                Name:{{list.name}} Email:{{list.email}} 
              </li>
              -->
              <!--
              <li v-for="(list,index) in posts" :key="index">
                {{index}} . {{list}}
              </li>
              -->
              <li>{{posts}}</li>
          </ul>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data(){
    return {
      message : "Test Message_data",
      posts:"",
      name_list : [
        {
          "name": "Jared Mullins",
          "email": "cepe@od.fr"
        },
        {
          "name": "Bobby Stevenson",
          "email": "zehzep@dic.lc"
        },
        {
          "name": "Ola Morales",
          "email": "wejro@ciwhas.cw"
        },
        {
          "name": "Lucille Singleton",
          "email": "gul@horte.cg"
        },
        {
          "name": "Emma Cohen",
          "email": "nak@huhdec.de"
        },
        {
          "name": "Duane Weber",
          "email": "mugode@we.sz"
        }
      ]
    }
  },
  name: 'IndexPage',
  async asyncData({ $axios }) {
			// 取得先のURL
			const url = "http://localhost:59272/api/kensakuPage";
			// リクエスト（Get）
			const response = await $axios.$get(url);
			// 配列で返ってくるのでJSONにして返却
			return {
				posts: response
			};
  }
};
</script>
