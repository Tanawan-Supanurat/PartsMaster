<template>
    <div>
        <v-card
            class="mx-auto overflow-hidden"
            height=96vh
        >
            <v-app-bar
            color="light-blue lighten-1"
            dense
            extended 
            extension-height="30"
            clipped-left
            dark 
            >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
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
                            <p>部品コード</p>
                            <v-text-field
                                v-model="buhincode"
                                outlined
                                dense
                                required
                            >
                            </v-text-field>
                            <p>部品名</p>
                            <v-row>
                                <v-col cols ="6">
                                    <v-text-field
                                    v-model="buhinmei"
                                    outlined
                                    dense
                                    required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols ="3">
                                    <v-combobox
                                    v-model = "selectBuhin"
                                    :items="itemsBuhin"
                                    dense
                                    outlined
                                    ></v-combobox>
                                </v-col>
                                <v-col cols ="2">
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
                             <p>製品種別</p>
                             <v-row>
                                <v-col col= "1">
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
                             <p>標準図発行日</p>
                             <v-row>
                                <v-col col=5>
                                    <v-text-field
                                    v-model="hyoujunHakkoLower"
                                    outlined
                                    dense
                                    required
                                    ></v-text-field>
                                </v-col>
                                <p> ~ </p>
                                <v-col col=5>
                                    <v-text-field
                                    v-model="hyoujunHakkoUpper"
                                    outlined
                                    dense
                                    required
                                    ></v-text-field>
                                </v-col>
                             </v-row>
                             <a href=""> 本日 </a><a href=""> 昨日 </a><a href=""> 一昨日 </a>
                             <p>標準図切替日</p>
                             <v-row>
                                <v-col col=6>
                                    <v-text-field
                                    v-model="kirikaeLower"
                                    outlined
                                    dense
                                    required
                                    ></v-text-field>
                                </v-col>
                                <p> ~ </p>
                                <v-col col=6>
                                    <v-text-field
                                    v-model="kirikaeUpper"
                                    outlined
                                    dense
                                    required
                                    ></v-text-field>
                                </v-col>
                             </v-row>
                             <a href=""> 本日 </a><a href=""> 昨日 </a><a href=""> 一昨日 </a>
                             <v-row>
                                <v-col col = "6">
                                    <p>発行通知書No</p>
                                </v-col>
                                <v-col col = "6">
                                    <p>切替通知書No</p>
                                </v-col>
                             </v-row>

                              <v-row>
                                <v-col col = "6">
                                    <v-text-field
                                    v-model="hakkoTsuuchi"
                                    outlined
                                    dense
                                    required
                                    ></v-text-field>
                                </v-col>
                                <v-col col = "6">
                                    <v-text-field
                                    v-model="kirikaeTsuuchi"
                                    outlined
                                    dense
                                    required
                                    ></v-text-field>
                                </v-col>
                                <v-col>
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
      selectSeihin:"-",
    }),
  }
</script>