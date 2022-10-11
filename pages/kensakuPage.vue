<template>
    <div>
        <v-card
            class="mx-auto overflow-hidden"
            height=100vh
        >
            <v-app-bar
            color="light-blue lighten-1"
            dense
            extended 
            extension-height="30"
            clipped-left
            dark 
            >
            <v-app-bar-nav-icon class = "mt-5" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title ><br>Fujitec<br> Parts Master</v-toolbar-title>
            <v-spacer></v-spacer>
            
            <v-menu :close-on-content-click="false" >
                <template v-slot:activator="{ on, attrs } ">
                    <v-btn
                     icon
                     right
                     v-bind="attrs"
                     v-on="on"
                    >
                        <v-icon class = "mr-6 mt-7" size = 70>mdi-cog</v-icon>
                    </v-btn>
                </template>
                <v-card  height=90vh width=100vh>
                    <v-list>

                    </v-list>
                </v-card>
            </v-menu>
            </v-app-bar>
            <v-row
                class="fill-height"
                no-gutters
            >
            <v-navigation-drawer
                v-model="drawer"
                :mini-variant.sync="mini"
                floating
                clipped
                width=44vh
            >
                <v-list
                 nav
                 dense
                 >
                    <v-list-item-group
                      v-model="group"
                      active-class="deep-purple--text text--accent-4"
                    >
                        <v-form
                         ref="form"
                         v-model="valid"
                         lazy-validation
                        >
                             <v-btn class = "mb-2"
                             icon
                            @click.stop="mini = !mini"
                            >
                             <v-icon>mdi-step-backward</v-icon>
                            </v-btn>検索条件
                            <v-content class ="pl-10">
                                <!-- 半角 -->
                                <p class="ma-0">部品コード</p>
                                <v-text-field
                                    v-model="buhincode"
                                    outlined
                                    dense
                                    placeholder="最大30文字"
                                    counter="30"
                                    required
                                >
                                </v-text-field>
                                <!-- jiyuu -->
                                <p class="ma-0">部品名</p>
                                <v-row no-gutters>
                                    <v-col cols ="7" sm ="7" >
                                        <v-text-field
                                        v-model="buhinmei"
                                        outlined
                                        dense
                                        placeholder="最大200文字"
                                        counter="200"
                                        required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols ="3" sm ="3">
                                        <v-combobox
                                        v-model = "selectBuhin"
                                        :items="itemsBuhin"
                                        dense
                                        outlined
                                        ></v-combobox>
                                    </v-col>
                                    <v-col cols ="1" sm="1" class = "ml-4">
                                        <v-btn
                                        elevation="2"
                                        icon
                                        tile
                                        >
                                        <v-icon>
                                            mdi-magnify
                                        </v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-divider class="mx-4"></v-divider>
                                <br>
                                <p class="ma-0">製品種別</p>
                                <v-row >
                                    <v-col class="ma-0" col= "1" sm = "4">
                                        <v-combobox
                                        v-model = "selectSeihin"
                                        :items="itemsSeihin"
                                        dense
                                        outlined
                                        ></v-combobox>
                                    </v-col>
                                    <v-col col ="11">
                                    </v-col>
                                </v-row>
                                <p class="mb-1">標準図発行日</p>
                                <v-row class="py-0">
                                    <v-col col="6">
                                        <v-menu
                                        ref="menu"
                                        v-model="hakkouMenu1"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="hakkouDate1"
                                                label="YYYY/MM/DD"
                                                append-icon="mdi-calendar"
                                                dense
                                                outlined
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                            </template>
                                            <v-date-picker
                                            v-model="hakkouDate1"
                                            @input="hakkouMenu1 = false"
                                            >
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col sm="1">~</v-col>
                                    <v-col col="6">
                                        <v-menu
                                        ref="menu"
                                        v-model="hakkouMenu2"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="hakkouDate2"
                                                label="YYYY/MM/DD"
                                                append-icon="mdi-calendar"
                                                dense
                                                outlined
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                            </template>
                                            <v-date-picker
                                            v-model="hakkouDate2"
                                            @input="hakkouMenu2 = false"
                                            >
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                                <a class ="mr-2" href="">本日</a><a class ="mr-2" href="">昨日</a><a href="">一昨日</a><br><br>
                                <p class="mb-1">標準図切替日</p>
                                <v-row class="py-0">
                                    <v-col col="6">
                                        <v-menu
                                        ref="menu"
                                        v-model="kirikaeMenu1"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="kirikaeDate1"
                                                label="YYYY/MM/DD"
                                                append-icon="mdi-calendar"
                                                dense
                                                outlined
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                            </template>
                                            <v-date-picker
                                            v-model="kirikaeDate1"
                                            @input="kirikaeMenu1 = false"
                                            >
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col sm="1">~</v-col>
                                    <v-col col="6">
                                        <v-menu
                                        ref="menu"
                                        v-model="kirikaeMenu2"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="kirikaeDate2"
                                                label="YYYY/MM/DD"
                                                append-icon="mdi-calendar"
                                                dense
                                                outlined
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                            </template>
                                            <v-date-picker
                                            v-model="kirikaeDate2"
                                            @input="kirikaeMenu2 = false"
                                            >
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                                <a class ="mr-2" href="">本日</a><a class ="mr-2" href="">昨日</a><a href="">一昨日</a><br><br>
                                <v-row class ="my-0 py-0" no-gutters>
                                    <v-col col = "5" sm ="5">
                                        <p class="ma-0">発行通知書No</p>
                                    </v-col>
                                    <v-col col = "5">
                                        <p class="ma-0">切替通知書No</p>
                                    </v-col>
                                </v-row>

                                <v-row class="my-0 py-0" no-gutters>
                                    <v-col class="mr-8" col = "4" sm ="4">
                                        <v-text-field
                                        v-model="hakkoTsuuchi"
                                        outlined
                                        dense
                                        placeholder="最大9文字"
                                        counter="9"
                                        required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col class="mr-6" col = "4" sm="4">
                                        <v-text-field
                                        v-model="kirikaeTsuuchi"
                                        outlined
                                        dense
                                        placeholder="最大9文字"
                                        counter="9"
                                        required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col col ="2" sm="2">
                                        <v-btn
                                        elevation="2"
                                        icon
                                        tile
                                        >
                                        <v-icon>
                                            mdi-magnify
                                        </v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-menu :close-on-content-click="false" >
                                    <template v-slot:activator="{ on, attrs } ">
                                        <v-col col= "10">
                                            <v-btn
                                            block
                                            elevation="2">
                                                <v-icon
                                                 left
                                                 color = blue
                                                 large
                                                 v-bind="attrs"
                                                 v-on="on"
                                                >
                                                mdi-plus-circle-outline
                                                </v-icon>
                                            追加で検索条件入力
                                            </v-btn>
                                        </v-col>
                                    </template>
                                    <v-card  height=90vh width=100vh tile>
                                        <v-system-bar height="30">
                                            <v-toolbar-title>詳細検索画面</v-toolbar-title>
                                            <v-spacer></v-spacer>
                                            <v-btn small elevation="0" right> 
                                                <v-icon>mdi-close</v-icon>
                                            </v-btn>
                                        </v-system-bar>
                                        <v-row no-gutters>
                                            <v-col cols="1" class="m-auto">
                                                <v-icon class="ml-5" size =50> mdi-magnify </v-icon>
                                            </v-col>
                                            <v-col cols="11">
                                            <v-card-text>
                                                詳細検索画面
                                            </v-card-text>
                                            </v-col>
                                        </v-row>
                                        <v-form
                                            ref="shousai_form"
                                            v-model="valid"
                                        >
                                            <v-row no-gutters>
                                                <v-col>
                                                    <p class="ma-0">・部品コード</p>
                                                    <v-row no-gutters justify="end">
                                                        <v-col cols="7" sm="7" >
                                                            <v-text-field
                                                                v-model="shousai_buhincode"
                                                                outlined
                                                                dense
                                                                required
                                                            >
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col class="" cols="3" sm="3">
                                                            <v-combobox
                                                                v-model="shousaiSelectBuhin"
                                                                :items="shousaiItemsBuhin"
                                                                outlined
                                                                dense
                                                            >
                                                            </v-combobox>
                                                        </v-col>
                                                    </v-row>
                                                    <p class="ma-0">・部品名</p>
                                                    <v-row no-gutters justify="end">
                                                        <v-col cols="7" sm="7" >
                                                            <v-text-field
                                                                v-model="shousai_buhinname"
                                                                outlined
                                                                dense
                                                                required
                                                            >
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col class="" cols="3" sm="3">
                                                            <v-combobox
                                                                v-model="shousaiSelectBuhinmei"
                                                                :items="shousaiItemsBuhinmei"
                                                                outlined
                                                                dense
                                                            >
                                                            </v-combobox>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            <v-col>
                                                 <v-row no-gutters>
                                                    <v-col>
                                                        <p>・工場区分</p>
                                                    </v-col>
                                                    <v-col>
                                                        <p>・置場/棚番</p>
                                                    </v-col>
                                                 </v-row>
                                            </v-col>
                                            <v-col>
                                                <v-row no-gutters>
                                                    <v-col>
                                                        <p>・在庫数</p>
                                                    </v-col>
                                                    <v-col>
                                                        <p>・在庫0ではない。</p>
                                                    </v-col>
                                                 </v-row>
                                            </v-col>
                                        </v-row>
                                        </v-form>
                                    </v-card>  
                                </v-menu>
                            </v-content>
                        </v-form>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
            <v-navigation-drawer
                v-model="drawer"
                :mini-variant.sync="mini2"
                mini-variant-width = 40
                floating
                clipped
                width=44vh
            >
                <v-list
                 nav
                 dense
                 >
                    <v-btn class = "mb-2"
                        icon
                        @click.stop="mini2 = !mini2"
                        >
                        <v-icon>mdi-step-backward</v-icon>
                        </v-btn>検索結果
                </v-list>
            </v-navigation-drawer>
            </v-row>
        </v-card>   
    </div>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      mini:false,
      mini2:false,
      group: null,
      itemsBuhin:[1,2,3,],
      selectBuhin:"",
      itemsSeihin:["-:All","1:EV","2:ESC","3:CP",],
      selectSeihin:"-:All",
      hakkouDate1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      hakkouDate2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      kirikaeDate1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      kirikaeDate2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      hakkouMenu1: false,
      hakkouMenu2: false,
      kirikaeMenu1: false,
      kirikaeMenu2: false,

      //shousai from value
      shousaiItemsBuhin:[1,2,3],
      shousaiSelectBuhin:"",
      shousaiItemsBuhinmei:[1,2,3],
      shousaiSelectBuhinmei:"",
      shousaiItemsHoshu:[1,2,3],
      shousaiSelectHoshu:"",
      shousaiZuban:[1,2,3],
      shousaiZuban:"",
    }),
  }
</script>