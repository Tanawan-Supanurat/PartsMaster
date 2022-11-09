<template>
  <v-app dark>
      <v-main>
        <Nuxt />
        <div>
        <v-card
            class="mx-auto overflow-hidden"
            height=100vh
        >
            <!-- Nav-bar -->
            <v-app-bar
            color="light-blue lighten-1"
            dense
            extended 
            extension-height="30"
            clipped-left
            dark 
            >
            <v-app-bar-nav-icon class = "mt-5" @click.stop="OpenCloseNav()"></v-app-bar-nav-icon>
            <v-toolbar-title ><br>Fujitec<br> Parts Master</v-toolbar-title>
            <v-spacer></v-spacer>
            <!--　ユーザー設定画面　-->
            <v-dialog
                v-model="setttingDialog"
                max-width = "100vh"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                     icon
                     right
                     v-bind="attrs"
                     v-on="on"
                    >
                        <v-icon color="blue-grey darken-3" class = "mr-6 mt-7" size = 70>mdi-cog</v-icon>
                    </v-btn>
                </template>
                <v-card height="90vh">
                    <v-card-title class="text-h5 font-weight-bold">
                        
                        ユーザー設定画面
                    </v-card-title>
                    <v-row no-gutters>
                        <v-col class="ml-8">
                            <br>
                            <v-card-text class="py-0 text-subtitle-1">
                                ログインユーザー： {{userName}} 
                            </v-card-text>
                            <v-card-text class="py-0 my-2 text-subtitle-1">
                                所属部課： {{departmentName}}
                            </v-card-text>
                        </v-col>

                        <v-col >
                            <v-card-text class="py-0 font-weight-bold text-subtitle-1 text-decoration-underline">
                                権限
                            </v-card-text>
                            <v-card-text class="py-0 text-subtitle-1">
                                手配部門　権限
                            </v-card-text>
                            <v-row>
                                <v-col class="ml-2 pr-0 py-0" cols="4">
                                    <v-card-text class="mt-2 py-0">
                                        ・P/S情報
                                    </v-card-text>
                                    <v-card-text class="py-0">
                                        ・代替部品情報
                                    </v-card-text>
                                    <v-card-text class="py-0">
                                        ・販売価格情報
                                    </v-card-text>
                                </v-col>
                                <v-col class="py-0" cols="2">
                                    <v-card-text class="mt-2 py-0">
                                        :
                                    </v-card-text>
                                    <v-card-text class="py-0">
                                        :
                                    </v-card-text>
                                    <v-card-text class="py-0">
                                        :
                                    </v-card-text>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="ml-10">
                            <v-card-text class="py-0 font-weight-bold text-subtitle-1 text-decoration-underline">
                                項目の表示順設定
                            </v-card-text>
                            <v-row class="mt-2" justify="center">
                                <v-col sm="6" >
                                    <v-combobox
                                        v-model="userKoumokuSelect"
                                        :items="userKoumokuItems"
                                        outlined
                                        dense
                                    ></v-combobox>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col>
                            <v-card-text class="py-0 font-weight-bold text-subtitle-1 text-decoration-underline">
                                初期画面表示
                            </v-card-text>
                            <v-row class="mt-2" justify="center">
                                <v-col sm="6" >
                                    <v-combobox
                                        v-model="userShougiSelect"
                                        :items="userShougiItems"
                                        outlined
                                        dense
                                    ></v-combobox>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
             </v-dialog>
            <!--　ユーザー設定画面　-->
            </v-app-bar>
            <!-- Nav-bar -->
            <v-row
                class="fill-height"
                no-gutters
            >
            
            <!-- 基本検索条件 -->
            <v-navigation-drawer
                v-model="drawer"
                :mini-variant.sync="mini"
                floating
                mini-variant-width = "3%"
                :width = search_width
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
                         v-model="kensakuForm"
                         lazy-validation
                        >
                             <v-btn class = "mb-2"
                             icon
                            @click.stop="changeSearchMiniWidth()"
                            >
                             <v-icon>mdi-step-backward</v-icon>
                            </v-btn>検索条件
                            <v-content class ="pl-10">
                                <!--　基本検索条件1 -->
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
                                        <template>
                                            <v-dialog
                                             v-model ="warning_dialog_btn1"
                                             persistent
                                             max-width="290"
                                            >
                                                <template v-slot:activator = "{on, attrs}">
                                                    <v-btn v-if="buhincode === '' && buhinmei ==='' "
                                                     elevation="2"
                                                     icon
                                                     tile
                                                     v-bind="attrs"
                                                     v-on="on"
                                                     small
                                                    >
                                                        <v-icon>mdi-magnify</v-icon>
                                                    </v-btn>
                                                    <v-btn v-else
                                                    @click="getKensakuBtn1()"
                                                    elevation="2"
                                                    icon
                                                    tile
                                                    >
                                                        <v-icon> mdi-magnify</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-card>
                                                    <v-card-title >Warning</v-card-title>
                                                    <v-card-text >検索条件を入力してください。</v-card-text>
                                                    <v-card-actions>
                                                         <v-spacer></v-spacer>
                                                        <v-btn
                                                            color="primary"
                                                            text
                                                            @click="warning_dialog_btn1 = false"
                                                        >
                                                            OK
                                                        </v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </template>
                                        
                                    </v-col>
                                </v-row>
                                <v-divider class="mx-4"></v-divider>
                                <br>
                                <!--　基本検索条件1 -->
                                <!--　基本検索条件２ -->
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
                                <p class="mb-2">標準図発行日</p>
                                <v-row no-gutters class="py-0">
                                    <v-col col="5" sm="5">
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
                                                class ="mb-0"
                                                v-model="hakkouDate1"
                                                label="YYYY/MM/DD"
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
                                    <v-col class = "ml-2" sm="1"><p>~</p></v-col>
                                    <v-col col="5" sm="5">
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
                                                class ="mb-0"
                                                v-model="hakkouDate2"
                                                label="YYYY/MM/DD"
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
                                <v-row class="mt-n4" no-gutters >
                                    <v-col class="ml-2 mr-auto" sm="6" >
                                        <v-btn-toggle v-model="toggle_hakko">
                                            <v-tooltip bottom>
                                                <template v-slot:activator ="{on,attrs}">
                                                    <v-btn tile outlined small
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        @click="changeCalendarHakko(0)"
                                                        >今日</v-btn>
                                                </template>
                                                <span>今日</span>
                                            </v-tooltip>

                                            <v-tooltip bottom>
                                                <template v-slot:activator ="{on,attrs}">
                                                    <v-btn tile outlined small
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        @click="changeCalendarHakko(1)"
                                                    >昨日</v-btn>
                                                </template>
                                                <span>昨日</span>
                                            </v-tooltip>
                                            
                                            <v-tooltip bottom>
                                                <template v-slot:activator ="{on,attrs}">
                                                    <v-btn tile outlined small
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        @click="changeCalendarHakko(2)"
                                                    >一昨日</v-btn>
                                                </template>
                                                <span>一昨日</span>
                                            </v-tooltip>
                                        </v-btn-toggle>
                                    </v-col>
                                </v-row>
                                <p class="mb-2">標準図切替日</p>
                                <v-row no-gutters class="py-0">
                                    <v-col col="5" sm="5">
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
                                    <v-col class = "ml-2" sm="1"><p>~</p></v-col>
                                    <v-col col="5" sm="5">
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
                                </v-row><v-row class="mt-n4" no-gutters >
                                    <v-col class="ml-2 mr-auto" sm="6" >
                                        <v-btn-toggle v-model="toggle_Kirikae">
                                            <v-tooltip bottom>
                                                <template v-slot:activator ="{on,attrs}">
                                                    <v-btn tile outlined small
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        @click="changeCalendarKirikae(0)"
                                                        >今日</v-btn>
                                                </template>
                                                <span>今日</span>
                                            </v-tooltip>

                                            <v-tooltip bottom>
                                                <template v-slot:activator ="{on,attrs}">
                                                    <v-btn tile outlined small
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        @click="changeCalendarKirikae(1)"
                                                    >昨日</v-btn>
                                                </template>
                                                <span>昨日</span>
                                            </v-tooltip>
                                            
                                            <v-tooltip bottom>
                                                <template v-slot:activator ="{on,attrs}">
                                                    <v-btn tile outlined small
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        @click="changeCalendarKirikae(2)"
                                                    >一昨日</v-btn>
                                                </template>
                                                <span>一昨日</span>
                                            </v-tooltip>
                                        </v-btn-toggle>
                                    </v-col>
                                </v-row>
                                <v-row class ="my-0 py-0" no-gutters>
                                    <v-col col = "5" sm ="5">
                                        <p class="ma-0">発行通知書No</p>
                                    </v-col>
                                    <v-col col = "5">
                                        <p class="ma-0">切替通知書No</p>
                                    </v-col>
                                </v-row>

                                <v-row class="my-0 py-0" no-gutters>
                                    <v-col class="mr-8" cols = "4" sm ="4">
                                        <v-text-field
                                        v-model="hakkoTsuuchi"
                                        outlined
                                        dense
                                        placeholder="最大9文字"
                                        counter="9"
                                        required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col class="mr-6" cols = "4" sm="4">
                                        <v-text-field
                                        v-model="kirikaeTsuuchi"
                                        outlined
                                        dense
                                        placeholder="最大9文字"
                                        counter="9"
                                        required
                                        ></v-text-field>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-col cols ="2" sm="1">
                                        <template>
                                            <v-dialog
                                             v-model ="warning_dialog_btn2"
                                             persistent
                                             max-width="290"
                                            >
                                                <template v-slot:activator = "{on, attrs}">
                                                    <v-btn v-if="hakkouDate1 ==='' && hakkouDate2 === '' && kirikaeDate1 ==='' &&
                                                                 kirikaeDate2 === '' && kirikaeTsuuchi ==='' && hakkoTsuuchi === ''"
                                                     elevation="2"
                                                     icon
                                                     tile
                                                     small
                                                     v-bind="attrs"
                                                     v-on="on"
                                                    >
                                                        <v-icon>mdi-magnify</v-icon>
                                                    </v-btn>
                                                    <v-btn v-else
                                                    @click="getKensakuBtn2()"
                                                    elevation="2"
                                                    icon
                                                    tile
                                                    >
                                                        <v-icon> mdi-magnify</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-card>
                                                    <v-card-title >Warning</v-card-title>
                                                    <v-card-text >検索条件を入力してください。</v-card-text>
                                                    <v-card-actions>
                                                         <v-spacer></v-spacer>
                                                        <v-btn
                                                            color="primary"
                                                            text
                                                            @click="warning_dialog_btn2 = false"
                                                        >
                                                            OK
                                                        </v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </template>
                                    </v-col>
                                </v-row>
                                <!--　基本検索条件２ -->
                                <v-dialog
                                 v-model="shousaiDialog"
                                 fullscreen
                                 hide-overlay
                                 transition="dialog-bottom-transition"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-col col= "10">
                                            <v-btn
                                            block
                                            elevation="2"
                                            v-bind="attrs"
                                            v-on="on"
                                            >
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
                                    </template>
                                    <v-container fluid>  
                                        <!-- 詳細検索条件　-->
                                        <v-card tile> 
                                            <v-system-bar height="30">
                                                <v-toolbar-title>詳細検索画面</v-toolbar-title>
                                                <v-spacer></v-spacer>
                                                <v-btn small elevation="0" right  text @click="shousaiDialog = false"> 
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
                                                v-model="shousaiForm"
                                            >
                                                <v-row no-gutters>
                                                    <v-col>
                                                        <p class="ma-0">・部品コード</p>
                                                        <v-row no-gutters justify="end">
                                                            <v-col cols="9" sm="9" >
                                                                <v-text-field 
                                                                    class="mb-n4 mr-1"
                                                                    v-model="shousaiBuhincode"
                                                                    outlined
                                                                    dense
                                                                    required
                                                                >
                                                                </v-text-field>
                                                            </v-col>
                                                            <v-col class="pr-2" cols="2" sm="2">
                                                                <v-combobox
                                                                    class="mb-n4"
                                                                    v-model="shousaiSelectBuhin"
                                                                    :items="shousaiItemsBuhin"
                                                                    outlined
                                                                    dense
                                                                >
                                                                </v-combobox>
                                                            </v-col>
                                                        </v-row>
                                                        <p class="my-0">・部品名</p>
                                                        <v-row no-gutters justify="end">
                                                            <v-col cols="9" sm="9" >
                                                                <v-text-field
                                                                    class="mb-n4 mr-1"
                                                                    v-model="shousaiBuhinmei"
                                                                    outlined
                                                                    dense
                                                                    required
                                                                >
                                                                </v-text-field>
                                                            </v-col>
                                                            <v-col class="pr-2" cols="2" sm="2">
                                                                <v-combobox
                                                                    class="mb-n4"
                                                                    v-model="shousaiSelectBuhinmei"
                                                                    :items="shousaiItemsBuhinmei"
                                                                    outlined
                                                                    dense
                                                                >
                                                                </v-combobox>
                                                            </v-col>
                                                        </v-row>
                                                        <p class="ma-0">・保守品名</p>
                                                        <v-row no-gutters justify="end">
                                                            <v-col cols="9" sm="9" >
                                                                <v-text-field
                                                                    class="mb-n4 mr-1"
                                                                    v-model="shousaiHoshuu"
                                                                    outlined
                                                                    dense
                                                                    required
                                                                >
                                                                </v-text-field>
                                                            </v-col>
                                                            <v-col class="pr-2" cols="2" sm="2">
                                                                <v-combobox
                                                                    class="mb-n4"
                                                                    v-model="shousaiSelectHoshu"
                                                                    :items="shousaiItemsHoshu"
                                                                    outlined
                                                                    dense
                                                                >
                                                                </v-combobox>
                                                            </v-col>
                                                        </v-row>
                                                        <p class="ma-0">・図番</p>
                                                        <v-row no-gutters justify="end">
                                                            <v-col cols="9" sm="9" >
                                                                <v-text-field
                                                                    class="mb-n4 mr-1"
                                                                    v-model="shousaiZuban"
                                                                    outlined
                                                                    dense
                                                                    required
                                                                >
                                                                </v-text-field>
                                                            </v-col>
                                                            <v-col class="pr-2" cols="2" sm="2">
                                                                <v-combobox
                                                                    class="mb-n4"
                                                                    v-model="shousaiSelectZuban"
                                                                    :items="shousaiItemsZuban"
                                                                    outlined
                                                                    dense
                                                                >
                                                                </v-combobox>
                                                            </v-col>
                                                        </v-row>
                                                        <p class="ma-0">・標準図発行日</p>
                                                        <v-row class="mt-2 ml-2" no-gutters justify="end">
                                                            <v-col sm="4">
                                                            <v-menu
                                                            ref="menu"
                                                            v-model="shousaihyoujunMenu1"
                                                            :close-on-content-click="false"
                                                            :nudge-right="40"
                                                            transition="scale-transition"
                                                            offset-y
                                                            min-width="auto"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field
                                                                    class="mb-n4"
                                                                    v-model="shousaihyoujunDate1"
                                                                    label="YYYY/MM/DD"
                                                                    dense
                                                                    outlined
                                                                    readonly
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                ></v-text-field>
                                                                </template>
                                                                <v-date-picker
                                                                v-model="shousaihyoujunDate1"
                                                                @input="shousaihyoujunMenu1 = false"
                                                                >
                                                                </v-date-picker>
                                                            </v-menu>
                                                        </v-col>
                                                        <v-col><p class="ml-2">~</p></v-col>
                                                        <v-col sm="4">
                                                            <v-menu
                                                            ref="menu"
                                                            v-model="shousaihyoujunMenu2"
                                                            :close-on-content-click="false"
                                                            :nudge-right="40"
                                                            transition="scale-transition"
                                                            offset-y
                                                            min-width="auto"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field
                                                                    class="mb-n4"
                                                                    v-model="shousaihyoujunDate2"
                                                                    label="YYYY/MM/DD"
                                                                     
                                                                    dense
                                                                    outlined
                                                                    readonly
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                ></v-text-field>
                                                                </template>
                                                                <v-date-picker
                                                                v-model="shousaihyoujunDate2"
                                                                @input="shousaihyoujunMenu2 = false"
                                                                >
                                                                </v-date-picker>
                                                            </v-menu>
                                                            </v-col>
                                                            <v-col class="ml-2 mr-auto" sm="3" >
                                                                <v-btn-toggle v-model="toggle_none">
                                                                    <v-tooltip bottom>
                                                                        <template v-slot:activator ="{on,attrs}">
                                                                            <v-btn small icon tile outlined
                                                                            v-bind="attrs"
                                                                            v-on="on"
                                                                            @click="changeCalendarHyouJun(0)"
                                                                            ></v-btn>
                                                                        </template>
                                                                        <span>今日</span>
                                                                    </v-tooltip>

                                                                    <v-tooltip bottom>
                                                                        <template v-slot:activator ="{on,attrs}">
                                                                            <v-btn small icon tile outlined
                                                                            v-bind="attrs"
                                                                            v-on="on"
                                                                            @click="changeCalendarHyouJun(1)"
                                                                            ></v-btn>
                                                                        </template>
                                                                        <span>昨日</span>
                                                                    </v-tooltip>
                                                                    
                                                                    <v-tooltip bottom>
                                                                        <template v-slot:activator ="{on,attrs}">
                                                                            <v-btn small icon tile outlined
                                                                            v-bind="attrs"
                                                                            v-on="on"
                                                                            @click="changeCalendarHyouJun(2)"
                                                                            ></v-btn>
                                                                        </template>
                                                                        <span>一昨日</span>
                                                                    </v-tooltip>
                                                                </v-btn-toggle>
                                                            </v-col>

                                                        </v-row>
                                                        <v-row justify="center">
                                                            <v-col col=10 sm=10>
                                                                <v-data-table
                                                                v-model="shousaiZaikoSelected"
                                                                :headers="shousaiZaikoHeaders"
                                                                :items="shousaiZaikoItems"
                                                                item-key="CM_CODE"
                                                                dense
                                                                show-select
                                                                fixed-header
                                                                :footer-props="{'items-per-page-options':[-1]}"
                                                                hide-default-footer
                                                                height ="24vh"
                                                                class="elevation-5"
                                                            >
                                                                <template v-slot:top>
                                                                    <v-row no-gutters>
                                                                        <v-checkbox
                                                                        class="ml-2 mb-n5"
                                                                        v-model="shousaiSokoCodeCheckbox"
                                                                        @change="getSokoType(true)"
                                                                        label="倉庫コードを指定する。"
                                                                        ></v-checkbox>
                                                                    </v-row>
                                                                    <v-row no-gutters>
                                                                        <v-col class="mt-2 ml-2" col=4 sm=4>
                                                                            <span>・倉庫選択</span>
                                                                        </v-col>
                                                                        <v-col class="mt-2" col=4 sm=4>
                                                                            <span>・工場区分</span>
                                                                        </v-col>
                                                                        <v-col class="ml-5 mb-n4" col=2 sm=2>
                                                                            <v-combobox
                                                                            class="ma-0"
                                                                            v-model="shousaiSelectSouko"
                                                                            dense
                                                                            outlined
                                                                            :items="shousaiItemsSouko"
                                                                            @change="getSoko()"
                                                                            ></v-combobox>
                                                                        </v-col>
                                                                    </v-row>
                                                                    <v-divider></v-divider>
                                                                </template>
                                                            </v-data-table>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                <v-col>
                                                    <v-row no-gutters>
                                                        <v-col>
                                                            <p class="ma-0">・工場区分</p>
                                                        </v-col>
                                                        <v-col>
                                                            <p class="ma-0">・置場/棚番</p>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row  no-gutters>
                                                        <v-col col=6 sm=6>
                                                            <v-row no-gutters>
                                                                <v-col class="ml-10" col="4" sm="4">
                                                                    <v-text-field
                                                                    class="mb-n4"
                                                                    v-model="shousaiKoban"
                                                                    dense outlined></v-text-field>
                                                                </v-col>
                                                                <v-col>
                                                                    <p class="ml-2 mt-2">1,2,3,4,5,6</p>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                        <v-col col=6 sm=6>
                                                            <v-row no-gutters>
                                                                <v-col class="ml-5" col="9" sm="9">
                                                                    <v-text-field 
                                                                    class="mb-n4"
                                                                    v-model="shousaiTanban"
                                                                    dense outlined></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                    </v-row>
                                                    <p class="ma-0">・倉庫担当</p>
                                                    <v-row  no-gutters>
                                                        <v-col class="ml-10" col="10" sm="10">
                                                            <v-text-field
                                                            class="mb-n4"
                                                            v-model="shousaiSokotantou"
                                                            dense outlined></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters justify="space-between">
                                                        <v-col>
                                                            <p class="ma-0">・P/S展開区分</p>
                                                        </v-col>
                                                        <v-col>
                                                            <p class="ma-0">・自動購入指示</p>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row  no-gutters>
                                                        <v-col col=6 sm=6>
                                                            <v-row no-gutters>
                                                                <v-col class="ml-10" col="8" sm="8">
                                                                    <v-text-field
                                                                    class="mb-n4"
                                                                    v-model="shousaiPStenkai"
                                                                    dense outlined></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                        <v-col col=6 sm=6>
                                                            <v-row no-gutters>
                                                                <v-col class="ml-5" col="8" sm="8">
                                                                    <v-text-field 
                                                                    class="mb-n4"
                                                                    v-model="shousaiJidouKounyuu"
                                                                    dense outlined></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters justify="space-between">
                                                        <v-col>
                                                            <p class="ma-0">・製品分類コード</p>
                                                        </v-col>
                                                        <v-col>
                                                            <p class="ma-0">・部品区分</p>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row  no-gutters justify="space-between">
                                                        <v-col class="ml-10" col="2" sm="2">
                                                            <v-text-field
                                                            class="mb-n4"
                                                            v-model="shousaiSeihinbunruiCode"
                                                            dense outlined>
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col>
                                                            <v-dialog
                                                             v-model="dialogSeihinbunru"
                                                             width="700"
                                                            >
                                                                <template v-slot:activator = "{ on ,attrs}">
                                                                    <v-btn 
                                                                     v-bind="attrs"
                                                                     v-on="on"
                                                                     class = "ml-2 mt-2" 
                                                                     @click="getDialogKoumoku(210,'製品分類コード')"
                                                                     x-small>
                                                                     ...
                                                                     </v-btn>
                                                                </template>
                                                                <v-card>
                                                                    <v-system-bar window dark>
                                                                            <span>PMRA0191 参照画面（共用マスタ）</span>
                                                                            <v-spacer></v-spacer>
                                                                            <v-btn small @click="dialogSeihinbunru = false">
                                                                                <v-icon>mdi-close</v-icon>
                                                                            </v-btn>
                                                                    </v-system-bar>
                                                                    <v-container>
                                                                        <v-row justify="space-between" no-gutters>
                                                                            <v-col>
                                                                                <span>参照画面</span>
                                                                            </v-col>
                                                                            <v-col sm=5>
                                                                                <p>項目No.{{this.dialogKoumokuNO}}:{{this.dialogKoumokuName}}</p>
                                                                                <p>項目の有効期限{{this.dialogEnableDate_1}}~{{this.dialogEnableDate_2}}</p>
                                                                            </v-col>
                                                                        </v-row>
                                                                        <v-row>
                                                                            <v-data-table
                                                                             v-model="dialogKoumokuTableSelected"
                                                                             :headers ="dialogKoumokuTableHeader"
                                                                             :items ="dialogKoumokuTableItem"
                                                                             :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                                             fixed-header
                                                                             singleSelect
                                                                             item-key="CM_CODE"
                                                                             dense
                                                                             height="500px"
                                                                             show-select
                                                                             
                                                                            ></v-data-table>
                                                                        </v-row>
                                                                        <br>
                                                                        <v-divider></v-divider>
                                                                        <v-row class= "mt-2 mb-1 mr-2">
                                                                            <v-spacer></v-spacer>
                                                                            <v-btn small @click="getSeihinbunruiCodeFromDialog()" >
                                                                                <v-icon
                                                                                    left
                                                                                    dark
                                                                                >
                                                                                    mdi-check-outline
                                                                                </v-icon>  
                                                                                選択(S)
                                                                            </v-btn>
                                                                            <v-btn small class="ml-2" @click ="dialogSeihinbunru = false">
                                                                                <v-icon
                                                                                    left
                                                                                    dark
                                                                                >
                                                                                    mdi-close-box-outline
                                                                                </v-icon> 
                                                                                閉じる(C)
                                                                            </v-btn>
                                                                        </v-row>
                                                                    </v-container>
                                                                </v-card>
                                                            </v-dialog>
                                                        </v-col>
                                                        <v-col class="my-0 mr-8 mr-auto" col="2" sm="2">
                                                            <v-text-field 
                                                            class="mb-n4"
                                                            v-model="shousaiBuhinkubun"
                                                            dense outlined></v-text-field>
                                                        </v-col>
                                                        <v-col>
                                                             <v-dialog
                                                             v-model="dialogBuhinkubun"
                                                             width="700"
                                                            >
                                                                <template v-slot:activator = "{ on ,attrs}">
                                                                    <v-btn 
                                                                     v-bind="attrs"
                                                                     v-on="on"
                                                                     class = "ml-2 mt-2" 
                                                                     @click="getDialogKoumoku('A14','部品区分')"
                                                                     x-small>
                                                                     ...
                                                                     </v-btn>
                                                                </template>
                                                                <v-card>
                                                                    <v-system-bar window dark>
                                                                            <span>PMRA0191 参照画面（共用マスタ）</span>
                                                                            <v-spacer></v-spacer>
                                                                            <v-btn small @click="dialogBuhinkubun = false">
                                                                                <v-icon>mdi-close</v-icon>
                                                                            </v-btn>
                                                                    </v-system-bar>
                                                                    <v-container>
                                                                        <v-row justify="space-between" no-gutters>
                                                                            <v-col>
                                                                                <span>参照画面</span>
                                                                            </v-col>
                                                                            <v-col sm=5>
                                                                                <p>項目No.{{this.dialogKoumokuNO}}:{{this.dialogKoumokuName}}</p>
                                                                                <p>項目の有効期限{{this.dialogEnableDate_1}}~{{this.dialogEnableDate_2}}</p>
                                                                            </v-col>
                                                                        </v-row>
                                                                        <v-row>
                                                                            <v-data-table
                                                                             v-model="dialogKoumokuTableSelected"
                                                                             :headers ="dialogKoumokuTableHeader"
                                                                             :items ="dialogKoumokuTableItem"
                                                                             :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                                             fixed-header
                                                                             singleSelect
                                                                             item-key="CM_CODE"
                                                                             dense
                                                                             height="500px"
                                                                             show-select
                                                                             
                                                                            ></v-data-table>
                                                                        </v-row>
                                                                        <br>
                                                                        <v-divider></v-divider>
                                                                        <v-row class= "mt-2 mb-1 mr-2">
                                                                            <v-spacer></v-spacer>
                                                                            <v-btn small @click="getBuhinkubaFromDialog()" >
                                                                                <v-icon
                                                                                    left
                                                                                    dark
                                                                                >
                                                                                    mdi-check-outline
                                                                                </v-icon>  
                                                                                選択(S)
                                                                            </v-btn>
                                                                            <v-btn small class="ml-2" @click ="dialogBuhinkubun = false">
                                                                                <v-icon
                                                                                    left
                                                                                    dark
                                                                                >
                                                                                    mdi-close-box-outline
                                                                                </v-icon> 
                                                                                閉じる(C)
                                                                            </v-btn>
                                                                        </v-row>
                                                                    </v-container>
                                                                </v-card>
                                                            </v-dialog>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters justify="space-between">
                                                        <v-col>
                                                            <p class="ma-0">・PDM判定</p>
                                                        </v-col>
                                                        <v-col>
                                                            <p class="ma-0">・機種</p>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row  no-gutters>
                                                        <v-col col=6 sm=6>
                                                            <v-row no-gutters>
                                                                <v-col class="ml-10" col="4" sm="4">
                                                                    <v-text-field
                                                                    class="mb-n4"
                                                                    v-model="shousaiPDM"
                                                                    dense outlined>
                                                                    </v-text-field>
                                                                </v-col>
                                                                <v-col>
                                                                     <v-dialog
                                                                    v-model="dialogPDM"
                                                                    width="700"
                                                                    >
                                                                        <template v-slot:activator = "{ on ,attrs}">
                                                                            <v-btn 
                                                                            v-bind="attrs"
                                                                            v-on="on"
                                                                            class = "ml-2 mt-2" 
                                                                            @click="getDialogKoumoku('A13','PDMタイプ')"
                                                                            x-small>
                                                                            ...
                                                                            </v-btn>
                                                                        </template>
                                                                        <v-card>
                                                                            <v-system-bar window dark>
                                                                                    <span>PMRA0191 参照画面（共用マスタ）</span>
                                                                                    <v-spacer></v-spacer>
                                                                                    <v-btn small @click="dialogPDM = false">
                                                                                        <v-icon>mdi-close</v-icon>
                                                                                    </v-btn>
                                                                            </v-system-bar>
                                                                            <v-container>
                                                                                <v-row justify="space-between" no-gutters>
                                                                                    <v-col>
                                                                                        <span>参照画面</span>
                                                                                    </v-col>
                                                                                    <v-col sm=5>
                                                                                        <p>項目No.{{this.dialogKoumokuNO}}:{{this.dialogKoumokuName}}</p>
                                                                                        <p>項目の有効期限{{this.dialogEnableDate_1}}~{{this.dialogEnableDate_2}}</p>
                                                                                    </v-col>
                                                                                </v-row>
                                                                                <v-row>
                                                                                    <v-data-table
                                                                                    v-model="dialogKoumokuTableSelected"
                                                                                    :headers ="dialogKoumokuTableHeader"
                                                                                    :items ="dialogKoumokuTableItem"
                                                                                    :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                                                    fixed-header
                                                                                    singleSelect
                                                                                    item-key="CM_CODE"
                                                                                    dense
                                                                                    height="500px"
                                                                                    show-select
                                                                                    
                                                                                    ></v-data-table>
                                                                                </v-row>
                                                                                <br>
                                                                                <v-divider></v-divider>
                                                                                <v-row class= "mt-2 mb-1 mr-2">
                                                                                    <v-spacer></v-spacer>
                                                                                    <v-btn small @click="getPDMFromDialog()" >
                                                                                        <v-icon
                                                                                            left
                                                                                            dark
                                                                                        >
                                                                                            mdi-check-outline
                                                                                        </v-icon>  
                                                                                        選択(S)
                                                                                    </v-btn>
                                                                                    <v-btn small class="ml-2" @click ="dialogPDM = false">
                                                                                        <v-icon
                                                                                            left
                                                                                            dark
                                                                                        >
                                                                                            mdi-close-box-outline
                                                                                        </v-icon> 
                                                                                        閉じる(C)
                                                                                    </v-btn>
                                                                                </v-row>
                                                                            </v-container>
                                                                        </v-card>
                                                                    </v-dialog>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                        <v-col col=6 sm=6>
                                                            <v-row no-gutters>
                                                                <v-col class="ml-5" col="7" sm="7">
                                                                    <v-text-field
                                                                    class="mb-n4" 
                                                                    v-model="shousaikishuu"
                                                                    dense outlined></v-text-field>
                                                                </v-col>
                                                                <v-col>
                                                                    <v-dialog
                                                                     v-model="dialogKishuu"
                                                                     width="700"
                                                                    >
                                                                        <template v-slot:activator = "{ on ,attrs}">
                                                                            <v-btn 
                                                                            v-bind="attrs"
                                                                            v-on="on"
                                                                            class = "ml-2 mt-2" 
                                                                            @click="getDialogKoumoku('160','機種')"
                                                                            x-small>
                                                                            ...
                                                                            </v-btn>
                                                                        </template>
                                                                        <v-card>
                                                                            <v-system-bar window dark>
                                                                                    <span>PMRA0191 参照画面（共用マスタ）</span>
                                                                                    <v-spacer></v-spacer>
                                                                                    <v-btn small @click="dialogKishuu = false">
                                                                                        <v-icon>mdi-close</v-icon>
                                                                                    </v-btn>
                                                                            </v-system-bar>
                                                                            <v-container>
                                                                                <v-row justify="space-between" no-gutters>
                                                                                    <v-col>
                                                                                        <span>参照画面</span>
                                                                                    </v-col>
                                                                                    <v-col sm=5>
                                                                                        <p>項目No.{{this.dialogKoumokuNO}}:{{this.dialogKoumokuName}}</p>
                                                                                        <p>項目の有効期限{{this.dialogEnableDate_1}}~{{this.dialogEnableDate_2}}</p>
                                                                                    </v-col>
                                                                                </v-row>
                                                                                <v-row>
                                                                                    <v-data-table
                                                                                    v-model="dialogKoumokuTableSelected"
                                                                                    :headers ="dialogKoumokuTableHeader"
                                                                                    :items ="dialogKoumokuTableItem"
                                                                                    :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                                                    fixed-header
                                                                                    singleSelect
                                                                                    item-key="CM_CODE"
                                                                                    dense
                                                                                    height="500px"
                                                                                    show-select
                                                                                    
                                                                                    ></v-data-table>
                                                                                </v-row>
                                                                                <br>
                                                                                <v-divider></v-divider>
                                                                                <v-row class= "mt-2 mb-1 mr-2">
                                                                                    <v-spacer></v-spacer>
                                                                                    <v-btn small @click="getkishuuFromDialog()" >
                                                                                        <v-icon
                                                                                            left
                                                                                            dark
                                                                                        >
                                                                                            mdi-check-outline
                                                                                        </v-icon>  
                                                                                        選択(S)
                                                                                    </v-btn>
                                                                                    <v-btn small class="ml-2" @click ="dialogKishuu = false">
                                                                                        <v-icon
                                                                                            left
                                                                                            dark
                                                                                        >
                                                                                            mdi-close-box-outline
                                                                                        </v-icon> 
                                                                                        閉じる(C)
                                                                                    </v-btn>
                                                                                </v-row>
                                                                            </v-container>
                                                                        </v-card>
                                                                    </v-dialog>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>                                                    
                                                    </v-row>
                                                    <p class="ma-0">・メーカー型番</p>
                                                    <v-row  no-gutters>
                                                        <v-col class="ml-10" col="10" sm="10">
                                                            <v-text-field
                                                            class="mb-n4"
                                                            v-model="shousaiMakerKataban"
                                                            dense outlined></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters justify="space-between">
                                                        <v-col>
                                                            <p class="ma-0">・内外作区分</p>
                                                        </v-col>
                                                        <v-col>
                                                            <p class="ma-0">・貯蔵区分</p>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row  no-gutters>
                                                        <v-col class="ml-10" col="2" sm="2">
                                                            <v-text-field
                                                            class="mb-n4"
                                                            v-model="shousaiNaigai"
                                                            dense outlined>
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col col="1">
                                                            <v-dialog
                                                             v-model="dialogNaigai"
                                                             width="700"
                                                            >
                                                                <template v-slot:activator = "{ on ,attrs}">
                                                                    <v-btn 
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                    class = "ml-2 mt-2" 
                                                                    @click="getDialogKoumoku('A10','内外作区分')"
                                                                    x-small>
                                                                    ...
                                                                    </v-btn>
                                                                </template>
                                                                <v-card>
                                                                    <v-system-bar window dark>
                                                                            <span>PMRA0191 参照画面（共用マスタ）</span>
                                                                            <v-spacer></v-spacer>
                                                                            <v-btn small @click="dialogNaigai = false">
                                                                                <v-icon>mdi-close</v-icon>
                                                                            </v-btn>
                                                                    </v-system-bar>
                                                                    <v-container>
                                                                        <v-row justify="space-between" no-gutters>
                                                                            <v-col>
                                                                                <span>参照画面</span>
                                                                            </v-col>
                                                                            <v-col sm=5>
                                                                                <p class="ml-16">項目No.{{this.dialogKoumokuNO}}:{{this.dialogKoumokuName}}</p>
                                                                                <p>項目の有効期限{{this.dialogEnableDate_1}}~{{this.dialogEnableDate_2}}</p>
                                                                            </v-col>
                                                                        </v-row>
                                                                        <v-row>
                                                                            <v-data-table
                                                                            v-model="dialogKoumokuTableSelected"
                                                                            :headers ="dialogKoumokuTableHeader"
                                                                            :items ="dialogKoumokuTableItem"
                                                                            :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                                            fixed-header
                                                                            singleSelect
                                                                            item-key="CM_CODE"
                                                                            dense
                                                                            height="500px"
                                                                            show-select
                                                                            
                                                                            ></v-data-table>
                                                                        </v-row>
                                                                        <br>
                                                                        <v-divider></v-divider>
                                                                        <v-row class= "mt-2 mb-1 mr-2">
                                                                            <v-spacer></v-spacer>
                                                                            <v-btn small @click="getNaigaiFromDialog()" >
                                                                                <v-icon
                                                                                    left
                                                                                    dark
                                                                                >
                                                                                    mdi-check-outline
                                                                                </v-icon>  
                                                                                選択(S)
                                                                            </v-btn>
                                                                            <v-btn small class="ml-2" @click ="dialogNaigai = false">
                                                                                <v-icon
                                                                                    left
                                                                                    dark
                                                                                >
                                                                                    mdi-close-box-outline
                                                                                </v-icon> 
                                                                                閉じる(C)
                                                                            </v-btn>
                                                                        </v-row>
                                                                    </v-container>
                                                                </v-card>
                                                            </v-dialog>
                                                        </v-col>
                                                        <v-col class="my-0 " col="2" sm="2">
                                                            <v-text-field
                                                            class="mb-n4" 
                                                            v-model="shousaiChozou"
                                                            dense outlined></v-text-field>
                                                        </v-col>
                                                        <v-col>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters >
                                                        <v-col>
                                                            <p class="ma-0">・管理点所</p>
                                                        </v-col>
                                                        <v-col>
                                                            <p class ="ma-0">・在庫担当</p>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters>
                                                        <v-col col=6 sm=6>
                                                            <v-row no-gutters>
                                                                <v-col class= "ml-10" col="4" sm="4">
                                                            <v-text-field
                                                            class="mb-n4"
                                                            v-model="shousaiKanriTenshou"
                                                            dense outlined></v-text-field>
                                                        </v-col>
                                                            </v-row>
                                                        </v-col>
                                                        <v-col col=6 sm=6>
                                                            <v-row no-gutters>
                                                                <v-col class="ml-5" col="4" sm="4">
                                                                    <v-text-field
                                                                    class="mb-n4"
                                                                    v-model="shousaiZaikoTantou"
                                                                    dense outlined></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters >
                                                        <v-col>
                                                            <p class="ma-0">・発注店所</p>
                                                        </v-col>
                                                        <v-col>
                                                            <p class ="ma-0">・発注担当</p>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters>
                                                        <v-col col=6 sm=6>
                                                            <v-row no-gutters>
                                                                <v-col class= "ml-10" col="4" sm="4">
                                                                    <v-text-field
                                                                    class="mb-n4"
                                                                    v-model="shousaiHachuTenshou"
                                                                    dense outlined>
                                                                    </v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                        <v-col col=6 sm=6>
                                                            <v-row no-gutters>
                                                                <v-col class="ml-5" col="4" sm="4">
                                                                    <v-text-field
                                                                    class="mb-n4"
                                                                    v-model="shousaiHachuTantou"
                                                                    dense outlined></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters >
                                                        <v-col>
                                                            <p class="ma-0">・パッケト</p>
                                                        </v-col>
                                                        <v-col>
                                                            <p class ="ma-0">・管理基準</p>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters>
                                                        <v-col col=6 sm=6>
                                                            <v-row no-gutters>
                                                                <v-col class= "ml-10" col="4" sm="4">
                                                                    <v-text-field
                                                                    class="mb-n4"
                                                                    v-model="shousaiBacker"
                                                                    dense outlined></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                        <v-col col=6 sm=6>
                                                            <v-row no-gutters>
                                                                <v-col class="ml-5" col="4" sm="4">
                                                                    <v-text-field
                                                                    class="mb-n4"
                                                                    v-model="shousaiKanriKijun"
                                                                    dense outlined></v-text-field>
                                                                </v-col>
                                                                <v-col col="1">
                                                                    <v-dialog
                                                                     v-model="dialogKanriKijun"
                                                                     width="700"
                                                                    >
                                                                    <template v-slot:activator = "{ on ,attrs}">
                                                                        <v-btn 
                                                                        v-bind="attrs"
                                                                        v-on="on"
                                                                        class = "ml-2 mt-2" 
                                                                        @click="getDialogKoumoku('A12','管理基準')"
                                                                        x-small>
                                                                        ...
                                                                        </v-btn>
                                                                    </template>
                                                                    <v-card>
                                                                        <v-system-bar window dark>
                                                                                <span>PMRA0191 参照画面（共用マスタ）</span>
                                                                                <v-spacer></v-spacer>
                                                                                <v-btn small @click="dialogKanriKijun = false">
                                                                                    <v-icon>mdi-close</v-icon>
                                                                                </v-btn>
                                                                        </v-system-bar>
                                                                        <v-container>
                                                                            <v-row justify="space-between" no-gutters>
                                                                                <v-col>
                                                                                    <span>参照画面</span>
                                                                                </v-col>
                                                                                <v-col sm=5>
                                                                                    <p class="ml-16">項目No.{{this.dialogKoumokuNO}}:{{this.dialogKoumokuName}}</p>
                                                                                    <p>項目の有効期限{{this.dialogEnableDate_1}}~{{this.dialogEnableDate_2}}</p>
                                                                                </v-col>
                                                                            </v-row>
                                                                            <v-row>
                                                                                <v-data-table
                                                                                v-model="dialogKoumokuTableSelected"
                                                                                :headers ="dialogKoumokuTableHeader"
                                                                                :items ="dialogKoumokuTableItem"
                                                                                :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                                                fixed-header
                                                                                singleSelect
                                                                                item-key="CM_CODE"
                                                                                dense
                                                                                height="500px"
                                                                                show-select
                                                                                
                                                                                ></v-data-table>
                                                                            </v-row>
                                                                            <br>
                                                                            <v-divider></v-divider>
                                                                            <v-row class= "mt-2 mb-1 mr-2">
                                                                                <v-spacer></v-spacer>
                                                                                <v-btn small @click="getKanriKijunFromDialog()" >
                                                                                    <v-icon
                                                                                        left
                                                                                        dark
                                                                                    >
                                                                                        mdi-check-outline
                                                                                    </v-icon>  
                                                                                    選択(S)
                                                                                </v-btn>
                                                                                <v-btn small class="ml-2" @click ="dialogKanriKijun = false">
                                                                                    <v-icon
                                                                                        left
                                                                                        dark
                                                                                    >
                                                                                        mdi-close-box-outline
                                                                                    </v-icon> 
                                                                                    閉じる(C)
                                                                                </v-btn>
                                                                            </v-row>
                                                                        </v-container>
                                                                    </v-card>
                                                                </v-dialog>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters justify="space-between">
                                                        <v-col>
                                                            <p class="ma-0">・ABC区分</p>
                                                        </v-col>
                                                        <v-col>
                                                            <p class="ma-0">・在庫管理コード</p>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row  no-gutters>
                                                        <v-col class="ml-10" col="2" sm="2">
                                                            <v-text-field
                                                            class="mb-n4"
                                                            v-model="shousaiABCKanriCodeKubun"
                                                            dense outlined>
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col col="1">
                                                            <v-dialog
                                                             v-model="dialogABCKanriCodeKubun"
                                                             width="700"
                                                            >
                                                            <template v-slot:activator = "{ on ,attrs}">
                                                                <v-btn 
                                                                v-bind="attrs"
                                                                v-on="on"
                                                                class = "ml-2 mt-2" 
                                                                @click="getDialogKoumoku('A16','ABC区分')"
                                                                x-small>
                                                                ...
                                                                </v-btn>
                                                            </template>
                                                            <v-card>
                                                                <v-system-bar window dark>
                                                                        <span>PMRA0191 参照画面（共用マスタ）</span>
                                                                        <v-spacer></v-spacer>
                                                                        <v-btn small @click="dialogABCKanriCodeKubun = false">
                                                                            <v-icon>mdi-close</v-icon>
                                                                        </v-btn>
                                                                </v-system-bar>
                                                                <v-container>
                                                                    <v-row justify="space-between" no-gutters>
                                                                        <v-col>
                                                                            <span>参照画面</span>
                                                                        </v-col>
                                                                        <v-col sm=5>
                                                                            <p class="ml-16">項目No.{{this.dialogKoumokuNO}}:{{this.dialogKoumokuName}}</p>
                                                                            <p>項目の有効期限{{this.dialogEnableDate_1}}~{{this.dialogEnableDate_2}}</p>
                                                                        </v-col>
                                                                    </v-row>
                                                                    <v-row>
                                                                        <v-data-table
                                                                        v-model="dialogKoumokuTableSelected"
                                                                        :headers ="dialogKoumokuTableHeader"
                                                                        :items ="dialogKoumokuTableItem"
                                                                        :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                                        fixed-header
                                                                        singleSelect
                                                                        item-key="CM_CODE"
                                                                        dense
                                                                        height="500px"
                                                                        show-select
                                                                        
                                                                        ></v-data-table>
                                                                    </v-row>
                                                                    <br>
                                                                    <v-divider></v-divider>
                                                                    <v-row class= "mt-2 mb-1 mr-2">
                                                                        <v-spacer></v-spacer>
                                                                        <v-btn small @click="getABCKanriCodeKubunFromDialog()" >
                                                                            <v-icon
                                                                                left
                                                                                dark
                                                                            >
                                                                                mdi-check-outline
                                                                            </v-icon>  
                                                                            選択(S)
                                                                        </v-btn>
                                                                        <v-btn small class="ml-2" @click ="dialogABCKanriCodeKubun = false">
                                                                            <v-icon
                                                                                left
                                                                                dark
                                                                            >
                                                                                mdi-close-box-outline
                                                                            </v-icon> 
                                                                            閉じる(C)
                                                                        </v-btn>
                                                                    </v-row>
                                                                </v-container>
                                                            </v-card>
                                                        </v-dialog>
                                                        </v-col>
                                                        <v-col class="my-0 mr-2" col="2" sm="2">
                                                            <v-text-field 
                                                            v-model="shousaiZaikoKanriCode"
                                                            dense outlined></v-text-field>
                                                        </v-col>
                                                        <v-col>
                                                        </v-col>
                                                    </v-row>
                                                    
                                                </v-col>
                                                <v-col>
                                                    <v-row no-gutters> 
                                                        <v-col>
                                                            <p class ="my-0">・在庫数</p>
                                                        </v-col>
                                                        <v-col>
                                                            <v-checkbox 
                                                            class ="mt-n1 mb-n5"
                                                            v-model="shousaiZaikoZeroCheckBox"
                                                            label="在庫0ではない。"
                                                            dense
                                                            >
                                                            </v-checkbox>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters>
                                                        <v-col class="ml-8" col="3" sm="3">
                                                            <v-text-field
                                                            class ="mb-n3"
                                                            v-model="shousaiZaikousuu1"
                                                            dense outlined
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col class="ml-2" col="2" sm="2" >
                                                            <p class="mt-2">≦数量≦</p>
                                                        </v-col>
                                                        <v-col col="3" sm="3">
                                                            <v-text-field
                                                            class ="mb-n3"
                                                            v-model="shousaiZaikousuu2"
                                                            dense outlined></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters> 
                                                        <v-col>
                                                            <p class ="mt-n1">・在庫金額</p>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row class="mt-1" no-gutters>
                                                        <v-col class="ml-8" col="3" sm="3">
                                                            <v-text-field
                                                            class ="mb-n4"
                                                            v-model="shousaiZaikouKingaku1"
                                                            dense outlined
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col class="ml-2" col="2" sm="2" >
                                                            <p class="mt-2 mb-n4">≦金額≦</p>
                                                        </v-col>
                                                        <v-col col="3" sm="3">
                                                            <v-text-field
                                                            class ="mb-n4"
                                                            v-model="shousaiZaikouKingaku2"
                                                            dense outlined></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters> 
                                                        <v-col>
                                                            <p class ="ma-0">・標準単価（ゼロの抜き出しは0以上0以下）</p>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters>
                                                        <v-col class="ml-8" col="3" sm="3">
                                                            <v-text-field
                                                            class ="mb-n4"
                                                            v-model="shousaihyoujunTanka1"
                                                            dense outlined
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col class="ml-2" col="2" sm="2" >
                                                            <p class="mt-2 mb-n4">≦単価≦</p>
                                                        </v-col>
                                                        <v-col col="3" sm="3">
                                                            <v-text-field
                                                            class ="mb-n4"
                                                            v-model="shousaihyoujunTanka2"
                                                            dense outlined></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters> 
                                                        <v-col>
                                                            <p class ="my-0">・最終入庫日</p>
                                                        </v-col>
                                                        <v-col>
                                                            <v-checkbox 
                                                            class ="mt-n2 mb-n5"
                                                            v-model="shousaiNyuukoubiCheck"
                                                            label="入庫履歴なし"
                                                            dense
                                                            >
                                                            </v-checkbox>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row class="ma-0" no-gutters>
                                                        <v-col col="5" sm="5">
                                                            <v-menu
                                                            ref="menu"
                                                            v-model="shousaiNyuukoMenu1"
                                                            :close-on-content-click="false"
                                                            :nudge-right="40"
                                                            transition="scale-transition"
                                                            offset-y
                                                            min-width="auto"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field
                                                                    class="mb-n6 mt-1"
                                                                    v-model="shousaiNyuukoDate1"
                                                                    label="YYYY/MM/DD"
                                                                     
                                                                    dense
                                                                    outlined
                                                                    readonly
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                ></v-text-field>
                                                                </template>
                                                                <v-date-picker
                                                                v-model="shousaiNyuukoDate1"
                                                                @input="shousaiNyuukoMenu1 = false"
                                                                >
                                                                </v-date-picker>
                                                            </v-menu>
                                                        </v-col>
                                                        <v-col col="1" sm ="1"><p class="ml-2 mt-2">～</p></v-col>
                                                        <v-col col="5" sm="5">
                                                            <v-menu
                                                            ref="menu"
                                                            v-model="shousaiNyuukoMenu2"
                                                            :close-on-content-click="false"
                                                            :nudge-right="40"
                                                            transition="scale-transition"
                                                            offset-y
                                                            left
                                                            min-width="auto"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field
                                                                    class="mb-n6 mt-1"
                                                                    v-model="shousaiNyuukoDate2"
                                                                    label="YYYY/MM/DD"
                                                                     
                                                                    dense
                                                                    outlined
                                                                    readonly
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                ></v-text-field>
                                                                </template>
                                                                <v-date-picker
                                                                v-model="shousaiNyuukoDate2"
                                                                @input="shousaiNyuukoMenu2 = false"
                                                                >
                                                                </v-date-picker>
                                                            </v-menu>
                                                            </v-col>
                                                    </v-row>
                                                    <v-row no-gutters> 
                                                        <v-col>
                                                            <p class ="my-0">・最終出庫日</p>
                                                        </v-col>
                                                        <v-col>
                                                            <v-checkbox 
                                                            class ="mt-n1 mb-n5"
                                                            v-model="shousaiShukkobiCheck"
                                                            label="出庫履歴なし"
                                                            dense
                                                            >
                                                            </v-checkbox>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row class="ma-0"  no-gutters>
                                                        <v-col col="5" sm="5">
                                                            <v-menu
                                                            ref="menu"
                                                            v-model="shousaiShukkokoMenu1"
                                                            :close-on-content-click="false"
                                                            :nudge-right="40"
                                                            transition="scale-transition"
                                                            offset-y
                                                            min-width="auto"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field
                                                                    class="mb-n6 mt-1"
                                                                    v-model="shousaiShukkokoDate1"
                                                                    label="YYYY/MM/DD"
                                                                     
                                                                    dense
                                                                    outlined
                                                                    readonly
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                ></v-text-field>
                                                                </template>
                                                                <v-date-picker
                                                                v-model="shousaiShukkokoDate1"
                                                                @input="shousaiShukkokoMenu1 = false"
                                                                >
                                                                </v-date-picker>
                                                            </v-menu>
                                                        </v-col>
                                                        <v-col col="1" sm ="1"><p class="ml-2 mt-2">～</p></v-col>
                                                        <v-col col="5" sm="5">
                                                            <v-menu
                                                            ref="menu"
                                                            v-model="shousaiShukkokoMenu2"
                                                            :close-on-content-click="false"
                                                            :nudge-right="40"
                                                            transition="scale-transition"
                                                            offset-y
                                                            left
                                                            min-width="auto"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field
                                                                    class="mb-n6 mt-1"
                                                                    v-model="shousaiShukkokoDate2"
                                                                    label="YYYY/MM/DD"
                                                                     
                                                                    dense
                                                                    outlined
                                                                    readonly
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                ></v-text-field>
                                                                </template>
                                                                <v-date-picker
                                                                v-model="shousaiShukkokoDate2"
                                                                @input="shousaiShukkokoMenu2 = false"
                                                                >
                                                                </v-date-picker>
                                                            </v-menu>
                                                            </v-col>
                                                    </v-row>
                                                    <v-row no-gutters> 
                                                        <v-col>
                                                            <p class ="ma-0">・貯蔵開始日</p>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row class="ma-0" no-gutters>
                                                        <v-col col="5" sm="5">
                                                            <v-menu
                                                            ref="menu"
                                                            v-model="shousaiChozouKaishiMenu1"
                                                            :close-on-content-click="false"
                                                            :nudge-right="40"
                                                            transition="scale-transition"
                                                            offset-y
                                                            min-width="auto"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field
                                                                    class="mb-n6 mt-1"
                                                                    v-model="shousaiChozouKaishiDate1"
                                                                    label="YYYY/MM/DD"
                                                                     
                                                                    dense
                                                                    outlined
                                                                    readonly
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                ></v-text-field>
                                                                </template>
                                                                <v-date-picker
                                                                v-model="shousaiChozouKaishiDate1"
                                                                @input="shousaiChozouKaishiMenu1 = false"
                                                                >
                                                                </v-date-picker>
                                                            </v-menu>
                                                        </v-col>
                                                        <v-col col="1" sm ="1"><p class="ml-2 mt-2">～</p></v-col>
                                                        <v-col col="5" sm="5">
                                                            <v-menu
                                                            ref="menu"
                                                            v-model="shousaiChozouKaishiMenu2"
                                                            :close-on-content-click="false"
                                                            :nudge-right="40"
                                                            transition="scale-transition"
                                                            offset-y
                                                            left
                                                            min-width="auto"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field
                                                                    class="mb-n6 mt-1"
                                                                    v-model="shousaiChozouKaishiDate2"
                                                                    label="YYYY/MM/DD"
                                                                     
                                                                    dense
                                                                    outlined
                                                                    readonly
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                ></v-text-field>
                                                                </template>
                                                                <v-date-picker
                                                                v-model="shousaiChozouKaishiDate2"
                                                                @input="shousaiChozouKaishiMenu2 = false"
                                                                >
                                                                </v-date-picker>
                                                            </v-menu>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row no-gutters> 
                                                            <v-col>
                                                                <p class ="ma-0 mt-2">・貯蔵中止予定</p>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row no-gutters>
                                                            <v-col>
                                                                <v-radio-group class="ma-0 mb-n4" v-model="shousaiChoushiYoutei" row >
                                                                    <v-radio
                                                                    label="含む"
                                                                    value=""
                                                                    ></v-radio>
                                                                    <v-radio
                                                                    label="除く"
                                                                    value="0"
                                                                    ></v-radio>
                                                                    <v-radio
                                                                    label="中止予定のみ"
                                                                    value="1"
                                                                    ></v-radio>
                                                                </v-radio-group>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row no-gutters> 
                                                            <v-col>
                                                                <p class ="ma-0">・貯蔵止め部品</p>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row no-gutters>
                                                            <v-col>
                                                                <v-radio-group class="ma-0 mb-n4" v-model="shousaiChoushi" row >
                                                                    <v-radio
                                                                    label="含む"
                                                                    value=""
                                                                    ></v-radio>
                                                                    <v-radio
                                                                    label="除く"
                                                                    value="0"
                                                                    ></v-radio>
                                                                    <v-radio
                                                                    label="貯蔵中止のみ"
                                                                    value="1"
                                                                    ></v-radio>
                                                                </v-radio-group>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="mt-n3">
                                                            <v-col>
                                                                <p class = "ma-0">・取引先コード</p>
                                                            </v-col>
                                                            <v-col>
                                                                <p class= "ma-0">・工程コード</p>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="mt-1" no-gutters>
                                                            <v-col cols="6" sm="6">
                                                                <v-row>
                                                                    <v-col class="ml-3" col="8" sm="8">
                                                                        <v-combobox
                                                                        v-model="shousaiTorisakiCode"
                                                                        class="mb-n4"
                                                                        dense outlined>
                                                                        </v-combobox>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-col>
                                                            <v-col cols="6" sm="6">
                                                                <v-row no-gutters>
                                                                    <v-col class="ml-3" col="7" sm="7" >
                                                                        <v-text-field 
                                                                        v-model="shousaiKoteiCode"
                                                                        class="mb-n4"
                                                                        dense outlined>
                                                                        </v-text-field>
                                                                    </v-col>
                                                                    <v-col class="ml-2" col="1" sm="1">
                                                                        <v-dialog
                                                                            v-model="dialogKouteiCode"
                                                                            width="700"
                                                                            >
                                                                            <template v-slot:activator = "{ on ,attrs}">
                                                                                <v-btn 
                                                                                v-bind="attrs"
                                                                                v-on="on"
                                                                                class = "ml-2 mt-2" 
                                                                                @click="getDialogKouteiCode_Init()"
                                                                                x-small>
                                                                                ...
                                                                                </v-btn>
                                                                            </template>
                                                                            <v-card>
                                                                                <v-system-bar window dark>
                                                                                        <span>PMRA0191 参照画面（工程コードマスタ）</span>
                                                                                        <v-spacer></v-spacer>
                                                                                        <v-btn small @click="dialogKouteiCode = false">
                                                                                            <v-icon>mdi-close</v-icon>
                                                                                        </v-btn>
                                                                                </v-system-bar>
                                                                                <v-container>
                                                                                    <v-row no-gutters>
                                                                                        <v-col>
                                                                                            <span>参照画面　-工程コードマスター</span>
                                                                                        </v-col>
                                                                                    </v-row>
                                                                                    <v-row>
                                                                                        <v-col cols ="3" sm="3"><p>工程コード</p></v-col>
                                                                                        <v-col cols ="2" sm="2"><p>ワークセンター</p></v-col>
                                                                                        <v-col cols ="2" sm="2"><p>コストセンター</p></v-col>
                                                                                        <v-col cols ="2" sm="2"><p>作業コード</p></v-col>
                                                                                    </v-row>
                                                                                    <v-row>
                                                                                        <v-col cols ="3" sm="3">
                                                                                            <v-text-field
                                                                                             class="mr-4"
                                                                                             v-model="KT_CODE"
                                                                                             dense
                                                                                             outlined
                                                                                            >    
                                                                                            </v-text-field>
                                                                                        </v-col>
                                                                                        <v-col cols ="2" sm="2">
                                                                                            <v-text-field
                                                                                             class="mr-10"
                                                                                             v-model="WC_CODE"
                                                                                             dense
                                                                                             outlined
                                                                                            >
                                                                                            </v-text-field>
                                                                                        </v-col>
                                                                                        <v-col cols ="2" sm="2">
                                                                                            <v-text-field
                                                                                             class="mr-10"
                                                                                             v-model="CC_CODE"
                                                                                             dense
                                                                                             outlined
                                                                                            >
                                                                                            </v-text-field>
                                                                                        </v-col>
                                                                                        <v-col cols ="2" sm="2">
                                                                                            <v-text-field
                                                                                             class="mr-10"
                                                                                             v-model="SG_CODE"
                                                                                             dense
                                                                                             outlined
                                                                                            >
                                                                                            </v-text-field>
                                                                                        </v-col>
                                                                                        <v-col>
                                                                                            <v-btn small @click="getClearKouteiCodeText()"><v-icon left>mdi-close-circle</v-icon>クリア（C）</v-btn>
                                                                                        </v-col>
                                                                                    </v-row>
                                                                                    <v-row>
                                                                                        <v-data-table
                                                                                        v-model="dialogKouteiCodeTableSelected"
                                                                                        :headers ="dialogKouteiCodeTableHeader"
                                                                                        :items ="dialogKouteiCodeTableItem"
                                                                                        fixed-header
                                                                                        singleSelect
                                                                                        item-key="KT_CODE"
                                                                                        dense
                                                                                        height="500px"
                                                                                        show-select
                                                                                        :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                                                        >
                                                                                        </v-data-table>
                                                                                    </v-row>
                                                                                    <br>
                                                                                    <v-divider></v-divider>
                                                                                    <v-row class= "mt-2 mb-1 mr-2">
                                                                                        <v-spacer></v-spacer>
                                                                                        <v-btn small @click="getKouteicode()" >
                                                                                            <v-icon
                                                                                                left
                                                                                                dark
                                                                                            >
                                                                                                mdi-check-outline
                                                                                            </v-icon>  
                                                                                            選択(S)
                                                                                        </v-btn>
                                                                                        <v-btn small class="ml-2" @click ="dialogKouteiCode = false">
                                                                                            <v-icon
                                                                                                left
                                                                                                dark
                                                                                            >
                                                                                                mdi-close-box-outline
                                                                                            </v-icon> 
                                                                                            閉じる(C)
                                                                                        </v-btn>
                                                                                    </v-row>
                                                                                </v-container>
                                                                            </v-card>
                                                                        </v-dialog>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="mt-n3">
                                                            <v-col>
                                                                <p class = "my-n2">・作業コード</p>
                                                            </v-col>
                                                            <v-col>
                                                                <p class= "my-n2">・部位（保守マスタ）</p>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="mt-1" no-gutters>
                                                            <v-col cols="6" sm="6">
                                                                <v-col cols="9" sm="9">
                                                                    <v-text-field
                                                                    v-model="shousaiSagyouCode"
                                                                    class="mb-n6"
                                                                    dense outlined>
                                                                    </v-text-field>
                                                                </v-col>
                                                            </v-col>
                                                            <v-col cols="6" sm="6">
                                                                <v-col cols="9" sm="9">
                                                                    <v-text-field 
                                                                    v-model="shousaiBui"
                                                                    class="mb-n6"
                                                                    dense outlined>
                                                                    </v-text-field>
                                                                </v-col>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="mt-0 mb-n6">
                                                            <v-col cols="6" sm="6">
                                                                <p class = "my-n5">・価格設定</p>
                                                            </v-col>
                                                            <v-col cols="6" sm="6">
                                                                <p class= "my-n5">・保守判定</p>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="ma-0" no-gutters >
                                                            <v-col  cols="6" sm="6">
                                                                <v-col cols="9" sm="9">
                                                                    <v-combobox 
                                                                    v-model="shousaiKakakuSetttei"
                                                                    :items ="shousaiKakakuSettteiItems"
                                                                    class="mb-n6"
                                                                    dense outlined>
                                                                    </v-combobox>
                                                                </v-col>
                                                            </v-col>
                                                            <v-col cols="6" sm="6">
                                                                <v-col cols="9" sm="9">
                                                                    <v-combobox 
                                                                    v-model="shousaiHoshuHantei"
                                                                    :items ="shousaiHoshuHanteiItems"
                                                                    class="mb-n6"
                                                                    dense outlined>
                                                                    </v-combobox>
                                                                </v-col>
                                                            </v-col>
                                                        </v-row>

                                                </v-col>
                                            </v-row>
                                            <v-row class="mt-n4"  justify="end" no-gutters>
                                                <v-col col=4 sm=4>
                                                    <v-checkbox
                                                    class="ma-0"
                                                    v-model="shousaiCheckBox1"
                                                    label="図面発行後二次情報が変更されていない"
                                                    ></v-checkbox>
                                                </v-col>
                                                <v-col col=4 sm=4>
                                                    <v-checkbox
                                                    class="ma-0"
                                                    v-model="shousaiCheckBox2"
                                                    label="製造原価登録済且つ販売価格未登録部品"
                                                    ></v-checkbox>
                                                </v-col>
                                            </v-row>
                                            <v-row class="mt-n4" justify="end" no-gutters>
                                                <v-col col=3 sm=2>
                                                    <v-checkbox
                                                    class="ma-0"
                                                    v-model="shousaiCheckBox3"
                                                    label="修理提案書使用済"
                                                    ></v-checkbox>
                                                </v-col>
                                                <v-col col=3 sm=3>
                                                    <v-checkbox
                                                    class="ma-0"
                                                    v-model="shousaiCheckBox4"
                                                    label="部品説明or取替理由が未登録"
                                                    ></v-checkbox>
                                                </v-col>
                                                <v-col col=3 sm=3>
                                                    <v-checkbox
                                                    class="ma-0"
                                                    v-model="shousaiCheckBox5"
                                                    label="写真未登録"
                                                    ></v-checkbox>
                                                </v-col>
                                            </v-row>
                                            <v-row justify="end" no-gutters>
                                                <v-col col=9 sm=9>
                                                    <span class="blue--text">「部品説明or取替理由が未登録」、「写真未登録」を選択した場合は、「修理提案使用済」も自動でチェックして検索します。</span>
                                                </v-col>
                                            </v-row>
                                            <v-divider></v-divider>
                                            <v-row class="mt-2" no-gutters >
                                                <v-spacer></v-spacer>
                                                <v-col> 
                                                    <v-btn @click="getShousaiKensaku()">
                                                        <v-icon>mdi-magnify</v-icon>
                                                        検索（F）
                                                    </v-btn>
                                                    <v-btn @click="shousaiClear()">
                                                        <v-icon color="red">mdi-close-circle</v-icon>
                                                        条件クリア（C）
                                                    </v-btn>
                                                    <v-btn  @click="shousaiDialog = false" >
                                                        <v-icon color="red">mdi-close-box</v-icon>
                                                        閉じる（X）
                                                    </v-btn>
                                                </v-col>
                                                </v-row>
                                                <br>
                                            </v-form>
                                        </v-card>  
                                        <!-- 詳細検索条件　-->
                                    </v-container>  
                                </v-dialog>
                            </v-content>
                        </v-form>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
            <!-- 基本検索条件 -->
            <!-- 検索テーブル -->
            <v-navigation-drawer
                v-model="drawer"
                :mini-variant.sync="mini2"
                mini-variant-width = 3%
                floating
                :width = table_width
            >
                <v-list
                 nav
                 dense
                 >
                 <v-row no-gutters justify="space-between">
                    <v-col>
                    <v-btn class = "sm-2"
                        icon
                        @click.stop="changeTableMiniWidth()"
                    >
                        <v-icon>mdi-step-backward</v-icon>
                    </v-btn>検索結果
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-btn 
                        class="ml-10" small icon
                        @click.stop="changeTableWidth()"
                    >
                            <v-icon>mdi-fit-to-page-outline</v-icon>
                        </v-btn>
                 </v-row>
                        <v-container fluid>
                        <v-row justify="center">
                            <v-col>
                                <v-data-table
                                 height="70vh"
                                 :headers="HeaderTable"
                                 :items="APIJSON"
                                 :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                >
                                <template v-slot:item.PART_NO="{item}">
                                    <v-btn text elevation="0" small @click.stop="getHeaderInfo(item.PART_NO)">
                                        {{item.PART_NO}}
                                    </v-btn>
                                </template>
                                 <template v-slot:item.SOUSA="{item}">
                                    <v-row no-gutters>
                                        <v-col>
                                            <v-btn small elevation ="0" @click="open_new_tab(item.PART_NO)">
                                                <v-icon>mdi-tab-plus</v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col>
                                          <v-menu offset-x offset-y>
                                            <template v-slot:activator ="{on,attrs}">
                                              <v-btn v-bind ="attrs" v-on ="on" small elevation ="0" @click="getPic(item.PART_NO)">
                                                <v-icon>mdi-image-outline</v-icon>
                                              </v-btn>
                                            </template>
                                            <v-card v-if="item.PART_NO != ''" width="300" height="300" >
                                              <v-container>
                                                <v-row> 
                                                  <v-col>
                                                    <h1 class="d-flex justify-center">{{Pic_Loc}}</h1>
                                                  </v-col>
                                                </v-row>
                                              </v-container> 
                                              </v-card>
                                          </v-menu>
                                        </v-col>
                                        <v-col>
                                            <v-btn small elevation ="0">
                                                <v-icon>mdi-file-tree-outline</v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                 </template>
                                </v-data-table>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-list>   
            </v-navigation-drawer>
            <!-- 検索テーブル -->
            <v-card
             :width = tab_width
            >
                <v-tabs
                 v-model="tab_select"
                 background-color="cyan"
                 dark
                >
                    <v-tabs-slider color="yellow"></v-tabs-slider>
                    <v-tab
                     v-for ="tab_name in tab_menu" 
                     :key="tab_name"
                    >
                        {{tab_name}}
                    </v-tab>
                </v-tabs>
                <!--  手配画面表示 -->
                <v-text-field
                    v-model="Test_userID"
                    label="Enter USER_ID"
                    >
                </v-text-field>
                
                <div v-if="tab_select == 0">
                    <v-container fluid>
                    <v-card outlined shaped tile>
                        <v-row no-gutters>
                            <v-col cols="10" sm="10">
                                <v-card-text v-if ="this.showHeader">
                                    部品コード {{this.Header_Data[this.Header_Data.length-1].PART_NO}} [{{this.Header_Data[this.Header_Data.length-1].PART_REV_NO}} ]
                                    部品名　{{this.Header_Data[this.Header_Data.length-1].PART_NAME_LOC1}}
                                </v-card-text>
                                <v-card-text class="mt-n5" v-if ="this.showHeader">
                                    更新者　[{{this.Header_Data[this.Header_Data.length-1].UPD_WHO }}] {{this.Header_Data[this.Header_Data.length-1].UPD_NAME}} 
                                    {{this.Header_Data[this.Header_Data.length-1].UPD_WHEN.substring(0,4)}}.{{this.Header_Data[this.Header_Data.length-1].UPD_WHEN.substring(4,6)}}.{{this.Header_Data[this.Header_Data.length-1].UPD_WHEN.substring(6,8)}}
                                    {{this.Header_Data[this.Header_Data.length-1].UPD_WHEN.substring(8,10)}}:{{this.Header_Data[this.Header_Data.length-1].UPD_WHEN.substring(10,12)}}:{{this.Header_Data[this.Header_Data.length-1].UPD_WHEN.substring(12,14)}}
                                    登録者　[{{this.Header_Data[this.Header_Data.length-1].ENT_WHO}}] {{this.Header_Data[this.Header_Data.length-1].ENT_NAME}}
                                    {{this.Header_Data[this.Header_Data.length-1].ENT_WHEN.substring(0,4)}}.{{this.Header_Data[this.Header_Data.length-1].ENT_WHEN.substring(4,6)}}.{{this.Header_Data[this.Header_Data.length-1].ENT_WHEN.substring(6,8)}}
                                    {{this.Header_Data[this.Header_Data.length-1].ENT_WHEN.substring(8,10)}}:{{this.Header_Data[this.Header_Data.length-1].ENT_WHEN.substring(10,12)}}:{{this.Header_Data[this.Header_Data.length-1].ENT_WHEN.substring(12,14)}}
                                </v-card-text>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col class="mt-10 mr-2">
                            <v-btn icon><v-icon right>mdi-image</v-icon></v-btn>
                            </v-col>
                        </v-row>
    
                        <v-card-text v-if ="!this.showHeader"></v-card-text>
                    </v-card>
                    </v-container>
                    <v-container fluid>
                        <v-card>
                            <v-data-table
                            :headers="kaiteiTableHeader"
                            :items="Header_Data"
                            item-key="PART_REV_NO"
                            :sort-by="['PART_REV_NO']"
                            dense
                            hide-default-footer
                            @click:row="Editinfo" 
                            >
                            </v-data-table>
                        </v-card>
                    </v-container >
                    <v-container fluid>
                        <v-row>
                            <v-col cols="6" sm="6">
                                <v-card>   
                                    <v-row no-gutters>
                                        <v-col class="ml-2 mt-2">
                                            <h3>P/M基本情報</h3>
                                        </v-col>
                                        <v-spacer>
                                        </v-spacer>
                                        <v-col class="d-flex">
                                            <v-btn class = "ml-auto mr-2 my-1 mt-2 " outlined small>フィルター</v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-data-table
                                    :headers="this.Editinfo_Header"
                                    :items="this.EditInfo_Value"
                                    :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                    hide-default-footer
                                    :height="PM_height"
                                    dense
                                    >
                                    <template v-slot:item.CELL_TYPE="{item}">
                                        <!--  共用マスター -->
                                        <v-btn 
                                        v-if="item.MS_TABLE == '1' && item.CELL_TYPE == 'B' && item.AUTH_TYPE == '2'"
                                        x-small 
                                        @click="getEditDialogBtn1(EditInfo_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,1)"
                                        >...</v-btn>
                                        <!-- 注文コードマスター -->
                                        <v-btn
                                        v-if ="item.MS_TABLE == '2' && item.AUTH_TYPE == '2'&& item.CELL_TYPE == 'B'"
                                        @click = "getEditDialogBtn2(EditInfo_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,1)"
                                        x-small
                                        >...</v-btn>
                                        <!-- 担当コードマスター -->
                                        <v-btn
                                        v-if ="item.MS_TABLE == '3' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                        @click = "getEditDialogBtn3(EditInfo_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,1)"
                                        x-small
                                        >...</v-btn>
                                        <v-btn
                                        v-if ="item.MS_TABLE == '4' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                        @click = "getEditDialogBtn4(EditInfo_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,1)"
                                        x-small
                                        >...</v-btn>
                                    </template>
                                    <template v-slot:item.FIELD_VALUE="{item}">
                                        <v-text-field
                                            :class="item.ALIGNMENT == 'R  '?'mb-n5 right-input':'mb-n5 left-input'"
                                            :disabled = "item.AUTH_TYPE == '2' && EditRevDate_Eable ?false:true"
                                            :filled= "item.AUTH_TYPE == '2'?false:true"
                                            :maxlength ="item.CELL_LENGTH == null ? false: item.CELL_LENGTH"
                                            v-model = EditInfo_Value[EditInfo_Value.indexOf(item)].FIELD_VALUE
                                            dense
                                            outlined>
                                        </v-text-field>
                                    </template>
                                    </v-data-table>
                                </v-card>
                            </v-col>
                            <v-col cols ="6" sm ="6">
                                <v-card>
                                    <v-row no-gutters>
                                        <v-col class = "ml-2 mt-2">
                                            <h3>手配情報</h3>
                                        </v-col>
                                        <v-col class ="mt-2">
                                            <h4>工場区分</h4>
                                        </v-col>
                                        <v-col>
                                            <v-combobox 
                                            v-model="Edit_Combobox_1_select"
                                            :items = "Edit_Combobox_1_item"
                                            @change="getEditTable2(Edit_Combobox_PART_NO,Edit_Combobox_1_select.substring(0,1))"
                                            class ="mt-2" 
                                            dense 
                                            outlined>
                                        </v-combobox>
                                        </v-col >
                                        <v-tooltip bottom>
                                          <template v-slot:activator ="{on}">
                                            <v-simple-checkbox
                                            v-model="Edit_checkbox"
                                            v-on="on"
                                            hide-details
                                            class="ml-2 mb-4">
                                            </v-simple-checkbox>
                                          </template>
                                          <span>保存時に右の工場へデータをコピーする</span>
                                        </v-tooltip>
                                        

                                        <v-col class ="mr-2">
                                            <v-combobox 
                                            v-model="Edit_Combobox_2_select"
                                            :items = "Edit_Combobox_2_item"
                                            :disabled= Edit_checkbox?false:true
                                            class ="mt-2" 
                                            dense 
                                            outlined>
                                        </v-combobox>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-btn class = "ml-auto mr-2 my-1 mt-n5" outlined small>フィルター</v-btn>
                                    </v-row>
                                    <v-data-table
                                    :headers="this.Editinfo2_Header"
                                    :items="this.EditInfo2_Value"
                                    :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                    hide-default-footer
                                    :height="Teihai_height"
                                    dense
                                    >
                                        <template v-slot:item.CELL_TYPE="{item}">
                                            <!--  共用マスター -->
                                            <v-btn 
                                            v-if="item.MS_TABLE == '1' && item.CELL_TYPE == 'B' && item.AUTH_TYPE == '2'"
                                            x-small 
                                            @click="getEditDialogBtn1(EditInfo2_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                            >...</v-btn>
                                            <!-- 注文コードマスター -->
                                            <v-btn
                                            v-if ="item.MS_TABLE == '2' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                            x-small
                                            @click = "getEditDialogBtn2(EditInfo2_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                            >...</v-btn>
                                            <!-- 担当コードマスター -->
                                            <v-btn
                                            v-if ="item.MS_TABLE == '3' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                            x-small
                                            @click = "getEditDialogBtn3(EditInfo2_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                            >...</v-btn>
                                            <v-btn
                                            v-if ="item.MS_TABLE == '4' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                            @click = "getEditDialogBtn4(EditInfo2_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                            x-small
                                            >...</v-btn>
                                        </template>
                                        <template v-slot:item.FIELD_VALUE="{item}">
                                            <v-text-field
                                                :class="item.ALIGNMENT == 'R  '?'mb-n5 right-input':'mb-n5 left-input'"
                                                :disabled = "Edit_Combobox_1_select.substr(0,1) != '-' && item.AUTH_TYPE == '2' && EditRevDate_Eable?false:true"
                                                :filled= "Edit_Combobox_1_select.substr(0,1) != '-'&& item.AUTH_TYPE == '2' && EditRevDate_Eable?false:true"
                                                :maxlength ="item.CELL_LENGTH == null ? false: item.CELL_LENGTH"
                                                v-model = EditInfo2_Value[EditInfo2_Value.indexOf(item)].FIELD_VALUE
                                                outlined
                                                dense>
                                            </v-text-field>
                                        </template>
                                    </v-data-table>
                                </v-card>
                            </v-col>    
                        </v-row>
                    </v-container>
                    <v-container fluid>
                        <v-row no-gutters justify="end">
                            <v-col class="d-flex flex-row-reverse" >
                                <v-btn large>
                                    <v-icon
                                        left
                                        dark
                                        large
                                    >
                                    mdi-content-save
                                    </v-icon>
                                    <h3>保存</h3>
                                </v-btn>
                                <v-btn class="mr-2" large>
                                    <v-icon
                                        left
                                        dark
                                        large
                                    >
                                        mdi-close-box-outline
                                    </v-icon> 
                                    <h3>閉じる</h3>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
                <!-- 製作画面表示 -->
                <div v-if="tab_select == 1">
                    <v-container>
                        <h1>製作画面</h1>
                    </v-container>
                </div>
                <!-- 購買画面表示 -->
                <div v-if="tab_select == 2">
                    <v-container>
                        <h1>購買画面</h1>
                    </v-container>
                </div>
                <!-- 入出庫画面表示 -->
                <div v-if="tab_select == 3">
                    <v-container>
                        <h1>入出庫画面</h1>
                    </v-container>
                </div>
                <!-- 在庫画面表示 -->
                <div v-if="tab_select == 4">
                    <v-container>
                        <h1>在庫画面</h1>
                    </v-container>
                </div>
                <!-- 保守画面表示 -->
                <div v-if="tab_select == 5">
                    <v-container>
                        <h1>保守画面</h1>
                    </v-container>
                </div>
                <!-- PC/SP画面表示 -->
                <div v-if="tab_select == 6">
                    <v-container>
                        <h1>PC/SP画面</h1>
                    </v-container>
                </div>
                <!-- P/S画面表示 -->
                <div v-if="tab_select == 7">
                    <v-container>
                        <h1>P/S画面</h1>
                    </v-container>
                </div>
                <!-- 切替画面表示 -->
                <div v-if="tab_select == 8">
                    <v-container>
                        <h1>切替画面</h1>
                    </v-container>
                </div>
                <v-dialog
                    v-model="dialogEditInfo"
                    width="700"
                >
                <v-card>
                    <v-system-bar window>
                            <span v-if="this.EditdialogStatus =='1' ">PMRA0191 参照画面（共用マスタ）</span>
                            <span v-if="this.EditdialogStatus =='2' ">PMRA0194 参照画面（注文書コードマスター）</span>
                            <span v-if="this.EditdialogStatus =='3' ">PMRA0195 参照画面（担当コードマスター）</span>
                            <span v-if="this.EditdialogStatus =='4' ">PMRA0195 参照画面（単位読替マスター）</span>
                            <v-spacer></v-spacer>
                            <v-btn small @click="dialogEditInfo = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                    </v-system-bar>
                    <v-container>
                        <v-row justify="space-between" no-gutters>
                            <v-col>
                                <span>参照画面</span>
                            </v-col>
                            <v-col sm=5>
                                <div v-if="this.EditdialogStatus == '1'">
                                    <p>項目No.{{dialogKoumokuNO}}:{{dialogKoumokuName}} Index :{{this.EditIndex}}</p>
                                    <p>項目の有効期限{{dialogEnableDate_1}}~{{dialogEnableDate_2}}</p>
                                </div>
                                <div v-if="this.EditdialogStatus == '2'">
                                
                                </div>
                                <div v-if="this.EditdialogStatus == '3'">
                                
                                </div>
                                <div v-if="this.EditdialogStatus == '4'">
                                
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-data-table
                            v-if="this.EditdialogStatus == '1'"
                            v-model="dialogKoumokuTableSelected"
                            :headers ="dialogKoumokuTableHeader"
                            :items ="dialogKoumokuTableItem"
                            :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                            fixed-header
                            singleSelect
                            item-key="CM_CODE"
                            dense
                            height="500px"
                            show-select
                            ></v-data-table>
                            <v-data-table
                            v-if="this.EditdialogStatus == '2'"
                            v-model="dialogChoumonSelected"
                            :headers ="dialogChoumonHeader"
                            :items ="dialogChoumonItem"
                            :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                            fixed-header
                            singleSelect
                            item-key="CH_CODE"
                            dense
                            height="500px"
                            show-select
                            ></v-data-table>
                            <v-data-table
                            v-if="this.EditdialogStatus == '3'"
                            v-model="dialogTantouSelected"
                            :headers ="dialogTantouHeader"
                            :items ="dialogTantouItem"
                            :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                            fixed-header
                            singleSelect
                            item-key="TANTO_CODE"
                            dense
                            height="500px"
                            show-select
                            ></v-data-table>
                            <v-data-table
                            v-if="this.EditdialogStatus == '4'"
                            v-model="dialogTantaiSelected"
                            :headers ="dialogTantaiHeader"
                            :items ="dialogTantaiItem"
                            :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                            fixed-header
                            singleSelect
                            item-key="TANI"
                            dense
                            height="500px"
                            show-select
                            ></v-data-table>
                        </v-row>
                        <br>
                        <v-divider></v-divider>
                        <v-row class= "mt-2 mb-1 mr-2">
                          <v-spacer></v-spacer>
                          <v-btn v-if="this.EditInfoDialog_Staus == 1" small @click="getEditInfoDialog()" >
                            <v-icon
                              left
                              dark
                            >
                              mdi-check-outline
                            </v-icon>  
                            選択1(S)
                          </v-btn>
                            <v-btn v-if="this.EditInfoDialog_Staus == 2" small @click="getEditInfoDialog2()" >
                            <v-icon
                                left
                                dark
                            >
                                mdi-check-outline
                            </v-icon>  
                                選択2(S)
                            </v-btn>
                            <v-btn small class="ml-2" @click ="dialogEditInfo = false">
                                <v-icon
                                    left
                                    dark
                                >
                                    mdi-close-box-outline
                                </v-icon> 
                                閉じる(C)
                            </v-btn>
                        </v-row>
                    </v-container>
                </v-card>
                </v-dialog>
            </v-card>
            </v-row>
        </v-card>  
        </div> 
      </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DefaultLayout',
  data : () => ({
    clipped: false,
    drawer: false,
    fixed: false,
    items: [
      {
        icon: 'mdi-apps',
        title: 'Welcome',
        to: '/',
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Inspire',
        to: '/inspire',
      },
      {
        icon: 'mdi-icon-url',
        title: 'Icon',
        to: '/testChart',
      },
    ],
    miniVariant: false,
    right: true,
    rightDrawer: false,
    kensakuForm:true,
    drawer: false,
    mini:false,
    mini2:false,
    group: null,
    buhincode:"",
    buhinmei:"",
    itemsBuhin:["1:前方一致","2:完全一致","3:部分一致",],
    selectBuhin:"1:前方一致",
    itemsSeihin:["-:All","1:EV","2:ESC","3:CP",],
    selectSeihin:"-:All",
    hakkouDate1: "",
    hakkouDate2: "",
    kirikaeDate1: "",
    kirikaeDate2: "",
    hakkouMenu1: false,
    hakkouMenu2: false,
    kirikaeMenu1: false,
    kirikaeMenu2: false,
    toggle_hakko:"",
    toggle_Kirikae:"",
    hakkoTsuuchi:"",
    kirikaeTsuuchi:"",
    warning_dialog_btn1:false,
    warning_dialog_btn2:false,
    //shousai from value
    shousaiForm:true,
    shousaiBuhincode:"",
    shousaiBuhinmei:"",
    shousaiHoshuu:"",
    shousaiZuban:"",
    shousaiKoban:"",
    shousaiTanban:"",
    shousaiSokotantou:"",
    shousaiPStenkai:"",
    shousaiJidouKounyuu:"",
    shousaiSeihinbunruiCode:"",
    shousaiBuhinkubun:"",
    shousaiPDM:"",
    shousaikishuu:"",
    shousaiMakerKataban:"",
    shousaiNaigai:"",
    shousaiChozou:"",
    shousaiKanriTenshou:"",
    shousaiZaikoTantou:"",
    shousaiHachuTenshou:"",
    shousaiHachuTantou:"",
    shousaiBacker:"",
    shousaiKanriKijun:"",
    shousaiABCKanriCodeKubun:"",
    shousaiZaikoKanriCode:"",
    shousaiZaikousuu1:"",
    shousaiZaikousuu2:"",
    shousaiZaikouKingaku1:"",
    shousaiZaikouKingaku2:"",
    shousaihyoujunTanka1:"",
    shousaihyoujunTanka2:"",
    shousaiChoushiYoutei:"",
    shousaiChoushi:"",
    shousaiTorisakiCode:"",
    shousaiKoteiCode:"",
    shousaiSagyouCode:"",
    shousaiBui:"",
    shousaiKakakuSetttei:"-",
    shousaiKakakuSettteiItems:["-","0:無効","1:有効"],
    shousaiHoshuHantei:"-",
    shousaiHoshuHanteiItems:["-","0:無効","1:有効"],
    shousaiNyuukoubiCheck:false,
    shousaiShukkobiCheck:false,
    shousaiZaikoZeroCheckBox:false,
    shousaiDialog:false,
    toggle_none:0,
    shousaiItemsBuhin:["1:前方一致","2:完全一致","3:部分一致",],
    shousaiSelectBuhin:"1:前方一致",
    shousaiItemsBuhinmei:["1:前方一致","2:完全一致","3:部分一致",],
    shousaiSelectBuhinmei:"3:部分一致",
    shousaiItemsHoshu:["1:前方一致","2:完全一致","3:部分一致",],
    shousaiSelectHoshu:"3:部分一致",
    shousaiItemsZuban:["1:前方一致","2:完全一致","3:部分一致",],
    shousaiSelectZuban:"1:前方一致",
    shousaihyoujunDate1:"",
    shousaihyoujunDate2:"",
    shousaiNyuukoDate1:"",
    shousaiNyuukoDate2:"",
    shousaiShukkokoDate1:"",
    shousaiShukkokoDate2:"",
    shousaiChozouKaishiDate1:"",
    shousaiChozouKaishiDate2:"",
    shousaihyoujunMenu1: false,
    shousaihyoujunMenu2: false,
    shousaiNyuukoMenu1:false,
    shousaiNyuukoMenu2:false,
    shousaiShukkokoMenu1:false,
    shousaiShukkokoMenu2:false,
    shousaiChozouKaishiMenu1:false,
    shousaiChozouKaishiMenu2:false,
    shousaiCheckBox1:false,
    shousaiCheckBox2:false,
    shousaiCheckBox3:false,
    shousaiCheckBox4:false,
    shousaiCheckBox5:false,
    shousaiItemsSouko:[],
    shousaiSelectSouko:"",
    shousaiSokoCodeCheckbox:false,
    shousaiZaikoSelected: [],
    shousaiZaikoHeaders: [
        {
        text: '倉',
        align: 'start',
        sortable: false,
        value: 'CM_CODE',
        }, 
        { text: '説明', 
        sortable: false,
        value: 'CM_CODE_SETUMEI' },
    ],
    shousaiZaikoItems: [],
    //shousaiDiaLog
    dialogSeihinbunru:false,
    dialogBuhinkubun:false,
    dialogPDM:false,
    dialogKishuu:false,
    dialogNaigai:false,
    dialogKanriKijun:false,
    dialogABCKanriCodeKubun:false,
    dialogKouteiCode:false,
    dialogKoumokuNO:"210",
    dialogKoumokuName:"TestName",
    dialogEnableDate_1:"",
    dialogEnableDate_2:"",
    dialogKoumokuTableSelected:[],
    dialogKoumokuTableHeader:[
        {text:"コード",value:"CM_CODE",},
        {text:"コード説明",value:"CM_CODE_SETUMEI",width:"300px"},
        {text:"使用開始日",value:"START_DATE"},
        {text:"使用止め日",value:"STOP_DATE"},
    ],
    dialogKoumokuTableItem:[],
    dialogChoumonHeader:[
        {text : "コード",value:"CH_CODE",},
        {text :"コード説明",value:"CH_CODE_SETUMEI_1",width:"300px"},
        {text :"使用開始日",value:"START_DATE"},
        {text :"使用止め日",value:"STOP_DATE" },
    ],
    dialogChoumonItem:[],
    dialogChoumonSelected:[],
    dialogTantouHeader:[
        {text:"担当コード",value:"TANTO_CODE"},
        {text:"個人コード",value:"USER_ID"},
        {text:"担当名",value:"USER_NAME"},
        {text:"使用開始日",value:"START_DATE"},
        {text:"使用止め日",value:"STOP_DATE"},
    ],
    dialogTantouItem:[],
    dialogTantouSelected:[],
    dialogTantaiHeader:[
        {text:"TANI",value:"TANI"},
        {text:"LANGUAGE",value:"LANGUAGE"},
        {text:"TANI_X",value:"TANI_X"},
        {text:"TANIS_X",value:"TANIS_X"},
        {text:"UPD_WHO",value:"UPD_WHO"},
        {text:"UPD_WHEN",value:"UPD_WHEN"},
        {text:"ENT_DATE",value:"ENT_DATE"},
        {text:"TANI_DIV_FLAG",value:"TANI_DIV_FLAG"},
        {text:"COUNTABLE_TYPE",value:"COUNTABLE_TYPE"},
        {text:"CONV_FLAG",value:"CONV_FLAG"},
    ],
    dialogTantaiItem:[],
    dialogTantaiSelected:[],
    dialogKouteiCodeTableSelected:[],
    dialogKouteiCodeTableItem:[],
    KT_CODE:"",
    WC_CODE:"",
    CC_CODE:"",
    SG_CODE:"",
    //setting
    setttingDialog:false,
    HeaderTable:[
    { text: "操作", value: "SOUSA", align: "center",width:"200px" , sortable: false },
    { text: "部品コード", value: "PART_NO", align: "center",width:"100px" },
    { text: "改訂", value: "PART_REV_NO", align: "center"},
    { text: "部品名", value: "PART_NAME_LOC1", align: "center",width:"200px" },
    { text: "発行通知書", value: "ISSUE_NO", align: "center",width:"200px" },
    { text: "発行日", value: "ISSUE_DATE", align: "center" ,width:"100px"},
    { text: "切替指示書", value: "CHG_NO", align: "center",width:"200px" },
    { text: "図番", value: "DWG_NO", align: "center",width:"200px" },
    { text: "改訂", value: "DWG_REV_NO", align: "center"},
    { text: "保守", value: "SEQ_NO", align: "center"},
    ],
    toggle_Table:"",
    table_width_state:false,
    //User Setting 
    userKoumokuSelect:"P/M基本情報",
    userKoumokuItems:["P/M基本情報","手配情報","標準時間マスタ","購買情報","在庫情報"],
    userShougiSelect:"手配情報",
    userShougiItems:["手配情報","製作情報","購買情報","在庫情報","保守情報","販売価格情報","P/S情報","代替部品情報"],
    APIJSON: [{ 
    SOUSA: "", 
    PART_NO: "", 
    PART_REV_NO: "" ,
    PART_NAME_LOC1:"",
    ISSUE_NO:"",
    ISSUE_DATE:"",
    CHG_NO:"",
    DWG_NO:"",
    DWG_REV_NO:"",
    SEQ_NO:""
    }],
    //表示データ
    Page_data:[],
    tab_select:"",
    tab_menu:["手配","製作","購買","入出庫","在庫","保守","PC/SP","P/S","代替",],
    search_width : "0%",
    table_width: "0%",
    tab_width : "100%",
    PM_height : "40vh",
    Teihai_height : "36.3vh",
    showHeader : false,
    Header_Data:[{
    PART_NO:"",
    PART_REV_NO:"",
    PART_NAME_LOC1:"",
    UPD_WHO:"",
    UPD_NAME:"",
    UPD_WHEN:"",
    ENT_WHO:"",
    ENT_NAME:"",
    ENT_WHEN:"",
    REV_START_DATE:"",
    REV_STOP_DATE:"",
    M_START_DATE:"",
    M_STOP_DATE:"",
    APP_CUR_TYPE:"",
    }],
    kaiteiTableHeader:[
    {text:"改訂",value:"PART_REV_NO"},
    {text:"使用開始日（当改訂）",value:"REV_START_DATE"},
    {text:"使用止め日（当改訂）",value:"REV_STOP_DATE"},
    {text:"使用開始日（当保守）",value:"M_START_DATE"},
    {text:"使用止め日（当保守）",value:"M_STOP_DATE"},
    {text:"更新者",value:"UPD_WHO"},
    {text:"更新日",value:"UPD_WHEN"},
    {text:"承",value:"APP_CUR_TYPE"},
    ],
    Editinfo_Header:[
    {text:"項目名",value:"FIELD_NAME_LOC1",width:"200px" },
    {text:"値",value:"FIELD_VALUE",width:"200px"},
    {text:"",value:"CELL_TYPE"},
    {text:"説明",value:"FIELD_EXPLAIN"}
    ],
    Editinfo2_Header:[
    {text:"項目名",value:"FIELD_NAME_LOC1",width:"200px" },
    {text:"値",value:"FIELD_VALUE",width:"200px"},
    {text:"",value:"CELL_TYPE"},
    {text:"説明",value:"FIELD_EXPLAIN"}
    ],
    EditInfo_Value:[],
    EditInfo2_Value:[],
    dialogEditInfo : false,
    EditdialogStatus :"",
    EditdialogItemNo:"",
    EditdialogFIELD_NAME:"",
    EditIndex:"",
    Edit_Combobox_1_select:"--",
    Edit_Combobox_1_item:[],
    Edit_Combobox_2_select:"",
    Edit_Combobox_2_item:[],
    Edit_checkbox : false,
    Test_userID : "2085",
    EditRevDate_Eable : false,
    TODAY:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    Pic_Loc:"",
    Edit_Combobox_PART_NO:"",
    EditInfoDialog_Staus :"",
  }),
  created(){
    this.setListener()
  },
  computed:{
    /** システムタイトル */
    title() {
      return this.$config.SYSTEM_TITLE
    },
    /** プロセス */
    process() {
      return this.$config.PROCESS
    },
    /** プロセス名 */
    processName() {
      return this.$config.PROCESS_NAME
    },
    /** バージョン */
    ver() {
      return this.$config.VER
    },
    ...mapState(['authority', 'isSso']),
    /** シングルサインオンの情報(storeから) */
    ...mapState('fujitecSso', ['userId', 'userName', 'departmentName']),
    /** ダークモード(middleware で localStorage からロード済み) */
    ...mapState('headerSql',['headerItem']),
    dark: {
      get() {
        return this.$vuetify.theme.dark
      },
      set(val) {
        this.$vuetify.theme.dark = val
        // localStorage に保存
        localStorage.setItem('vuetify_theme_dark', val ? '1' : '0')
      },
    },
    /** ログアウト表示・非表示(SSO認証なし、FIND-PAGEアプリ経由は非表示) */
    dispLogout() {
      return (
        this.isSso &&
        !location.origin.match(/https:\/\/mobileapi.fujitec.co.jp/)
      )
    },
    dialogKouteiCodeTableHeader(){
        return[
        {
            text:"工程コード",
            value:"KT_CODE",
            width:"120px",
            filter: value =>{
                if(!this.KT_CODE) return true
                if(value.indexOf(this.KT_CODE))
                    return false
                else
                    return true
            },
        },
        {
            text:"WC",
            value:"WC_CODE",
            width:"80px",
            filter: value =>{
                if(!this.WC_CODE) return true
                if(value.indexOf(this.WC_CODE))
                    return false
                else
                    return true
            },
        },
        {
            text:"CC",
            value:"CC_CODE",
            width:"80px",
            filter: value =>{
                if(!this.CC_CODE) return true
                if(value.indexOf(this.CC_CODE))
                    return false
                else
                    return true
            },
        },
        {
            text:"SG",
            value:"SG_CODE",
            width:"80px",
            filter: value =>{
                if(!this.SG_CODE) return true
                if(value.indexOf(this.SG_CODE))
                    return false
                else
                    return true
            },
        },
        {text:"工程順",value:"SEQ_NO",width:"90px"},
        {text:"準備段取り時間",value:"SETUP_STDTIME",width:"150px"},
        {text:"準備作業時間",value:"WORK_STDTIME",width:"150px"},
        {text:"正社員比率",value:"SEI_STDPCNT",width:"150px"},
        {text:"備考",value:"REMARKS",width:"150px"},
        {text:"使用開始日",value:"START_DATE",width:"150px"},
        {text:"使用止め日",value:"STOP_DATE",width:"150px"},
        {text:"更新者",value:"UPD_WHO",width:"150px"},
        {text:"更新日時",value:"UPP_WHEN",width:"150px"},
        {text:"登録日",value:"ENT_DATE",width:"150px"},
        ]
    },
    
  },
  methods:{
    setListener(){
      this.$nuxt.$on('updateHeader',this.setHeader)
    },
    setHeader(header){
      console.log(header);
      console.log(this.headerItem);
      if(header)
      {
        this.Header_Data =this.headerItem;
        this.showHeader = true;
      }
    },
    open_new_tab(url){
      if(url != "")
      {
        url = "/PartsMaster/kensakuPage/"+url
        window.open(url,'_blank')
      }
    },
    Editinfo(item){
        var TODAY_STR = this.TODAY.substr(0,4)+this.TODAY.substr(5,2)+this.TODAY.substr(8,2);
        if(TODAY_STR >= item.REV_START_DATE && TODAY_STR <= item.REV_STOP_DATE)
        {
            this.EditRevDate_Eable = true;
        }
        else
        {
            this.EditRevDate_Eable = false;
        }
        this.Edit_Combobox_PART_NO = item.PART_NO;
        this.getEditTable(item.PART_NO,item.PART_REV_NO);
        this.getEditTable2(item.PART_NO,1);
        this.getSokoType(false);
    },
    getEditTable(Part_NO,REV_NO){
        const url = "http://localhost:59272/api/KensakuBtnGet";
        const params = {
            Edit_PART_NO : Part_NO,
            Edit_REV_NO : REV_NO,
            USER_ID : this.Test_userID,
        }
        this.$axios.get(url,{params}).then(res =>{
            this.EditInfo_Value = res.data;
        }).catch(err=>{

        })
    },
    getEditTable2(Part_NO,PLANT_NO){
        const url = "http://localhost:59272/api/KensakuBtnGet";
        const params = {
          Edit_PART_NO : Part_NO,
          USER_ID : this.Test_userID,
          PLANT_NO : PLANT_NO,
        }
        this.$axios.get(url,{params}).then(res =>{
          this.EditInfo2_Value = res.data;
        }).catch(err=>{

        })
    },
    OpenCloseNav(){
        this.drawer = !this.drawer;
        if(this.drawer)
        {
            this.CheckWidth_state()
            this.search_width = "22%";
            this.table_width = "32%";
            this.tab_width = "46%";
        }
        else
        {
            this.mini= false;
            this.mini2=false;
            this.table_width_state = false;
            this.search_width = "0%";
            this.table_width = "0%";
            this.tab_width = "100%"; 
            this.PM_height = "40vh";
            this.Teihai_height = "36.3vh";
        }
    },
    getKensakuBtn1(){
        const url = "http://localhost:59272/api/KensakuBtnGet";
        const params = {
            PART_NO : this.buhincode,
            PART_NAME_LOC1 : this.buhinmei,
            FIND_OPTION : this.selectBuhin.substring(0,1),
        }
        this.$axios.get(url,{params}).then(res =>{
            this.APIJSON = res.data
        }).catch(err=>{

        })
    },
    getKensakuBtn2(){
        const url = "http://localhost:59272/api/KensakuBtnGet";
        const params = {
            PRODUCT_TYPE : this.selectSeihin.substring(0,1),
            ISSUE_DATE_1 : this.hakkouDate1,
            ISSUE_DATE_2 : this.hakkouDate2,
            DWG_CHG_DATE_1 : this.kirikaeDate1,
            DWG_CHG_DATE_2 : this.kirikaeDate2,
            CHG_NO : this.kirikaeTsuuchi,
            ISSUE_NO : this.hakkoTsuuchi,
        }
        this.$axios.get(url,{params}).then(res =>{
            this.APIJSON = res.data
        }).catch(err=>{

        })
    },
    getPic(PART_NO){
      if(PART_NO != "")
      {
        const url = "http://localhost:59272/api/KensakuBtnGet";
        const params = {
          PIC_PART_NO : PART_NO
        }
        this.$axios.get(url,{params}).then(res =>{
          if(res.data != "")
            this.Pic_Loc = res.data[0].DOC_FILE_NAME
          else
            this.Pic_Loc =""
        }).catch(err=>{

        })
        }
    },
    getSokoType(value){
        const url = "http://localhost:59272/api/KensakuBtnGet";
        var JSON_RES=[{CM_CODE:"",CM_CODE_SETUMEI:"", }]
        var ITEM=[];
        const params ={
            CM_KOUNO : "010"
        }
        if(this.shousaiSokoCodeCheckbox || !value){
            this.$axios.get(url,{params}).then(res =>{
            JSON_RES = res.data;
            JSON_RES.forEach(index => {
                ITEM.push(index.CM_CODE + "*" +index.CM_CODE_SETUMEI);
            });
            ITEM.push("--*全工房対象");

           if(value)
           {
            this.shousaiItemsSouko = ITEM;
           }
            else
            {
                this.Edit_Combobox_1_item = ITEM;
                this.Edit_Combobox_2_item = ITEM;
            }
            }).catch(err=>{

            })
        }
    },
    getSoko(){
        const url = "http://localhost:59272/api/KensakuBtnGet";
        const params={
                CM_KOUNO : "310",
                data3 :this.shousaiSelectSouko.substring(0,1),
        }
        if(this.shousaiSokoCodeCheckbox){
            this.$axios.get(url,{params}).then(res =>{
                this.shousaiZaikoItems = res.data;
            }).catch(err=>{

            })
        }
    },
    getClearKouteiCodeText(){
        this.KT_CODE ="";
        this.WC_CODE ="";
        this.CC_CODE ="";
        this.SG_CODE ="";
    },
    getShousaiKensaku(){
        const url = "http://localhost:59272/api/KensakuBtnGet";
        var pWhCode_value=[];
        if(this.shousaiSokoCodeCheckbox)
        {
            this.shousaiZaikoSelected.forEach(value =>{
                pWhCode_value.push(value.CM_CODE);//倉庫コード
            })
        }
        const params = {
            PART_NO : this.shousaiBuhincode,//部品コード
            PART_NO_OPTION : this.shousaiSelectBuhin.substring(0,1),//部品コード検索方法
            PART_NAME_LOC1 : this.shousaiBuhinmei,//部品名
            PART_NAME_LOC1_OPTION : this.shousaiSelectBuhinmei.substring(0,1),//部品名検索方法
            MAINT_PART_NAME: this.shousaiHoshuu,//保守部品名
            MAINT_PART_NAME_OPTION : this.shousaiSelectHoshu.substring(0,1),//保守部品名検索方法
            DWG_NO : this.shousaiZuban,//図番
            DWG_NO_OPTION : this.shousaiSelectZuban.substring(0,1),//図番検索方法
            ISSUE_DATE_1 : this.shousaihyoujunDate1,//標準図発行日1
            ISSUE_DATE_2 : this.shousaihyoujunDate2,//標準図発行日２
            PRODUCT_CODE : this.shousaiSeihinbunruiCode,//製品分類コード
            PART_TYPE : this.shousaiBuhinkubun,//部品区分
            PDM_TYPE : this.shousaiPDM,//PDM判定
            MACHINE_TYPE : this.shousaikishuu,//機種
            SELLING_PRICE_TYPE : this.shousaiKakakuSetttei.substring(0,1),//価格設定
            MAKER_PART_NO : this.shousaiMakerKataban,//メーカー型番
            PLANT_NO : this.shousaiKoban,//工場区分
            MFG_TYPE : this.shousaiNaigai,//内外作区分
            STOCK_TYPE : this.shousaiChozou,//貯蔵区分
            ARR_BRANCH_CODE : this.shousaiKanriTenshou,//管理店所
            ARR_WHO : this.shousaiZaikoTantou,//在庫担当
            PO_BRANCH_CODE : this.shousaiHachuTenshou,//発注店所
            PO_WHO : this.shousaiHachuTantou,//発注担当
            BUCKET : this.shousaiBacker,//バケット
            ORDER_TYPE : this.shousaiKanriKijun,//管理基準
            ABC_TYPE : this.shousaiABCKanriCodeKubun,//ABC区分
            STOCK_CODE : this.shousaiZaikoKanriCode,//在庫管理コード
            ROUTING_CODE : this.shousaiKoteiCode,//工程コード
            VENDOR_CODE: this.shousaiTorisakiCode,//取引先コード
            SG_CODE : this.shousaiSagyouCode,//作業コード
            ckUselWHCode_Checked :this.shousaiSokoCodeCheckbox,//倉庫コードチェックボックス
            pWhCode:pWhCode_value,//倉庫コード
            LOCATION:this.shousaiTanban,//置場/棚番
            SOKO_TANTO:this.shousaiSokotantou,//倉庫担当
            PS_FLAG:this.shousaiPStenkai,//P/S展開区分
            AUTO_PURCHASE_REQ:this.shousaiJidouKounyuu,//自動購入指示
            ckMoreZero_Checked:this.shousaiZaikoZeroCheckBox,//在庫数チェックボックス
            CURRENT_BALANCE_1:this.shousaiZaikousuu1,//在庫数１
            CURRENT_BALANCE_2:this.shousaiZaikousuu2,//在庫数２
            eStockAmount_1:this.shousaiZaikouKingaku1,//在庫金額１
            eStockAmount_2:this.shousaiZaikouKingaku2,//在庫金額２
            YOTEI_TANKA_1:this.shousaihyoujunTanka1,//標準単価１
            YOTEI_TANKA_2:this.shousaihyoujunTanka2,//標準単価２
            ckNoReceipt_Checked:this.shousaiNyuukoubiCheck,//最終入庫日チェックボックス
            LAST_RECEIPT_DATE_1:this.shousaiNyuukoDate1,//最終入庫日１
            LAST_RECEIPT_DATE_2:this.shousaiNyuukoDate2,//最終入庫日２
            ckNoIssue_Checked:this.shousaiShukkobiCheck,//最終出庫日チェックボックス
            LAST_ISSUE_DATE_1:this.shousaiShukkokoDate1,//最終出庫日１
            LAST_ISSUE_DATE_2:this.shousaiShukkokoDate2,//最終出庫日２
            STOCK_START_DATE_1:this.shousaiChozouKaishiDate1,//貯蔵開始日１
            STOCK_START_DATE_2:this.shousaiChozouKaishiDate2,//貯蔵開始日２
            STOCK_STOP_FlAG:this.shousaiChoushiYoutei,//貯蔵中止予定
            STOCK_STOP_DATE:this.shousaiChoushi,//貯蔵止め
            PART_LOCATION:this.shousaiBui,//部位
            MAINT_TYPE:this.shousaiHoshuHantei.substring(0,1),//保守判定
            ckPPPMMAINTMS2_notEdit_Checked:this.shousaiCheckBox1,//図面発行後、二次判定が一度も設定されていないもの。
            ckPCEntandSPNoEnt_Checked:this.shousaiCheckBox2,//製造原価登録済且つ販売価格未登録部品
            ckRepairRepEnt_Checked:this.shousaiCheckBox3,//修理提案書利用
            ckPartDescAndRepReason_Checked:this.shousaiCheckBox4,//部品説明or取替理由が未登録
            ckNoPhoto_Checked:this.shousaiCheckBox5,//写真未登録
        }
        this.$axios.get(url,{params}).then(res =>{
            this.APIJSON = res.data;
        }).catch(err=>{

        })
        this.shousaiDialog = false;
    },
    getDialogKoumoku(KoumokuNo,KoumokuName){
        this.dialogKoumokuNO = KoumokuNo;
        this.dialogKoumokuName = KoumokuName;
        const url = "http://localhost:59272/api/KensakuBtnGet";
        const params ={
            CM_KOUNO : this.dialogKoumokuNO,
            START_DATE : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            STOP_DATE : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        }
            this.$axios.get(url,{params}).then(res =>{
            this.dialogKoumokuTableItem = res.data;
            this.dialogEnableDate_1 = Math.min(...this.dialogKoumokuTableItem.map(value =>value.START_DATE));
            this.dialogEnableDate_2 = Math.max(...this.dialogKoumokuTableItem.map(value =>value.STOP_DATE));
        }).catch(err=>{

        })
    },
    getdialogChoumon(){
        const url = "http://localhost:59272/api/KensakuBtnGet";
        const params ={
            CH_CODE:"CH_CODE",
            START_DATE : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            STOP_DATE : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        }
        this.$axios.get(url,{params}).then(res =>{
            this.dialogChoumonItem = res.data;
        }).catch(err=>{

        })
    },
    getdialogTantou(){
        const url = "http://localhost:59272/api/KensakuBtnGet";
        const params ={
            TANTO_CODE:"TANTO_CODE",
            START_DATE : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            STOP_DATE : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        }
        this.$axios.get(url,{params}).then(res =>{
            this.dialogTantouItem = res.data;
        }).catch(err=>{
        
        })
    },
    getdialogTantai(){
        const url = "http://localhost:59272/api/KensakuBtnGet";
        const params ={
            TANI:"  ",
        }
        this.$axios.get(url,{params}).then(res =>{
            this.dialogTantaiItem = res.data;
        }).catch(err=>{
        
        })
    },
    getDialogKouteiCode_Init(){
        const url = "http://localhost:59272/api/KensakuBtnGet";
        let cur_date = new Date(Date.now());
        cur_date.setDate(cur_date.getDate());
        const params = {
            KT_START_DATE : cur_date.toISOString().substr(0, 10),
            KT_STOP_DATE  : cur_date.toISOString().substr(0, 10),
        }
        this.$axios.get(url,{params}).then(res =>{
            this.dialogKouteiCodeTableItem = res.data;
            
        }).catch(err=>{
            
        })
        this.dialogKouteiCode = false;
    },
    getHeaderInfo(value){
        const url = "http://localhost:59272/api/KensakuBtnGet";
        
        const params = {
            Table_Id : value,
        }
        this.$axios.get(url,{params}).then(res =>{
            this.Header_Data = res.data;
            this.showHeader = true;
        }).catch(err=>{
            
        })
    },
    getSeihinbunruiCodeFromDialog(){
        this.shousaiSeihinbunruiCode = this.dialogKoumokuTableSelected[0].CM_CODE;
        this.dialogSeihinbunru = false;
        this.dialogKoumokuTableSelected =[];
    },
    getBuhinkubaFromDialog(){
        this.shousaiBuhinkubun = this.dialogKoumokuTableSelected[0].CM_CODE;
        this.dialogBuhinkubun = false;
        this.dialogKoumokuTableSelected =[];
    },
    getPDMFromDialog(){
        this.shousaiPDM = this.dialogKoumokuTableSelected[0].CM_CODE;
        this.dialogPDM = false;
        this.dialogKoumokuTableSelected =[];
    },
    getkishuuFromDialog(){
        this.shousaikishuu = this.dialogKoumokuTableSelected[0].CM_CODE;
        this.dialogKishuu = false;
        this.dialogKoumokuTableSelected =[];
    },
    getNaigaiFromDialog(){
        this.shousaiNaigai = this.dialogKoumokuTableSelected[0].CM_CODE;
        this.dialogNaigai = false;
        this.dialogKoumokuTableSelected =[];
    },
    getKanriKijunFromDialog(){
        this.shousaiKanriKijun = this.dialogKoumokuTableSelected[0].CM_CODE;
        this.dialogKanriKijun = false;
        this.dialogKoumokuTableSelected =[];
    },
    getABCKanriCodeKubunFromDialog(){
        this.shousaiABCKanriCodeKubun = this.dialogKoumokuTableSelected[0].CM_CODE;
        this.dialogABCKanriCodeKubun = false;
        this.dialogKoumokuTableSelected =[];
    },
    getKouteicode(){
        this.shousaiKoteiCode = this.dialogKouteiCodeTableSelected[0].KT_CODE;
        this.dialogKouteiCode = false;
        this.dialogKouteiCodeTableSelected =[];
    },
    getEditInfoDialog(){
      console.log("1 status" + this.EditdialogStatus );
        switch(this.EditdialogStatus){
          case '1':
            this.EditInfo_Value[this.EditIndex].FIELD_VALUE = this.dialogKoumokuTableSelected[0].CM_CODE;
            this.dialogKoumokuTableSelected =[];
            break;
          case '2':
            this.EditInfo_Value[this.EditIndex].FIELD_VALUE = this.dialogChoumonSelected[0].CH_CODE;
            this.dialogChoumonSelected =[];
            break;
          case '3':
            this.EditInfo_Value[this.EditIndex].FIELD_VALUE = this.dialogTantouSelected[0].TANTO_CODE;
            this.dialogTantouSelected =[];
            break;
          case '4':
            this.EditInfo_Value[this.EditIndex].FIELD_VALUE = this.dialogTantaiSelected[0].TANI;
            this.dialogTantaiSelected =[];
            break;
        }
        this.dialogEditInfo = false;
    },
    getEditInfoDialog2(){
        switch(this.EditdialogStatus){
          case '1':
            this.EditInfo2_Value[this.EditIndex].FIELD_VALUE = this.dialogKoumokuTableSelected[0].CM_CODE;
            this.dialogKoumokuTableSelected =[];
            break;
          case '2':
            this.EditInfo2_Value[this.EditIndex].FIELD_VALUE = this.dialogChoumonSelected[0].CH_CODE;
            this.dialogChoumonSelected =[];
            break;
          case '3':
            this.EditInfo2_Value[this.EditIndex].FIELD_VALUE = this.dialogTantouSelected[0].TANTO_CODE;
            this.dialogTantouSelected =[];
            break;
          case '4':
            this.EditInfo2_Value[this.EditIndex].FIELD_VALUE = this.dialogTantaiSelected[0].TANI;
            this.dialogTantaiSelected =[];
            break;
        }
        this.dialogEditInfo = false;
    },
    getEditDialogBtn1(value,ITEM_NO,NAME_LOC1,Dialog){
        this.EditdialogStatus='1';
        this.dialogEditInfo = true;
        this.EditIndex = value;
        this.EditdialogItemNo = ITEM_NO;
        this.EditdialogFIELD_NAME= NAME_LOC1;
        this.EditInfoDialog_Staus = Dialog;
        this.getDialogKoumoku(this.EditdialogItemNo,this.EditdialogFIELD_NAME);
    },
    getEditDialogBtn2(value,ITEM_NO,NAME_LOC1,Dialog){
        this.EditdialogStatus='2';
        this.dialogEditInfo = true;
        this.EditIndex = value;
        this.EditdialogItemNo = ITEM_NO;
        this.EditdialogFIELD_NAME= NAME_LOC1;
        this.EditInfoDialog_Staus = Dialog;
        this.getdialogChoumon();
    },
    getEditDialogBtn3(value,ITEM_NO,NAME_LOC1,Dialog){
        this.EditdialogStatus='3';
        this.dialogEditInfo = true;
        this.EditIndex = value;
        this.EditdialogItemNo = ITEM_NO;
        this.EditdialogFIELD_NAME= NAME_LOC1;
        this.EditInfoDialog_Staus = Dialog;
        this.getdialogTantou();
    },
    getEditDialogBtn4(value,ITEM_NO,NAME_LOC1,Dialog){ 
        this.EditdialogStatus='4'
        this.dialogEditInfo = true;
        this.EditIndex = value;
        this.EditdialogItemNo = ITEM_NO;
        this.EditdialogFIELD_NAME= NAME_LOC1;
        this.EditInfoDialog_Staus = Dialog;
        this.getdialogTantai();
    },
    changeSearchMiniWidth(){
        this.mini = !this.mini;
        this.CheckWidth_state();
    },
    changeTableMiniWidth(){
        this.mini2 = !this.mini2;
        this.CheckWidth_state();
        
    },
    changeTableWidth(){
        this.table_width_state = !this.table_width_state;
        this.CheckWidth_state();
    
    },
    CheckWidth_state(){
        this.table_width = this.table_width_state?(this.mini?"48%":"78%"):"32%";
        this.tab_width = this.mini? (this.mini2?"94%":this.table_width_state?"49%":"65%")
                                    :(this.mini2?"75%":this.table_width_state?"45%":"46%");
        this.Teihai_height = this.mini? (this.mini2?"36.3vh":this.table_width_state?"30vh":"36.3vh")
                                    :(this.mini2?"36.3vh":this.table_width_state?"45%":"30vh"); ;
        this.PM_height = this.mini? (this.mini2?"40vh":this.table_width_state?"31.5vh":"40vh")
                                    :(this.mini2?"40vh":this.table_width_state?"45%":"31.5vh");;
    },
    changeCalendarHyouJun(value){
        let cur_date = new Date(Date.now());
        cur_date.setDate(cur_date.getDate()-value);
        this.shousaihyoujunDate1 = cur_date.toISOString().substr(0, 10);
        this.shousaihyoujunDate2 = cur_date.toISOString().substr(0, 10);
    },
    changeCalendarHakko(value){
        let cur_date = new Date(Date.now());
        cur_date.setDate(cur_date.getDate()-value);
        this.hakkouDate1 = cur_date.toISOString().substr(0, 10);
        this.hakkouDate2 = cur_date.toISOString().substr(0, 10);
    },
    changeCalendarKirikae(value){
        let cur_date = new Date(Date.now());
        cur_date.setDate(cur_date.getDate()-value);
        this.kirikaeDate1 = cur_date.toISOString().substr(0, 10);
        this.kirikaeDate2 = cur_date.toISOString().substr(0, 10);
    },
    
    //詳細検索クリアパラメータ
    shousaiClear(){
        this.shousaiBuhincode="";
        this.shousaiBuhinmei="";
        this.shousaiHoshuu="";
        this.shousaiZuban="";
        this.shousaiKoban="";
        this.shousaiTanban="";
        this.shousaiSokotantou="";
        this.shousaiPStenkai="";
        this.shousaiJidouKounyuu="";
        this.shousaiSeihinbunruiCode="";
        this.shousaiBuhinkubun="";
        this.shousaiPDM="";
        this.shousaikishuu="";
        this.shousaiMakerKataban="";
        this.shousaiNaigai="";
        this.shousaiChozou="";
        this.shousaiKanriTenshou="";
        this.shousaiZaikoTantou="";
        this.shousaiHachuTenshou="";
        this.shousaiHachuTantou="";
        this.shousaiBacker="";
        this.shousaiKanriKijun="";
        this.shousaiABCKanriCodeKubun="";
        this.shousaiZaikoKanriCode="";
        this.shousaiZaikousuu1="";
        this.shousaiZaikousuu2="";
        this.shousaiZaikouKingaku1="";
        this.shousaiZaikouKingaku2="";
        this.shousaihyoujunTanka1="";
        this.shousaihyoujunTanka2="";
        this.shousaiChoushiYoutei="";
        this.shousaiChoushi="";
        this.shousaiTorisakiCode="";
        this.shousaiKoteiCode="";
        this.shousaiSagyouCode="";
        this.shousaiBui="";
        this.shousaiKakakuSetttei="-";
        this.shousaiHoshuHantei="-";
        this.shousaiNyuukoubiCheck=false;
        this.shousaiShukkobiCheck=false;
        this.shousaiZaikoZeroCheckBox=false;
        this.shousaiSelectBuhin="1:前方一致";
        this.shousaiSelectBuhinmei="3:部分一致";
        this.shousaiSelectHoshu="3:部分一致";
        this.shousaiSelectZuban="1:前方一致";
        this.shousaihyoujunMenu1= false;
        this.shousaihyoujunMenu2= false;
        this.shousaiNyuukoMenu1=false;
        this.shousaiNyuukoMenu2=false;
        this.shousaiShukkokoMenu1=false;
        this.shousaiShukkokoMenu2=false;
        this.shousaiChozouKaishiMenu1=false;
        this.shousaiChozouKaishiMenu2=false;
        this.shousaiCheckBox1=false;
        this.shousaiCheckBox2=false;
        this.shousaiCheckBox3=false;
        this.shousaiCheckBox4=false;
        this.shousaiCheckBox5=false;
        this.shousaiSelectSouko="--";
        this.shousaiZaikoSelected= [];
        this.shousaiSokoCodeCheckbox=false;
        this.toggle_none=0;
        this.shousaihyoujunDate1="";
        this.shousaihyoujunDate2="";
        this.shousaiNyuukoDate1="";
        this.shousaiNyuukoDate2="";
        this.shousaiShukkokoDate1="";
        this.shousaiShukkokoDate2="";
        this.shousaiChozouKaishiDate1="";
        this.shousaiChozouKaishiDate2="";
    },
  },
}
</script>
