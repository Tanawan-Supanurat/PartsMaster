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
                                ログインユーザー：
                            </v-card-text>
                            <v-card-text class="py-0 my-2 text-subtitle-1">
                                所属部課：
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
                                <!-- 半角入力 -->
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
                                <!-- 自由入力 -->
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
                                            v-model="valid"
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
                                                                append-icon="mdi-calendar"
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
                                                                append-icon="mdi-calendar"
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
                                                            item-key="souko"
                                                            show-select
                                                            fixed-header
                                                            height ="35vh"
                                                            hide-default-footer
                                                            class="elevation-5"
                                                        >
                                                            <template v-slot:top>
                                                                <v-row no-gutters>
                                                                    <v-checkbox
                                                                     class="ml-2 mb-n5"
                                                                     v-model="shousaiTableCheckbox"
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
                                                         v-model="shousaiSoukotantou"
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
                                                        <v-btn class="ml-2 mt-2" x-small>...</v-btn>
                                                    </v-col>
                                                    <v-col class="my-0 mr-8 mr-auto" col="2" sm="2">
                                                        <v-text-field 
                                                         class="mb-n4"
                                                         v-model="shousaiSeihinkubun"
                                                         dense outlined></v-text-field>
                                                    </v-col>
                                                    <v-col>
                                                        <v-btn class = "ml-2 mt-2" x-small>...</v-btn>
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
                                                                <v-btn class="ml-2 mt-2" x-small>...</v-btn>
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
                                                                <v-btn class = "ml-2 mt-2" x-small>...</v-btn>
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
                                                        <v-btn class="ml-2 mt-2" x-small>...</v-btn>
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
                                                                <v-btn class="ml-2 mt-2" x-small>...</v-btn>
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
                                                        <v-btn class="ml-2 mt-2" x-small>...</v-btn>
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
                                                         v-model="shousaiZaikoZero"
                                                         label="在庫0ではない。"
                                                         dense
                                                         >
                                                        </v-checkbox>
                                                    </v-col>
                                                </v-row>
                                                <v-row no-gutters>
                                                    <v-col class="ml-8" col="3" sm="3">
                                                        <v-text-field
                                                         class ="mb-n4"
                                                         v-model="shousaiZaikousuu1"
                                                         dense outlined
                                                         ></v-text-field>
                                                    </v-col>
                                                     <v-col class="ml-2" col="2" sm="2" >
                                                        <p class="mt-2">≦数量≦</p>
                                                    </v-col>
                                                     <v-col col="3" sm="3">
                                                        <v-text-field
                                                         class ="mb-n4"
                                                         v-model="shousaiZaikousuu2"
                                                         dense outlined></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-row no-gutters> 
                                                    <v-col>
                                                        <p class ="ma-0">・在庫金額</p>
                                                    </v-col>
                                                </v-row>
                                                <v-row no-gutters>
                                                    <v-col class="ml-8" col="3" sm="3">
                                                        <v-text-field
                                                         class ="mb-n4"
                                                         v-model="shousaiZaikouKingaku1"
                                                         dense outlined
                                                         ></v-text-field>
                                                    </v-col>
                                                     <v-col class="ml-2" col="2" sm="2" >
                                                        <p class="mt-2">≦金額≦</p>
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
                                                        <p class="mt-2">≦単価≦</p>
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
                                                         class ="mt-n1 mb-n5"
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
                                                                append-icon="mdi-calendar"
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
                                                                append-icon="mdi-calendar"
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
                                                                append-icon="mdi-calendar"
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
                                                                append-icon="mdi-calendar"
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
                                                                append-icon="mdi-calendar"
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
                                                                append-icon="mdi-calendar"
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
                                                            <p class ="ma-0 mt-2">・貯蔵中し止予定</p>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters>
                                                        <v-col>
                                                            <v-radio-group class="ma-0" v-model="shousaiChoushiYoutei" row >
                                                                <v-radio
                                                                 label="含む"
                                                                 value="含む"
                                                                ></v-radio>
                                                                <v-radio
                                                                 label="除く"
                                                                 value="除く"
                                                                ></v-radio>
                                                                <v-radio
                                                                 label="中止予定のみ"
                                                                 value="中止予定のみ"
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
                                                            <v-radio-group class="ma-0" v-model="shousaiChoushi" row >
                                                                <v-radio
                                                                 label="含む"
                                                                 value="含む"
                                                                ></v-radio>
                                                                <v-radio
                                                                 label="除く"
                                                                 value="除く"
                                                                ></v-radio>
                                                                <v-radio
                                                                 label="貯蔵中止のみ"
                                                                 value="貯蔵中止のみ"
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
                                                    <v-row class="ma-0">
                                                        <v-col>
                                                            <v-combobox
                                                             v-model="shousaiTorisakiCode"
                                                             class="mt-n3 mb-n5"
                                                             dense outlined>
                                                            </v-combobox>
                                                        </v-col>
                                                        <v-col>
                                                            <v-text-field 
                                                             v-model="shousaiKoteiCode"
                                                             class="mt-n3 mb-n5"
                                                             dense outlined>
                                                            </v-text-field>
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
                                                    <v-row class ="ma-0">
                                                        <v-col>
                                                            <v-text-field
                                                             v-model="shousaiSagyouCode"
                                                             class="mt-n1 mb-n5"
                                                             dense outlined>
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col>
                                                            <v-text-field 
                                                             v-model="shousaiBui"
                                                             class="mt-n1 mb-n5"
                                                             dense outlined>
                                                            </v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row class="mt-0 mb-n6">
                                                        <v-col>
                                                            <p class = "my-n5">・価格設定</p>
                                                        </v-col>
                                                        <v-col>
                                                            <p class= "my-n5">・保守判定</p>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row class="ma-0" >
                                                        <v-col>
                                                            <v-combobox 
                                                             v-model="shousaiKakakuSetttei"
                                                             class="mt-1"
                                                             dense outlined>
                                                            </v-combobox>
                                                        </v-col>
                                                        <v-col>
                                                            <v-combobox 
                                                             v-model="shousaiHoshuHantei"
                                                             class="mt-1"
                                                             dense outlined>
                                                            </v-combobox>
                                                        </v-col>
                                                    </v-row>

                                            </v-col>
                                        </v-row>
                                        <v-row  justify="end" no-gutters>
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
                                        <v-row justify="end" no-gutters>
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
                                        <v-row class="mt-2" no-gutters justify="space-between">
                                            <v-col class=ml-2>
                                                <v-btn color="primary">
                                                    <v-icon>mdi-magnify</v-icon>
                                                    SQLを表示する。
                                                </v-btn>
                                            </v-col>
                                            <v-col> 
                                                <v-btn>
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
                                </v-dialog>
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
      itemsBuhin:["1:前方一致","2:完全一致","3:部分一致",],
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
      shousaiBuhincode:"",
      shousaiBuhinmei:"",
      shousaiHoshuu:"",
      shousaiZuban:"",
      shousaiKoban:"",
      shousaiTanban:"",
      shousaiSoukotantou:"",
      shousaiPStenkai:"",
      shousaiJidouKounyuu:"",
      shousaiSeihinbunruiCode:"",
      shousaiSeihinkubun:"",
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
      shousaiKakakuSetttei:"",
      shousaiHoshuHantei:"",
      shousaiNyuukoubiCheck:false,
      shousaiShukkobiCheck:false,
      shousaiZaikoZero:false,
      shousaiDialog:false,
      shousaiItemsBuhin:["1:前方一致","2:完全一致","3:部分一致",],
      shousaiSelectBuhin:"1:前方一致",
      shousaiItemsBuhinmei:["1:前方一致","2:完全一致","3:部分一致",],
      shousaiSelectBuhinmei:"3:部分一致",
      shousaiItemsHoshu:["1:前方一致","2:完全一致","3:部分一致",],
      shousaiSelectHoshu:"3:部分一致",
      shousaiItemsZuban:["1:前方一致","2:完全一致","3:部分一致",],
      shousaiSelectZuban:"1:前方一致",
      shousaihyoujunDate1:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      shousaihyoujunDate2:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      shousaiNyuukoDate1:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      shousaiNyuukoDate2:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      shousaiShukkokoDate1:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      shousaiShukkokoDate2:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      shousaiChozouKaishiDate1:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      shousaiChozouKaishiDate2:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
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
      shousaiItemsSouko:[1,2,3,4,5,"--"],
      shousaiSelectSouko:"--",
      shousaiTableCheckbox:false,
      shousaiZaikoSelected: [],
      shousaiZaikoHeaders: [
          {
            text: '倉',
            align: 'start',
            sortable: false,
            value: 'souko',
          }, 
          { text: '説明', 
            sortable: false,
            value: 'setsumei' },
        ],
      shousaiZaikoItems: [
          {
            souko: 'Frozen Yogurt',
            setsumei: 159,
          },
          {
            souko: 'AAA',
            setsumei: 159,
          },
          {
            souko: 'BBB',
            setsumei: 159,
          },
          {
            souko: 'CCC',
            setsumei: 159,
          },
          {
            souko: 'DDD',
            setsumei: 159,
          },
          {
            souko: 'EEE',
            setsumei: 159,
          },
          {
            souko: 'FFF',
            setsumei: 159,
          },
          {
            souko: 'GGG',
            setsumei: 159,
          },
          {
            souko: 'DDD',
            setsumei: 159,
          },
      ],
      //setting
      setttingDialog:false,
    
      //User Setting 
      userKoumokuSelect:"P/M基本情報",
      userKoumokuItems:["P/M基本情報","手配情報","標準時間マスタ","購買情報","在庫情報"],
      userShougiSelect:"手配情報",
      userShougiItems:["手配情報","製作情報","購買情報","在庫情報","保守情報","販売価格情報","P/S情報","代替部品情報"],
    }),
    methods:{
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
        shousaiClear(){
            this.shousaiBuhincode="";
            this.shousaiBuhinmei="";
            this.shousaiHoshuu="";
            this.shousaiZuban="";
            this.shousaiKoban="";
            this.shousaiTanban="";
            this.shousaiSoukotantou="";
            this.shousaiPStenkai="";
            this.shousaiJidouKounyuu="";
            this.shousaiSeihinbunruiCode="";
            this.shousaiSeihinkubun="";
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
            this.shousaiKakakuSetttei="";
            this.shousaiHoshuHantei="";
            this.shousaiNyuukoubiCheck=false;
            this.shousaiShukkobiCheck=false;
            this.shousaiZaikoZero=false;
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
            this.shousaiTableCheckbox=false;
            this.toggle_none="";
            this.shousaihyoujunDate1=(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
            this.shousaihyoujunDate2=(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
            this.shousaiNyuukoDate1=(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
            this.shousaiNyuukoDate2=(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
            this.shousaiShukkokoDate1=(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
            this.shousaiShukkokoDate2=(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
            this.shousaiChozouKaishiDate1=(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
            this.shousaiChozouKaishiDate2=(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
        },
    }
  }
</script>