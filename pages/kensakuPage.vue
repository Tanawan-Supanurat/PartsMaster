<template>
    <div>
        <v-card
            class="mx-auto overflow-hidden"
            height=100vh
        >
        <!-- スライドバー -->

            <v-app-bar
            color="light-blue lighten-1"
            dense
            extended 
            extension-height="30"
            clipped-left
            dark 
            >
            <v-app-bar-nav-icon class  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title ><br>Fujitec<br> Parts Master</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon absolute right >
            <v-icon large>mdi-cog</v-icon>
            </v-btn>
            </v-app-bar>
            <v-navigation-drawer
                v-model="drawer"
                bottom
                floating
                clipped
                width=40vh
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
                                <v-col cols ="1" sm="1">
                                </v-col>
                                <v-col cols ="1" sm="1">
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
                             <v-col col= "10">
                                <v-btn
                                block
                                elevation="2">
                                <v-icon
                                left
                                color = blue
                                large
                                >
                                    mdi-plus-circle-outline
                                </v-icon>
                                追加で検索条件入力
                            </v-btn>
                             </v-col>
                        </v-form>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
        </v-card>
        
    </div>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
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
    }),
  }
</script>