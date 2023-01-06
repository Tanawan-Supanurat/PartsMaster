<template>
  <v-app dark>
      <v-main>
        <Nuxt />
        <div>
            <!-- Nav-bar -->
            <v-app-bar
            color="light-blue lighten-1"
            dense
            extended 
            extension-height="30"
            clipped-left
            dark 
            >
            <!--　OpenCloseNav()は基本検索条件と検索結果画面を表示する関数 -->
            <v-app-bar-nav-icon class = "mt-5" @click.stop="OpenCloseNav()"></v-app-bar-nav-icon>
            <v-toolbar-title draggable @dragstart="dragList($event)" ><br>Fujitec<br> Parts Master</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon right @click="getUsersettingDialog()">
                <v-icon color="blue-grey darken-3" class = "mr-6 mt-7" size = 70>mdi-cog</v-icon>
            </v-btn>
            <!--　ユーザー設定画面　-->
            <v-dialog
                v-model="settingDialog"
            >
                <v-card color="indigo lighten-5" outlined>
                    <v-row class="mt-2 d-flex" no-gutters >
                        <v-card elevation ="1" :style="$vuetify.breakpoint.mdOnly?
                            'transform: rotate(-5deg); position:  relative;top: 30px; left: 30px; z-index:1;':
                            'transform: rotate(-5deg); position:  relative;top: 10px; left: 30px; z-index:1;'">
                            <v-card-title   
                            class="ml-7 mr-6 text-h5 font-weight-bold">
                            ユーザー設定画面
                            </v-card-title>
                        </v-card>
                        <v-spacer></v-spacer>
                        <v-col class="d-flex" cols ="1">
                            <v-btn
                            @click = "settingDialog = false"
                            class="mt-2 ml-auto mr-2" icon outlined>
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                        <v-card  class ="mx-10" outlined flat>
                            <v-row class="my-2 mx-2">
                                <v-col :class="$vuetify.breakpoint.mobile?'d-flex mr-2':'d-flex ml-8 mr-2'" :cols = "$vuetify.breakpoint.smAndUp?'5':'12'">
                                    <div class="align-self-center">
                                        <v-row>
                                            <v-col class="d-flex">
                                                <h5 class="mr-2">ログインユーザー：</h5>
                                                <p>[{{userId}}]     {{userName}} </p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col class="d-flex">
                                                <h5 class="mr-2">所属部課：</h5>
                                                <p>[{{departmentId}}]   {{departmentName}} </p>
                                            </v-col>
                                        </v-row>
                                    </div>
                                </v-col>

                                <v-col :class="$vuetify.breakpoint.mobile?' mr-2':'ml-8'" :cols = "$vuetify.breakpoint.smAndUp?'5':'12'" >
                                    <v-row no-gutters>
                                        <v-col>
                                            <h4 class=" py-0 font-weight-bold text-subtitle-1 text-decoration-underline">
                                                権限
                                            </h4>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col>
                                            <h5>手配部門権限</h5>
                                        </v-col>
                                    </v-row>
                                    <v-row class="d-flex" no-gutters>
                                            <h5 class = "mr-14">・P/S情報</h5>
                                        <v-col>
                                            <h5>  :  {{this.USER_PS_AUTH}}</h5>
                                        </v-col>
                                    </v-row>
                                    <v-row class="d-flex" no-gutters>
                                        <h5 class = "mr-6">・代替部品情報</h5>
                                        <v-col>
                                            <h5> :  {{this.USER_DAIKAE_AUTH}}</h5>
                                        </v-col>
                                    </v-row>
                                    <v-row class="d-flex" no-gutters>
                                        <h5 class = "mr-6">・販売価格情報</h5>
                                        <v-col>
                                            <h5> :   {{this.USER_HANBAI_AUTH}}</h5>
                                        </v-col>
                                    </v-row>
                                </v-col>
                        </v-row>
                        </v-card>

                    <v-card  class ="mx-10 my-2" outlined flat>
                        <v-row no-gutters>
                            <v-col class="ml-10 mt-4 mr-2">
                                <v-card-text class="py-0 font-weight-bold text-subtitle-1 text-decoration-underline">
                                    項目の表示順設定
                                </v-card-text>
                                <div class="ml-10">
                                    <p class = "font-weight-bold mr-10">【手順】</p>
                                    <ol class = "mr-10" style="color: blue">
                                        <li class="font-size =0.8em" type ="1">対象情報を選択。</li>
                                        <li type ="1">「全項目」から表示したい項目を「表示項目」へ追加。</li>
                                        <li type ="1">表示したい順番をD&Dで設定。</li>
                                        <li type ="1">「保存」ボタンを押して設定内容を保存する。</li>
                                    </ol>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row  no-gutters class = "ml-10">
                            <v-col cols= '12'>
                                <p class ="ml-5 my-2 mr-10" style="color: #26b72b">※ 他ユーザーの設定をコピーしたい場合は、「他ユーザーの設定を表示」から設定したいユーザーの設定を表示項目に表示させてから「保存ボタン」を押す。</p>
                            </v-col>
                        </v-row>
                        </v-card>
                        <v-card class ="mx-10 my-2" outlined flat>
                        <v-row class ="ml-10 mt-2" no-gutters>
                            <v-col :cols="$vuetify.breakpoint.mobile? '12':'8'">
                                <div :class="$vuetify.breakpoint.mobile?'ml-0 mb-4':'ml-12'">
                                    <v-row class="mt-2 d-flex" justify="start" no-gutters>
                                        <P class="font-weight-bold">対象情報 </P>
                                        <v-col class ="ml-2" :cols="$vuetify.breakpoint.mobile? '5':'3'">
                                            <v-combobox
                                                v-model="userKoumokuSelect"
                                                :items="userKoumokuItems"
                                                @change="getSettingChange()"
                                                outlined
                                                dense
                                            ></v-combobox>
                                        </v-col>
                                    </v-row>
                                    <v-row class ="d-flex" justify="start" no-gutters>
                                        <P class="font-weight-bold">他ユーザーの設定を表示</P>
                                        <v-col 
                                        class ="ml-2"
                                        :cols="$vuetify.breakpoint.mobile? '4':'3'">
                                            <v-text-field 
                                            v-model ="Serach_UserSetting"
                                            dense
                                            outlined
                                            label ="(個人コード)"
                                            >
                                            </v-text-field>
                                        </v-col>
                                        <v-dialog
                                         v-model="dialog_DepartmentName"
                                         width = "600"
                                        >
                                            <template v-slot:activator = "{ on , attrs}">
                                                <v-btn 
                                                v-bind = "attrs"
                                                v-on ="on"
                                                @click="getDepartmentUser()" 
                                                class ="mx-1"
                                                outlined icon tile small>
                                                    <v-icon small>mdi-account-search-outline</v-icon>
                                                </v-btn>
                                            </template>
                                        
                                            <v-card >
                                                <v-row class="mr-2">
                                                    <v-card-title class ="mt-5 ml-5 text-h5 ">
                                                    ユーザー検索
                                                    </v-card-title>
                                                    <v-spacer></v-spacer>
                                                    <v-col class = "d-flex mr-2" cols = "1">
                                                        <v-btn
                                                        @click = "dialog_DepartmentName = false"
                                                        class="mt-5 mr-5" icon outlined>
                                                            <v-icon>mdi-close</v-icon>
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="d-flex justify-space-between">
                                                    <v-col class = "ml-5" cols="5">
                                                        <v-text-field
                                                        v-model="DEPARTMENT_CODE"
                                                        label="(所属部課コード)" 
                                                        dense outlined></v-text-field>
                                                    </v-col>
                                                    <v-col class="mr-5" cols="5">
                                                        <v-text-field 
                                                        label="(個人コード)"
                                                        v-model="USER_CODE"                             
                                                        dense outlined></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-data-table
                                                    :headers="User_Setting_Header"
                                                    :items="User_Setting_Item"
                                                    :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                    hide-default-footer
                                                    @click:row="GetUsersetting"
                                                ></v-data-table>
                                            </v-card>
                                        </v-dialog>
                                        <v-btn 
                                        outlined icon tile small @click ="getAnotherUserSetting()">
                                        <v-icon small>mdi-magnify</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <v-row>
                                        <p class ="ml-5 my-2 mr-10" style="color: #26b72b">
                                            ※ 【表示可能な全項目】と【表示項目】のリストはドラッグ・アンド・ドロップ機能が対応してますので、
                                            項目を押してながら、別のリストに移動や順番を入れ替えが可能です。
                                        </p>
                                    </v-row>
                                    <v-row :class="$vuetify.breakpoint.smAndUp?'d-flex justify-space-between mt-5 mb-5': 'd-flex justify-space-between mt-5 mb-5'" no-gutters>
                                        <v-col :cols ="this.$vuetify.breakpoint.mobile?'5':''">
                                            <v-row>
                                                <h4>表示可能な全項目</h4>
                                            </v-row>
                                            <v-row >
                                                <v-card :width="this.$vuetify.breakpoint.mobile?'90%':'30vh'" class ="mt-5 " outlined flat >
                                                    <!--
                                                    <v-list height="60vh" style="overflow-y: auto" nav dense >
                                                        <v-subheader>項目</v-subheader>
                                                        <v-list-item-group
                                                            v-model="User_All_List_Select"
                                                            color="primary"
                                                        >
                                                        <v-list-item
                                                            v-for="(item, i) in this.User_All_List.filter(list => list.COL_VISIBLE =='1')"
                                                            :key="i"
                                                            @drop="dropList($event, '1')"
                                                            @dragover.prevent
                                                            @dragenter.prevent
                                                        >   
                                                            <v-list-item-icon v-if="item.FIELD_NAME !=  '-'">
                                                                <v-icon  v-text="item.SEQ_NO"></v-icon>
                                                            </v-list-item-icon>

                                                            <v-list-item-content>
                                                                <v-list-item-title draggable @dragstart="dragList($event,item.SEQ_NO,item.COL_VISIBLE)" v-if="User_All_List != []" v-text="item.FIELD_NAME_J"></v-list-item-title>
                                                            </v-list-item-content>
                                                            
                                                            <v-list-item-icon v-if="item.FIELD_NAME !=  '-'">
                                                                <v-icon  v-text="item.COL_VISIBLE"></v-icon>
                                                            </v-list-item-icon>
                                                            </v-list-item>
                                                        </v-list-item-group>
                                                    </v-list>
                                                    -->
                                                    <!-- draggable を使用する場合 -->
                                                    <!-- Tabaleの場合-->
                                                    <v-simple-table fixed-header height="60vh">
                                                    <thead>
                                                        <tr>
                                                            <th classs = "text-left">
                                                                項目
                                                            </th>
                                                            <th v-if="$vuetify.breakpoint.smAndUp"  classs = "text-left">
                                                                順番
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                        <draggable group="people" :list="Draggable_list_1" tag="tbody" @end="handleChange()">
                                                            <tr
                                                                v-for = "(item , index) in this.Draggable_list_1"
                                                                :key ="index"
                                                            >
                                                                <td>
                                                                    {{item.FIELD_NAME_J}}
                                                                </td>
                                                                <td v-if="$vuetify.breakpoint.smAndUp">
                                                                    {{item.SEQ_NO}}
                                                                </td>
                                                            </tr>
                                                    </draggable>
                                                </v-simple-table>
                                                </v-card>
                                            </v-row>
                                            <v-row class="mr-4" v-if="this.$vuetify.breakpoint.mobile">
                                                <v-btn @click="getAllUserList()" class="mt-2" color="primary"  outlined :large ="$vuetify.breakpoint.smAndUp?true:false" block><v-icon>mdi-arrow-right-bold-hexagon-outline</v-icon>全て追加</v-btn>
                                            </v-row>
                                        </v-col>
                                        <!--
                                        <v-col cols="2" :class="this.$vuetify.breakpoint.mobile?'d-flex ml-3 mr-2':'d-flex ml-5'">
                                            
                                            <div class ="align-self-center">
                                                <v-row class="mb-2">
                                                    <v-btn large>
                                                        <v-icon>mdi-arrow-right-bold</v-icon>
                                                        追加
                                                    </v-btn>
                                                </v-row>
                                                <v-row>
                                                    <v-btn large>
                                                        <v-icon>mdi-arrow-left-bold</v-icon>
                                                        削除
                                                    </v-btn>
                                                </v-row>
                                            </div>
                                        </v-col>
                                    -->
                                        <v-col :cols ="this.$vuetify.breakpoint.mobile?'5':''">
                                            <v-row >
                                                <h4>表示項目</h4>
                                            </v-row>
                                            <v-row>
                                                <v-card :width="this.$vuetify.breakpoint.mobile?'90%':'30vh'"  class ="mt-5 " outlined flat >
                                                    <!--
                                                    <v-list height="60vh" style="overflow-y: auto" class="item-list" nav dense>
                                                        <v-subheader>項目</v-subheader>
                                                        <v-list-item-group
                                                            v-model="User_Visionable_List_Select"
                                                            color="primary"
                                                        >
                                                            <v-list-item
                                                                v-for="(item, i) in this.User_All_List.filter(list => list.COL_VISIBLE ==null)"
                                                                :key="i"
                                                                @drop="dropList($event, '0')"
                                                                @dragover.prevent
                                                                @dragenter.prevent  
                                                            >
                                                                <v-list-item-icon v-if="item.FIELD_NAME !=  '-'">
                                                                    <v-icon v-text="item.SEQ_NO"></v-icon>
                                                                </v-list-item-icon>
                                                                <v-list-item-content v-if="item.FIELD_NAME !=  '-'">
                                                                    <v-list-item-title draggable @dragstart="dragList($event,item.SEQ_NO,item.COL_VISIBLE)"  v-if="User_All_List != []" v-text="item.FIELD_NAME_J"></v-list-item-title>
                                                                </v-list-item-content>
                                                                <v-list-item-icon v-if="item.FIELD_NAME !=  '-'">
                                                                    <v-icon  :v-text="item.COL_VISIBLE == null ? '0':'XD'"></v-icon>
                                                                </v-list-item-icon>
                                                            </v-list-item>
                                                        </v-list-item-group>
                                                    </v-list>
                                                -->
                                                <v-simple-table fixed-header height="60vh">
                                                    <thead>
                                                        <tr>
                                                            <th classs = "text-left">
                                                                項目
                                                            </th>
                                                            <th v-if="$vuetify.breakpoint.smAndUp" classs = "text-left">
                                                                順番
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                        <draggable group="people" :list="Draggable_list_2" tag="tbody" @end="handleChange()">
                                                            <tr
                                                                v-for = "(item , index) in this.Draggable_list_2"
                                                                :key ="index"
                                                            >
                                                                <td>
                                                                    {{item.FIELD_NAME_J}}
                                                                </td>
                                                                <td v-if="$vuetify.breakpoint.smAndUp">
                                                                    {{item.SEQ_NO}}
                                                                </td>
                                                            </tr>
                                                    </draggable>
                                                </v-simple-table>
                                                
                                                </v-card>
                                            </v-row>
                                            <v-row class="mr-4" v-if="this.$vuetify.breakpoint.mobile">
                                                <v-btn @click="getAllList()" class="mt-2" color ="error" outlined :large ="$vuetify.breakpoint.smAndUp?true:false" block><v-icon>mdi-arrow-left-bold-hexagon-outline</v-icon>全て削除</v-btn>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-col>
                            <v-col :cols="$vuetify.breakpoint.mobile? '12':'3'">
                                <v-row>
                                    <v-col :cols="$vuetify.breakpoint.mobile? '6':'12'">
                                        <h4 class="text-decoration-underline">初期画面表示</h4>
                                        <v-row class="mt-1">
                                            <v-col class="ml-4" :cols="$vuetify.breakpoint.mobile? '10':'10'" >
                                                <v-combobox
                                                    v-model="userShougiSelect"
                                                    :items="userShougiItems"
                                                    outlined
                                                    dense
                                                ></v-combobox>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col :cols="$vuetify.breakpoint.mobile? '6':'12'">
                                        <h4 :class="$vuetify.breakpoint.mobile?'text-decoration-underline':'text-decoration-underline mt-n5'">一括編集件数</h4>
                                        <v-row class="mt-1">
                                            <v-col cols="6" class="ml-4">
                                                <v-text-field class = "right-input" outlined dense></v-text-field>
                                            </v-col>
                                            <v-col class ="ml-1 mt-1">
                                                <p>件</p>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <h4 :class="$vuetify.breakpoint.mobile?'text-decoration-underline mt-n8 ':'text-decoration-underline mt-n5'">一括編集対象データ</h4>
                                        <v-card :width="this.$vuetify.breakpoint.mobile?'90%':'30vh'" class ="mt-5 " outlined flat >
                                            <v-list nav dense>
                                                <v-subheader>マスター名</v-subheader>
                                                <v-list-item-group
                                                    v-model="User_Edit_List_Select"
                                                    color="primary"
                                                >
                                                <v-list-item
                                                    v-for="(item, i) in User_Edit_List"
                                                    :key="i"
                                                    draggable
                                                >
                                                    <v-list-item-content>
                                                        <v-list-item-title v-text="item.text"></v-list-item-title>
                                                    </v-list-item-content>
                                                    </v-list-item>
                                                </v-list-item-group>
                                            </v-list>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row class="mr-4 mb-5" v-if="this.$vuetify.breakpoint.mobile">
                            <v-col>
                                <v-btn class ="mx-2" outlined large block @click="draggSlot()" >
                                    <v-icon
                                            left
                                            dark
                                            large
                                        >
                                        mdi-content-save
                                        </v-icon>
                                        <h3 class >保存</h3>
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-btn outlined large block @click = "settingDialog = false" >
                                    <v-icon
                                            left
                                            dark
                                            large
                                        >
                                            mdi-close-box-outline
                                        </v-icon> 
                                        <h3 >閉じる</h3>
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row v-if="!this.$vuetify.breakpoint.mobile" class ="ml-10 my-2 " no-gutters>
                            <v-col cols='8'>
                                <v-row  no-gutters>
                                    <v-col  cols="4"><v-btn @click="getAllUserList()" color="primary" outlined large block><v-icon>mdi-arrow-right-bold-hexagon-outline</v-icon>全て追加</v-btn></v-col>
                                    <v-col  cols= "2"></v-col>
                                    <v-col cols="4"><v-btn @click="getAllList()" color ="error" outlined large block><v-icon>mdi-arrow-left-bold-hexagon-outline</v-icon>全て削除</v-btn></v-col>
                                </v-row>
                            </v-col>
                            <v-col class="d-flex justify-end" cols='3'>

                                <v-btn class ="mx-2" outlined large @click="draggSlot()">
                                    <v-icon
                                            left
                                            dark
                                            large
                                        >
                                        mdi-content-save
                                        </v-icon>
                                        <h3 class ="mr-3">保存</h3>
                                </v-btn>
                                <v-btn outlined large @click = "settingDialog = false">
                                    <v-icon
                                            left
                                            dark
                                            large
                                        >
                                            mdi-close-box-outline
                                        </v-icon> 
                                        <h3 >閉じる</h3>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
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
            <!--　mini　検索条件画面の幅状態を制御すプロパティ -->
            <!--  True  : 検索条件画面を縮小する -->
            <!--  False : 検索条件画面を拡大する-->
            <!--  search_width 検索条件画面の幅を設定するプロパティ-->
            <!--  search_height 検索条件画面の高さを設定するプロパティ-->
            <v-navigation-drawer
                v-model="drawer1"
                :mini-variant="$vuetify.breakpoint.mobile ?mini : mini"
                mini-variant-width = "3%"
                :floating="$vuetify.breakpoint.mobile ?false:true"                               
                :bottom ="$vuetify.breakpoint.mobile ?true:false"
                :fixed = "$vuetify.breakpoint.mobile ?true:false"
                :width = "search_width"
                :height="$vuetify.breakpoint.mobile ?this.search_height:'100vh'"
            >
                <v-list nav dense>
                    <v-list-item-group
                      v-model="group"
                      active-class="deep-purple--text text--accent-4"
                    >
                        <v-form
                         ref="form"
                         v-model="kensakuForm"
                         lazy-validation
                        >
                            <v-row class="d-flex" >
                                <v-col >
                                    <!-- $vuetify.breakpoint.mobile　は端末の種類に応じて画面の表示を変更するプロパティ  -->
                                    <!-- Ture  : スマートフォンやタブレットを使用する時-->
                                    <!-- False : PCを使用する時-->
                                    <!-- changeSearchMiniWidth() 検索条件画面の拡大縮小を変更する関数-->
                                    <div v-if="!$vuetify.breakpoint.mobile">
                                        <v-btn class = "mb-2"
                                        icon
                                        @click.stop="changeSearchMiniWidth()"
                                        >
                                            <v-icon v-if ="!mini">mdi-step-backward</v-icon>
                                            <v-icon v-if ="mini">mdi-step-forward</v-icon>
                                        </v-btn>検索条件
                                    </div>
                                    <!-- changeSerachHeight() 検索条件画面の高さ変更する関数-->
                                    <div v-if="$vuetify.breakpoint.mobile">
                                        <v-btn class = "mb-2"
                                        icon
                                        @click.stop="changeSerachHeight()"
                                        >
                                            <v-icon v-if ="!mini">mdi-menu-down</v-icon>
                                            <v-icon v-if ="mini">mdi-menu-up</v-icon>
                                        </v-btn>検索条件
                                    </div>
                                </v-col>
                                <!-- changeNavBar(引数)検索条件画面と検索結果画面を入れ替える関数-->
                                <!-- 引数　1 : 検索結果画面に移動 -->
                                <!-- 引数　2 : 検索条件画面に移動 -->
                                <v-col class=" d-flex justify-end mt-2"  v-if="$vuetify.breakpoint.mobile">
                                    検索結果
                                    <v-btn 
                                    @click.stop ="changeNavBar(1)"
                                    class="mt-n2" icon>
                                    <v-icon>mdi-step-forward</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <div v-if="!mini" >
                                <v-container class ="pl-10">
                                <!--　基本検索条件1 -->
                                <p class="ma-0">部品コード</p>
                                <!-- buhincode 部品コードのプロパティ-->
                                <v-text-field
                                    v-model="buhincode"
                                    outlined
                                    dense
                                    placeholder="最大30文字"
                                    counter="30"
                                    required
                                    @keyup="buhincode = buhincode.toUpperCase()"
                                >
                                </v-text-field>
                                <p class="ma-0">部品名</p>
                                <!-- buhinmei 部品名のプロパティ-->
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
                                    <!--　selectBuhin 部品名の検索条件を設定するプロパティ-->
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
                                            <v-dialog  v-model ="warning_dialog_btn1" persistent max-width="290" >
                                                <template v-slot:activator = "{on, attrs}">
                                                    <!-- 部品コードと部品名が入力されてない場合でボタンをクリックすると検索が実行されない　-->
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
                                                    <!-- 部品コードや部品名が入力された場合でボタンをクリックすると検索が実行される-->
                                                    <!-- getKensakuBtn1() PPPMMSで検索を実行する関数 -->
                                                    <!-- SQL内のパラメータ名-->
                                                    <!-- 部品コード PART_NO -->
                                                    <!-- 部品名　　 PART_NAME_LOC1 -->
                                                    <v-btn v-else @click="getKensakuBtn1()" elevation="2" icon tile >
                                                        <v-icon> mdi-magnify</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-card>
                                                    <!--　部品コードと部品名が入力されてない場合警告画面を表示　-->
                                                    <!-- warning_dialog_btn1 警告画面を表示を制御するプロパティ　-->
                                                    <!-- True  : 警告画面表示する-->
                                                    <!-- False : 警告画面未表示する-->
                                                    <v-card-title >Warning</v-card-title>
                                                    <v-card-text >検索条件を入力してください。</v-card-text>
                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <!-- Okボタンをクリックすと 警告画面が未表示する-->
                                                        <v-btn color="primary" text @click="warning_dialog_btn1 = false">
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
                                <!-- itemsSeihin 製品種別のプロパティ-->
                                <!-- -:All--><!-- 1:EV--><!-- 2:ESC--><!-- 3:CP-->
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
                                    <v-col cols="5" sm="5">
                                        <!-- hakkouMenu1 標準図発行日のカレンダー入力画面を表示する -->
                                        <!-- True  : 表示　-->
                                        <!-- False : 未表示　-->
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
                                            <!-- hakkouDate1 標準図発行日(左側)プロパティ-->
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
                                            <!-- カレンダー内で選択した日はhakkouDate1に渡される-->
                                            <!-- @input 選択した後に標準図発行日カレンダーを未表示にする-->
                                            <v-date-picker
                                            v-model="hakkouDate1"
                                            @input="hakkouMenu1 = false"
                                            >
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col class = "ml-2" sm="1"><p>~</p></v-col>
                                    <v-col cols="5" sm="5">
                                        <!-- hakkouMenu2 標準図発行日のカレンダー入力画面を表示する -->
                                        <!-- True  : 表示　-->
                                        <!-- False : 未表示　-->
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
                                            <!-- hakkouDate2 標準図発行日(右側)プロパティ-->
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
                                            <!-- カレンダー内で選択した日はhakkouDate2に渡される-->
                                            <!-- @input 選択した後に標準図発行日カレンダーを未表示にする-->
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
                                    <v-col cols="5" sm="5">
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
                                    <v-col cols="5" sm="5">
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
                                        @keyup="hakkoTsuuchi = hakkoTsuuchi.toUpperCase()"
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
                                        @keyup="kirikaeTsuuchi = kirikaeTsuuchi.toUpperCase()"
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
                                                <v-toolbar-title>詳細検索画面  </v-toolbar-title>
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
                                                    <v-col :cols="$vuetify.breakpoint.mobile?'12':'4'">
                                                        <v-row>
                                                            <v-col :cols="$vuetify.breakpoint.name == 'md'?'7':'12'" >
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
                                                            </v-col>
                                                            <v-col :cols="$vuetify.breakpoint.name == 'md'?'5':'12'" >
                                                                <v-row justify="center" class="d-flex justify-center">
                                                                    <v-col cols=10 sm=10>
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
                                                                    <br>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                    <v-col :cols="$vuetify.breakpoint.mobile?'12':'4'">
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
                                                                                mobile-breakpoint='400'
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
                                                                                mobile-breakpoint='400'
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
                                                                                        mobile-breakpoint='400'
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
                                                                                        mobile-breakpoint='400'
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
                                                                                mobile-breakpoint='400'
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
                                                                                    mobile-breakpoint='400'
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
                                                                            mobile-breakpoint='400'
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
                                                    <v-col :cols="$vuetify.breakpoint.mobile?'12':'4'">
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
                                                                                            item-key="KT_CODE,SG_CODE,CC_CODE,WC_CODE"
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
                                                <!-- Check Box-->
                                                <v-row class="mt-n4"  :justify="$vuetify.breakpoint.mobile?'start':'end'" no-gutters>
                                                    <v-col :cols="$vuetify.breakpoint.mobile?'6':'4'">
                                                        <v-checkbox
                                                        class="ma-0"
                                                        v-model="shousaiCheckBox1"
                                                        label="図面発行後二次情報が変更されていない"
                                                        ></v-checkbox>
                                                    </v-col>
                                                    <v-col :cols="$vuetify.breakpoint.mobile?'6':'4'">
                                                        <v-checkbox
                                                        class="ma-0"
                                                        v-model="shousaiCheckBox2"
                                                        label="製造原価登録済且つ販売価格未登録部品"
                                                        ></v-checkbox>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="mt-n4" :justify="$vuetify.breakpoint.mobile?'start':'end'" no-gutters>
                                                    <v-col :cols="$vuetify.breakpoint.mobile?'4':'3'">
                                                        <v-checkbox
                                                        class="ma-0"
                                                        v-model="shousaiCheckBox3"
                                                        label="修理提案書使用済"
                                                        ></v-checkbox>
                                                    </v-col>
                                                    <v-col :cols="$vuetify.breakpoint.mobile?'4':'3'">
                                                        <v-checkbox
                                                        class="ma-0"
                                                        v-model="shousaiCheckBox4"
                                                        label="部品説明or取替理由が未登録"
                                                        ></v-checkbox>
                                                    </v-col>
                                                    <v-col :cols="$vuetify.breakpoint.mobile?'4':'3'">
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
                                                <v-col class="d-flex justify-end mb"> 
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
                                </v-container>
                            </div>                     
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
                :floating="$vuetify.breakpoint.mobile ?false:true"
                :bottom ="$vuetify.breakpoint.mobile ?true:false"
                :fixed = "$vuetify.breakpoint.mobile ?true:false"   
                :width = table_width
                :height="$vuetify.breakpoint.mobile ?this.table_height:'100vh'"
            >
                <v-list
                 nav
                 dense
                 >
                 <v-row class="d-flex" >
                    <v-col >
                        <div v-if="!$vuetify.breakpoint.mobile">
                            <v-btn class = "mb-2"
                            icon
                            @click.stop="changeTableMiniWidth()"
                            >
                                <v-icon v-if ="!mini2">mdi-step-backward</v-icon>
                                <v-icon v-if ="mini2">mdi-step-forward</v-icon>
                            </v-btn>検索結果
                        </div>
                        <div v-if="$vuetify.breakpoint.mobile">
                            <v-btn class = "mb-2"
                            icon
                            @click.stop="changeTableHeight()"
                            >
                                <v-icon v-if ="!mini2">mdi-menu-down</v-icon>
                                <v-icon v-if ="mini2">mdi-menu-up</v-icon>
                            </v-btn>検索結果
                        </div>
                    </v-col>
                    <v-col class=" d-flex justify-end"  >
                        <div v-if="!$vuetify.breakpoint.mobile && !mini2">
                            <v-btn 
                                class="ml-10" small icon
                                @click.stop="changeTableWidth()"
                            >
                                <v-icon>mdi-fit-to-page-outline</v-icon>
                            </v-btn>
                        </div>
                        <div v-if="$vuetify.breakpoint.mobile">
                            検索条件
                            <v-btn
                             @click.stop ="changeNavBar(2)"
                             class="mt-n2" icon>
                            <v-icon>mdi-step-forward</v-icon>
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
                    <v-container v-if="!mini2" fluid>
                        <v-row justify="center">
                            <v-col>
                                <v-data-table
                                mobile-breakpoint='400'
                                 height="70vh"
                                 :headers="$vuetify.breakpoint.mobile?HeaderTableBP:HeaderTable"
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
             color ="#F5F5F5"
            >
                <v-tabs
                 v-model="tab_select"
                 background-color="cyan"
                 dark
                >
                    <v-tabs-slider color="yellow"></v-tabs-slider>
                    <v-tab @click="LoadTeihaiTable()">手配</v-tab>
                    <v-tab @click="LoadSeisakuTable()">製作</v-tab>
                    <v-tab @click="LoadKoubaiTable()">購買</v-tab>
                    <v-tab>入出庫</v-tab>
                    <v-tab @click="LoadZaikoTable()">在庫</v-tab>
                    <v-tab @click="LoadHoshuTable()">保守</v-tab>
                    <v-tab>PC/SP</v-tab>
                    <v-tab>P/S</v-tab>
                    <v-tab>代替</v-tab>
                </v-tabs>

                <v-row class="d-flex my-2 ml-2">
                    <v-btn @click="GetSiteQuery('TEST')">
                        Get Site Query
                    </v-btn>
                    <p>{{ this.test_query }}</p>
                </v-row>
                
                <!--  手配画面表示 -->
                <v-container fluid>
                    <v-card  outlined shaped tile>
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
                              <v-menu offset-x offset-y>
                                <template #activator ="{on:onMenu}">
                                    <v-tooltip bottom>
                                    <template #activator="{ on: onTooltip }">
                                        <v-btn  v-on ="{...onMenu,...onTooltip}" icon><v-icon right>mdi-image</v-icon></v-btn>
                                    </template>
                                    <span>写真を表示</span>
                                    </v-tooltip>
                                </template>
                                <v-card width="300" height="300" >
                                  <v-container>
                                    <v-row> 
                                      <v-col>
                                        <h1 class="d-flex justify-center">{{HeaderPic_Loc}}</h1>
                                      </v-col>
                                    </v-row>
                                  </v-container> 
                                  </v-card>
                                </v-menu>
                                <v-tooltip bottom v-if ="HeaderPic_Loc == '写真未登録'">
                                    <template #activator = {on:onTooltip}>
                                        <v-btn v-on="onTooltip" icon ><v-icon right>mdi-camera-plus</v-icon></v-btn>
                                    </template>
                                    <span>未登録写真を追加</span>
                                </v-tooltip>
                            </v-col>
                        </v-row>
    
                        <v-card-text v-if ="!this.showHeader"></v-card-text>
                    </v-card>
                </v-container>
                <div v-if="tab_select == 0">           
                    <v-container fluid>
                        <v-card>
                            <v-data-table
                            mobile-breakpoint='400'
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
                            <v-col cols="12" :sm="this.$vuetify.breakpoint.mobile?12:6" xs="12">
                                <!-- P/M 基本情報-->
                                <v-card>   
                                    <v-row no-gutters>
                                        <v-col class="ml-2 mt-2">
                                            <h3>P/M基本情報</h3>
                                        </v-col>
                                        <v-spacer>
                                        </v-spacer>
                                        <v-col class="d-flex">
                                            <v-text-field
                                             class = "mt-2 mr-2"
                                             v-model = "EditTableSearch1"
                                             label = "フィルター"
                                             hide-details
                                             dense
                                             outlined
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-form ref ="PPPMMS_FORM">
                                        <v-data-table 
                                        mobile-breakpoint='400'
                                        fixed-header
                                        :headers="this.Editinfo_Header"
                                        :items="this.EditInfo_Value"
                                        :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                        hide-default-footer
                                        :height="PM_height"
                                        :search="EditTableSearch1"
                                        dense
                                        >
                                        <template v-slot:item.CELL_TYPE="{item}">
                                            <!--  共用マスター -->
                                            <v-btn 
                                            v-if="item.MS_TABLE == '1' && item.CELL_TYPE == 'B' && item.AUTH_TYPE == '2'"
                                            x-small 
                                            @click="getEditDialogBtn1(EditInfo_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,1)"
                                            >...</v-btn>
                                            <!-- 注文コードマスター  -->
                                            <v-btn
                                            v-if ="item.MS_TABLE == '2' && item.AUTH_TYPE == '2'&& item.CELL_TYPE == 'B'"
                                            @click = "getEditDialogBtn2(EditInfo_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,1)"
                                            x-small
                                            >...</v-btn>
                                            <!-- 担当コードマスター -->
                                            <v-btn
                                            v-if ="item.MS_TABLE == '3' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                            @click = "getEditDialogBtn3(EditInfo_Value.indexOf(item),item.MS_ITEM_NO,Edit_Combobox_1_select.substr(0,1),1)"
                                            x-small
                                            >...</v-btn>
                                            <!--　単位読替マスター　-->
                                            <v-btn
                                            v-if ="item.MS_TABLE == '4' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                            x-small
                                            @click = "getEditDialogBtn4(EditInfo_Value.indexOf(item),item.MS_ITEM_NO,2)"
                                            >...</v-btn>
                                            
                                            <v-btn
                                            v-if ="item.MS_TABLE == '6' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                            @click ="getEditDialogBtn6(EditInfo_Value.indexOf(item),item.FIELD_NAME,1)"
                                            x-small
                                            >...</v-btn>
                                            
                                        </template>
                                        <template v-slot:item.FIELD_VALUE="{item}">
                                            <v-text-field
                                                :background-color = "item.Setsumei_Error?'red':''"
                                                :class="item.ALIGNMENT == 'R  '?'mb-n5 right-input':'mb-n5 left-input'"
                                                :disabled = "item.AUTH_TYPE == '2' ?false:true"
                                                :filled= "item.AUTH_TYPE == '2'?false:true"
                                                :maxlength ="item.CELL_LENGTH == null ? false: item.CELL_LENGTH"
                                                :rules="item.RULES"
                                                v-model = EditInfo_Value[EditInfo_Value.indexOf(item)].FIELD_VALUE
                                                @keyup="getEditTableSetsumei(EditInfo_Value.indexOf(item),item.FIELD_NAME)"
                                                @change="getEditTableSetsumei(EditInfo_Value.indexOf(item),item.FIELD_NAME)"
                                                dense
                                                outlined>
                                            </v-text-field>
                                        </template>
                                        <template v-slot:item.FIELD_EXPLAIN="{ item }">
                                                <p
                                                :class="(item.Setsumei_Error)?'red--text text--lighten-1':'black--text'">
                                                {{EditInfo_Value[EditInfo_Value.indexOf(item)].FIELD_EXPLAIN}} 
                                                </p>
                                        </template>
                                        </v-data-table>
                                    </v-form>
                                </v-card>
                            </v-col>
                            <v-col cols="12" :sm="this.$vuetify.breakpoint.mobile?12:6" xs="12">
                                <!-- 手配情報-->
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
                                            @change="getEditTable2(Header_Data[Header_Data.length-1].PART_NO,Edit_Combobox_1_select.substring(0,1))"
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
                                        <v-spacer></v-spacer>
                                        <v-col sm="4">
                                            <v-text-field
                                            class = "mt-n4 mr-2"
                                            v-model = "EditTableSearch2"
                                            label = "フィルター"
                                            hide-details
                                            dense
                                            outlined
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    
                                    <v-form ref="PPPMORDER_form">
                                        <v-data-table
                                        mobile-breakpoint='400'
                                        fixed-header
                                        :headers="this.Editinfo2_Header"
                                        :items="this.EditInfo2_Value"
                                        :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                        hide-default-footer
                                        :search="EditTableSearch2"
                                        :height="Teihai_height"
                                        dense
                                        >
                                        <template v-slot:item.CELL_TYPE="{item}">
                                            <!--  共用マスター -->
                                            <v-btn 
                                            v-if="item.MS_TABLE == '1' && item.CELL_TYPE == 'B' && item.AUTH_TYPE == '2'"
                                            x-small 
                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                            @click="getEditDialogBtn1(EditInfo2_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                            >...</v-btn>
                                            <!-- 注文コードマスター -->
                                            <v-btn
                                            v-if ="item.MS_TABLE == '2' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                            x-small
                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                            @click = "getEditDialogBtn2(EditInfo2_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                            >...</v-btn>
                                            <!-- 担当コードマスター -->
                                            <v-btn
                                            v-if ="item.MS_TABLE == '3' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                            x-small
                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                            @click = "getEditDialogBtn3(EditInfo2_Value.indexOf(item),item.MS_ITEM_NO,Edit_Combobox_1_select.substr(0,1),2)"
                                            >...</v-btn>
                                            <!-- 単位読替マスタ -->
                                            <v-btn
                                            v-if ="item.MS_TABLE == '4' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                            @click = "getEditDialogBtn4(EditInfo2_Value.indexOf(item),item.MS_ITEM_NO,2)"
                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                            x-small
                                            >...</v-btn>
                                            <v-btn
                                            v-if ="item.MS_TABLE == '6' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                            @click ="getEditDialogBtn6(EditInfo2_Value.indexOf(item),item.FIELD_NAME,2)"
                                            x-small
                                            >...</v-btn>
                                        </template>
                                        <template v-slot:item.FIELD_VALUE="{item}">
                                            <v-text-field
                                                :background-color = "item.Setsumei_Error?'red':''"
                                                :class="item.ALIGNMENT == 'R  '?'mb-n5 right-input':'mb-n5 left-input'"
                                                :disabled = "Edit_Combobox_1_select.substr(0,1) != '-' && item.AUTH_TYPE == '2'?false:true"
                                                :filled= "Edit_Combobox_1_select.substr(0,1) != '-'&& item.AUTH_TYPE == '2' ?false:true"
                                                :maxlength ="item.CELL_LENGTH == null ? false: item.CELL_LENGTH"
                                                :rules="item.RULES"
                                                v-model = EditInfo2_Value[EditInfo2_Value.indexOf(item)].FIELD_VALUE
                                                @keyup="getEditTableSetsumei2(EditInfo2_Value.indexOf(item),item.FIELD_NAME)"
                                                @change="getEditTableSetsumei2(EditInfo2_Value.indexOf(item),item.FIELD_NAME)"
                                                outlined
                                                dense>
                                            </v-text-field>
                                        </template>
                                        <template v-slot:item.FIELD_EXPLAIN="{ item }">
                                            <p
                                            :class="(item.Setsumei_Error)?'red--text text--lighten-1':'black--text'">
                                            {{EditInfo2_Value[EditInfo2_Value.indexOf(item)].FIELD_EXPLAIN}}
                                            </p>
                                    </template>
                                        </v-data-table>
                                    </v-form>
                                    
                                </v-card>
                            </v-col>    
                        </v-row>
                    </v-container>
                    <v-container fluid>
                        <v-row no-gutters justify="end">
                            <v-col class="d-flex flex-row-reverse" >
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
                                <v-btn class="mr-2" large
                                @click="teihaiPostReq()"
                                >
                                    <v-icon
                                        left
                                        dark
                                        large
                                    >
                                    mdi-content-save
                                    </v-icon>
                                    <h3>保存</h3>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
                <!-- 製作画面表示 -->
                <div v-if="tab_select == 1">
                    <v-container fluid>
                    <v-row >
                        <!-- 手配情報表示画面-->
                        <v-col cols="12" :sm="this.$vuetify.breakpoint.mobile?12:6" xs="12">
                            <v-card>
                                <v-row no-gutters>
                                        <v-col class = "ml-2 mt-2">
                                            <h3>手配情報</h3>
                                        </v-col>
                                        <v-col class ="mt-2">
                                            <h4>工場区分</h4>
                                        </v-col>
                                        <v-col>
                                            <!-- Edit_Combobox_1_item　倉庫コード格納されているプロパティ -->
                                            <!-- Edit_Combobox_1_select 現在選択している倉庫コード-->
                                            <!-- @change="getEditTable2 もし、倉庫コードが選択された場合データベースから現在検査している部品の手配情報と工程順序選択情報をテーブルに格納する -->
                                            <!-- EditInfo2_Value 手配情報のテーブル -->
                                            <!-- KT_CODE_ITEM 工程順序選択情報のテーブル-->
                                            <v-combobox 
                                            v-model="Edit_Combobox_1_select"
                                            :items = "Edit_Combobox_1_item"
                                            @change="getEditTable2(Header_Data[Header_Data.length-1].PART_NO,Edit_Combobox_1_select.substring(0,1))"
                                            class ="mt-2" 
                                            dense 
                                            outlined>
                                        </v-combobox>
                                        </v-col >
                                        <v-tooltip bottom>
                                            <!-- Edit_checkbox こちらのチェックボックスを選択した場合、手配情報を更新する時に両方の倉庫が更新される-->
                                            <!-- Edit_Combobox_1_select 左側倉庫コード -->
                                            <!-- Edit_Combobox_2_select 右側倉庫コード -->
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
                                            <!-- Edit_Combobox_2_item　倉庫コード格納されているプロパティ -->
                                            <!-- Edit_Combobox_2_select 現在選択している倉庫コード-->
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
                                        <v-spacer></v-spacer>
                                        <v-col sm="4">
                                            <!-- EditTableSearch2　手配情報内に検査したいデータ -->
                                            <v-text-field
                                            class = "mt-n4 mr-2"
                                            v-model = "EditTableSearch2"
                                            label = "フィルター"
                                            hide-details
                                            dense
                                            outlined
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <!-- PPPMORDER_form 手配情報のテーブル  -->
                                    <v-form ref="PPPMORDER_form">
                                        <v-data-table
                                        mobile-breakpoint='400'
                                        fixed-header
                                        :headers="this.Editinfo2_Header"
                                        :items="this.EditInfo2_Value"
                                        :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                        hide-default-footer
                                        :search="EditTableSearch2"
                                        height="50vh"
                                        dense
                                        >
                                        <template v-slot:item.CELL_TYPE="{item}">
                                            <!--  共用マスター -->
                                            <v-btn 
                                            v-if="item.MS_TABLE == '1' && item.CELL_TYPE == 'B' && item.AUTH_TYPE == '2'"
                                            x-small 
                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                            @click="getEditDialogBtn1(EditInfo2_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                            >...</v-btn>
                                            <!-- 注文コードマスター -->
                                            <v-btn
                                            v-if ="item.MS_TABLE == '2' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                            x-small
                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                            @click = "getEditDialogBtn2(EditInfo2_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                            >...</v-btn>
                                            <!-- 担当コードマスター -->
                                            <v-btn
                                            v-if ="item.MS_TABLE == '3' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                            x-small
                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                            @click = "getEditDialogBtn3(EditInfo2_Value.indexOf(item),item.MS_ITEM_NO,Edit_Combobox_1_select.substr(0,1),2)"
                                            >...</v-btn>
                                            <!-- 単位読替マスタ -->
                                            <v-btn
                                            v-if ="item.MS_TABLE == '4' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                            @click = "getEditDialogBtn4(EditInfo2_Value.indexOf(item),item.MS_ITEM_NO,2)"
                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                            x-small
                                            >...</v-btn>
                                            <v-btn
                                            v-if ="item.MS_TABLE == '6' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                            @click ="getEditDialogBtn6(EditInfo2_Value.indexOf(item),item.FIELD_NAME,2)"
                                            x-small
                                            >...</v-btn>
                                        </template>
                                        <template v-slot:item.FIELD_VALUE="{item}">
                                            <v-text-field
                                                :background-color = "item.Setsumei_Error?'red':''"
                                                :class="item.ALIGNMENT == 'R  '?'mb-n5 right-input':'mb-n5 left-input'"
                                                :disabled = "Edit_Combobox_1_select.substr(0,1) != '-' &&item.AUTH_TYPE == '2'?false:true"
                                                :filled= "Edit_Combobox_1_select.substr(0,1) != '-' &&item.AUTH_TYPE == '2' ?false:true"
                                                :maxlength ="item.CELL_LENGTH == null ? false: item.CELL_LENGTH"
                                                :rules="item.RULES"
                                                v-model = EditInfo2_Value[EditInfo2_Value.indexOf(item)].FIELD_VALUE
                                                @keyup="getEditTableSetsumei2(EditInfo2_Value.indexOf(item),item.FIELD_NAME)"
                                                @change="getEditTableSetsumei2(EditInfo2_Value.indexOf(item),item.FIELD_NAME)"
                                                outlined
                                                dense>
                                            </v-text-field>
                                        </template>
                                        <template v-slot:item.FIELD_EXPLAIN="{ item }">
                                            <p
                                            :class="(item.Setsumei_Error)?'red--text text--lighten-1':'black--text'">
                                            {{EditInfo2_Value[EditInfo2_Value.indexOf(item)].FIELD_EXPLAIN}}
                                            </p>
                                    </template>
                                        </v-data-table>
                                    </v-form>
                            </v-card>
                        </v-col>
                        <v-col cols="12" :sm="this.$vuetify.breakpoint.mobile?12:6" xs="12">
                            <!-- 工程順序選択-->
                            <v-row no-gutters>
                                <v-col>
                                    <v-card>
                                        <v-row class="d-flex ml-2 mr-2 mb-n8" no-gutters>
                                            <v-col sm="3" class=" mt-2 "><h3 >工程順序選択</h3></v-col>
                                            <v-col sm="5" class=" mt-2 ">
                                                <v-row no-gutters>
                                                    <v-col sm="5"><p class="mt-1">工程コード選択 </p></v-col>
                                                    <v-col sm="7">
                                                        <v-combobox
                                                        v-model="KT_CODE_SELECT"
                                                        :items ="KT_CODE_ITEM"
                                                        outlined
                                                        dense
                                                        @change="getKouteiJunjo_table(Header_Data[Header_Data.length-1].PART_NO,KT_CODE_SELECT,'1')"
                                                        >
                                                        </v-combobox>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                            <v-spacer></v-spacer>
                                            <v-col sm="1" class=" mt-1">
                                                <!-- Excel ボタンをクリックした後にエクセルファイル取り込み画面が表示される -->
                                                <!-- Excel_dialog はエクセル取り込み画面表示を制御するプロパティ -->
                                                <!-- Ture  : 画面を表示する-->
                                                <!-- False : 画面を未表示する-->
                                                <v-dialog v-model="Excel_dialog">
                                                    <template v-slot:activator = "{on,attrs}">
                                                        <v-btn class =" mr-auto" icon
                                                            v-bind="attrs"
                                                            v-on = "on"
                                                        >
                                                            <v-icon right>mdi-microsoft-excel</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <v-card>
                                                        <v-toolbar
                                                        dark
                                                        color="primary"
                                                        >
                                                            <!--  v-toolbar-title : 画面のタイトル-->
                                                            <v-toolbar-title>
                                                                エクセルファイルを取り込み
                                                            </v-toolbar-title>
                                                            <v-spacer></v-spacer>
                                                            <!-- タブの閉じるボタン-->
                                                            <!-- ＠click="Excel_dialog=!Excel_dialog -->
                                                            <!-- ＠click　クリックのイベント（クリック時制御するコマンド）-->
                                                            <!-- Excel_dialog=!Excel_dialog もし、取り込み画面が表示したら未表示する-->
                                                            <v-toolbar-items>
                                                                <v-btn icon @click="Excel_dialog=!Excel_dialog"><v-icon>mdi-close</v-icon></v-btn>
                                                            </v-toolbar-items>
                                                        </v-toolbar>
                                                        <v-row>
                                                            <v-col cols="8">
                                                                <!-- v-file-input ファイルを取り込みを入力する所 -->
                                                                <!-- アイコンやエリアをクリックするとファイルを特定する画面が表示されます-->
                                                                <!-- @change="upload" ファイルを取り込んだ後の処理-->
                                                                <!-- upload() メソッドはエクセルファイルのデータをJSONデータ変更するメソッド-->
                                                                <v-file-input v-model="file" @change="upload"></v-file-input>
                                                            </v-col>
                                                            <v-col cols ="2">
                                                                <!-- 登録ボタンをクリック時最終確認の警告画面が表示される -->
                                                                <!-- Excel_Ensure は警告画面の表示を制御するプロパティ-->
                                                                <!-- True　: 画面を表示する-->
                                                                <!-- False : 画面を未表示する　-->
                                                                 <v-dialog
                                                                        v-model="Excel_Ensure"
                                                                        width="250"
                                                                    >
                                                                        <template v-slot:activator = "{on,attrs}">
                                                                             <!--　登録ボタン-->
                                                                             <!--  :disabled="!file"　ファイルがまだ取り込んでない場合、ボタンを使用不能にする-->
                                                                            <v-btn
                                                                            class = "mt-2"
                                                                            height="32"
                                                                            :disabled="!file"
                                                                            v-bind="attrs"
                                                                            v-on="on"
                                                                            >
                                                                            登録
                                                                            </v-btn>
                                                                        </template>
                                                                        <v-card>
                                                                            <!--  警告画面のタイトル-->
                                                                            <v-toolbar
                                                                            color="primary"
                                                                            dark
                                                                            dense
                                                                            >警告
                                                                            </v-toolbar>
                                                                            <!--  警告画面の内容-->
                                                                            <v-card-text>
                                                                                <div class="text-h6 pa-5">保存しますか?</div>
                                                                            </v-card-text>
                                                                            <v-card-actions>
                                                                            <v-spacer></v-spacer>
                                                                            <!-- Excel_Upload() テーブルの中のデータをデータベースに保存するメソッド-->
                                                                                <v-btn
                                                                                    color="primary"
                                                                                    text
                                                                                    @click="Excel_Upload()"
                                                                                >
                                                                                    確定
                                                                                </v-btn>
                                                                                <!-- 警告画面を未表示する-->
                                                                                <v-btn
                                                                                    color="primary"
                                                                                    text
                                                                                    @click="Excel_Ensure = false"
                                                                                >
                                                                                    取消
                                                                                </v-btn>
                                                                            </v-card-actions>
                                                                        </v-card>
                                                                    </v-dialog>
                                                            </v-col>
                                                        </v-row>
                                                        <!--  取り込んだデータを表示する-->
                                                        <!--　ExcelTable_Header 表示するデータの項目プロパティ　-->
                                                        <!--  ExcelTable_Item　取り込んだデータを格納プロパティ　-->
                                                        <v-data-table
                                                        :headers="ExcelTable_Header"
                                                        :items="ExcelTable_Item"
                                                        >
                                                        </v-data-table>
                                                    </v-card>
                                                </v-dialog>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-data-table
                                                mobile-breakpoint='400'
                                                :headers ="this.KouteiJunjoTable_Header"
                                                :items = "this.KouteiJunjoTable_Item"
                                                :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                hide-default-footer
                                                item-key ="SEQ_NO"
                                                height="18vh"
                                                dense
                                                @click:row="GetHyouJunMaster" 
                                                ></v-data-table>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <!-- 標準時間マスター-->
                            <v-row class="mt-5">
                                <v-col>
                                    <v-card>
                                        <!--　標準時間マスターヘッダ　-->
                                        <v-row class="mr-2 ml-2">
                                            <v-col :cols="this.$vuetify.breakpoint.mobile?'6':'5'">
                                                <h3>標準時間マスタ</h3>
                                            </v-col>
                                            <v-spacer></v-spacer>
                                            <v-col :cols="this.$vuetify.breakpoint.mobile?'6':'4'">
                                                <v-text-field
                                                v-model=STD_Time_Filter
                                                label="フィルター"
                                                hide-details
                                                dense
                                                outlined
                                                >
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                        <!--　標準時間マスターデータ一覧　-->
                                        <v-form ref="KTSTDTIME_FORM">
                                            <v-data-table
                                            mobile-breakpoint='400'
                                            fixed-header
                                            :headers="this.STD_EditInfo_Header"
                                            :items="this.STD_EditInfo_Item"
                                            :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                            hide-default-footer
                                            :search="STD_Time_Filter"
                                            height="27.5vh"
                                            dense
                                            >
                                                <!--　ボタン表示がある場合、その行に対応するボタンを取得 -->
                                                <template v-slot:item.CELL_TYPE="{item}">
                                                    <!--  共用マスター -->
                                                    <v-btn 
                                                    v-if="item.MS_TABLE == '1' && item.CELL_TYPE == 'B' && item.AUTH_TYPE == '2'"
                                                    x-small 
                                                    :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                    @click="getEditDialogBtn1(STD_EditInfo_Item.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                                    >...</v-btn>
                                                    <!-- 注文コードマスター -->
                                                    <v-btn
                                                    v-if ="item.MS_TABLE == '2' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                                    x-small
                                                    :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                    @click = "getEditDialogBtn2(STD_EditInfo_Item.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                                    >...</v-btn>
                                                    <!-- 担当コード -->
                                                    <v-btn
                                                    v-if ="item.MS_TABLE == '3' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                                    x-small
                                                    :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                    @click = "getEditDialogBtn3(STD_EditInfo_Item.indexOf(item),item.MS_ITEM_NO,Edit_Combobox_1_select.substr(0,1),2)"
                                                    >...</v-btn>
                                                    <!-- 単位読替マスタ -->
                                                    <v-btn
                                                    v-if ="item.MS_TABLE == '4' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                                    @click = "getEditDialogBtn4(STD_EditInfo_Item.indexOf(item),item.MS_ITEM_NO,2)"
                                                    :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                    x-small
                                                    >...</v-btn>
                                                    <!-- 配列 -->
                                                    <v-btn
                                                    v-if ="item.MS_TABLE == '6' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                                    :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                    @click ="getEditDialogBtn6(STD_EditInfo_Item.indexOf(item),item.FIELD_NAME,2)"
                                                    x-small
                                                    >...</v-btn>
                                                </template>
                                                <!--
                                                    @keyup="getSTD_Setsumei(STD_EditInfo_Item.indexOf(item),item.FIELD_NAME)"
                                                    @change="getSTD_Setsumei(STD_EditInfo_Item.indexOf(item),item.FIELD_NAME)"
                                                -->
                                                <template v-slot:item.FIELD_VALUE="{item}">
                                                    <v-text-field
                                                        :background-color = "item.Setsumei_Error?'red':''"
                                                        :class="item.ALIGNMENT == 'R  '?'mb-n5 right-input':'mb-n5 left-input'"
                                                        :disabled = "item.AUTH_TYPE == '2' ?false:true"
                                                        :filled= "item.AUTH_TYPE == '2' ?false:true"
                                                        :maxlength ="item.CELL_LENGTH == null ? false: item.CELL_LENGTH"
                                                        :rules="item.RULES"
                                                        v-model = STD_EditInfo_Item[STD_EditInfo_Item.indexOf(item)].FIELD_VALUE
                                                        outlined
                                                        @change="getSTD_Setsumei(STD_EditInfo_Item.indexOf(item),item.FIELD_NAME)"
                                                        @keyup="getSTD_Setsumei(STD_EditInfo_Item.indexOf(item),item.FIELD_NAME)"
                                                        dense>
                                                    </v-text-field>
                                                </template>
                                                <template v-slot:item.FIELD_EXPLAIN="{ item }">
                                                    <p
                                                    :class="(item.Setsumei_Error)?'red--text text--lighten-1':'black--text'">
                                                    {{STD_EditInfo_Item[STD_EditInfo_Item.indexOf(item)].FIELD_EXPLAIN}}
                                                    </p>
                                                </template>
                                            </v-data-table>
                                        </v-form>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    </v-container>    
                    <v-container fluid>
                            <v-row no-gutters justify="end">
                                <v-col class="d-flex flex-row-reverse" >
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
                                    <v-btn class="mr-2" large
                                    @click="seisakuPostReq()"
                                    >
                                        <v-icon
                                            left
                                            dark
                                            large
                                        >
                                        mdi-content-save
                                        </v-icon>
                                        <h3>保存</h3>
                                    </v-btn>
                                </v-col>
                            </v-row>
                    </v-container>
                </div>
                <!-- 購買画面表示 -->
                <div v-if="tab_select == 2">
                    <v-container fluid>
                        <v-row >
                            <v-col :cols ="this.$vuetify.breakpoint.smAndDown?'12':'6'">
                                <v-row no-gutters>
                                    <v-col>
                                        <!-- 購買情報  -->
                                        <v-card class="mb-2"  :height="Koubai_Torisaki_CardHeight">
                                            <v-row class="d-flex mb-n10">
                                                <v-col class="mx-4">
                                                    <h3>購買情報</h3>
                                                </v-col>
                                                <v-spacer></v-spacer>
                                                <h5 class="mt-4">工場区分</h5>
                                                <v-col class="mr-2">
                                                    <v-combobox 
                                                    v-model="Edit_Combobox_1_select"
                                                    :items = "Edit_Combobox_1_item"
                                                    @change="GetCHMSA(Header_Data[Header_Data.length-1].PART_NO,Edit_Combobox_1_select.substring(0,1))"
                                                    dense 
                                                    outlined
                                                    ></v-combobox>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="mx-2">
                                                    <v-data-table
                                                    mobile-breakpoint='400'
                                                    fixed-header
                                                    dense
                                                    :headers="this.Koubai_Torisaki_Header"
                                                    :items="this.Koubai_Torisaki_Item"
                                                    :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                    :height="Koubai_Torisaki_TableHeight"
                                                    hide-default-footer
                                                    @click:row="GetCHMSA_TABLE"
                                                    >
                                                    </v-data-table>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-row class="mt-3" no-gutters>
                                    <v-col>
                                        <!-- 購買情報テーブル  -->
                                        <v-card :height="koubai_TableData_CardHeight">
                                            <v-row class="d-flex justify-center">
                                                <v-col class = "mx-2">
                                                    <v-form ref = "CHMSA_FORM">
                                                        <v-data-table
                                                        mobile-breakpoint='400'
                                                        fixed-header
                                                        :headers="this.Koubai_EditTable_Header"
                                                        :items="this.Koubai_EditTable_Item"
                                                        :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                        hide-default-footer
                                                        :height="koubai_TableData_TableHeight"
                                                        dense
                                                        >
                                                            <!-- 値 -->
                                                            <template v-slot:item.CELL_TYPE="{item}">
                                                                <!--  共用マスター -->
                                                                <v-btn 
                                                                v-if="item.MS_TABLE == '1' && item.CELL_TYPE == 'B' && item.AUTH_TYPE == '2'"
                                                                x-small 
                                                                :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                                @click="getEditDialogBtn1(Koubai_EditTable_Item.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                                                >...</v-btn>
                                                                <!-- 注文コードマスター -->
                                                                <v-btn
                                                                v-if ="item.MS_TABLE == '2' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                                                x-small
                                                                :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                                @click = "getEditDialogBtn2(Koubai_EditTable_Item.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                                                >...</v-btn>
                                                                <!-- 担当コードマスター -->
                                                                <v-btn
                                                                v-if ="item.MS_TABLE == '3' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                                                x-small
                                                                :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                                @click = "getEditDialogBtn3(Koubai_EditTable_Item.indexOf(item),item.MS_ITEM_NO,Edit_Combobox_1_select.substr(0,1),2)"
                                                                >...</v-btn>
                                                                <!-- 単位読替マスタ -->
                                                                <v-btn
                                                                v-if ="item.MS_TABLE == '4' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                                                @click = "getEditDialogBtn4(Koubai_EditTable_Item.indexOf(item),item.MS_ITEM_NO,2)"
                                                                :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                                x-small
                                                                >...</v-btn>
                                                                <v-btn
                                                                v-if ="item.MS_TABLE == '6' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                                                :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                                @click ="getEditDialogBtn6(Koubai_EditTable_Item.indexOf(item),item.FIELD_NAME,2)"
                                                                x-small
                                                                >...</v-btn>
                                                            </template>
                                                            <!-- ボタン -->
                                                            <template v-slot:item.FIELD_VALUE="{item}">
                                                                <v-text-field
                                                                    :background-color = "item.Setsumei_Error?'red':''"
                                                                    :class="item.ALIGNMENT == 'R  '?'mb-n5 right-input':'mb-n5 left-input'"
                                                                    :disabled = "item.AUTH_TYPE == '2'?false:true"
                                                                    :filled= "item.AUTH_TYPE == '2' ?false:true"
                                                                    :maxlength ="item.CELL_LENGTH == null ? false: item.CELL_LENGTH"
                                                                    :rules="item.RULES"
                                                                    @keyup="GetKoubaiSetsumei(Koubai_EditTable_Item.indexOf(item),item.FIELD_NAME)"
                                                                    @change="GetKoubaiSetsumei(Koubai_EditTable_Item.indexOf(item),item.FIELD_NAME)" 
                                                                    v-model = Koubai_EditTable_Item[Koubai_EditTable_Item.indexOf(item)].FIELD_VALUE
                                                                    outlined
                                                                    dense>
                                                                </v-text-field>
                                                            </template>
                                                            <!-- 説明 -->
                                                            <template v-slot:item.FIELD_EXPLAIN="{ item }">
                                                                <p
                                                                :class="(item.Setsumei_Error)?'red--text text--lighten-1':'black--text'">
                                                                {{Koubai_EditTable_Item[Koubai_EditTable_Item.indexOf(item)].FIELD_EXPLAIN}}
                                                                </p>
                                                            </template>
                                                        </v-data-table>
                                                    </v-form>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col :cols ="this.$vuetify.breakpoint.smAndDown?'12':'6'">
                                <v-row no-gutters >
                                    <v-col>
                                        <!-- P/M基本情報テーブル  -->
                                        <v-card  :height="Koubai_PM_CardHeight">  
                                            <v-row class="d-flex">
                                                <v-col class="ml-2 mt-2">
                                                    <h3>P/M基本情報</h3>
                                                </v-col>
                                                <v-spacer>
                                                </v-spacer>
                                                <v-col class="d-flex">
                                                    <v-text-field
                                                    class = "mt-2 mr-2"
                                                    v-model = "EditTableSearch1"
                                                    label = "フィルター"
                                                    hide-details
                                                    dense
                                                    outlined
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-form ref ="PPPMMS_FORM">
                                                <v-data-table 
                                                mobile-breakpoint='400'
                                                fixed-header
                                                :headers="this.Editinfo_Header"
                                                :items="this.EditInfo_Value"
                                                :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                hide-default-footer
                                                :height="Koubai_PM_TableHeight"
                                                :search="EditTableSearch1"
                                                dense
                                                >
                                                <template v-slot:item.CELL_TYPE="{item}">
                                                    <!--  共用マスター -->
                                                    <v-btn 
                                                    v-if="item.MS_TABLE == '1' && item.CELL_TYPE == 'B' && item.AUTH_TYPE == '2'"
                                                    x-small 
                                                    @click="getEditDialogBtn1(EditInfo_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,1)"
                                                    >...</v-btn>
                                                    <!-- 注文コードマスター  -->
                                                    <v-btn
                                                    v-if ="item.MS_TABLE == '2' && item.AUTH_TYPE == '2'&& item.CELL_TYPE == 'B'"
                                                    @click = "getEditDialogBtn2(EditInfo_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,1)"
                                                    x-small
                                                    >...</v-btn>
                                                    <!-- 担当コードマスター -->
                                                    <v-btn
                                                    v-if ="item.MS_TABLE == '3' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                                    @click = "getEditDialogBtn3(EditInfo_Value.indexOf(item),item.MS_ITEM_NO,Edit_Combobox_1_select.substr(0,1),1)"
                                                    x-small
                                                    >...</v-btn>
                                                    <!--　単位読替マスター　-->
                                                    <v-btn
                                                    v-if ="item.MS_TABLE == '4' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                                    x-small
                                                    @click = "getEditDialogBtn4(EditInfo_Value.indexOf(item),item.MS_ITEM_NO,2)"
                                                    >...</v-btn>
                                                    
                                                    <v-btn
                                                    v-if ="item.MS_TABLE == '6' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                                    @click ="getEditDialogBtn6(EditInfo_Value.indexOf(item),item.FIELD_NAME,1)"
                                                    x-small
                                                    >...</v-btn>
                                                    
                                                </template>
                                                <template v-slot:item.FIELD_VALUE="{item}">
                                                    <v-text-field
                                                        :background-color = "item.Setsumei_Error?'red':''"
                                                        :class="item.ALIGNMENT == 'R  '?'mb-n5 right-input':'mb-n5 left-input'"
                                                        :disabled = "item.AUTH_TYPE == '2' && EditRevDate_Eable ?false:true"
                                                        :filled= "item.AUTH_TYPE == '2'?false:true"
                                                        :maxlength ="item.CELL_LENGTH == null ? false: item.CELL_LENGTH"
                                                        :rules="item.RULES"
                                                        v-model = EditInfo_Value[EditInfo_Value.indexOf(item)].FIELD_VALUE
                                                        @keyup="getEditTableSetsumei(EditInfo_Value.indexOf(item),item.FIELD_NAME)"
                                                        @change="getEditTableSetsumei(EditInfo_Value.indexOf(item),item.FIELD_NAME)"
                                                        dense
                                                        outlined>
                                                    </v-text-field>
                                                </template>
                                                <template v-slot:item.FIELD_EXPLAIN="{ item }">
                                                        <p
                                                        :class="(item.Setsumei_Error)?'red--text text--lighten-1':'black--text'">
                                                        {{EditInfo_Value[EditInfo_Value.indexOf(item)].FIELD_EXPLAIN}} 
                                                        </p>
                                                </template>
                                                </v-data-table>
                                            </v-form>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters class ="mt-2">
                                     <v-col>
                                         <!-- 手配情報テーブル  -->
                                        <v-card :height="Koubai_Teihai_CardHeight">
                                            <v-row no-gutters>
                                                    <v-col class = "ml-2 mt-2">
                                                        <h3>手配情報</h3>
                                                    </v-col>
                                                    <v-spacer></v-spacer>
                                                <v-col sm="4">
                                                    <!-- EditTableSearch2　手配情報内に検査したいデータ -->
                                                    <v-text-field
                                                    class = "mt-2 mr-2"
                                                    v-model = "EditTableSearch2"
                                                    label = "フィルター"
                                                    hide-details
                                                    dense
                                                    outlined
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                                <!-- PPPMORDER_form 手配情報のテーブル  -->
                                                <v-form ref="PPPMORDER_form">
                                                    <v-data-table
                                                    mobile-breakpoint='400'
                                                    fixed-header
                                                    :headers="this.Editinfo2_Header"
                                                    :items="this.EditInfo2_Value"
                                                    :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                    hide-default-footer
                                                    :search="EditTableSearch2"
                                                    :height="Koubai_Teihai_TableHeight"
                                                    dense
                                                    >
                                                        <template v-slot:item.CELL_TYPE="{item}">
                                                            <!--  共用マスター -->
                                                            <v-btn 
                                                            v-if="item.MS_TABLE == '1' && item.CELL_TYPE == 'B' && item.AUTH_TYPE == '2'"
                                                            x-small 
                                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                            @click="getEditDialogBtn1(EditInfo2_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                                            >...</v-btn>
                                                            <!-- 注文コードマスター -->
                                                            <v-btn
                                                            v-if ="item.MS_TABLE == '2' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                                            x-small
                                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                            @click = "getEditDialogBtn2(EditInfo2_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                                            >...</v-btn>
                                                            <!-- 担当コードマスター -->
                                                            <v-btn
                                                            v-if ="item.MS_TABLE == '3' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                                            x-small
                                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                            @click = "getEditDialogBtn3(EditInfo2_Value.indexOf(item),item.MS_ITEM_NO,Edit_Combobox_1_select.substr(0,1),2)"
                                                            >...</v-btn>
                                                            <!-- 単位読替マスタ -->
                                                            <v-btn
                                                            v-if ="item.MS_TABLE == '4' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                                            @click = "getEditDialogBtn4(EditInfo2_Value.indexOf(item),item.MS_ITEM_NO,2)"
                                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                            x-small
                                                            >...</v-btn>
                                                            <v-btn
                                                            v-if ="item.MS_TABLE == '6' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                            @click ="getEditDialogBtn6(EditInfo2_Value.indexOf(item),item.FIELD_NAME,2)"
                                                            x-small
                                                            >...</v-btn>
                                                        </template>
                                                        <template v-slot:item.FIELD_VALUE="{item}">
                                                            <v-text-field
                                                                :background-color = "item.Setsumei_Error?'red':''"
                                                                :class="item.ALIGNMENT == 'R  '?'mb-n5 right-input':'mb-n5 left-input'"
                                                                :disabled = "Edit_Combobox_1_select.substr(0,1) != '-' &&item.AUTH_TYPE == '2'?false:true"
                                                                :filled= "Edit_Combobox_1_select.substr(0,1) != '-' &&item.AUTH_TYPE == '2' ?false:true"
                                                                :maxlength ="item.CELL_LENGTH == null ? false: item.CELL_LENGTH"
                                                                :rules="item.RULES"
                                                                v-model = EditInfo2_Value[EditInfo2_Value.indexOf(item)].FIELD_VALUE
                                                                @keyup="getEditTableSetsumei2(EditInfo2_Value.indexOf(item),item.FIELD_NAME)"
                                                                @change="getEditTableSetsumei2(EditInfo2_Value.indexOf(item),item.FIELD_NAME)"
                                                                outlined
                                                                dense>
                                                            </v-text-field>
                                                        </template>
                                                        <template v-slot:item.FIELD_EXPLAIN="{ item }">
                                                            <p
                                                            :class="(item.Setsumei_Error)?'red--text text--lighten-1':'black--text'">
                                                            {{EditInfo2_Value[EditInfo2_Value.indexOf(item)].FIELD_EXPLAIN}}
                                                            </p>
                                                        </template>
                                                    </v-data-table>
                                                </v-form>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <!-- 可変購入単価 --><!-- 作業コード別注文仕様  -->
                                <v-row class="mt-2" no-gutters>
                                    <v-expansion-panels v-model="Koubai_Panel" multiple accordion>
                                        <v-expansion-panel v-if="Koubai_CHMSB_ST">
                                            <v-expansion-panel-header @click="Panel1_click_event()"><h3>可変購入単価</h3></v-expansion-panel-header>
                                            <v-expansion-panel-content>
                                                <!-- 可変購入単価テーブル  変更不可-->
                                                <v-data-table
                                                    class="mt-n2"
                                                    mobile-breakpoint='400'
                                                    fixed-header
                                                    dense
                                                    :headers="this.Koubai_KanhenTanka_Header"
                                                    :items="this.Koubai_KanhenTanka_Item"
                                                    :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                    :height="Koubai_CHMSB_ST_TableHeight"
                                                    hide-default-footer
                                                    >
                                                    <template v-slot:item.STD="{item}">
                                                        <v-icon v-if="(Koubai_EditTable_Item[Koubai_TANKA_INDEX].FIELD_VALUE == item.VAR_CH_TANKA)">mdi-star</v-icon>
                                                    </template>
                                                </v-data-table>
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                        <v-expansion-panel>
                                            <v-expansion-panel-header  @click="Panel2_click_event()">
                                                <h3>作業コード別注文仕様</h3>
                                            </v-expansion-panel-header>
                                            <v-expansion-panel-content>
                                                <!-- 作業コード別注文仕様テーブル  -->
                                                <v-row class="d-flex" justify="end">
                                                    <v-col class="mr-10" cols="3">
                                                        <v-combobox 
                                                        v-model ="Koubai_SGCODE_Select" 
                                                        :items="Koubai_SGCODE_Item"
                                                        @change="GET_PPPMPOSPEC"
                                                        class="my-n11" dense outlined></v-combobox>
                                                    </v-col>
                                                </v-row>
                                                <v-form ref="PPPMPOSPEC_form">
                                                    <v-data-table
                                                    mobile-breakpoint='400'
                                                    fixed-header
                                                    :headers="this.Koubai_PPPMPOSPEC_Header"
                                                    :items="this.Koubai_PPPMPOSPEC_Item"
                                                    :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                    hide-default-footer
                                                    :height="Koubai_PPPMPOSPEC_TableHeight"
                                                    dense
                                                    >
                                                        <template v-slot:item.CELL_TYPE="{item}">
                                                            <!--  共用マスター -->
                                                            <v-btn 
                                                            v-if="item.MS_TABLE == '1' && item.CELL_TYPE == 'B' && item.AUTH_TYPE == '2'"
                                                            x-small 
                                                            @click="getEditDialogBtn1(Koubai_PPPMPOSPEC_Item.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                                            >...</v-btn>
                                                            <!-- 注文コードマスター -->
                                                            <v-btn
                                                            v-if ="item.MS_TABLE == '2' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                                            x-small
                                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                            @click = "getEditDialogBtn2(Koubai_PPPMPOSPEC_Item.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                                            >...</v-btn>
                                                            <!-- 担当コードマスター -->
                                                            <v-btn
                                                            v-if ="item.MS_TABLE == '3' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                                            x-small
                                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                            @click = "getEditDialogBtn3(Koubai_PPPMPOSPEC_Item.indexOf(item),item.MS_ITEM_NO,Edit_Combobox_1_select.substr(0,1),2)"
                                                            >...</v-btn>
                                                            <!-- 単位読替マスタ -->
                                                            <v-btn
                                                            v-if ="item.MS_TABLE == '4' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                                            @click = "getEditDialogBtn4(Koubai_PPPMPOSPEC_Item.indexOf(item),item.MS_ITEM_NO,2)"
                                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                            x-small
                                                            >...</v-btn>
                                                            <v-btn
                                                            v-if ="item.MS_TABLE == '6' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                            @click ="getEditDialogBtn6(Koubai_PPPMPOSPEC_Item.indexOf(item),item.FIELD_NAME,2)"
                                                            x-small
                                                            >...</v-btn>
                                                        </template>
                                                        <template v-slot:item.FIELD_VALUE="{item}">
                                                            <v-text-field
                                                                :background-color = "item.Setsumei_Error?'red':''"
                                                                :class="item.ALIGNMENT == 'R  '?'mb-n5 right-input':'mb-n5 left-input'"
                                                                :disabled = "item.AUTH_TYPE == '2'?false:true"
                                                                :filled= "item.AUTH_TYPE == '2' ?false:true"
                                                                :maxlength ="item.CELL_LENGTH == null ? false: item.CELL_LENGTH"
                                                                :rules="item.RULES"
                                                                v-model = Koubai_PPPMPOSPEC_Item[Koubai_PPPMPOSPEC_Item.indexOf(item)].FIELD_VALUE
                                                                @keyup="PPPMPOSPEC_UPDATE_CHECK(Koubai_PPPMPOSPEC_Item.indexOf(item))"
                                                                @change="PPPMPOSPEC_UPDATE_CHECK(Koubai_PPPMPOSPEC_Item.indexOf(item))"
                                                                outlined
                                                                dense>
                                                            </v-text-field>
                                                        </template>
                                                        <template v-slot:item.FIELD_EXPLAIN="{ item }">
                                                            <p
                                                            :class="(item.Setsumei_Error)?'red--text text--lighten-1':'black--text'">
                                                            {{Koubai_PPPMPOSPEC_Item[Koubai_PPPMPOSPEC_Item.indexOf(item)].FIELD_EXPLAIN}}
                                                            </p>
                                                        </template>
                                                    </v-data-table>
                                                </v-form>
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-container>
                    <!-- 保存ボタン -->
                    <v-container fluid>
                        <v-row class="d-flex mb-1" justify="end">
                            <v-btn @click ="kobaiPostReq()" class="mr-2" large>
                                <v-icon left dark large >
                                    mdi-content-save
                                </v-icon>
                                <h3 class="mr-4">保存</h3>
                            </v-btn>
                            <v-btn class="mr-2" large>
                                <v-icon left dark large >
                                    mdi-close-box-outline
                                </v-icon> 
                                <h3>閉じる</h3>
                            </v-btn>
                        </v-row>
                    </v-container>
                </div>
                <!-- 入出庫画面表示 -->
                <div v-if="tab_select == 3">
                    <v-container fluid>
                        <v-row >
                            <v-col class="d-flex">
                                <h3>入出庫予定・予測</h3>
                                <p class="ml-2 mt-1 " style="font-size :1em;">データ作成【{{((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)).substring(0,4)
                                +((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)).substring(5,7)
                                +((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)).substring(8,10)}}】
                                始業前現在    
                            </p>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col>
                                <v-card class="mt-2">
                                    <v-tabs
                                    dark
                                    background-color="cyan"
                                    align-with-title>
                                        <v-tab-slider color ="yellow"></v-tab-slider>
                                        <v-tab >Big Fit</v-tab>
                                        <v-spacer></v-spacer>
                                        <v-btn class="mt-3 mr-3" light small elevation ="0"> 製作所切替え </v-btn>
                                        <v-tab-item>
                                            <v-card>
                                                <v-card-text>
                                                    <v-row class="d-flex" no-gutters>
                                                        <div class="d-flex">
                                                            <h3 class="mx-4">内外作</h3>
                                                            <v-text-field v-model="Iride_Naigaisaku" class="mx-2" maxlength="1" style="width :50px" outlined dense></v-text-field>
                                                        </div>
                                                        <div class="d-flex">
                                                            <h3>製作ロット</h3>
                                                            <v-text-field v-model="Iride_SeisakuLot" class="mx-2" style="width :50px" outlined dense></v-text-field>
                                                        </div>
                                                        <div class="d-flex">
                                                            <h3 class="mx-2">最小発注</h3>
                                                            <v-text-field v-model="Iride_SaishouHacchu" class="mx-2" style="width :50px" outlined dense></v-text-field>
                                                        </div>
                                                        <div class="d-flex">
                                                            <h3 class="mx-2">バケット</h3>
                                                            <v-text-field v-model="Iride_Bucket" class="mx-2" maxlength="1" style="width :50px" outlined dense></v-text-field>
                                                        </div>
                                                        <div class="d-flex">
                                                            <h3 class="mx-6">管点</h3>
                                                            <v-text-field v-model="Iride_Kanten" class="mx-2" maxlength="2" style="width :50px" outlined dense></v-text-field>
                                                        </div>
                                                        <div class="d-flex">
                                                            <h3 class="mx-6">注点</h3>
                                                            <v-text-field v-model="Iride_Chuuten" class="mx-2" maxlength="2" style="width :50px" outlined dense></v-text-field>
                                                        </div>
                                                        <div class="d-flex">
                                                            <h3 class="mx-6">在管</h3>
                                                            <v-text-field v-model="Iride_Zaikan" class="mx-2"  style="width :50px" outlined dense></v-text-field>
                                                        </div>
                                                        <div class="d-flex">
                                                            <h3 class="mx-6">自オ</h3>
                                                            <v-text-field v-model="Iride_Jio" class="mx-2"  style="width :50px" outlined dense></v-text-field>
                                                        </div>
                                                        <div class="d-flex">
                                                            <h3 class="mx-2">管理基準</h3>
                                                            <v-text-field v-model="Iride_Kanrikijun" class="mx-2"  style="width :50px" outlined dense></v-text-field>
                                                        </div>
                                                        <div class="d-flex">
                                                            <h3 class="mx-4">製作LT</h3>
                                                            <v-text-field v-model="Iride_SeisakuLT" class="mx-2"  style="width :50px" outlined dense></v-text-field>
                                                        </div>
                                                        <div class="d-flex">
                                                            <h3 class="mx-6">ABC</h3>
                                                            <v-text-field v-model="Iride_ABC" class="mx-2"  style="width :50px" outlined dense></v-text-field>
                                                        </div>
                                                        <div class="d-flex">
                                                            <h3 class="mx-6">手担</h3>
                                                            <v-text-field v-model="Iride_Ninaite" class="mx-2"  style="width :50px" outlined dense></v-text-field>
                                                        </div>
                                                        <div class="d-flex">
                                                            <h3 class="mx-6">注担</h3>
                                                            <v-text-field v-model="Iride_Chuunaite" class="mx-2"  style="width :50px" outlined dense></v-text-field>
                                                        </div>
                                                        <div class="d-flex">
                                                            <h3 class="mx-6">貯区</h3>
                                                            <v-text-field v-model="Iride_Chuuku" class="mx-2"  style="width :50px" outlined dense></v-text-field>
                                                        </div>
                                                    </v-row>
                                                    <v-row class="d-flex mb-2" justify="center">
                                                        <v-data-table
                                                        mobile-breakpoint='400'
                                                        :headers="Iride_ZaiyoteiTable_Header"
                                                        :items="Iride_ZaiyoteiTable_Item"
                                                        :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                        height="18vh"
                                                        hide-default-footer
                                                        fixed-header
                                                        ></v-data-table>
                                                    </v-row>
                                                </v-card-text>
                                            </v-card>
                                        </v-tab-item>
                                    </v-tabs>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container fluid>
                        <v-card>
                            <v-row class="d-flex" justify="start">
                            <div class=" mt-2 mx-3 ml-5 mb-2">
                                <h3 class="mb-1 ">固定</h3>
                                <v-combobox v-model="Iride_Koutei_Select" :items="Iride_Koutei_Item" style="width : 150px;" class="mb-n4" dense outlined></v-combobox>
                                <h3 class="mb-1 mt-3">レンジ（単位）</h3>
                                <v-combobox v-model="Iride_Tani_Select" :items="Iride_Tani_Item" style="width : 150px;" class="mb-n6" dense outlined></v-combobox>
                                <p >日単位で計算します。</p>
                            </div>
                            <v-col class="mt-2" :cols="this.$vuetify.breakpoint.xsOnly?'6':'3'">
                                <v-row>
                                    <div class="d-flex">
                                        <h3 class="mr-2">伝票</h3>
                                        <v-spacer></v-spacer>
                                        <v-btn @click="Iride_shuukou()" class="ml-5 mx-2" small>出庫</v-btn>
                                        <v-btn @click="Iride_nyuukou()" class="mx-2" small>入庫</v-btn>
                                    </div>
                                </v-row>
                                <v-row>
                                    <v-card class="mt-2" width="100vh">
                                        <v-row class="ml-2">
                                            <v-col cols="6">
                                                <v-checkbox
                                                dense
                                                label="出庫"
                                                hide-details
                                                v-model="Ireide_checkbox_0"
                                                ></v-checkbox>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-checkbox
                                                dense
                                                label="入庫(注文)"
                                                v-model="Ireide_checkbox_1"
                                                hide-details
                                                ></v-checkbox>
                                            </v-col>
                                        </v-row>
                                        <v-row class="ml-2 mt-n6">
                                            <v-col cols="6">
                                                <v-checkbox
                                                dense
                                                label="出庫(他)"
                                                v-model="Ireide_checkbox_2"
                                                hide-details
                                                ></v-checkbox>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-checkbox
                                                dense
                                                label="入庫(見込)"
                                                v-model="Ireide_checkbox_3"
                                                hide-details
                                                ></v-checkbox>
                                            </v-col>
                                        </v-row>
                                        <v-row class="ml-2 mt-n6 mb-1">
                                            <v-col cols="6">
                                                <v-checkbox
                                                dense
                                                label="出庫(予測)"
                                                v-model="Ireide_checkbox_4"
                                                hide-details
                                                ></v-checkbox>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-checkbox
                                                dense
                                                label="入庫(振替)"
                                                v-model="Ireide_checkbox_5"
                                                hide-details
                                                ></v-checkbox>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-row>
                            </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="5">
                                    <v-card  class="ml-2">
                                        <v-row class="mb-2">
                                            <v-col cols="12">
                                                <v-data-table 
                                                class="mx-2"
                                                mobile-breakpoint='400'
                                                :headers="Iride_ZaikouIride_Header"
                                                :items="Iride_ZaiyoteiTable_Item"
                                                :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                height="30vh"
                                                hide-default-footer
                                                fixed-header
                                                ></v-data-table>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-col>
                                <v-col cols="7">
                                    <v-card  class="mx-2">
                                        <v-row class="mb-2">
                                            <v-col cols="12">
                                                <v-data-table 
                                                class="mx-2"
                                                mobile-breakpoint='400'
                                                :headers="Iride_ZaikouIride_Header"
                                                :items="Iride_ZaiyoteiTable_Item"
                                                :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                height="30vh"
                                                hide-default-footer
                                                fixed-header
                                                ></v-data-table>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-container>
                    <v-container fluid>
                        <v-btn></v-btn>
                    </v-container>
                </div>
                <!-- 在庫画面表示 -->
                <div v-if="tab_select == 4">
                    <v-container fluid>
                        <v-row >
                            <v-col :cols="$vuetify.breakpoint.smAndDown?'12':'6'">
                                <v-card height="78vh">
                                    <v-row no-gutters class="d-flex" justify="space-between">
                                        <h3 class="mt-2 ml-2">在庫情報</h3>
                                        <div class="d-flex mt-2">
                                            <h3 class="mr-2">倉庫選択</h3>
                                            <v-combobox v-model="Zaikou_SokoCode_Select" :items ="Zaikou_SokoCode_Item"
                                             style="width :100px;" dense outlined 
                                             @change ="GetZKMS(Header_Data[Header_Data.length-1].PART_NO,Zaikou_SokoCode_Select)"
                                             ></v-combobox>
                                        </div>
                                        <h3 class="mt-2 mr-2">{{this.FT_ZKMS_KOUBA}}:{{this.FT_ZKMS_KOUBA_SETSUMEI}}</h3>
                                    </v-row>
                                        <v-form ref ="ZKMS_FORM">
                                            <v-data-table 
                                            class="mx-2"
                                            mobile-breakpoint='400'
                                            fixed-header
                                            :headers="this.Zaiko_EditTable_Header"
                                            :items="this.Zaiko_EditTable_Item"
                                            :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                            hide-default-footer
                                            height="70vh"
                                            dense
                                            >
                                            <template v-slot:item.CELL_TYPE="{item}">
                                                <!--  共用マスター -->
                                                <v-btn 
                                                v-if="item.MS_TABLE == '1' && item.CELL_TYPE == 'B' && item.AUTH_TYPE == '2'"
                                                x-small 
                                                @click="getEditDialogBtn1(Zaiko_EditTable_Item.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,1)"
                                                >...</v-btn>
                                                <!-- 注文コードマスター  -->
                                                <v-btn
                                                v-if ="item.MS_TABLE == '2' && item.AUTH_TYPE == '2'&& item.CELL_TYPE == 'B'"
                                                @click = "getEditDialogBtn2(Zaiko_EditTable_Item.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,1)"
                                                x-small
                                                >...</v-btn>
                                                <!-- 担当コードマスター -->
                                                <v-btn
                                                v-if ="item.MS_TABLE == '3' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                                @click = "getEditDialogBtn3(Zaiko_EditTable_Item.indexOf(item),item.MS_ITEM_NO,FT_ZKMS_KOUBA,1)"
                                                x-small
                                                >...</v-btn>
                                                <!--　単位読替マスター　-->
                                                <v-btn
                                                v-if ="item.MS_TABLE == '4' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                                x-small
                                                @click = "getEditDialogBtn4(Zaiko_EditTable_Item.indexOf(item),item.MS_ITEM_NO,2)"
                                                >...</v-btn>
                                                
                                                <v-btn
                                                v-if ="item.MS_TABLE == '6' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                                @click ="getEditDialogBtn6(Zaiko_EditTable_Item.indexOf(item),item.FIELD_NAME,1)"
                                                x-small
                                                >...</v-btn>
                                                
                                            </template>
                                            <template v-slot:item.FIELD_VALUE="{item}">
                                                <v-text-field
                                                    :background-color = "item.Setsumei_Error?'red':''"
                                                    :class="item.ALIGNMENT == 'R  '?'mb-n5 right-input':'mb-n5 left-input'"
                                                    :disabled = "item.AUTH_TYPE == '2'  ?false:true"
                                                    :filled= "item.AUTH_TYPE == '2'?false:true"
                                                    :maxlength ="item.CELL_LENGTH == null ? false: item.CELL_LENGTH"
                                                    :rules="item.RULES"
                                                    v-model = Zaiko_EditTable_Item[Zaiko_EditTable_Item.indexOf(item)].FIELD_VALUE
                                                    @keyup="GetZaikouSetsumei(Zaiko_EditTable_Item.indexOf(item),item.FIELD_NAME)"
                                                    @change="GetZaikouSetsumei(Zaiko_EditTable_Item.indexOf(item),item.FIELD_NAME)"
                                                    dense
                                                    outlined>
                                                </v-text-field>
                                            </template>
                                            <template v-slot:item.FIELD_EXPLAIN="{ item }">
                                                    <p
                                                    :class="(item.Setsumei_Error)?'red--text text--lighten-1':'black--text'">
                                                    {{Zaiko_EditTable_Item[Zaiko_EditTable_Item.indexOf(item)].FIELD_EXPLAIN}} 
                                                    </p>
                                            </template>
                                            </v-data-table>
                                        </v-form>
                                </v-card>
                            </v-col>
                            <v-col :cols="$vuetify.breakpoint.smAndDown?'12':'6'">
                                <v-row no-gutters class="mb-4">
                                    <v-expansion-panels v-model="Koubai_Panel" multiple accordion>
                                        <v-expansion-panel>
                                            <v-expansion-panel-header @click="Panel1_click_event()"><h3>PM基本情報</h3></v-expansion-panel-header>
                                            <v-expansion-panel-content>
                                                <!-- PM基本情報-->
                                                <v-row no-gutters>
                                                    <v-spacer></v-spacer>
                                                    <v-col class="mt-n13 mr-6" cols="4">
                                                        <!-- EditTableSearch1　P/M基本情報内に検査したいデータ -->
                                                        <v-text-field
                                                        class = "mt-2 mr-2"
                                                        v-model = "EditTableSearch1"
                                                        label = "フィルター"
                                                        hide-details
                                                        dense
                                                        outlined
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <!-- P/M基本情報テーブル  -->
                                                <v-form ref ="PPPMMS_FORM">
                                                    <v-data-table 
                                                    mobile-breakpoint='400'
                                                    fixed-header
                                                    :headers="this.Editinfo_Header"
                                                    :items="this.EditInfo_Value"
                                                    :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                    hide-default-footer
                                                    height="31vh"
                                                    :search="EditTableSearch1"
                                                    dense
                                                    >
                                                    <template v-slot:item.CELL_TYPE="{item}">
                                                        <!--  共用マスター -->
                                                        <v-btn 
                                                        v-if="item.MS_TABLE == '1' && item.CELL_TYPE == 'B' && item.AUTH_TYPE == '2'"
                                                        x-small 
                                                        @click="getEditDialogBtn1(EditInfo_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,1)"
                                                        >...</v-btn>
                                                        <!-- 注文コードマスター  -->
                                                        <v-btn
                                                        v-if ="item.MS_TABLE == '2' && item.AUTH_TYPE == '2'&& item.CELL_TYPE == 'B'"
                                                        @click = "getEditDialogBtn2(EditInfo_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,1)"
                                                        x-small
                                                        >...</v-btn>
                                                        <!-- 担当コードマスター -->
                                                        <v-btn
                                                        v-if ="item.MS_TABLE == '3' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                                        @click = "getEditDialogBtn3(EditInfo_Value.indexOf(item),item.MS_ITEM_NO,Edit_Combobox_1_select.substr(0,1),1)"
                                                        x-small
                                                        >...</v-btn>
                                                        <!--　単位読替マスター　-->
                                                        <v-btn
                                                        v-if ="item.MS_TABLE == '4' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                                        x-small
                                                        @click = "getEditDialogBtn4(EditInfo_Value.indexOf(item),item.MS_ITEM_NO,2)"
                                                        >...</v-btn>
                                                        
                                                        <v-btn
                                                        v-if ="item.MS_TABLE == '6' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                                        @click ="getEditDialogBtn6(EditInfo_Value.indexOf(item),item.FIELD_NAME,1)"
                                                        x-small
                                                        >...</v-btn>
                                                        
                                                    </template>
                                                    <template v-slot:item.FIELD_VALUE="{item}">
                                                        <v-text-field
                                                            :background-color = "item.Setsumei_Error?'red':''"
                                                            :class="item.ALIGNMENT == 'R  '?'mb-n5 right-input':'mb-n5 left-input'"
                                                            :disabled = "item.AUTH_TYPE == '2' && EditRevDate_Eable ?false:true"
                                                            :filled= "item.AUTH_TYPE == '2'?false:true"
                                                            :maxlength ="item.CELL_LENGTH == null ? false: item.CELL_LENGTH"
                                                            :rules="item.RULES"
                                                            v-model = EditInfo_Value[EditInfo_Value.indexOf(item)].FIELD_VALUE
                                                            @keyup="getEditTableSetsumei(EditInfo_Value.indexOf(item),item.FIELD_NAME)"
                                                            @change="getEditTableSetsumei(EditInfo_Value.indexOf(item),item.FIELD_NAME)"
                                                            dense
                                                            outlined>
                                                        </v-text-field>
                                                    </template>
                                                    <template v-slot:item.FIELD_EXPLAIN="{ item }">
                                                            <p
                                                            :class="(item.Setsumei_Error)?'red--text text--lighten-1':'black--text'">
                                                            {{EditInfo_Value[EditInfo_Value.indexOf(item)].FIELD_EXPLAIN}} 
                                                            </p>
                                                    </template>
                                                    </v-data-table>
                                                </v-form>
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                        <v-expansion-panel>
                                            <v-expansion-panel-header  @click="Panel2_click_event()">
                                                <h3>手配情報</h3>
                                            </v-expansion-panel-header>
                                            <v-expansion-panel-content>
                                                <!-- 手配情報  -->
                                                <v-row no-gutters>
                                                    <v-spacer></v-spacer>
                                                    <v-col class="mt-n13 mr-6" cols="4">
                                                        <!-- EditTableSearch2　手配情報内に検査したいデータ -->
                                                        <v-text-field
                                                        class = "mt-2 mr-2"
                                                        v-model = "EditTableSearch2"
                                                        label = "フィルター"
                                                        hide-details
                                                        dense
                                                        outlined
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                    <!-- PPPMORDER_form 手配情報のテーブル  -->
                                                    <v-form ref="PPPMORDER_form">
                                                        <v-data-table
                                                        mobile-breakpoint='300'
                                                        fixed-header
                                                        :headers="this.Editinfo2_Header"
                                                        :items="this.EditInfo2_Value"
                                                        :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                        hide-default-footer
                                                        :search="EditTableSearch2"
                                                        height="31vh"
                                                        dense
                                                        >
                                                            <template v-slot:item.CELL_TYPE="{item}">
                                                                <!--  共用マスター -->
                                                                <v-btn 
                                                                v-if="item.MS_TABLE == '1' && item.CELL_TYPE == 'B' && item.AUTH_TYPE == '2'"
                                                                x-small 
                                                                :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                                @click="getEditDialogBtn1(EditInfo2_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                                                >...</v-btn>
                                                                <!-- 注文コードマスター -->
                                                                <v-btn
                                                                v-if ="item.MS_TABLE == '2' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                                                x-small
                                                                :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                                @click = "getEditDialogBtn2(EditInfo2_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                                                >...</v-btn>
                                                                <!-- 担当コードマスター -->
                                                                <v-btn
                                                                v-if ="item.MS_TABLE == '3' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                                                x-small
                                                                :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                                @click = "getEditDialogBtn3(EditInfo2_Value.indexOf(item),item.MS_ITEM_NO,Edit_Combobox_1_select.substr(0,1),2)"
                                                                >...</v-btn>
                                                                <!-- 単位読替マスタ -->
                                                                <v-btn
                                                                v-if ="item.MS_TABLE == '4' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                                                @click = "getEditDialogBtn4(EditInfo2_Value.indexOf(item),item.MS_ITEM_NO,2)"
                                                                :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                                x-small
                                                                >...</v-btn>
                                                                <v-btn
                                                                v-if ="item.MS_TABLE == '6' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                                                :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                                @click ="getEditDialogBtn6(EditInfo2_Value.indexOf(item),item.FIELD_NAME,2)"
                                                                x-small
                                                                >...</v-btn>
                                                            </template>
                                                            <template v-slot:item.FIELD_VALUE="{item}">
                                                                <v-text-field
                                                                    :background-color = "item.Setsumei_Error?'red':''"
                                                                    :class="item.ALIGNMENT == 'R  '?'mb-n5 right-input':'mb-n5 left-input'"
                                                                    :disabled = "Edit_Combobox_1_select.substr(0,1) != '-' &&item.AUTH_TYPE == '2'?false:true"
                                                                    :filled= "Edit_Combobox_1_select.substr(0,1) != '-' &&item.AUTH_TYPE == '2' ?false:true"
                                                                    :maxlength ="item.CELL_LENGTH == null ? false: item.CELL_LENGTH"
                                                                    :rules="item.RULES"
                                                                    v-model = EditInfo2_Value[EditInfo2_Value.indexOf(item)].FIELD_VALUE
                                                                    @keyup="getEditTableSetsumei2(EditInfo2_Value.indexOf(item),item.FIELD_NAME)"
                                                                    @change="getEditTableSetsumei2(EditInfo2_Value.indexOf(item),item.FIELD_NAME)"
                                                                    outlined
                                                                    dense>
                                                                </v-text-field>
                                                            </template>
                                                            <template v-slot:item.FIELD_EXPLAIN="{ item }">
                                                                <p
                                                                :class="(item.Setsumei_Error)?'red--text text--lighten-1':'black--text'">
                                                                {{EditInfo2_Value[EditInfo2_Value.indexOf(item)].FIELD_EXPLAIN}}
                                                                </p>
                                                            </template>
                                                        </v-data-table>
                                                    </v-form>
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container fluid>
                        <v-row no-gutters justify="end">
                            <v-col class="d-flex flex-row-reverse" >
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
                                <v-btn class="mr-2" large
                                @click ="ZaikoPostReq()"
                                >
                                    <v-icon
                                        left
                                        dark
                                        large
                                    >
                                    mdi-content-save
                                    </v-icon>
                                    <h3>保存</h3>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
                <!-- 保守画面表示 -->
                <div v-if="tab_select == 5">
                    <v-container fluid>
                        <v-row>
                            <!-- 保守情報 -->
                            <v-col :cols = "this.$vuetify.breakpoint.smAndDown?'12':'6'">
                                <v-card  height ="20Vh">
                                    <v-row class="d-flex mx-2" justify="space-between">
                                        <h3 class="mt-2">保守情報</h3>
                                        <div class="d-flex mt-2">
                                            <h4>改訂</h4>
                                            <v-combobox class="ml-2"
                                             v-model="Hoshu_Dropdown_Select"
                                             :items = "Hoshu_Dropdown_Item"
                                             @change="GetHoshu_ChangeDropdown"
                                             style="width :100px;" dense outlined 
                                             ></v-combobox>
                                        </div>
                                    </v-row>
                                    <v-data-table class="mx-2 mt-n5"
                                        mobile-breakpoint='300'
                                        fixed-header
                                        :headers="this.Hoshu_Table_Header"
                                        :items="this.Hoshu_Table_Item"
                                        :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                        hide-default-footer
                                        height="14vh"
                                        dense
                                        @click:row ="GetHoshu_MAINTMS_ROW"
                                    >
                                    </v-data-table>
                                </v-card>
                            </v-col>
                            <!-- P/M基本情報 -->
                            <v-col :cols = "this.$vuetify.breakpoint.smAndDown?'12':'6'">
                                <v-card height ="20Vh">
                                    <v-row >
                                        <v-col class="ml-2">
                                            <h3>P/M基本情報</h3>
                                        </v-col>
                                        <v-spacer>
                                        </v-spacer>
                                        <v-col class="d-flex">
                                            <v-text-field
                                             class = " mr-2"
                                             v-model = "EditTableSearch1"
                                             label = "フィルター"
                                             hide-details
                                             dense
                                             outlined
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-form ref ="PPPMMS_FORM">
                                        <v-data-table class="mx-2"
                                        mobile-breakpoint='400'
                                        fixed-header
                                        :headers="this.Editinfo_Header"
                                        :items="this.EditInfo_Value"
                                        :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                        hide-default-footer
                                        height="14vh"
                                        :search="EditTableSearch1"
                                        dense
                                        >
                                        <template v-slot:item.CELL_TYPE="{item}">
                                            <!--  共用マスター -->
                                            <v-btn 
                                            v-if="item.MS_TABLE == '1' && item.CELL_TYPE == 'B' && item.AUTH_TYPE == '2'"
                                            x-small 
                                            @click="getEditDialogBtn1(EditInfo_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,1)"
                                            >...</v-btn>
                                            <!-- 注文コードマスター  -->
                                            <v-btn
                                            v-if ="item.MS_TABLE == '2' && item.AUTH_TYPE == '2'&& item.CELL_TYPE == 'B'"
                                            @click = "getEditDialogBtn2(EditInfo_Value.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,1)"
                                            x-small
                                            >...</v-btn>
                                            <!-- 担当コードマスター -->
                                            <v-btn
                                            v-if ="item.MS_TABLE == '3' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                            @click = "getEditDialogBtn3(EditInfo_Value.indexOf(item),item.MS_ITEM_NO,Edit_Combobox_1_select.substr(0,1),1)"
                                            x-small
                                            >...</v-btn>
                                            <!--　単位読替マスター　-->
                                            <v-btn
                                            v-if ="item.MS_TABLE == '4' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                            x-small
                                            @click = "getEditDialogBtn4(EditInfo_Value.indexOf(item),item.MS_ITEM_NO,2)"
                                            >...</v-btn>
                                            
                                            <v-btn
                                            v-if ="item.MS_TABLE == '6' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                            @click ="getEditDialogBtn6(EditInfo_Value.indexOf(item),item.FIELD_NAME,1)"
                                            x-small
                                            >...</v-btn>
                                            
                                        </template>
                                        <template v-slot:item.FIELD_VALUE="{item}">
                                            <v-text-field
                                                :background-color = "item.Setsumei_Error?'red':''"
                                                :class="item.ALIGNMENT == 'R  '?'mb-n5 right-input':'mb-n5 left-input'"
                                                :disabled = "item.AUTH_TYPE == '2' ?false:true"
                                                :filled= "item.AUTH_TYPE == '2'?false:true"
                                                :maxlength ="item.CELL_LENGTH == null ? false: item.CELL_LENGTH"
                                                :rules="item.RULES"
                                                v-model = EditInfo_Value[EditInfo_Value.indexOf(item)].FIELD_VALUE
                                                @keyup="getEditTableSetsumei(EditInfo_Value.indexOf(item),item.FIELD_NAME)"
                                                @change="getEditTableSetsumei(EditInfo_Value.indexOf(item),item.FIELD_NAME)"
                                                dense
                                                outlined>
                                            </v-text-field>
                                        </template>
                                        <template v-slot:item.FIELD_EXPLAIN="{ item }">
                                                <p
                                                :class="(item.Setsumei_Error)?'red--text text--lighten-1':'black--text'">
                                                {{EditInfo_Value[EditInfo_Value.indexOf(item)].FIELD_EXPLAIN}} 
                                                </p>
                                        </template>
                                        </v-data-table>
                                    </v-form>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row>
                            <!-- 1次情報 -->
                            <v-col  :cols = "this.$vuetify.breakpoint.smAndDown?'12':'6'">
                                <v-card height ="42vh"> 
                                    <v-row no-gutters>
                                        <v-col>
                                            <h3 class="mt-4 ml-6">1次情報</h3>
                                        </v-col>
                                    </v-row>
                                    <v-data-table
                                    class = "mx-2 mt-5"
                                    mobile-breakpoint='400'
                                    fixed-header
                                    :headers="this.Hoshu_EditTable1_Header"
                                    :items="this.Hoshu_EditTable1_Item"
                                    :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                    hide-default-footer
                                    height="34vh"
                                    dense
                                    >
                                        <template v-slot:item.CELL_TYPE="{item}">
                                            <!--  共用マスター -->
                                            <v-btn 
                                            v-if="item.MS_TABLE == '1' && item.CELL_TYPE == 'B' && item.AUTH_TYPE == '2'"
                                            x-small 
                                            @click="getEditDialogBtn1(Hoshu_EditTable1_Item.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                            >...</v-btn>
                                            <!-- 注文コードマスター -->
                                            <v-btn
                                            v-if ="item.MS_TABLE == '2' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                            x-small
                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                            @click = "getEditDialogBtn2(Hoshu_EditTable1_Item.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                            >...</v-btn>
                                            <!-- 担当コードマスター -->
                                            <v-btn
                                            v-if ="item.MS_TABLE == '3' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                            x-small
                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                            @click = "getEditDialogBtn3(Hoshu_EditTable1_Item.indexOf(item),item.MS_ITEM_NO,Edit_Combobox_1_select.substr(0,1),2)"
                                            >...</v-btn>
                                            <!-- 単位読替マスタ -->
                                            <v-btn
                                            v-if ="item.MS_TABLE == '4' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                            @click = "getEditDialogBtn4(Hoshu_EditTable1_Item.indexOf(item),item.MS_ITEM_NO,2)"
                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                            x-small
                                            >...</v-btn>
                                            <v-btn
                                            v-if ="item.MS_TABLE == '6' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                            :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                            @click ="getEditDialogBtn6(Hoshu_EditTable1_Item.indexOf(item),item.FIELD_NAME,2)"
                                            x-small
                                            >...</v-btn>
                                        </template>
                                        <template v-slot:item.FIELD_VALUE="{item}">
                                            <v-text-field
                                                :background-color = "item.Setsumei_Error?'red':''"
                                                :class="item.ALIGNMENT == 'R  '?'mb-n5 right-input':'mb-n5 left-input'"
                                                :disabled = "item.AUTH_TYPE == '2'?false:true"
                                                :filled= "item.AUTH_TYPE == '2' ?false:true"
                                                :maxlength ="item.CELL_LENGTH == null ? false: item.CELL_LENGTH"
                                                :rules="item.RULES"
                                                v-model = Hoshu_EditTable1_Item[Hoshu_EditTable1_Item.indexOf(item)].FIELD_VALUE
                                                @keyup="GetPPPMMAINTMS1Setsumei(Hoshu_EditTable1_Item.indexOf(item),Hoshu_EditTable1_Item[Hoshu_EditTable1_Item.indexOf(item)].FIELD_NAME)"
                                                @change="GetPPPMMAINTMS1Setsumei(Hoshu_EditTable1_Item.indexOf(item),Hoshu_EditTable1_Item[Hoshu_EditTable1_Item.indexOf(item)].FIELD_NAME)"
                                                outlined
                                                dense>
                                            </v-text-field>
                                        </template>
                                        <template v-slot:item.FIELD_EXPLAIN="{ item }">
                                            <p
                                            :class="(item.Setsumei_Error)?'red--text text--lighten-1':'black--text'">
                                            {{Hoshu_EditTable1_Item[Hoshu_EditTable1_Item.indexOf(item)].FIELD_EXPLAIN}}
                                            </p>
                                        </template>
                                    </v-data-table>
                                </v-card>
                            </v-col>
                            <!-- 2次情報 -->
                            <v-col :cols = "this.$vuetify.breakpoint.smAndDown?'12':'6'">
                                <v-expansion-panels v-model="Hoshu_Panel" multiple accordion>
                                    <v-expansion-panel>
                                        <v-expansion-panel-header><h3>2次情報</h3></v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <v-data-table
                                            class = "mx-2 mb-1"
                                            mobile-breakpoint='400'
                                            fixed-header
                                            :headers="this.Hoshu_EditTable2_Header"
                                            :items="this.Hoshu_EditTable2_Item"
                                            :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                            hide-default-footer
                                            height="33vh"
                                            dense
                                            >
                                                <template v-slot:item.CELL_TYPE="{item}">
                                                    <!--  共用マスター -->
                                                    <v-btn 
                                                    v-if="item.MS_TABLE == '1' && item.CELL_TYPE == 'B' && item.AUTH_TYPE == '2'"
                                                    x-small 
                                                    @click="getEditDialogBtn1(Hoshu_EditTable2_Item.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                                    >...</v-btn>
                                                    <!-- 注文コードマスター -->
                                                    <v-btn
                                                    v-if ="item.MS_TABLE == '2' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                                    x-small
                                                    :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                    @click = "getEditDialogBtn2(Hoshu_EditTable2_Item.indexOf(item),item.MS_ITEM_NO,item.FIELD_NAME_LOC1,2)"
                                                    >...</v-btn>
                                                    <!-- 担当コードマスター -->
                                                    <v-btn
                                                    v-if ="item.MS_TABLE == '3' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B'"
                                                    x-small
                                                    :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                    @click = "getEditDialogBtn3(Hoshu_EditTable2_Item.indexOf(item),item.MS_ITEM_NO,Edit_Combobox_1_select.substr(0,1),2)"
                                                    >...</v-btn>
                                                    <!-- 単位読替マスタ -->
                                                    <v-btn
                                                    v-if ="item.MS_TABLE == '4' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                                    @click = "getEditDialogBtn4(Hoshu_EditTable2_Item.indexOf(item),item.MS_ITEM_NO,2)"
                                                    :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                    x-small
                                                    >...</v-btn>
                                                    <v-btn
                                                    v-if ="item.MS_TABLE == '6' && item.AUTH_TYPE == '2' && item.CELL_TYPE == 'B' "
                                                    :disabled ="Edit_Combobox_1_select.substr(0,1) != '-'?false: true"
                                                    @click ="getEditDialogBtn6(Hoshu_EditTable2_Item.indexOf(item),item.FIELD_NAME,2)"
                                                    x-small
                                                    >...</v-btn>
                                                </template>
                                                <!-- 
                                                    
                                                -->
                                                <template v-slot:item.FIELD_VALUE="{item}">
                                                    <v-text-field
                                                        :background-color = "item.Setsumei_Error?'red':''"
                                                        :class="item.ALIGNMENT == 'R  '?'mb-n5 right-input':'mb-n5 left-input'"
                                                        :disabled = "item.AUTH_TYPE == '2'?false:true"
                                                        :filled= "item.AUTH_TYPE == '2' ?false:true"
                                                        :maxlength ="item.CELL_LENGTH == null ? false: item.CELL_LENGTH"
                                                        :rules="item.RULES"
                                                        v-model = Hoshu_EditTable2_Item[Hoshu_EditTable2_Item.indexOf(item)].FIELD_VALUE
                                                        @keyup="GetPPPMMAINTMS2Setsumei(Hoshu_EditTable2_Item.indexOf(item),Hoshu_EditTable2_Item[Hoshu_EditTable2_Item.indexOf(item)].FIELD_NAME)"
                                                        @change="GetPPPMMAINTMS2Setsumei(Hoshu_EditTable2_Item.indexOf(item),Hoshu_EditTable2_Item[Hoshu_EditTable2_Item.indexOf(item)].FIELD_NAME)"
                                                        outlined
                                                        dense>
                                                    </v-text-field>
                                                </template>
                                                <template v-slot:item.FIELD_EXPLAIN="{ item }">
                                                    <p
                                                    :class="(item.Setsumei_Error)?'red--text text--lighten-1':'black--text'">
                                                    {{Hoshu_EditTable2_Item[Hoshu_EditTable2_Item.indexOf(item)].FIELD_EXPLAIN}}
                                                    </p>
                                                </template>
                                            </v-data-table>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-expansion-panels v-model="Hoshu_EX_Panel" multiple accordion>
                                    <v-expansion-panel>
                                        <!-- 適用条件 -->
                                        <v-expansion-panel-header><h3>適用条件</h3></v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <v-row>
                                                <v-col :cols = "this.$vuetify.breakpoint.smAndDown?'12':'6'">
                                                    <v-card>
                                                        <v-data-table
                                                        :headers ="Hoshu_Teikiyou_Header"
                                                        :items="Hoshu_Teikiyou_Item"
                                                        class = "mx-2"
                                                        mobile-breakpoint='400'
                                                        fixed-header
                                                        :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                        hide-default-footer
                                                        height="20vh"
                                                        dense
                                                        >
                                                            <template v-slot:item.DELETE ="{item}">
                                                                <v-btn @click = "DeleteCondition(Hoshu_Teikiyou_Item.indexOf(item))"
                                                                 x-small icon>
                                                                    <v-icon>
                                                                        mdi-delete  
                                                                    </v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <template v-slot:item.DATA1 ="{item}">
                                                                <v-combobox 
                                                                class="mt-3 mb-n4"
                                                                dense outlined
                                                                v-model ="Hoshu_Teikiyou_Item[Hoshu_Teikiyou_Item.indexOf(item)].DATA1"
                                                                :items ="Hoshu_Teikiyou_DROPDOWN_ITEM"
                                                                @change ="showdata(Hoshu_Teikiyou_Item.indexOf(item),Hoshu_Teikiyou_DROPDOWN_ITEM.indexOf(Hoshu_Teikiyou_Item[Hoshu_Teikiyou_Item.indexOf(item)].DATA1))"
                                                                >
                                                                </v-combobox>
                                                            </template>
                                                        </v-data-table>
                                                    </v-card>
                                                    
                                                </v-col>
                                                <!-- 項目情報 -->
                                                <v-col :cols = "this.$vuetify.breakpoint.smAndDown?'12':'6'">
                                                    <v-card>
                                                        <h4 class="ml-2">項目情報</h4>
                                                        <v-data-table
                                                        :headers="Hoshu_KoumokuA_Header"
                                                        :items="Hoshu_KoumokuA_Item"
                                                        class = "mx-2"
                                                        mobile-breakpoint='400'
                                                        fixed-header
                                                        :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                        @click:row="Hoshu_Check_GetHoshu_SPSCITEMMSB"
                                                        height="35vh"
                                                        dense
                                                        >
                                                        </v-data-table>
                                                    </v-card>
                                                    <v-card>
                                                        <v-data-table
                                                        :headers="Hoshu_KoumokuB_Header"
                                                        :items="Hoshu_KoumokuB_Item"
                                                        class = "mx-2 mt-2"
                                                        mobile-breakpoint='400'
                                                        @click:row = "GetCondition"
                                                        fixed-header
                                                        :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                                                        height="35vh"
                                                        dense
                                                        >
                                                        </v-data-table>
                                                    </v-card>
                                                </v-col>
                                            </v-row>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container fluid>
                        <v-row no-gutters justify="end">
                            <v-col class="d-flex flex-row-reverse" >
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
                                <v-btn class="mr-2" large
                                @click ="HoshuPostReq()"
                                >
                                    <v-icon
                                        left
                                        dark
                                        large
                                    >
                                    mdi-content-save
                                    </v-icon>
                                    <h3>保存</h3>
                                </v-btn>
                            </v-col>
                        </v-row>
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
                    :width="TabledialogWidth"
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
                            mobile-breakpoint='400'
                            v-if="this.EditdialogStatus == '1'"
                            v-model="dialogKoumokuTableSelected"
                            :headers ="dialogKoumokuTableHeader"
                            :items ="dialogKoumokuTableItem"
                            :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                            fixed-header
                            singleSelect
                            item-key="CM_CODE"
                            dense
                            :height="TableHeight"
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
                            :height="TableHeight"
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
                            :height="TableHeight"
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
                            :height="TableHeight"
                            show-select
                            ></v-data-table>
                            <v-data-table
                            v-if="this.EditdialogStatus == '6'"
                            v-model="dialogArraySelected"
                            :headers ="dialogArrayHeader"
                            :items ="dialogArrayItem"
                            :footer-props="{'items-per-page-options':[100,200,300,-1]}"
                            fixed-header
                            singleSelect
                            item-key="ARRAY_VALUE"
                            dense
                            :height="TableHeight"
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
            
        </div> 
      </v-main>
  </v-app>
</template>

<script>
import { MAX_VALUE_16BITS } from 'vue-js-xlsx';
import { mapState, mapMutations, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import UniversalCookie from 'universal-cookie'
export default  {
  name: 'DefaultLayout',
  components:{
    draggable,
  },
  data : () => ({
    //TEST
    test_query :"",
    //TEST
    //Main_URL : "http://sa0392.cad.fujitec.co.jp/pmserver/api/",//本番環境用データベースサーバー
    Main_URL :"http://localhost:59272/api/",//テスト用データベースサーバー
    // 保守画面
    // 適用条件値
    Hoshu_ConditionA_Index:"",
    Hoshu_ConditionB_Index:"",
    // アコーディオン
    Hoshu_Panel :[0],
    Hoshu_EX_Panel :[0],
    // テーブル
    Hoshu_Table_Item:[],
    Hoshu_Table_Header:[
        {text:"ロケーション",value:"PART_LOCATION",width:"150px"},
        {text:"パターン",value:"COND_PAT_NO",width:"100px"},
        {text:"優先度",value:"PRIORITY",width:"100px"},
        {text:"保守判定",value:"MAINT_TYPE",width:"100px"},
        {text:"交換周期（月）",value:"DSG_LIFE_MONTH",width:"150px"},
        {text:"交換周期注意（月）",value:"REP_LIFE_CHKMONTH",width:"180px"},
        {text:"交換周期（稼動値）",value:"REP_LIFE_RUN",width:"180px"},
        {text:"交換周期注意（稼動値）",value:"REP_LIFE_CHKRUN",width:"200px"},
        {text:"2次側 稼動値区分",value:"ACT_TYPE_2",width:"200px"},
        {text:"適用条件",value:"COND_TYPE",width:"100px"},
        {text:"設計寿命（月）",value:"REP_LIFE_MONTH",width:"200px"},
        {text:"設計寿命（稼動値）",value:"DSG_LIFE_ACT",width:"200px"},
        {text:"単位",value:"DSG_UNIT",width:"80px"},
        {text:"1次側 稼動値区分",value:"ACT_TYPE_1",width:"200px"},
        {text:"交換条件内容",value:"REP_COND",width:"300px"},
    ],
    Hoshu_EditTable1_Header:[
        {text:"項目名",value:"FIELD_NAME_LOC1",width:"170px" },
        {text:"値",value:"FIELD_VALUE",width:"170px"},
        {text:"",value:"CELL_TYPE",width:"10px"},
        {text:"説明",value:"FIELD_EXPLAIN",width:"200px"}
    ],
    Hoshu_EditTable1_Item:[],
    Hoshu_EditTable2_Header:[
        {text:"項目名",value:"FIELD_NAME_LOC1",width:"170px" },
        {text:"値",value:"FIELD_VALUE",width:"170px"},
        {text:"",value:"CELL_TYPE",width:"10px"},
        {text:"説明",value:"FIELD_EXPLAIN",width:"200px"}
    ],
    Hoshu_EditTable2_Item:[],
    Hoshu_Teikiyou_Header:[
        {text:"",value:"DELETE"},
        {text:"項目番号",value:"COND_SPEC_ITEM_NO",width:"100px" },
        {text:"判定",value:"DATA1",width:"100px" },
        {text:"仕様コード",value:"COND_CODE",width:"150px" },
        {text:"項目名",value:"ITEM_NAME_LOC1",width:"170px" }
    ],
    Hoshu_Teikiyou_Item:[],
    Hoshu_KoumokuA_Header:[
        {text:"JobType",value:"PRODUCT_TYPE",width:"120px"},
        {text:"項目No",value:"SPEC_ITEM_NO",width:"120px"},
        {text:"項目名",value:"ITEM_NAME_LOC1",width:"220px"},
        {text:"水平位置区分",value :"PLAN_LOC_TYPE",width:"140px"},
        {text:"パターンNo区分",value:"PAT_NO_TYPE",width:"140px"},
    ],
    Hoshu_KoumokuA_Item:[],
    Hoshu_KoumokuB_Header:[
        {text:"項目No",value:"SPEC_ITEM_NO",width:"100px" },
        {text:"仕様コード",value:"SPEC_CODE",width:"120px" },
        {text:"仕様名",value:"CODE_NAME_LOC1",width:"100px" },
        {text:"使用開始日",value:"START_DATE",width:"120px" },
        {text:"使用止め日",value:"STOP_DATE",width:"120px" },
        {text:"削除",value:"DEL_TYPE",width:"100px" },
        {text:"JobType",value:"PRODUCT_TYPE",width:"100px" },
        {text:"水平位置区分",value:"PLAN_LOC_TYPE",width:"140px" },
        {text:"パターンNo区分",value:"PAT_NO_TYPE",width:"140px" },
        {text:"項目名",value:"ITEM_NAME_LOC1",width:"100px" },
    ],
    Hoshu_KoumokuB_Item:[],
    // ドロップダウン
    Hoshu_Teikiyou_DROPDOWN_Select:"",
    Hoshu_Teikiyou_DROPDOWN_ITEM:[],
    Hoshu_Teikiyou_DROPDOWN_Data:[],
    Hoshu_Dropdown_Select :"",
    Hoshu_Dropdown_Item :[],
    // 保守画面
    // 在庫画面
    //アコーディオン
    Zaiko_Panel :[],
    Zaiko_Panel1_ST :false,
    Zaiko_Panel2_ST :false,
    Zaikou_SokoCode_Item :[],
    Zaikou_SokoCode_Select :"",
    Zaiko_EditTable_Header :[
        {text:"項目名",value:"FIELD_NAME_LOC1",width:"170px" },
        {text:"値",value:"FIELD_VALUE",width:"170px"},
        {text:"",value:"CELL_TYPE",width:"10px"},
        {text:"説明",value:"FIELD_EXPLAIN",width:"200px"}
    ],
    Zaiko_EditTable_Item:[],
    Zaiko_New_Data : false,
    FT_ZKMS_KOUBA :"",
    FT_ZKMS_KOUBA_SETSUMEI :"",
    // 在庫画面
    // 入出庫画面
    // 製作所切替えTEXT_FIELD
    Iride_Naigaisaku:"",
    Iride_SeisakuLot:"",
    Iride_SaishouHacchu:"",
    Iride_Bucket:"",
    Iride_Kanten:"",
    Iride_Chuuten:"",
    Iride_Zaikan:"",
    Iride_Jio:"",
    Iride_Kanrikijun:"",
    Iride_SeisakuLT:"",
    Iride_ABC:"",
    Iride_Ninaite:"",
    Iride_Chuunaite:"",
    Iride_Chuuku:"",
    // テーブル
    Iride_ZaiyoteiTable_Header:[
        {text:"倉庫",value:"",width:"80px"},
        {text:"在庫数",value:"",width:"100px"},
        {text:"置場",value:"",width:"80px"},
        {text:"自動購入指示",value:"",width:"150px"},
        {text:"安全在庫",value:"",width:"120px"},
        {text:"発注点",value:"",width:"100px"},
        {text:"当月出庫",value:"",width:"120px"},
        {text:"当月入庫",value:"",width:"120px"},
        {text:"手配情報",value:"",width:"120px"},
        {text:"中止",value:"",width:"80px"},
        {text:"貯蔵開始",value:"",width:"120px"},
    ],
    Iride_ZaiyoteiTable_Item:[],
    Iride_ZaikouIride_Header:[
        {text:"購LT",value:"",width:"150px"},
        {text:"出庫",value:"",width:"100px"},
        {text:"入庫",value:"",width:"100px"},
        {text:"残数",value:"",width:"100px"},

    ],
    Iride_ZaikouIride_Item:[],
    // ドロップダウン
    Iride_Koutei_Select :"固定",
    Iride_Koutei_Item:["固定","全て"],
    Iride_Tani_Select:"全て",
    Iride_Tani_Item:["日","週","月/2","月"],
    // チェックボックス
    Ireide_checkbox_0:true,//出庫
    Ireide_checkbox_1:true,//入庫(注文)
    Ireide_checkbox_2:true,//出庫(他)
    Ireide_checkbox_3:true,//入庫(見込)
    Ireide_checkbox_4:true,//出庫(予測)
    Ireide_checkbox_5:true,//入庫(振替)
    // 在庫情報
    Ireide_EditTable_Header:[
        {text:"項目名",value:"FIELD_NAME_LOC1",width:"170px" },
        {text:"値",value:"FIELD_VALUE",width:"170px"},
        {text:"",value:"CELL_TYPE",width:"10px"},
        {text:"説明",value:"FIELD_EXPLAIN",width:"200px"}
    ],
    Ireide_EditTable_Item:[],
    // 入出庫画面
    //購買画面
    //購買優先テーブル
    Koubai_Torisaki_Header:[
        {text:"SG",value:"SG_CODE"},
        {text:"優先",value:"PRIORITY"},
        {text:"取引先コード",value:"VENDOR_CODE"},
        {text:"取引先名",value:"VENDOR_NAME_J"},
    ],
    Koubai_Torisaki_Item:[],
    Koubai_SG_CODE:"",
    Koubai_PRIORITY:"",
    Koubai_VENDOR_CODE:"",
    //購買テーブル
    Koubai_EditTable_Header:[
        {text:"項目名",value:"FIELD_NAME_LOC1",width:"170px" },
        {text:"値",value:"FIELD_VALUE",width:"170px"},
        {text:"",value:"CELL_TYPE",width:"10px"},
        {text:"説明",value:"FIELD_EXPLAIN",width:"200px"}
    ],
    Koubai_EditTable_Item:[],
    Koubai_TANKA_INDEX:"",
    Koubai_FC_FLAG_INDEX:"",
    //テーブル高さ
    Koubai_Torisaki_CardHeight :"20vh",
    Koubai_Torisaki_TableHeight :"12vh",
    koubai_TableData_CardHeight : "67vh",
    koubai_TableData_TableHeight : "65vh",
    Koubai_PM_CardHeight :"20vh",
    Koubai_PM_TableHeight :"14vh",
    Koubai_Teihai_CardHeight :"60vh",
    Koubai_Teihai_TableHeight :"56vh",
    Koubai_CHMSB_ST_TableHeight :"14vh",
    Koubai_PPPMPOSPEC_TableHeight :"12vh",
    Koubai_CHMSB_ST:false,
    //アコーディオン
    Koubai_Panel :[0,1],
    Koubai_Panel1_ST :false,
    Koubai_Panel2_ST :false,
    //作業コード別注文仕様DROPDOWN
    Koubai_SGCODE_Select :"",
    Koubai_SGCODE_Item :[],
    //作業コード別注文仕様テーブル
    Koubai_PPPMPOSPEC_Header:[
        {text:"項目名",value:"FIELD_NAME_LOC1",width:"170px" },
        {text:"値",value:"FIELD_VALUE",width:"170px"},
        {text:"",value:"CELL_TYPE",width:"10px"},
        {text:"説明",value:"FIELD_EXPLAIN",width:"200px"}
    ],
    Koubai_PPPMPOSPEC_Item:[],
    //可変単価状態テーブル
    Koubai_KanhenTanka_Header:[
        {text:"標準",value:"STD",width:"50px"},
        {text:"ロットサイズ",value:"LOT_SIZE",width:"100px"},
        {text:"可変購入単価",value:"VAR_CH_TANKA",width:"100px"},
        {text:"材料費",value:"CH_MATL_COST",width:"100px"},
        {text:"有償支給品費",value:"CH_SUPPLY_COST",width:"100px"},
        {text:"加工費",value:"CH_KAKOU_COST",width:"100px"},
        {text:"二次加工費",value:"CH_NIJI_KAKOU_COST",width:"100px"},
        {text:"梱包・運送費",value:"CH_TRNSPT_COST",width:"100px"},
        {text:"管理費",value:"CH_MNG_COST",width:"100px"},
        {text:"利益",value:"CH_GAIN_COST",width:"100px"},
        {text:"その他コスト",value:"CH_ETC_COST",width:"100px"},
        {text:"更新者",value:"UPD_WHO",width:"100px"},
        {text:"更新日時",value:"UPD_WHEN",width:"100px"},
        {text:"登録日",value:"ENT_DATE",width:"100px"},
    ],
    Koubai_KanhenTanka_Item:[],
    Koubai_FC_DAY_OF_WEEK :["0 指定無","1:1月","2:2火","3:3水","4:4木","5:5金","6:6土","7:7日","8:8第一営(通常)"],
    //購買画面

    //ユーザー設定画面
    DEPARTMENT_CODE:"",
    USER_CODE:"",
    User_All_List_Select: "",
    User_All_List:[],
    User_Visionable_List_Select: "",
    User_Edit_List_Select:0,
    User_Edit_List:[
        { text: 'P/M基本情報'},
        { text: '手配情報' },
        { text: '購買情報'},
        { text:'在庫情報'},
        { text:'保守情報'},
    ],
    Draggable_list_1:[],
    Draggable_list_2:[],
    dialog_DepartmentName: false,
    Serach_UserSetting:"",
    USER_PS_AUTH:"",
    USER_DAIKAE_AUTH:"",
    USER_HANBAI_AUTH:"",
    User_Setting_Item:[],
     //ユーザー設定画面

    mobileBreakStatus:false,
    clipped: false,
    drawer: false,
    drawer1: false,
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
        {text:"コード",value:"CM_CODE",width:"100px"},
        {text:"コード説明",value:"CM_CODE_SETUMEI",width:"300px"},
        {text:"使用開始日",value:"START_DATE"},
        {text:"使用止め日",value:"STOP_DATE"},
    ],
    dialogKoumokuTableItem:[],
    dialogChoumonHeader:[
        {text : "コード",value:"CH_CODE",width:"100px"},
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
    dialogArrayHeader:[
        {text:"値",value:"ARRAY_VALUE"},
        {text:"説明",value:"ARRAY_SETUMEI"}
    ],
    dialogArrayItem:[],
    dialogArraySelected:[],
    dialogKouteiCodeTableSelected:[],
    dialogKouteiCodeTableItem:[],
    KT_CODE:"",
    WC_CODE:"",
    CC_CODE:"",
    SG_CODE:"",
    //setting
    settingDialog:false,
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
    HeaderTableBP:[
    { text: "操作", value: "SOUSA", align: "center",width:"200px" , sortable: false },
    { text: "部品コード", value: "PART_NO", align: "center",width:"100px" },
    { text: "部品名", value: "PART_NAME_LOC1", align: "center",width:"200px" },
    ],
    toggle_Table:"",
    table_width_state:false,
    //User Setting 
    userKoumokuSelect:"P/M基本情報",
    userKoumokuItems:["P/M基本情報","手配情報","標準時間マスタ","購買情報","在庫情報"],
    userShougiSelect:"手配情報",
    userShougiItems:["手配情報","製作情報","購買情報","入出庫","在庫情報","保守情報","販売価格情報","P/S情報","代替部品情報"],
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
    tab_select:0,
    tab_menu:["手配","製作","購買","入出庫","在庫","保守","PC/SP","P/S","代替",],
    search_width : "0%",
    table_width: "0%",
    tab_width : "100%",
    PM_height : "40vh",
    Teihai_height : "36.3vh",
    search_height:"100vh",
    table_height:"100vh",
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
    {text:"項目名",value:"FIELD_NAME_LOC1",width:"170px" },
    {text:"値",value:"FIELD_VALUE",width:"170px"},
    {text:"",value:"CELL_TYPE",width:"10px"},
    {text:"説明",value:"FIELD_EXPLAIN",width:"200px"}
    ],
    Editinfo2_Header:[
    {text:"項目名",value:"FIELD_NAME_LOC1",width:"170px" },
    {text:"値",value:"FIELD_VALUE",width:"170px"},
    {text:"",value:"CELL_TYPE",width:"10px"},
    {text:"説明",value:"FIELD_EXPLAIN",width:"200px"}
    ],
    EditInfo_Value:[],
    NRPMA_POST:{},
    NRPMB_POST:{},
    NRPMHIS_POST:{},
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
    //Test_userID : "X520",//"A753",//"2085",
    EditRevDate_Eable : false,
    TODAY:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    Pic_Loc:"",
    EditInfoDialog_Staus :"",
    HeaderPic_Loc :"",
    EditTableSearch1:"",
    EditTableSearch2:"",
    TableHeight:"500px",
    TabledialogWidth:"700px",
    KT_CODE_SELECT:"",
    KT_CODE_ITEM:[],
    FT_KOUBA : "",
    /*　フォームのルール */
    formRules:{
        TrueRule: true,
        FalseRule:false,
        required: value => !!value || "",//"数値を入力して下さい",
        IsNumber: value => value === null ?true : value.match(/[^a-z]/) ||value.match(/[^A-Z]/) ?true :"",// "数値を入力して下さい。",
        VoidOne: value => value === null ? true : value == "" || value == "1" || "",//"空白か1を入力下さい" ,
        voidZeroOne : value => value === null ? true : value == "0" || value == "1" || value == "" ||"",//"空白か0か1を入力下さい",
        ZeroOne: value => value === null ? true : value == "0" || value == "1" ||"",// "0,1を入力下さい。",
        ZeroOneTwo: value => value === null ? true : value == "0" || value == "1" || value == "2" ||"",//"0,1,2を入力下さい。",
        OneTwo: value => value === null ? true : value == "1" || value == "2" ||"",//"0,1,2を入力下さい。",
        MoreThanZero : value =>value === null ? true :value >0 ?true:"",//"0以上で入力して下さい。",
        MoreThanZeroFive : value => value === null ? true : !value.match(/\./) ?true : (value >0.5) ?true :"",// "０．５以上で入力して下さい。",
        ModZeroFive : value=> value === null ? true : !value.match(/\./)?true : value % 0.5 == 0 ?true :"",//"小数部は０．５単位で指定してください。",
        lengthThan2: value => value === null ? true : value.length <= 2 ||"",//"2文字以内で入力下さい。",
        lengthThan10: value => value === null ? true : value.length <= 10 ||"",// "10文字以内で入力下さい。",
        lengthThan50: value => value === null ? true : value.length <= 50 || "",//"50文字以内で入力下さい。",
        lengthThan60: value => value === null ? true : value.length <= 60 || "",//"60文字以内で入力下さい。",
        lengthThan80: value => value === null ? true :  value.length <= 80 || "",//"80文字以内で入力下さい。",
        lengthThan100: value => value === null ? true :  value.length <= 100 || "",//"100文字以内で入力下さい。",
        lengthThan200: value => value === null ? true : value.length <= 200 || "",//"200文字以内で入力下さい。",
        lengthThan400: value => value === null ? true : value.length <= 400 ||"",// "400文字以内で入力下さい。",
        InterOnlyThan2: value => value === null ? true : value.match(/^\d{0,2}$/) ?true :"",// "2桁以下の数字のみ入力可能です",
        InterOnlyThan3: value => value === null ? true : value.match(/^\d{0,3}$/) ?true :"",// "3桁以下の数字のみ入力可能です",
        InterOnlyThan5: value => value === null ? true : value.match(/^\d{0,5}$/) ?true :"",// "5桁以下の数字のみ入力可能です",
        InterOnlyThan6: value => value === null ? true : value.match(/^\d{0,6}$/) ?true :"",// "6桁以下の数字のみ入力可能です",
        InterOnlyThan7: value => value === null ? true : value.match(/^\d{0,7}$/) ?true :"",// "7桁以下の数字のみ入力可能です",
        Range100: value => value == null ? true :value <= 100 && value >=0 ||"",//"０～１００で入力して下さい",
        FloatLess2 : value => value == null ? true : !value.match(/\.\d{3,}/)? true :"",//"少数部分2桁以内で入力して下さい",
        IntegetThan6 : value => value === null ? true :  value.indexOf(".") == -1 ? 
                        value.length <= 6 ||""// "整数部分は6桁以内で入力して下さい"
                        :value.split(".")[0].length <=6 || "",//"整数部分は6桁以内で入力して下さい",
        IntegetThan7 : value => value === null ? true : value.indexOf(".") == "-1" ?
                        value.length <= 7 || ""//"整数部分は7桁以内で入力して下さい"
                        :value.split(".")[0].length <=7 || "",//"整数部分は7桁以内で入力して下さい",
        FewThan2 :  value => value === null ? true : value.indexOf(".") == -1 || value.split(".")[1].length <=2 || "",//"少数部分2桁以内で入力して下さい",
        FewThan3 : value => value === null ? true : value.indexOf(".") == -1 || value.split(".")[1].length <=3 || "",//"少数部分3桁以内で入力して下さい",
        IsZenkaku :  value => value === null ? true : value.match(/^[^\x01-\x7E\uFF61-\uFF9F]+$/) || "",//"全角文字が含まれています。当フィールドは半角文字です。",
        Datefomat : value => {
            if(value === null ){
                return true;
            }
            if(typeof value == "string"){
            var a = value.match(/^\d{8}$/);
            if (a) { 
                var y = parseInt(a[0].substring(0,4));
                var m = parseInt(a[0].substring(5,6));
                var d = parseInt(a[0].substring(7,8));
                var x = new Date(y, m, d);
                return (y == x.getFullYear() && m == x.getMonth() && d == x.getDate());
            }
        }
        return "";//"yyyymmdd形式で入力して下さい";
        },
        RecordCheck : value => value.match(/[01234]/)?true:"",//"マスタに未登録の値が入力されています",
        ModuleCheck : value =>value.match(/[012]/)?true : "",//"マスタに未登録の値が入力されています",
    },  
    /* 製作画面 */
    KouteiJunjoTable_Header: [
    {text:"順序",value:"SEQ_NO",width:"100px"},
    {text:"WC",value:"WC_CODE",width:"100px"},
    {text:"CC",value:"CC_CODE",width:"100px"},
    {text:"SG",value:"SG_CODE",width:"100px"},
    {text:"社員区分",value:"SHAIN_KUBUN",width:"100px"},
    {text:"業者コード",value:"VENDOR_CODE",width:"150px"},
    {text:"作業区分",value:"SG_KUBUN",width:"150px"},
    {text:"機械判定",value:"MACHINE_TYPE",width:"200px"},
    {text:"標準段取り時間（分）",value:"SETUP_STDTIME",width:"200px"},
    {text:"標準作業時間（分）",value:"WORK_STDTIME",width:"200px"},
    {text:"標準作業正社員比率",value:"SEI_STDPCNT",width:"200px"},
    {text:"作業リードタイム",value:"SG_LEADTIME",width:"200px"},
    {text:"使用開始日",value:"START_DATE",width:"200px"},
    {text:"使用止め日",value:"STOP_DATE",width:"200px"},
    {text:"更新者",value:"UPD_WHO",width:"150px"},
    {text:"更新日時",value:"UPD_WHEN",width:"250px"},
    {text:"登録日",value:"ENT_DATE",width:"250px"},
    {text:"記事(工程内外注のみ)",value:"KIJI",width:"400px"},
    {text:"作業ランク",value:"RANK",width:"100px"},
    {text:"管理板工程間ＬＴ",value:"KANRIBAN_LT",width:"200px"},
    {text:"段取時間(分)",value:"SETUP_DUE_TIME",width:"200px"},
    {text:"作業時間(分)",value:"WORK_DUE_TIME",width:"200px"},
    ],
    KouteiJunjoTable_Item:[],
    STD_Time_Filter:"",
    STD_EditInfo_Header : [
    {text:"項目名",value:"FIELD_NAME_LOC1",width:"170px" },
    {text:"値",value:"FIELD_VALUE",width:"170px"},
    {text:"",value:"CELL_TYPE",width:"10px"},
    {text:"説明",value:"FIELD_EXPLAIN",width:"150px"}
    ],
    STD_EditInfo_Item :[],
    Excel_dialog: false,
    file: null,
    fileData : null,
    ExcelTable_Header :[
    {text:"工場区分",value:"工場区分"},
    {text:"部品コード",value:"部品コード"},
    {text:"工程コード",value:"工程コード"},
    {text:"工程序列",value:"工程序列"},
    {text:"ワークセンター",value:"ワークセンター"},
    {text:"コストセンター",value:"コストセンター"},
    {text:"作業コード",value:"作業コード"},
    {text:"社員区分",value:"社員区分"},
    {text:"業者コード",value:"業者コード"},
    {text:"作業区分",value:"作業区分"},
    {text:"機械判定",value:"機械判定"},
    {text:"準段取り時間（分）",value:"準段取り時間（分）"},
    {text:"標準作業時間（分）",value:"標準作業時間（分）"},
    {text:"標準作業正社員比率",value:"標準作業正社員比率"},
    {text:"リードタイム",value:"リードタイム"},
    {text:"更新者",value:"更新者"},
    {text:"更新日時",value:"更新日時"},
    {text:"登録日",value:"登録日"},
    {text:"記事",value:"記事"},
    ],
    ExcelTable_Item:[],
    Excel_Ensure : false,
  }),
  created(){
    this.setListener();
  },
  
  computed:{
    title() {
      return this.$config.SYSTEM_TITLE
    },
    process() {
      return this.$config.PROCESS
    },
    processName() {
      return this.$config.PROCESS_NAME
    },
    ver() {
      return this.$config.VER
    },
    ...mapState(['authority', 'isSso']),
    ...mapState('fujitecSso', ['userId', 'userName', 'departmentId','departmentName','IsRunAlready']),
    ...mapState('headerSql',['headerItem']),
    dark: {
      get() {
        return this.$vuetify.theme.dark
      },
      set(val) {
        this.$vuetify.theme.dark = val
        localStorage.setItem('vuetify_theme_dark', val ? '1' : '0')
      },
    },
    dispLogout() {
      return (
        this.isSso &&
        !location.origin.match(/https:\/\/mobileapi.fujitec.co.jp/)
      )
    },
    User_Setting_Header(){
        return [
        {
            text : '所属部課コード',
            value:'DEPARTMENT_CODE',
            filter : value =>{
                if(!this.DEPARTMENT_CODE) return true
                if(value.includes(this.DEPARTMENT_CODE))
                    return true
                else
                    return false
            }
        },
        {
            text : '個人コード',
            value:'USER_CODE',
            filter : value =>{
                if(!this.USER_CODE) return true
                if(value.includes(this.USER_CODE))
                    return true
                else
                    return false
            }
        },
        ]
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
    mounted(){
        // ユーザー初期画面を取得
        this.asyncData();
        this.getFirstPage();
        // //  Production
        // const PART_NO = this.$route.query.PART_NO;
        // const url = "http://sa0392.cad.fujitec.co.jp/pmserver/api/KensakuBtnGet?Table_Id="+PART_NO;
        // this.$axios.get(url).then(res=>{
        //     this.Header_Data =res.data;
        //     this.showHeader = true;
        //     this.getHeaderPic(this.Header_Data[this.Header_Data.length-1].PART_NO);
        //     this.asyncData();
        // this.getFirstPage();
        // }).catch(err=>{

        // });

        
  },
  methods:{
    GetSiteQuery(PARTNO){
        const url = "http://sa0150.fujitec.co.jp/product/CMVA2401.aspx?PART_NO=5310A1"
        const config ={
            'headers': {
                "Access-Control-Allow-Origin": '*',
            },
        }
        const params ={
            PART_NO :'5310A1',
        }
        this.$axios.get('http://sa0150.fujitec.co.jp/product/CMVA2401.aspx?PART_NO=5310A1').then(res=>{
            console.log(res.data);
        }).catch(err=>{

        })
        ;
    },
    // 保守画面
    showdata(index_CB,index_DATA)
    {
        this.Hoshu_Teikiyou_Item[index_CB].DATA1 = this.Hoshu_Teikiyou_DROPDOWN_Data[index_DATA].DATA1;
        this.Hoshu_Teikiyou_Item[index_CB].COND_STAT = this.Hoshu_Teikiyou_DROPDOWN_Data[index_DATA].CM_CODE;
    },
    GetHoshu(PARTNO,PARTREVNO)
    {
        this.Zaikou_SokoCode_Item =[];
        const url = this.Main_URL + "KensakuBtnGet/PPPMMAINTMS";
        const params = {
            PART_NO :PARTNO,
            PART_REV_NO : PARTREVNO,
        }
        this.$axios.get(url,{params}).then(res =>{
            this.Hoshu_Table_Item = res.data;
            const PART_NO = res.data[0].PART_NO;
            const PART_REV_NO = res.data[0].PART_REV_NO;
            const COND_PAT_NO = res.data[0].COND_PAT_NO;
            const PART_LOCATION = res.data[0].PART_LOCATION;
            this.GetHoshu_MAINTMS(PART_NO,PART_REV_NO,COND_PAT_NO,1,PART_LOCATION);
            this.GetHoshu_MAINTMS(PART_NO,PART_REV_NO,COND_PAT_NO,2,PART_LOCATION);
            this.GetHoshu_COND_DROPDOWN();
            this.GetHoshu_SPSCCONIDMS(PART_NO,PART_REV_NO,PART_LOCATION,COND_PAT_NO);
        }).catch(err =>{

        });
    },
    GetHoshu_ChangeDropdown(){
        this.Hoshu_Dropdown_Select= this.Hoshu_Dropdown_Select.substr(0,3);
        this.GetHoshu(this.Header_Data[this.Header_Data.length-1].PART_NO,this.Hoshu_Dropdown_Select);
        this.getEditTable(this.Header_Data[this.Header_Data.length-1].PART_NO,this.Hoshu_Dropdown_Select);
    },
    GetHoshu_MAINTMS_ROW(item){
        const PART_NO = item.PART_NO;
        const PART_REV_NO = item.PART_REV_NO;
        const COND_PAT_NO = item.COND_PAT_NO;
        const PART_LOCATION = item.PART_LOCATION;
        this.GetHoshu_MAINTMS(PART_NO,PART_REV_NO,COND_PAT_NO,1,PART_LOCATION);
        this.GetHoshu_MAINTMS(PART_NO,PART_REV_NO,COND_PAT_NO,2,PART_LOCATION);
        this.GetHoshu_SPSCCONIDMS(PART_NO,PART_REV_NO,PART_LOCATION,COND_PAT_NO);
    },
    GetHoshu_MAINTMS(PARTNO,PARTREVNO,CONDPATNO,MAINTMS,PARTLOCATION){
        const url = this.Main_URL + "KensakuBtnGet/PPPMMAINTMS_MAINTMS";
        const params = {
            PART_NO :PARTNO,
            PART_REV_NO : PARTREVNO,
            COND_PAT_NO : CONDPATNO,
            WHICH_MAINTMS : MAINTMS,
            USER_ID :this.userId,
            PART_LOCATION: PARTLOCATION,
        }
        this.$axios.get(url,{params}).then(res =>{
            if(MAINTMS =="1")
            {
                this.Hoshu_EditTable1_Item =res.data.map(item =>{
                    item.RULES = [];
                    item.Setsumei_Error = false;
                    item.CHECK_LIST = [];
                    item.UPDATE_ST = false;
                    item.BEFORE_UPDATE_VALUE = item.FIELD_VALUE
                return item;
            });
            }
            else if(MAINTMS =="2")
            {
                this.Hoshu_EditTable2_Item =res.data.map(item =>{
                    item.RULES = [];
                    item.Setsumei_Error = false;
                    item.CHECK_LIST = [];
                    item.UPDATE_ST = false;
                    item.BEFORE_UPDATE_VALUE = item.FIELD_VALUE
                    return item;
                })
            }
        }).catch(err =>{

        });
    },
    GetHoshu_COND_DROPDOWN(){

        this.Hoshu_Teikiyou_DROPDOWN_ITEM =[];
        this.Hoshu_Teikiyou_DROPDOWN_Data =[];
        const url = this.Main_URL + "KensakuBtnGet/SPSCCONIDMS_DROPDOWN";
        this.$axios.get(url).then(res =>{
            this.Hoshu_Teikiyou_DROPDOWN_Data = res.data;
            res.data.forEach(item =>{
                this.Hoshu_Teikiyou_DROPDOWN_ITEM.push(item.DATA1 + item.CM_CODE_SETUMEI);
            })
        }).catch(err=>{

        })
    },
    GetHoshu_SPSCCONIDMS(PARTNO,PARTREVNO,PARTLOCATION,CONDPATNO){
        const url = this.Main_URL + "KensakuBtnGet/SPSCCONIDMS";
        const params ={
            PART_NO : PARTNO,
            PART_REV_NO : PARTREVNO,
            PART_LOCATION : PARTLOCATION,
            COND_PAT_NO :  CONDPATNO,
        }
        this.$axios.get(url,{params}).then(res =>{
            this.Hoshu_Teikiyou_Item = res.data.map(item =>{
                item.DATA1 = this.Hoshu_Teikiyou_DROPDOWN_Data[parseInt(item.COND_STAT)-1].DATA1;
                return item;
            });
        })  
    },
    GetHoshu_SPSCITEMMSA(PRODUCTTYPE,today){
        const url = this.Main_URL + "KensakuBtnGet/SPSCITEMMSA";
        const params = {
            PRODUCT_TYPE : PRODUCTTYPE,
            TODAY : today,
        }
        this.$axios.get(url,{params}).then(res =>{
            this.Hoshu_KoumokuA_Item = res.data;
        }).catch(err=>{

        });
    },
    GetHoshu_SPSCITEMMSB(SPECITEMNO,today){
        const url = this.Main_URL + "KensakuBtnGet/SPSCITEMMSB";
        const params = {
            SPEC_ITEM_NO : SPECITEMNO,
            TODAY : today,
        }
        this.$axios.get(url,{params}).then(res =>{
            this.Hoshu_KoumokuB_Item = res.data;
        }).catch(err=>{

        });
    },
    Hoshu_Check_GetHoshu_SPSCITEMMSB(item){
        console.log(item);
        this.Hoshu_ConditionA_Index = this.Hoshu_KoumokuA_Item.indexOf(item);
        var TODAY_STR = this.TODAY.substr(0,4)+this.TODAY.substr(5,2)+this.TODAY.substr(8,2);
        this.Hoshu_KoumokuB_Item  = [];
        if(item.BMS_TYPE == 'Y')
        {
            this.GetHoshu_SPSCITEMMSB(item.SPEC_ITEM_NO,TODAY_STR);
        }
    },
    GetCondition(item)
    {
        //  項目番号取得
        const Condition_Number = item.SPEC_ITEM_NO;
        this.Hoshu_ConditionB_Index = this.Hoshu_KoumokuB_Item.indexOf(item);
        //  適用条件の項目番号確認
        var IsAddAlready = false;
        var TargetIndex ="";
        // 追加したいデータは既に保存しているか？を確認
        // 保存された場合　IsAddAlready　=> true
        this.Hoshu_Teikiyou_Item.find(item=>{
            if(item.COND_SPEC_ITEM_NO == Condition_Number)
            {
                IsAddAlready = true;
                TargetIndex = this.Hoshu_Teikiyou_Item.indexOf(item);
                return true;
            }
        })
        // 既に保存された場合の処理
        if(IsAddAlready)
        {
            var IsValueInclude = false;
            this.Hoshu_Teikiyou_Item[TargetIndex].COND_CODE.find(Find_item =>{
                if(Find_item == item.SPEC_CODE)
                {
                    IsValueInclude = true;
                    return true;
                }
            })
            if(!IsValueInclude)
            {
                this.Hoshu_Teikiyou_Item[TargetIndex].COND_CODE.push(item.SPEC_CODE);
                this.Hoshu_Teikiyou_Item[TargetIndex].UPDATE_ST = true;
            }
        }
        // 保存されていない場合の処理
        else
        {
            const AddNewValue = {
                COND_SPEC_ITEM_NO : Condition_Number,
                DATA1 : "IN",
                COND_CODE : [item.SPEC_CODE],
                ITEM_NAME_LOC1 : this.Hoshu_KoumokuA_Item[this.Hoshu_ConditionA_Index].ITEM_NAME_LOC1,
                CONDITION_TYPE : "0",
                PLAN_LOC_TYPE : this.Hoshu_KoumokuA_Item[this.Hoshu_ConditionA_Index].PLAN_LOC_TYPE,
                PAT_NO_TYPE :  this.Hoshu_KoumokuA_Item[this.Hoshu_ConditionA_Index].PAT_NO_TYPE,
                PRODUCT_TYPE : this.Hoshu_KoumokuA_Item[this.Hoshu_ConditionA_Index].PRODUCT_TYPE,
                ISNEW : true,
                UPDATE_ST :true,
            }
            this.Hoshu_Teikiyou_Item.push(AddNewValue);
        }
        console.log(this.Hoshu_Teikiyou_Item);
    },
    DeleteCondition(index)
    {
        this.Hoshu_Teikiyou_Item.splice(index, 1);
    },
    // 保守画面
    // 在庫画面
    GetZKMS(PARTNO,SOKOCODE)
    {
        if(SOKOCODE !== undefined)
        {
            console.log("LOADDATA",SOKOCODE)
            const url = this.Main_URL + "KensakuBtnGet/ZKMS";
            const params = {
                PART_NO  : PARTNO, //部品コード
                SOKO_CODE : SOKOCODE,//倉庫コード
                USER_ID : this.userId, //ユーザーID
            }
            this.$axios.get(url,{params}).then(res =>{
                //もし、検査情報があればテーブルに格納する
                this.Zaiko_EditTable_Item =res.data.map(item =>{
                    item.RULES = [];
                    item.Setsumei_Error = false;
                    item.CHECK_LIST = [];
                    item.UPDATE_ST = false;
                    item.BEFORE_UPDATE_VALUE = item.FIELD_VALUE
                    return item;
                });
                this.Zaiko_EditTable_Item.forEach(Row =>{
                    var index = this.Zaiko_EditTable_Item.indexOf(Row);
                    if(SOKOCODE =="-新規製作-" && Row.FIELD_NAME == "WH_CODE")
                    {
                        this.Zaiko_EditTable_Item[index].AUTH_TYPE ="2";
                    }
                    this.GetZaikouSetsumei(index,Row.FIELD_NAME);  
                })
                if(SOKOCODE =="-新規製作-")
                {
                    alert("倉庫コードを入力してください！")
                }    
            }).catch(err =>{

            })
        }
        
    },
    //  在庫ドロップダウン
    GetZKMS_SOKOCODE()
    {
        this.Zaikou_SokoCode_Item =[];
        const url = this.Main_URL + "KensakuBtnGet/ZKMS_SOKOCODE";
        const params ={
            PART_NO :this.Header_Data[this.Header_Data.length-1].PART_NO,
        };
        this.$axios.get(url,{params}).then(res =>{
            res.data.forEach(item =>{
                this.Zaikou_SokoCode_Item.push(item.SOKO_CODE);
            });
            this.Zaikou_SokoCode_Item.push("-新規製作-");
            this.Zaikou_SokoCode_Select = this.Zaikou_SokoCode_Item[0];
             // 在庫情報テーブル取得
            this.GetZKMS(this.Header_Data[this.Header_Data.length-1].PART_NO,
                            this.Zaikou_SokoCode_Select);
            this.Get_FT_ZKMS_KOUBA();
             
        }).catch(err =>{

        })
    },
    // 在庫画面
    //  入出庫画面
    Iride_shuukou(){
        this.Ireide_checkbox_0 = !this.Ireide_checkbox_0;
        this.Ireide_checkbox_2 = this.Ireide_checkbox_0;
        this.Ireide_checkbox_4 = this.Ireide_checkbox_0;
    },
    Iride_nyuukou(){
        this.Ireide_checkbox_1 = !this.Ireide_checkbox_1;
        this.Ireide_checkbox_3 = this.Ireide_checkbox_1;
        this.Ireide_checkbox_5 = this.Ireide_checkbox_1;
    },
    //  入出庫画面
    //　BROWER用のSSO承認
    async asyncData () {
        // SSO 
        this.$store.dispatch('initSso');//OK
        // 初期処理(localStrageから戻す)
        // ログアウトページは権限不要
        await this.$store.dispatch('fujitecSso/initial');
        if (this.$route.path.match(/^[/]logout[/]?$/)) return true
        // ログイン情報なし 又は 期限切れ
        if (
            this.$store.state.fujitecSso.userId === null ||
            this.$store.state.fujitecSso.expire <= new Date().getTime()
        ) { 
            // query から SID を読み取る
            let sid = !this.$route.query ? null : this.$route.query.SID
            // SSO は hash 未対応のため、hash に SID がついていたら読み取る
            if (!sid && location.hash.match(/[?&]SID=([^&]+)$/)) {
            sid = location.hash.match(/[?&]SID=([^&]+)$/)[1]
            }
            // ログイン情報取得
            const result = await this.$store.dispatch('fujitecSso/checkLogin', sid)
            
            if (!result) {
                // 未ログイン時、ログイン
                const url = this.$store.state.fujitecSso.loginUrl
                // リダイレクト(currentUrlは SID が除去されている)
                // 20210428 リダイレクトだとencodeした文字列を変な値にするようになったので、location.href に変えた.
                const currentURL = (location.origin +location.pathname +location.search.replace(/[?&]SID=[^&]+($|&.*)/g, '$1') +location.hash.replace(/[?&]SID=[^&]+($|&.*)/g, '$1'));
                location.href =
                url + '?dest=' + encodeURIComponent(currentURL);
                return false
            } else if (sid) {
                // クエリーにSIDが存在
                // クエリーのSIDを除去
                const query = {}
                Object.assign(query, route.query)
                delete query.SID
                // リダイレクト(再読み込みしない?)
                redirect(route.path, query)
                return false
            }
        }
        // ログイン済. 権限OKをセット
        this.$store.dispatch('authorized')
        // SSO有効期限延長(無効にすると規定時間でSSO認証が必要となる)
        this.$store.dispatch('fujitecSso/extendExpire')
    },
    //  購買画面
    Panel1_click_event(){
        this.Koubai_Panel1_ST = !this.Koubai_Panel1_ST;
        this.CheckKoubaiPanel_ST();
    },
    Panel2_click_event(){
        this.Koubai_Panel2_ST = !this.Koubai_Panel2_ST;
        this.CheckKoubaiPanel_ST();
    },
    CheckKoubaiPanel_ST(){
        var CardHeight = this.Koubai_CHMSB_ST?54:60;
        var TableHeight = this.Koubai_CHMSB_ST?50:56;
        if(this.Koubai_Panel1_ST)
        {
            CardHeight -=16;
            TableHeight -=16;
        }
        if(this.Koubai_Panel2_ST)
        {
            CardHeight -=16;
            TableHeight -=16;
        }
        this.Koubai_Teihai_CardHeight  =  CardHeight.toString() + "vh";         
        this.Koubai_Teihai_TableHeight =  TableHeight.toString() + "vh";
    },
    //購買情報の優先テーブルと手配情報を取得
    GetCHMSA(PARTNO,PLANTNO){
        //手配情報高さ初期化
        this.Koubai_Teihai_CardHeight ="54vh";
        this.Koubai_Teihai_TableHeight ="50vh";
        //アコーディオン状態を初期化
        this.Koubai_Panel =[];
        this.Koubai_Panel1_ST = false;
        this.Koubai_Panel2_ST = false;
        //手配情報を取得
        this.getEditTable2(PARTNO,PLANTNO);
        //購買情報の優先リスト取得
        this.GetCHMSA_PRIORITY(PARTNO,PLANTNO);
        //可変単価テーブル取得
        this.GET_CHMSB(PARTNO,PLANTNO);
        //購買画面全テーブル長さ変更
        this.CheckKoubaiPanel_ST();
    },
    //購買情報の優先リストを取得
    GetCHMSA_PRIORITY(PARTNO,PLANTNO)
    {
        const url = this.Main_URL + "KensakuBtnGet/CHMSA";
        const params = {
            PART_NO  : PARTNO, //部品コード
            PLANT_NO : PLANTNO,//工場区分
        }
        this.$axios.get(url,{params}).then(res =>{
            //もし、検査情報があればテーブルに格納する
            if(res.data.length != 0)
            {
                this.Koubai_Torisaki_Item = res.data;
                this.GetCHMSA_TABLE(this.Koubai_Torisaki_Item[0]);
            }
            //ないであれば、テーブルを空にする
            else
            {
                this.Koubai_Torisaki_Item = [];
            }
        }).catch(err =>{

        })
    },
    //購買情報のテーブルを取得
    GetCHMSA_TABLE(ITEM)
    {
        this.Koubai_TANKA_INDEX ="";
        this.Koubai_SG_CODE = ITEM.SG_CODE;
        this.Koubai_PRIORITY = ITEM.PRIORITY;
        this.Koubai_VENDOR_CODE = ITEM.VENDOR_CODE;
        const url = this.Main_URL + "KensakuBtnGet/CHMSA_TABLE";
        const params = {
            PART_NO : this.Header_Data[this.Header_Data.length-1].PART_NO,
            PLANT_NO : this.Edit_Combobox_1_select.substring(0,1),
            USER_ID : this.userId, 
            SG_CODE : ITEM.SG_CODE,
            VENDOR_CODE : ITEM.VENDOR_CODE,
            PRIORITY :ITEM.PRIORITY,
        }
        this.$axios.get(url,{params}).then(res =>{
            this.Koubai_EditTable_Item = res.data.map((item,index) => {
                if(item.FIELD_NAME == "STD_CH_TANKA")
                {
                    //単価のインデックスを保存
                    this.Koubai_TANKA_INDEX = index;
                }
                if(item.FIELD_NAME == "CH_FC_FLAG")
                {
                    //フォーキャスト判定のインデックスを保存
                    this.Koubai_FC_FLAG_INDEX = index;
                }
                // 入力確認用プロパティ追加
                item.RULES = [];
                item.Setsumei_Error = false;
                item.CHECK_LIST = [];
                item.UPDATE_ST = false;
                item.BEFORE_UPDATE_VALUE = item.FIELD_VALUE
                return item;
            });
            //　説明と入力ルールの追加
            this.Koubai_EditTable_Item.forEach(Row =>{
                var index = this.Koubai_EditTable_Item.indexOf(Row);
                this.GetKoubaiSetsumei(index,Row.FIELD_NAME);
                //this.getKoubai_RULE(index,Row.FIELD_NAME);
            })
        }).catch(err =>{

        })
        
    },
    //作業コード別注文仕様DropDown取得
    GET_SGCODE(SGKUBUN){
        var ITEM =[];
        const url = this.Main_URL + "KensakuBtnGet/SG_CODE_DROPDOWN";
        const params = {
            SG_KUBUN : SGKUBUN,
        }
        this.$axios.get(url,{params}).then(res =>{
            res.data.forEach(item =>{
                ITEM.push(item.SG_CODE);
            })
            this.Koubai_SGCODE_Item = ITEM;
        }).catch(err =>{

        })
    },
    //作業コード別注文仕様テーブル取得
    GET_PPPMPOSPEC(){
        const url = this.Main_URL + "KensakuBtnGet/PPPMPOSPEC";
        const params = {
            PART_NO : this.Header_Data[this.Header_Data.length-1].PART_NO,
            WORK_CODE : this.Koubai_SGCODE_Select.substr(0,2),
            USER_ID : this.userId, 
        }
        this.$axios.get(url,{params}).then(res =>{
            this.Koubai_PPPMPOSPEC_Item = res.data.map(item => {
                // 入力確認用プロパティ追加
                item.RULES = [];
                item.Setsumei_Error = false;
                item.CHECK_LIST = [];
                item.UPDATE_ST = false;
                item.BEFORE_UPDATE_VALUE = item.FIELD_VALUE
                return item;
            });
        }).catch(err =>{

        })
    },
    //可変単価状態テーブル取得
    GET_CHMSB(PARTNO,PLANTNO){
        this.Koubai_CHMSB_ST=false;
        const url = this.Main_URL + "KensakuBtnGet/CHMSB";
        const params = {
            PART_NO : PARTNO,
            PLANT_NO : PLANTNO,
        }
        this.$axios.get(url,{params}).then(res =>{
            if(res.data.length != 0)
            {
                this.Koubai_CHMSB_ST=true;
                this.Koubai_KanhenTanka_Item = res.data;
                this.CheckKoubaiPanel_ST();
            }
        }).catch(err =>{

        })
    },
    //購買画面
    GetUserAUTH_ST(){
        const url = this.Main_URL + "KensakuBtnGet/AUTH_ST";
        const params = {
            USER_ID  : this.userId,
        }
        this.$axios.get(url,{params}).then(res =>{
            //返信されたデータをUser_Visionable_Listに保存
            res.data.map(item =>{
                //  P/S 権限
                if(item.ROLE_ID =='A1')
                {
                    switch(item.ROLE_VALUE){
                        case '0':
                            this.USER_PS_AUTH="システム権限"
                            break;
                        case '1':
                            this.USER_PS_AUTH="参照可"
                            break;
                        case '2':
                            this.USER_PS_AUTH="編集可"
                            break;
                    }
                }
                //  代替部品権限
                if(item.ROLE_ID =='A3')
                {
                    switch(item.ROLE_VALUE){
                        case '0':
                            this.USER_DAIKAE_AUTH="システム権限"
                            break;
                        case '1':
                            this.USER_DAIKAE_AUTH="参照"
                            break;
                        case '2':
                            this.USER_DAIKAE_AUTH="編集可"
                            break;
                        case '3':
                            this.USER_DAIKAE_AUTH="承認"
                            break;
                        case '4':
                            this.USER_DAIKAE_AUTH="生産"
                            break;
                    }
                }
                //  販売価格
                if(item.ROLE_ID =='A4')
                {
                    switch(item.ROLE_VALUE){
                        case '0':
                            this.USER_HANBAI_AUTH="システム権限"
                            break;
                        case '1':
                            this.USER_HANBAI_AUTH="参照可"
                            break;
                        case '2':
                            this.USER_HANBAI_AUTH="編集可"
                            break;
                        case '3':
                            this.USER_HANBAI_AUTH="承認"
                            break;
                    }
                }
            });
            
        }).catch(err=>{

        })
    },
    Get_FT_KOUBA(){
        this.FT_KOUBA = "";
        const url = this.Main_URL + "KensakuBtnGet/KOUBA";
        const params = {
            departmentId : this.departmentId
        }
        this.$axios.get(url,{params}).then(res=>{
           this.FT_KOUBA = res.data[0].DATA1;
           this.getEditTable2(this.Header_Data[this.Header_Data.length-1].PART_NO,this.FT_KOUBA);
           this.getSokoType(false);
        }).catch(err =>{

        })
    },
    Get_FT_ZKMS_KOUBA(){
        this.FT_ZKMS_KOUBA = "";
        this.FT_ZKMS_KOUBA_SETSUMEI ="";
        const url = this.Main_URL + "KensakuBtnGet/ZKMS_KOUBA";
        const params = {
            DATA4 : this.Zaikou_SokoCode_Select
        }
        this.$axios.get(url,{params}).then(res=>{
            this.FT_ZKMS_KOUBA = res.data[0].CM_CODE;
            this.FT_ZKMS_KOUBA_SETSUMEI = res.data[0].CM_CODE_SETUMEI;
            this.getEditTable2(this.Header_Data[this.Header_Data.length-1].PART_NO,this.FT_ZKMS_KOUBA);
        }).catch(err =>{

        })
    },
    GetUsersetting(item){
        const USER_ID = item.USER_CODE.substr(1,4);
        this.Serach_UserSetting = USER_ID;
        this.dialog_DepartmentName = false;
    },
    // getFirstPage　ユーザー初期画面を取得
    getFirstPage(){
        const cookie = new UniversalCookie();
        this.tab_select = parseInt(cookie.get('First_Page'));

        if(this.tab_select == '0')
        {
            //　手配テーブルを取得
            this.LoadTeihaiTable();
        }
        else if(this.tab_select == '1')
        {
            //　製作テーブルを取得
            this.LoadSeisakuTable();
        }
        else if(this.tab_select == '2')
        {
            //　購買テーブルを取得
            this.LoadKoubaiTable();
        }
        else if(this.tab_select == '3')
        {
            //　入出庫テーブルを取得
        }
        else if(this.tab_select == '4')
        {
            //　在庫テーブルを取得
            this.LoadZaikoTable();
        }
        else if(this.tab_select == '5')
        {
            //　保守テーブルを取得
            this.LoadHoshuTable();
        }
        else if(this.tab_select == '6')
        {
            //　PC/SPテーブルを取得
        }
        else if(this.tab_select == '7')
        {
            //　P/Sテーブルを取得
        }
        else if(this.tab_select == '8')
        {
            //　代替テーブルを取得
        }
    },
    getSettingChange(){
        var DBGRID_NAME = "";
        const index = this.userKoumokuItems.indexOf(this.userKoumokuSelect);
        if(index == 0)
        {
            DBGRID_NAME = 'PPPMMS'
        }
        else if(index == 1)
        {
            DBGRID_NAME = 'PPPMORDER'
        }
        else if(index == 2)
        {
            DBGRID_NAME = 'KTSTDTIME'
        }
        else if(index == 3)
        {
            DBGRID_NAME ="CHMSA"
        }
        else if(index == 4)
        {
            DBGRID_NAME ="ZKMS"
        }

        if(DBGRID_NAME != "")
        {
            this.getUser_VisList(this.userId,DBGRID_NAME);
        }

    },
    PostSettingSEQ(){
        //  DBGRID_NAME　現在選択しているデータベース名を取得
        var DBGRIDNAME = "";
        //  index　現在選択している対象情報　Dropdown　の順番を取得
        const index = this.userKoumokuItems.indexOf(this.userKoumokuSelect);
        //  選択している対象情報のデータベース名をDBGRID_NAME　に保存
        if(index == 0)
        {
            DBGRIDNAME = 'PPPMMS'
        }
        else if(index == 1)
        {
            DBGRIDNAME = 'PPPMORDER'
        }
        else if(index == 2)
        {
            DBGRIDNAME = 'KTSTDTIME'
        }
        else if(index == 3)
        {
            DBGRIDNAME ="CHMSA"
        }
        else if(index == 4)
        {
            DBGRIDNAME ="ZKMS"
        }

        //　　もし、なければデータベースに更新しない
        if(DBGRIDNAME != "")
        {   //　初期画面順番設定を取得
            const FP_value = this.userShougiItems.indexOf(this.userShougiSelect);
            //　First_Page Cookieに保存する
            const cookie = new UniversalCookie();
            cookie.set('First_Page',FP_value,{
                 path:"/",
                 maxAge: 12 * 4 * 60 * 60 * 24 * 7,
                });
            const url_FT = this.Main_URL + "KensakuBtnPost/SYDBGRID_CKVALUE";
            const url = this.Main_URL + "KensakuBtnPost/SYDBGRID";
            //  今日をYYYYMMDDに変更する
            const Today =((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)).substring(0,4)
                            +((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)).substring(5,7)
                            +((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)).substring(8,10)
            const params_FT ={
                    //  プライマリーキー
                    USER_ID           : this.userId,
                    DBGRID_NAME       : DBGRIDNAME,
                    //  更新する値
                    UPD_WHO           : this.userId,
                    UPD_WHEN          : Today,
            }
            this.$axios.post(url_FT,params_FT).then(res =>{
            }).catch(err=>{

            })
            //  表示項目をデータベースに更新
            this.Draggable_list_2.forEach((item,index)=>{
                const params = {
                    //  プライマリーキー
                    USER_ID           : this.userId, 
                    DBGRID_NAME       : DBGRIDNAME,
                    FIELD_NAME        : item.FIELD_NAME,
                    //  更新する値
                    FIELD_NAME_J      : item.FIELD_NAME_J,
                    SEQ_NO            : item.SEQ_NO,
                    COL_VISIBLE       : '',
                    UPD_WHO           : this.userId,
                    UPD_WHEN          : Today,
                }
                if(index == 0)
                {
                    this.$axios.post(url_FT,params).then(res =>{
                    }).catch(err=>{

                    })
                }
                this.$axios.post(url,params).then(res =>{
                }).catch(err=>{

                })
            })

            //  表示可能な全項目をデータベースに更新
            this.Draggable_list_1.forEach((item) =>{
                
                const params = {
                    //  プライマリーキー
                    USER_ID           : this.userId,
                    DBGRID_NAME       : DBGRIDNAME,
                    FIELD_NAME        : item.FIELD_NAME,
                    //  更新する値
                    FIELD_NAME_J      : item.FIELD_NAME_J,
                    SEQ_NO            : item.SEQ_NO.match(/^\d{3}$/)?item.SEQ_NO:item.SEQ_NO<10 ? '00'+item.SEQ_NO:'0' + item.SEQ_NO,
                    COL_VISIBLE       : '1',
                    UPD_WHO           : this.userId,
                    UPD_WHEN          : Today,
                }
                this.$axios.post(url,params).then(res =>{
                }).catch(err=>{

                })
            })
            alert("保存が完了。")
        }
    },
    getAllUserList(){
        const Newlist = this.Draggable_list_1.concat(this.Draggable_list_2).sort((a,b) =>{
            return (a.SEQ_NO < b.SEQ_NO)?-1:1;
        })
        this.Draggable_list_2 = Newlist;
        this.Draggable_list_1 = [];
    },
    getAllList(){   
        const Newlist = this.Draggable_list_1.concat(this.Draggable_list_2).sort((a,b) =>{
            return (a.SEQ_NO < b.SEQ_NO)?-1:1;
        })
        this.Draggable_list_1 = Newlist;
        this.Draggable_list_2 = [];
    },
    getDepartmentUser(){
        const url =this.Main_URL + "KensakuBtnGet/UserSetting"
        const params = {
            PROJECT_ID : 'PMRA0100'
        }
        this.$axios.get(url,{params}).then(res =>{
            this.User_Setting_Item = res.data
        }).catch(err=>{

        })
    },
    //  draggslot 表示項目のSEQ_NOを並び順をテーブル順番を変更する
    draggSlot(){
        //  Left_list  表示可能な全項目
        var Left_list = [];
        //  表示可能な全項目の順番を取得
        this.Draggable_list_1.forEach(item => Left_list.push(Number(item.SEQ_NO)));
        //　表示可能な全項目の順番を並び順の通りに並び替え
        // [5,3,2,1] => [1,2,3,5]
        Left_list.sort((a, b) => a - b);
        var count = 1
        //  表示項目をテーブルの順番通りに並び替え
        this.Draggable_list_2.forEach((item,index) =>{
            //　もし、 表示可能な全項目の順番に一致したらその順番を飛ばします
            while(Left_list[0] == count)
            {
                Left_list.shift();
                count++;
            }
            //　保存先のデータベースが固定フォーマットのため、それを対応するためデータを変更する
            //  '5'  => '005'  
            if(count < 10)
            {
                this.Draggable_list_2[index].SEQ_NO = '00'+count
            }
            //  '10' => '010'
            else
            {
                this.Draggable_list_2[index].SEQ_NO = '0'+count
            }   
            count++;
        })
        //  データベースに更新する開始
        this.PostSettingSEQ()
    },
    handleChange() {
        this.Draggable_list_1 = this.Draggable_list_1.sort(function(a,b){
           return (a.SEQ_NO < b.SEQ_NO)?-1:1;
        })
    },
    inputChanged(value) {
      this.activeNames = value;
    },
    getComponentData() {
      return {
        on: {
          change: this.handleChange,
          input: this.inputChanged
        },
        attrs:{
          wrap: true
        },
        props: {
          value: this.activeNames
        }
      };
    },
    //ユーザー設定画面
    getUsersettingDialog(){
        const cookie = new UniversalCookie();
        this.settingDialog = true;
        this.userShougiSelect = this.userShougiItems[cookie.get('First_Page')];
        //getUser_VisList(ユーザーID、閲覧したいデータベース名)
        this.getUser_VisList(this.userId,"PPPMMS");
        this.GetUserAUTH_ST();
    },
    getAnotherUserSetting()
    {
        var DBGRIDNAME = "";
        //  index　現在選択している対象情報　Dropdown　の順番を取得
        const index = this.userKoumokuItems.indexOf(this.userKoumokuSelect);
        //  選択している対象情報のデータベース名をDBGRID_NAME　に保存
        if(index == 0)
        {
            DBGRIDNAME = 'PPPMMS'
        }
        else if(index == 1)
        {
            DBGRIDNAME = 'PPPMORDER'
        }
        else if(index == 2)
        {
            DBGRIDNAME = 'KTSTDTIME'
        }
        else if(index == 3)
        {
            DBGRIDNAME ="CHMSA"
        }
        else if(index == 4)
        {
            DBGRIDNAME ="ZKMS"
        }

        //　　もし、なければデータベースに更新しない
        if(DBGRIDNAME != "")
        {   //　初期画面順番設定を取得   
            this.getUser_VisList(this.Serach_UserSetting,DBGRIDNAME);
        }
    },
    //ユーザー設定画面の表示項目リスト取得
    getUser_VisList(USERID,DBNAME){
        const url = this.Main_URL + "KensakuBtnGet/UserSettingVis"
        const params = {
            USER_ID : USERID,
            DBGRID_NAME : DBNAME,
        }
        this.$axios.get(url,{params}).then(res =>{
            //返信されたデータをUser_Visionable_Listに保存
            this.User_All_List = res.data;
            this.Draggable_list_1 = this.User_All_List.filter(list => list.COL_VISIBLE == '1');
            this.Draggable_list_2 = this.User_All_List.filter(list => (list.COL_VISIBLE == null)&&(list.SEQ_NO.match(/^\d{3}$/)));
        }).catch(err=>{

        })
    },
    dragList(event,dragId,dragCOL){
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.dropEffect = 'move'
        event.dataTransfer.setData('list-id',dragId)
        if (dragCOL == null)
        {
            dragCOL = '0';
        }
        event.dataTransfer.setData('list-col',dragCOL)
    },
    dropList(event , dragCOL){
        const dragId = event.dataTransfer.getData('list-id');
        const dragCol =event.dataTransfer.getData('list-col');
        const dragList = this.User_All_List.find(list =>  list.SEQ_NO == dragId);
        dragList.COL_VISIBLE = dragCOL == '0'?null:dragCOL =='1' ? '1':dragList.COL_VISIBLE;
        if(dragCol == '0')
        {
            this.User_All_List_Select = this.User_All_List.filter(list => list.COL_VISIBLE =='1').indexOf(this.User_All_List.find(item => item.SEQ_NO == dragId))
        }
        else if(dragCol == '1')
        {
            this.User_Visionable_List_Select = this.User_All_List.filter(list => list.COL_VISIBLE ==null).indexOf(this.User_All_List.find(item => item.SEQ_NO == dragId))
        }
    },
    //upload() メソッドはエクセルファイルの最初のページのデータをJSONのフォーマットに収納する
    upload() {
        const reader = new FileReader()
        const load = () => {
            //  $xlsx はSheetJSのAPIを使用するための値
            //  下記のURLで参照できます
            //　URL : https://docs.sheetjs.com/docs/api/parse-options/
            //  使用する前に　Plugins/vue-js-xlsx.jsで$xlsxを定義必要
            //  This.$xlsx.toJson(データ,オプション)
            const jsonData = this.$xlsx.toJson(reader.result, {
            parsingOpts: {
            //　格納するタイプ設定
                type: 'array'
            },
            //  格納するSheetのページ設定
            //  sheetIndex: 0　は最初ページの設定
            sheetIndex: 0
            })
            //  JSONフォーマットで格納させたデータはExcelTable_Itemに収納する
            this.ExcelTable_Item = jsonData
            // jsonデータを必要な形に整形する
        }
        reader.onload = load
        reader.readAsArrayBuffer(this.file)
    },
    //  エクセル取り込み画面内に表示しているデータをKTSTDTIMEデータペースに登録
    Excel_Upload(){
        const url = this.Main_URL + "KensakuBtnPost/KTSTDTIME_Excel";
        //　テーブルのデータを一列ずつに更新する
        this.ExcelTable_Item.forEach(item =>{
            //　req 更新するデータを格納値
            var req={};
            //  テーブルの項目名をデータペースに使用する名称に変更
            req["PLANT_NO"]=item["工場区分"];
            req["PART_NO"]=item["部品コード"];
            req["KT_CODE"]=item["工程コード"];
            req["SEQ_NO"]=item["工程序列"];
            req["WC_CODE"]=item["ワークセンター"];
            req["CC_CODE"]=item["コストセンター"];
            req["SG_CODE"]=item["作業コード"];
            req["SHAIN_KUBUN"]=item["社員区分"];
            req["VENDOR_CODE"]=item["業者コード"];
            req["SG_KUBUN"]=item["作業区分"];
            req["MACHINE_TYPE"]=item["機械判定"];
            req["SETUP_STDTIME"]=item["準段取り時間（分）"];
            req["WORK_STDTIME"]=item["標準作業時間（分）"];
            req["SEI_STDPCNT"]=item["標準作業正社員比率"];
            req["SG_LEADTIME"]=item["リードタイム"];
            req["UPD_WHO"]=item["更新者"];
            req["UPD_WHEN"]=item["更新日時"];
            req["ENT_DATE"]=item["登録日"];
            req["KIJI"]=item["記事"];
            const params = req;
            //  データベースに更新を開始
            this.$axios.post(url,params).then(
            
            ).catch(err=>{
                
            })
        })
        //処理が終了したら警告画面を非表示にする
        this.Excel_Ensure = false;
    },
    arrangeData() {
      const reader = new FileReader()
      const load = () => {
        const jsonData = this.$xlsx.toJson(reader.result, {
          parsingOpts: {
            type: 'array'
          },
          sheetIndex: 1
        })
        // jsonデータを必要な形に整形する
      }
      reader.onload = load
      reader.readAsArrayBuffer(this.dropFile)
    },
    GetHyouJunMaster(item){
        if(item != null)
        {
            const url = this.Main_URL + "KensakuBtnGet/Seisaku";
            const params = {
                PART_NO : this.Header_Data[this.Header_Data.length-1].PART_NO,
                KT_CODE : this.KT_CODE_SELECT,
                PLANT_NO :this.Edit_Combobox_1_select.substr(0,1),//仮
                SEQ_NO : item.SEQ_NO,
                USER_ID : this.userId,
                TABLE_NAME :"KTSTDTIME",
                CC_CODE : item.CC_CODE,
                WC_CODE : item.WC_CODE,
                SG_CODE :item.SG_CODE,
            }
            this.$axios.get(url,{params}).then(res =>{
                this.STD_EditInfo_Item = res.data.map(item => {
                    item.RULES = [];
                    item.Setsumei_Error = false;
                    item.CHECK_LIST = [];
                    item.UPDATE_ST = false;
                    item.BEFORE_UPDATE_VALUE = item.FIELD_VALUE
                    return item;
                });
                this.STD_EditInfo_Item.forEach(Row =>{
                    var index = this.STD_EditInfo_Item.indexOf(Row);
                    this.getSTD_Setsumei(index,Row.FIELD_NAME);
                    this.getSTD_RULE(index,Row.FIELD_NAME);
                })
            }).catch(err=>{

            })
        }
    },
    //  タブメソッド
    LoadTeihaiTable(){
        if(this.Header_Data[this.Header_Data.length-1].PART_NO != "")
        {
            //初期画面は承認された改訂を表示する
            this.Header_Data.forEach(item =>{
                if(item.APP_CUR_TYPE == 1)
                {
                    this.getEditTable(item.PART_NO,item.PART_REV_NO);
                    this.Get_FT_KOUBA();
                }
            })
        }
    },
    LoadSeisakuTable(){
        if(this.Header_Data[this.Header_Data.length-1].PART_NO != "")
        {
            this.EditInfo2_Value=[];
            this.Get_FT_KOUBA();
            //this.getKouteiJunjo(this.Header_Data[this.Header_Data.length-1].PART_NO,this.FT_KOUBA);
        }
    },
    LoadKoubaiTable(){
        if(this.Header_Data[this.Header_Data.length-1].PART_NO != "")
        {
            //初期画面は承認された改訂を表示する
            this.Header_Data.forEach(item =>{
                if(item.APP_CUR_TYPE == 1)
                {
                    this.getEditTable(item.PART_NO,item.PART_REV_NO);
                    this.Get_FT_KOUBA();
                }
            })
            //作業コード別注文仕様DropDown取得
            this.GET_SGCODE('G');
        }
    },
    //  在庫初期ページを取得
    LoadZaikoTable()
    {
        // もし部品コードが既に選択している場合
        if(this.Header_Data[this.Header_Data.length-1].PART_NO != "")
        {
            // 在庫情報ドロップダウン+テーブル取得
            this.GetZKMS_SOKOCODE();
            // PM基本情報テーブル取得
            this.Header_Data.forEach(item =>{
                if(item.APP_CUR_TYPE == 1)
                {
                    this.getEditTable(item.PART_NO,item.PART_REV_NO);
                    // 手配情報テーブル取得
                }
            })
        }
    },
    // 保守初期ページを取得
    LoadHoshuTable()
    {
        var TODAY_STR = this.TODAY.substr(0,4)+this.TODAY.substr(5,2)+this.TODAY.substr(8,2);
        this.Hoshu_Dropdown_Item =[];
        // もし部品コードが既に選択している場合
        if(this.Header_Data[this.Header_Data.length-1].PART_NO != "")
        {
            this.Header_Data.forEach(item =>{
                // 保守情報ドロップダウン取得
                var NEW_PART_REV_NO =item.PART_REV_NO +":"+item.REV_START_DATE + " ~ " +item.REV_STOP_DATE;
                this.Hoshu_Dropdown_Item.push(NEW_PART_REV_NO)
                if(item.APP_CUR_TYPE == 1)
                {
                    // 保守情報テーブル取得
                    this.GetHoshu(item.PART_NO,item.PART_REV_NO);
                    this.Hoshu_Dropdown_Select = item.PART_REV_NO;
                    // P/M基本情報テーブル取得
                    this.getEditTable(item.PART_NO,item.PART_REV_NO);
                }
                
            })
        }
        // 項目情報テーブル取得
        this.GetHoshu_SPSCITEMMSA('1',TODAY_STR);
    },
    //  タブメソッド
    check_date(value)
    {
        if(typeof value == "string"){
            var a = value.match(/^\d{8}$/);
            if (a) { 
                var y = parseInt(a[0].substring(0,4));
                var m = parseInt(a[0].substring(5,6));
                var d = parseInt(a[0].substring(7,8));
                var x = new Date(y, m, d);
                return (y == x.getFullYear() && m == x.getMonth() && d == x.getDate());
            }
        }
        return false;
    },
    convertPMtoNA(name,value){
        if(name =='PARTCHG_TYPE')
        {
            this.NRPMA_POST["REV_GOKAN"]=value;
        }
        if(name=='PART_NAME_LOC2')
        {
            this.NRPMA_POST["PART_NAME"]=value;
        }

        if(name=='PART_NAME_LOC1')
        {
            this.NRPMA_POST["PART_NAME_J"]=value;
        }

        if(name=='MAKER_NAME_LOC')
        {
            this.NRPMA_POST["MAKER_NAME"]=value;
        }

        if(name=='MAKER_PART_NO')
        {
            this.NRPMA_POST["MAKER_KATABAN"]=value;
        }

        if(name=='PM_UNIT')
        {
            this.NRPMA_POST["TANI"]=value;
        }

        if(name=='RAW_MATERIAL')
        {
            this.NRPMA_POST["RAW_MATL"]=value;
        }

        if(name=='PO_WIDTH')
        {
            this.NRPMA_POST["STD_W"]=value;
        }

        if(name=='PO_LENGTH')
        {
            this.NRPMA_POST["STD_L"]=value;
        }

        if(name=='PS_CALC_CODE')
        {
            this.NRPMA_POST["PS_KANSAN"]=value;
        }

        if(name=='PO_SPEC1')
        {
            this.NRPMA_POST["CH_SIYO1"]=value;
        }

        if(name=='PO_SPEC2')
        {
            this.NRPMA_POST["CH_SIYO2"]=value;
        }

        if(name=='PO_SPEC3')
        {
            this.NRPMA_POST["CH_SIYO3"]=value;
        }

        if(name=='MACHINE_TYPE')
        {
            this.NRPMA_POST["KISHU_BUNRUI"]=value;
        }

        if(name=='PDM_TYPE')
        {
            this.NRPMA_POST["PDM_FLAG"]=value;
        }

        if(name=='REMARKS_LOC')
        {
            this.NRPMA_POST["TEKIYO"]=value;
        }

        if(name=='INSPECT_SHEET')
        {
            this.NRPMA_POST["INSPECT_SH"]=value;
        }

        if(name=='TEST_REPORT')
        {
            this.NRPMA_POST["TEST_REP"]=value;
        }

        if(name=='MILL_SHEET')
        {
            this.NRPMA_POST["MILL_SH"]=value;
        }

        if(name=='PRODUCT_SIGN')
        {
            this.NRPMA_POST["PRD_SIGN"]=value;
        }

        if (name == 'PART_NO')
        {
            this.NRPMA_POST["PART_NO"]=value;
        }

        if (name == 'PART_REV_NO')
        {
            this.NRPMA_POST["REV_PART_NO"]=value;
        }

        if (name == 'DWG_NO')
        {
            this.NRPMA_POST["DWG_NO"]=value;
        }

        if (name == 'PM_TYPE')
        {
            this.NRPMA_POST["PM_TYPE"]=value;
        }

        if (name == 'PART_TYPE')
        {
            this.NRPMA_POST["PART_TYPE"]=value;
        }

        if (name == 'PRODUCT_CODE')
        {
            this.NRPMA_POST["PRODUCT_CODE"]=value;
        }

        if (name == 'THICKNESS')
        {
            this.NRPMA_POST["THICKNESS"]=value;
        }

        if (name == 'DENSITY')
        {
            this.NRPMA_POST["DENSITY"]=value;
        }

        if (name == 'WEIGHT')
        {
            this.NRPMA_POST["WEIGHT"]=value;
        }

        if (name == 'SHP_LABEL_RULE')
        {
            this.NRPMA_POST["SHP_LABEL_RULE"]=value;
        }

        if (name == 'SUPPLEMENT')
        {
            this.NRPMA_POST["SUPPLEMENT"]=value;
        }

        if (name == 'START_DATE')
        {
            this.NRPMA_POST["START_DATE"]=value;
        }

        if (name == 'REV_START_DATE')
        {
            this.NRPMA_POST["REV_START_DATE"]=value;
        }

        if (name == 'ORDER_STOP_DATE')
        {
            this.NRPMA_POST["ORDER_STOP_DATE"]=value;
        }

        if (name == 'STOP_DATE')
        {
            this.NRPMA_POST["STOP_DATE"]=value;
        }

        if (name == 'UPD_WHO')
        {
            this.NRPMA_POST["UPD_WHO"]=value;
        }

        if (name == 'UPD_WHEN')
        {
            this.NRPMA_POST["UPD_WHEN"]=value;
        }

        if (name == 'CERT_CONFORM')
        {
            this.NRPMA_POST["CERT_CONFORM"]=value;
        }

        if (name == 'TRACE_TYPE')
        {
            this.NRPMA_POST["TRACE_TYPE"]=value;
        }

        if (name == 'CH_STOP_DATE')
        {
            this.NRPMA_POST["CH_STOP_DATE"]=value;
        }

        if (name == 'MAINT_PART_NAME')
        {
            this.NRPMA_POST["MAINT_PART_NAME"]=value;
        }

        if (name == 'EXP_CODE')
        {
            this.NRPMA_POST["EXP_CODE"]=value;
        }

        if (name == 'MAINT_PARTS_TYPE')
        {
            this.NRPMA_POST["MAINT_PARTS_TYPE"]=value;
        }

        if (name == 'RECYCLE_TYPE')
        {
            this.NRPMA_POST["RECYCLE_TYPE"]=value;
        }

        if (name == 'EMG_TYPE')
        {
            this.NRPMA_POST["EMG_TYPE"]=value;
        }

        if (name == 'MAINT_CONTRACT_TYPE')
        {
            this.NRPMA_POST["MAINT_CONTRACT_TYPE"]=value;
        }

        if (name == 'STD_COST_UPD_TYPE')
        {
            this.NRPMA_POST["STD_COST_UPD_TYPE"]=value;
        }
    },
    convertPMtoNH(name,value){
        if ( name == 'PART_NO')
        {
            this.NRPMHIS_POST["PART_NO"]=value;
        }
        if ( name == 'PART_REV_NO')
        {
            this.NRPMHIS_POST["REV_PART_NO"]=value;
        }
        if ( name == 'PARTCHG_TYPE')
        {
            this.NRPMHIS_POST["REV_GOKAN"]=value;
        }
        if ( name == 'REV_START_DATE')
        {
            this.NRPMHIS_POST["REV_START_DATE"]=value;
        }
        if ( name == 'UPD_WHO')
        {
            this.NRPMHIS_POST["UPD_WHO"]=value;
        }
        if ( name == 'UPD_WHEN')
        {
            this.NRPMHIS_POST["UPD_WHEN"]=value;
        }
        if ( name == 'REV_STOP_DATE')
        {
            this.NRPMHIS_POST["REV_STOP_DATE"]=value;
        }
    },
    convertPOtoNB(name,value){
        if ( name == 'PART_NO')
        {
            this.NRPMB_POST["PART_NO"]=value;
        }
        if ( name == 'PLANT_NO')
        {
            this.NRPMB_POST["PLANT_NO"]=value;
        }
        if ( name == 'MFG_TYPE')
        {
            this.NRPMB_POST["MFG_TYPE"]=value;
        }
        if ( name == 'STOCK_TYPE')
        {
            this.NRPMB_POST["STOCK"]=value;
        }
        if ( name == 'AUTO_WAREHOUSE_CODE')
        {
            this.NRPMB_POST["AUTO_SOKO"]=value;
        }
        if ( name == 'ORDER_TYPE')
        {
            this.NRPMB_POST["ORDER_TYPE"]=value;
        }
        if ( name == 'TRANS_STOCK_TYPE')
        {
            this.NRPMB_POST["ORDER_AUTO"]=value;
        }
        if ( name == 'ROUTING_CODE')
        {
            this.NRPMB_POST["KT_CODE"]=value;
        }
        if ( name == 'ARR_BRANCH_CODE')
        {
            this.NRPMB_POST["TE_TENSHO"]=value;
        }
        if ( name == 'ARR_WHO')
        {
            this.NRPMB_POST["TE_TANTO"]=value;
        }
        if ( name == 'PO_BRANCH_CODE')
        {
            this.NRPMB_POST["CH_TENSHO"]=value;
        }
        if ( name == 'PO_WHO')
        {
            this.NRPMB_POST["CH_TANTO"]=value;
        }
        if ( name == 'PO_TYPE')
        {
            this.NRPMB_POST["CH_HANTEI"]=value;
        }
        if ( name == 'FILING_REC_CODE1')
        {
            this.NRPMB_POST["TEISHUTU_CD_1"]=value;
        }
        if ( name == 'FILING_REC_CODE2')
        {
            this.NRPMB_POST["TEISHUTU_CD_2"]=value;
        }
        if ( name == 'QC_BRANCH_CODE')
        {
            this.NRPMB_POST["QC_TENSHO"]=value;
        }
        if ( name == 'ABC_TYPE')
        {
            this.NRPMB_POST["ABC_TYPE"]=value;
        }
        if ( name == 'SCRAP_PCNT')
        {
            this.NRPMB_POST["SCRAP_PCNT"]=value;
        }
        if ( name == 'BUCKET')
        {
            this.NRPMB_POST["BUCKET"]=value;
        }
        if ( name == 'MFG_LOT_SIZE')
        {
            this.NRPMB_POST["MFG_LOT_SIZE"]=value;
        }
        if ( name == 'MFG_LEADTIME')
        {
            this.NRPMB_POST["MFG_LEADTIME"]=value;
        }
        if ( name == 'STOP_DATE')
        {
            this.NRPMB_POST["STOP_DATE"]=value;
        }
        if ( name == 'UPD_WHO')
        {
            this.NRPMB_POST["UPD_WHO"]=value;
        }
        if ( name == 'UPD_WHEN')
        {
            this.NRPMB_POST["UPD_WHEN"]=value;
        }
        if ( name == 'ENT_WHEN')
        {
            this.NRPMB_POST["ENT_DATE"]=value;
        }
        if ( name == 'STOCK_CODE')
        {
            this.NRPMB_POST["STOCK_KANRI"]=value;
        }
        if ( name == 'MATL_BRANCH_CODE1')
        {
            this.NRPMB_POST["HOZAI_KANRI1"]=value;
        }
        if ( name == 'MATL_BRANCH_CODE2')
        {
            this.NRPMB_POST["HOZAI_KANRI2"]=value;
        }
        if ( name == 'MATL_BRANCH_CODE3')
        {
            this.NRPMB_POST["HOZAI_KANRI3"]=value;
        }
        if ( name == 'MATL_BRANCH_CODE4')
        {
            this.NRPMB_POST["HOZAI_KANRI4"]=value;
        }
        if ( name == 'MATL_BRANCH_CODE5')
        {
            this.NRPMB_POST["HOZAI_KANRI5"]=value;
        }
        if ( name == 'MATL_BRANCH_CODE6')
        {
            this.NRPMB_POST["HOZAI_KANRI6"]=value;
        }
        if ( name == 'MATL_BRANCH_CODE7')
        {
            this.NRPMB_POST["HOZAI_KANRI7"]=value;
        }
        if ( name == 'MATL_BRANCH_CODE8')
        {
            this.NRPMB_POST["HOZAI_KANRI8"]=value;
        }
        if ( name == 'MATL_BRANCH_CODE9')
        {
            this.NRPMB_POST["HOZAI_KANRI9"]=value;
        }
        if ( name == 'MATL_BRANCH_CODE10')
        {
            this.NRPMB_POST["HOZAI_KANRI10"]=value;
        }
        if ( name == 'MATL_BRANCH_CODE11')
        {
            this.NRPMB_POST["HOZAI_KANRI11"]=value;
        }
        if ( name == 'MATL_BRANCH_CODE12')
        {
            this.NRPMB_POST["HOZAI_KANRI12"]=value;
        }
        if ( name == 'MFG_MIN_LOT_SIZE')
        {
            this.NRPMB_POST["MFG_MIN_LOT_SIZE"]=value;
        }
        if ( name == 'SET_COLOR_TYPE')
        {
            this.NRPMB_POST["SET_COLOR_FLAG"]=value;
        }
        if ( name == 'WCCC_FOLLOW_TYPE')
        {
            this.NRPMB_POST["WCCC_FOLLOW_FLAG"]=value;
        }
        if ( name == 'AUTO_ARR_COMP_DATE')
        {
            this.NRPMB_POST["AUTO_TE_COMP_DATE"]=value;
        }
        if ( name == 'TRACE_TYPE')
        {
            this.NRPMB_POST["TRACE_FLAG"]=value;
        }
        if ( name == 'VENDOR_SUPPLY_TYPE')
        {
            this.NRPMB_POST["VENDOR_SIKYU_FLAG"]=value;
        }
        if ( name == 'AUTO_CH_REQ_TYPE')
        {
            this.NRPMB_POST["AUTO_CH_REQ_FLAG"]=value;
        }
        if ( name == 'YEAR_CH_QTY')
        {
            this.NRPMB_POST["YEAR_CH_QTY"]=value;
        }
        if ( name == 'LOT_PRINT_TYPE')
        {
            this.NRPMB_POST["LOT_PRINT_TYPE"]=value;
        }
        if ( name == 'MATL_AUTO_ORD_TYPE')
        {
            this.NRPMB_POST["HOZAI_AUTO_ORD_FLAG"]=value;
        }
        if ( name == 'TRANSFER_REQ_PLANT')
        {
            this.NRPMB_POST["TRANSFER_REQ_PLANT"]=value;
        }
        if ( name == 'FC_FLAG')
        {
            this.NRPMB_POST["FC_FLAG"]=value;
        }
        if ( name == 'STOCK_PLAN_COUNT')
        {
            this.NRPMB_POST["STOCK_PLAN_COUNT"]=value;
        }
        if ( name == 'STOCK_PLAN_TYPE')
        {
            this.NRPMB_POST["STOCK_PLAN_TYPE"]=value;
        }
        if ( name == 'ISSUE_FC_METHOD')
        {
            this.NRPMB_POST["ISSUE_FC_METHOD"]=value;
        }
        if ( name == 'FM_ISSUE_FC_RATE')
        {
            this.NRPMB_POST["FM_ISSUE_FC_RATE"]=value;
        }
        if ( name == 'POG_ISSUE_FC_RATE')
        {
            this.NRPMB_POST["POG_ISSUE_FC_RATE"]=value;
        }
    },
    setListener(){
      this.$nuxt.$on('updateHeader',this.setHeader)
    },
    setHeader(header){
      if(header)
      {
        this.Header_Data =this.headerItem;
        this.showHeader = true;
        this.getHeaderPic(this.Header_Data[this.Header_Data.length-1].PART_NO);
      }
    },
    open_new_tab(url){
      if(url != "")
      {
        url = "/pm/searchpage/"+"?PART_NO="+url;
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
        this.getEditTable(item.PART_NO,item.PART_REV_NO);
        this.Get_FT_KOUBA();
    },
    getKouteiJunjo(Part_no,Plant_no){
        var List_KT =[];
        const url = this.Main_URL + "KensakuBtnGet/Seisaku";
        const params = {
            PART_NO : Part_no,
            PLANT_NO : Plant_no,
        }
        this.$axios.get(url,{params}).then(res =>{
            //Comboboxに入れる
            res.data.forEach(item=>{
                List_KT.push(item.KT_CODE)
            })
            this.KT_CODE_ITEM = List_KT;
            this.KT_CODE_SELECT = this.KT_CODE_ITEM[0];
            this.getKouteiJunjo_table(Part_no,this.KT_CODE_ITEM[0],Plant_no);
        }).catch(err=>{

        })
    },
    getKouteiJunjo_table(Part_no,Kt_code,Plant_no)
    {
        const url = this.Main_URL + "KensakuBtnGet/Seisaku";
        const params = {
            KT_CODE : Kt_code,
            PART_NO : Part_no,
            PLANT_NO :Plant_no,
        }
        this.$axios.get(url,{params}).then(res =>{
            //Data_tableに入れる
            this.KouteiJunjoTable_Item = res.data;
        }).catch(err=>{

        })
    },
    getEditTable(Part_NO,Rev_NO){
        const url = this.Main_URL + "KensakuBtnGet";
        const params = {
            Edit_PART_NO : Part_NO,
            Edit_REV_NO : Rev_NO,
            USER_ID : this.userId,
        }
        this.$axios.get(url,{params}).then(res =>{
            this.EditInfo_Value = res.data.map(item => {
                item.RULES = [];
                item.Setsumei_Error = false;
                item.CHECK_LIST = [];
                item.UPDATE_ST = false;
                item.BEFORE_UPDATE_VALUE = item.FIELD_VALUE
                return item;
            });
            this.EditInfo_Value.forEach(Row =>{
                var index = this.EditInfo_Value.indexOf(Row);
                this.getEditTableSetsumei(index,Row.FIELD_NAME);
                this.getRule(index,Row.FIELD_NAME);
            })
        }).catch(err=>{

        })
    }, 
    getRule(index,item){
        if(this.EditInfo_Value[index].AUTH_TYPE == "2")
        {
            if(item=="TRACE_TYPE")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.ZeroOneTwo );
            }
            if(item=="REMARKS_ENG")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.lengthThan200 );
            }
            if(item=="REMARKS_LOC")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.lengthThan200 );
            }
            if(item=="PO_SPEC1")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.lengthThan50 );
            }
            if(item=="PO_SPEC2")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.lengthThan50 );
            }
            if(item=="PO_SPEC3")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.lengthThan50 );
            }
            if(item=="MAINT_PART_NAME")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.lengthThan200 );
            }
            if(item=="MAINT_PARTS_TYPE")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.ZeroOneTwo );
            }
            if(item=="RECYCLE_TYPE")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.ZeroOne );
            }
            if(item=="EMG_TYPE")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.ZeroOne );
            }
            if(item=="MAINT_CONTRACT_TYPE")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.ZeroOneTwo );
            }
            if(item=="PART_DESCRIPTION")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.lengthThan400 );
            }
            if(item=="REPLACE_REASON")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.lengthThan400 );
            }
            if(item=="REPLACE_TIME")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.IntegetThan7 );
                this.EditInfo_Value[index].RULES.push(this.formRules.FewThan2 );
            }
            if(item=="INSPECT_SHEET")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.VoidOne);
            }
            if(item=="CERT_CONFORM")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.VoidOne );
            }
            if(item=="TEST_REPORT")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.VoidOne );
            }
            if(item=="MILL_SHEET")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.VoidOne );
            }
            if(item=="SELLING_PRICE_TYPE")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.ZeroOne );
            }
            if(item=="START_DATE")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.Datefomat );
            }
            if(item=="ORDER_STOP_DATE")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.Datefomat );
            }
            if(item=="STOP_DATE")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.Datefomat );
            }
            if(item=="M_START_DATE")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.Datefomat );
            }
            if(item=="M_ORDER_STOP_DATE")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.Datefomat );
            }
            if(item=="M_STOP_DATE")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.Datefomat );
            }
            if(item=="CH_STOP_DATE")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.Datefomat );
            }
            if(item=="STD_COST_UPD_TYPE")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.voidZeroOne );
            }
            if(item=="PHOTO_TYPE")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.voidZeroOne );
            }
            if(item=="RECORD_TYPE")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.RecordCheck );
            }
            
            if(item=="MODULE_TYPE")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.ModuleCheck );
            }
            if(item=="PART_NAME_ENG")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.lengthThan100 );
                this.EditInfo_Value[index].RULES.push(this.formRules.IsZenkaku );
            }
            if(item=="PART_NAME_LOC1")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.lengthThan100 );
            }
            if(item=="PART_NAME_LOC2")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.lengthThan80 );
                this.EditInfo_Value[index].RULES.push(this.formRules.IsZenkaku );
            }
            if(item=="MAKER_CODE")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.lengthThan10 );
            }
            if(item=="MAKER_NAME_ENG")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.lengthThan100 );
            }
            if(item=="MAKER_NAME_LOC")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.lengthThan100 );
            }
            if(item=="MAKER_PART_NO")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.lengthThan60 );
            }
            if(item=="MAKER_REM_ENG")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.lengthThan100 );
            }
            if(item=="MAKER_REM_LOC")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.lengthThan100 );
            }
            if(item=="WEIGHT")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.IntegetThan7 );
                this.EditInfo_Value[index].RULES.push(this.formRules.FewThan2 );
            }
            if(item=="PO_WIDTH")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.IntegetThan7 );
                this.EditInfo_Value[index].RULES.push(this.formRules.FewThan2 );
            }
            if(item=="PO_LENGTH")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.IntegetThan7 );
                this.EditInfo_Value[index].RULES.push(this.formRules.FewThan2 );
            }
            if(item=="THICKNESS")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.required );
            }
            if(item=="DENSITY")
            {   
                this.EditInfo_Value[index].RULES.push(this.formRules.IntegetThan6 );
                this.EditInfo_Value[index].RULES.push(this.formRules.FewThan3 );
            }
            if(item=="SUPPLEMENT")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.ZeroOne );
            }
            if(item=="SUB_PART_TYPE")
            {
                this.EditInfo_Value[index].RULES.push(this.formRules.ZeroOne );
            }
        }
    },
    /*ボタンがあるText Fieldに入力確認*/ 
    PPPMMSCheck_CellType(index){
        /*Text Field規定が存在の確認*/
        if(this.EditInfo_Value[index].CHECK_LIST == ""){
            /*参照先確認（MS_TABLE）*/
            switch(this.EditInfo_Value[index].MS_TABLE){
                /*共用マスター(CMMSB)*/ 
                case '1':
                    this.getCM_CODE("PPPMMS",index,this.EditInfo_Value[index].MS_ITEM_NO,true)
                    break;
                /*注文コードマスタ(CHCDMS) */
                case '2':
                    break;
                /*担当コードマスタ(CMTANTOMS) */
                case'3':
                    break;
                /*単位読替マスタ(NRTANIMS) */
                case'4':
                    break;
                /*工程コードマスタ(KTSTDTIME) */
                case'5':
                    break;
            }
        }
        else
        {
            this.EditInfo_Value[index].CHECK_LIST.find(item =>{
        
                /*入力値と一致した場合テーブルの説明欄にCM_CODE_SETUMEIを表示*/
                if(this.EditInfo_Value[index].FIELD_VALUE !== null ||this.EditInfo_Value[index].FIELD_VALUE == "")
                    {
                    /*入力値と一致した場合テーブルの説明欄にCM_CODE_SETUMEIを表示*/
                        if(this.EditInfo_Value[index].FIELD_VALUE == item.CM_CODE || this.EditInfo_Value[index].FIELD_VALUE ==""){
                            this.EditInfo_Value[index].FIELD_EXPLAIN = item.CM_CODE_SETUMEI;
                            this.EditInfo_Value[index].Setsumei_Error =false;
                            return true;
                        }
                        /*入力値と一致しない場合、テーブルにエラーを表示する */
                        else 
                        {
                            this.EditInfo_Value[index].FIELD_EXPLAIN ="マスタに未登録の値が入力されています";
                            this.EditInfo_Value[index].Setsumei_Error =true;
                            return false;
                        }
                    }
            })    
        }
        
    },
    PPPMORDERCheck_CellType(index){
        /*Text Field規定が存在の確認*/
        if(this.EditInfo2_Value[index].CHECK_LIST == ""){
            /*参照先確認（MS_TABLE）*/
            switch(this.EditInfo2_Value[index].MS_TABLE){
                /*共用マスター(CMMSB)*/ 
                case '1':
                    this.getCM_CODE("PPPMORDER",index,this.EditInfo2_Value[index].MS_ITEM_NO,true)
                    break;
                /*注文コードマスタ(CHCDMS) */
                case '2':
                    break;
                /*担当コードマスタ(CMTANTOMS) */
                case'3':
                    break;
                /*単位読替マスタ(NRTANIMS) */
                case'4':
                    break;
                /*工程コードマスタ(KTSTDTIME) */
                case'5':
                    break;
            }
        }
        else
        {
            this.EditInfo2_Value[index].CHECK_LIST.find(item =>{
                if(this.EditInfo2_Value[index].FIELD_VALUE !== null ||this.EditInfo2_Value[index].FIELD_VALUE == "")
                {
                    if(this.EditInfo2_Value[index].FIELD_NAME.indexOf("MATL_BRANCH_CODE") == '0')
                    {
                        /*入力値と一致した場合テーブルの説明欄にCM_CODE_SETUMEIを表示*/
                        if(this.EditInfo2_Value[index].FIELD_VALUE.substr(0,2) == item.CM_CODE){
                            
                            this.EditInfo2_Value[index].FIELD_EXPLAIN = item.CM_CODE_SETUMEI;
                            this.EditInfo2_Value[index].Setsumei_Error =false;
                            return true;
                        }
                        /*入力値と一致しない場合、テーブルにエラーを表示する */
                        else 
                        {
                            this.EditInfo2_Value[index].FIELD_EXPLAIN ="マスタに未登録の値が入力されています";
                            this.EditInfo2_Value[index].Setsumei_Error =true;
                            return false;
                        }
                    }
                    else
                    {
                        /*入力値と一致した場合テーブルの説明欄にCM_CODE_SETUMEIを表示*/
                        if(this.EditInfo2_Value[index].FIELD_VALUE == item.CM_CODE){
                            this.EditInfo2_Value[index].FIELD_EXPLAIN = item.CM_CODE_SETUMEI;
                            this.EditInfo2_Value[index].Setsumei_Error =false;
                            return true;
                        }
                        /*入力値と一致しない場合、テーブルにエラーを表示する */
                        else 
                        {
                            this.EditInfo2_Value[index].FIELD_EXPLAIN ="マスタに未登録の値が入力されています";
                            this.EditInfo2_Value[index].Setsumei_Error =true;
                            return false;
                        }
                    }
                }
                else
                {
                    return false;
                }
            })    
        }
    },
    CHMSACheck_CellType(index){
        if(this.Koubai_EditTable_Item[index].CHECK_LIST == ""){
            /*参照先確認（MS_TABLE）*/
            switch(this.Koubai_EditTable_Item[index].MS_TABLE){
                /*共用マスター(CMMSB)*/ 
                case '1':
                    this.getCM_CODE("CHMSA",index,this.Koubai_EditTable_Item[index].MS_ITEM_NO,true)
                    break;
                /*注文コードマスタ(CHCDMS) */
                case '2':
                    break;
                /*担当コードマスタ(CMTANTOMS) */
                case'3':
                    break;
                /*単位読替マスタ(NRTANIMS) */
                case'4':
                    break;
                /*工程コードマスタ(KTSTDTIME) */
                case'5':
                    break;
            }
        }
        else
        {
            this.Koubai_EditTable_Item[index].CHECK_LIST.find(item =>{
        
                /*入力値と一致した場合テーブルの説明欄にCM_CODE_SETUMEIを表示*/
                if(this.Koubai_EditTable_Item[index].FIELD_VALUE !== null ||this.Koubai_EditTable_Item[index].FIELD_VALUE == "")
                    {
                    /*入力値と一致した場合テーブルの説明欄にCM_CODE_SETUMEIを表示*/
                        if(this.Koubai_EditTable_Item[index].FIELD_VALUE == item.CM_CODE || this.Koubai_EditTable_Item[index].FIELD_VALUE ==""){
                            this.Koubai_EditTable_Item[index].FIELD_EXPLAIN = item.CM_CODE_SETUMEI;
                            this.Koubai_EditTable_Item[index].Setsumei_Error =false;
                            return true;
                        }
                        /*入力値と一致しない場合、テーブルにエラーを表示する */
                        else 
                        {
                            this.Koubai_EditTable_Item[index].FIELD_EXPLAIN ="マスタに未登録の値が入力されています";
                            this.Koubai_EditTable_Item[index].Setsumei_Error =true;
                            return false;
                        }
                    }
            })    
        }
    },
    ZKMS_CellType(index){
        if(this.Zaiko_EditTable_Item[index].CHECK_LIST == ""){
            switch(this.Zaiko_EditTable_Item[index].MS_TABLE){
                /*共用マスター(CMMSB)*/ 
                case '1':
                    this.getCM_CODE("ZKMS",index,this.Zaiko_EditTable_Item[index].MS_ITEM_NO,true)
                    break;
                /*注文コードマスタ(CHCDMS) */
                case '2':
                    break;
                /*担当コードマスタ(CMTANTOMS) */
                case'3':
                    break;
                /*単位読替マスタ(NRTANIMS) */
                case'4':
                    break;
                /*工程コードマスタ(KTSTDTIME) */
                case'5':
                    break;
            }
        }
        else
        {
            /*入力確認開始 */
            this.Zaiko_EditTable_Item[index].CHECK_LIST.find(item =>{
                if(this.Zaiko_EditTable_Item[index].FIELD_VALUE !== null ||this.Zaiko_EditTable_Item[index].FIELD_VALUE != "")
                {
                /*入力値と一致した場合テーブルの説明欄にCM_CODE_SETUMEIを表示*/
                    if(this.Zaiko_EditTable_Item[index].FIELD_VALUE == item.CM_CODE){
                        this.Zaiko_EditTable_Item[index].FIELD_EXPLAIN = item.CM_CODE_SETUMEI;
                        this.Zaiko_EditTable_Item[index].Setsumei_Error =false;
                        return true;
                    }
                    /*入力値と一致しない場合、テーブルにエラーを表示する */
                    else 
                    {
                        this.Zaiko_EditTable_Item[index].FIELD_EXPLAIN ="マスタに未登録の値が入力されています";
                        this.Zaiko_EditTable_Item[index].Setsumei_Error =true;
                        return false;
                    }
                }
            })  
        }
    },
    MAINTMS1_CellType(index){
        
        if(this.Hoshu_EditTable1_Item[index].CHECK_LIST == "")
        {
            switch(this.Hoshu_EditTable1_Item[index].MS_TABLE)
            {
                /*共用マスター(CMMSB)*/ 
                case '1':
                    this.getCM_CODE("MAINTMS1",index,this.Hoshu_EditTable1_Item[index].MS_ITEM_NO,true)
                    break;
            }
        }
        else 
        {
            
            /*入力確認開始 */
            this.Hoshu_EditTable1_Item[index].CHECK_LIST.find(item =>{
                if(this.Hoshu_EditTable1_Item[index].FIELD_VALUE !== null ||this.Hoshu_EditTable1_Item[index].FIELD_VALUE != "")
                {
                    /*入力値と一致した場合テーブルの説明欄にCM_CODE_SETUMEIを表示*/
                    if(this.Hoshu_EditTable1_Item[index].FIELD_VALUE == item.CM_CODE){
                        this.Hoshu_EditTable1_Item[index].RULES = [];
                        this.Hoshu_EditTable1_Item[index].FIELD_EXPLAIN = item.CM_CODE_SETUMEI;
                        this.Hoshu_EditTable1_Item[index].Setsumei_Error =false;
                        this.Hoshu_EditTable1_Item[index].RULES.push(this.formRules.TrueRule);
                        return true;
                    }
                    /*入力値と一致しない場合、テーブルにエラーを表示する */
                    else 
                    {
                        this.Hoshu_EditTable1_Item[index].RULES = [];
                        this.Hoshu_EditTable1_Item[index].FIELD_EXPLAIN ="マスタに未登録の値が入力されています";
                        this.Hoshu_EditTable1_Item[index].Setsumei_Error =true;
                        this.Hoshu_EditTable1_Item[index].RULES.push(this.formRules.FalseRule);
                        return false;
                    }
                }
            })   
        }
    },
    MAINTMS2_CellType(index){
        if(this.Hoshu_EditTable2_Item[index].CHECK_LIST == "")
        {
            switch(this.Hoshu_EditTable2_Item[index].MS_TABLE)
            {
                /*共用マスター(CMMSB)*/ 
                case '1':
                    this.getCM_CODE("MAINTMS2",index,this.Hoshu_EditTable2_Item[index].MS_ITEM_NO,true)
                    break;
            }
        }
        else 
        {
            /*入力確認開始 */
            this.Hoshu_EditTable2_Item[index].CHECK_LIST.find(item =>{
                if(this.Hoshu_EditTable2_Item[index].FIELD_VALUE !== null ||this.Hoshu_EditTable2_Item!= "")
                {
                    /*入力値と一致した場合テーブルの説明欄にCM_CODE_SETUMEIを表示*/
                    if(this.Hoshu_EditTable2_Item[index].FIELD_VALUE == item.CM_CODE){
                        this.Hoshu_EditTable2_Item[index].RULES = [];
                        this.Hoshu_EditTable2_Item[index].FIELD_EXPLAIN = item.CM_CODE_SETUMEI;
                        this.Hoshu_EditTable2_Item[index].Setsumei_Error =false;
                        this.Hoshu_EditTable2_Item[index].RULES.push(this.formRules.TrueRule);
                        return true;
                    }
                    /*入力値と一致しない場合、テーブルにエラーを表示する */
                    else 
                    {
                        this.Hoshu_EditTable2_Item[index].RULES = [];
                        this.Hoshu_EditTable2_Item[index].FIELD_EXPLAIN ="マスタに未登録の値が入力されています";
                        this.Hoshu_EditTable2_Item[index].Setsumei_Error =true;
                        this.Hoshu_EditTable2_Item[index].RULES.push(this.formRules.FalseRule);
                        return false;
                    }
                }
            })   
        }
    },
    PPPMMS_UPDATE_CHECK(index){
        this.EditInfo_Value[index].UPDATE_ST = this.EditInfo_Value[index].FIELD_VALUE != this.EditInfo_Value[index].BEFORE_UPDATE_VALUE 
            && !((this.EditInfo_Value[index].FIELD_VALUE == "") && (this.EditInfo_Value[index].BEFORE_UPDATE_VALUE === null) )? true: this.EditInfo_Value[index].UPDATE_ST ;
            this.EditInfo_Value[index].BEFORE_UPDATE_VALUE =this.EditInfo_Value[index].FIELD_VALUE
    },
    PPPMORDER_UPDATE_CHECK(index){
        this.EditInfo2_Value[index].UPDATE_ST = this.EditInfo2_Value[index].FIELD_VALUE != this.EditInfo2_Value[index].BEFORE_UPDATE_VALUE 
            && !((this.EditInfo2_Value[index].FIELD_VALUE == "") && (this.EditInfo2_Value[index].BEFORE_UPDATE_VALUE === null) )? true: this.EditInfo2_Value[index].UPDATE_ST ;
        this.EditInfo2_Value[index].BEFORE_UPDATE_VALUE =this.EditInfo2_Value[index].FIELD_VALUE
    },
    KTSTDTIME_UPDATE_CHECK(index){
        this.STD_EditInfo_Item[index].UPDATE_ST = this.STD_EditInfo_Item[index].FIELD_VALUE != this.STD_EditInfo_Item[index].BEFORE_UPDATE_VALUE 
            && !((this.STD_EditInfo_Item[index].FIELD_VALUE == "") && (this.STD_EditInfo_Item[index].BEFORE_UPDATE_VALUE === null) )? true: this.STD_EditInfo_Item[index].UPDATE_ST ;
        this.STD_EditInfo_Item[index].BEFORE_UPDATE_VALUE =this.STD_EditInfo_Item[index].FIELD_VALUE
    },
    CHMSA_UPDATE_CHECK(index){
        this.Koubai_EditTable_Item[index].UPDATE_ST = this.Koubai_EditTable_Item[index].FIELD_VALUE != this.Koubai_EditTable_Item[index].BEFORE_UPDATE_VALUE 
            && !((this.Koubai_EditTable_Item[index].FIELD_VALUE == "") && (this.Koubai_EditTable_Item[index].BEFORE_UPDATE_VALUE === null) )? true: this.Koubai_EditTable_Item[index].UPDATE_ST ;
        this.Koubai_EditTable_Item[index].BEFORE_UPDATE_VALUE =this.Koubai_EditTable_Item[index].FIELD_VALUE
    },
    PPPMPOSPEC_UPDATE_CHECK(index){
        this.Koubai_PPPMPOSPEC_Item[index].UPDATE_ST = this.Koubai_PPPMPOSPEC_Item[index].FIELD_VALUE != this.Koubai_PPPMPOSPEC_Item[index].BEFORE_UPDATE_VALUE 
            && !((this.Koubai_PPPMPOSPEC_Item[index].FIELD_VALUE == "") && (this.Koubai_PPPMPOSPEC_Item[index].BEFORE_UPDATE_VALUE === null) )? true: this.Koubai_PPPMPOSPEC_Item[index].UPDATE_ST ;
        this.Koubai_PPPMPOSPEC_Item[index].BEFORE_UPDATE_VALUE =this.Koubai_PPPMPOSPEC_Item[index].FIELD_VALUE
    },
    ZKMS_UPDATE_CHECK(index){
        this.Zaiko_EditTable_Item[index].UPDATE_ST = this.Zaiko_EditTable_Item[index].FIELD_VALUE != this.Zaiko_EditTable_Item[index].BEFORE_UPDATE_VALUE 
            && !((this.Zaiko_EditTable_Item[index].FIELD_VALUE == "") && (this.Zaiko_EditTable_Item[index].BEFORE_UPDATE_VALUE === null) )? true: this.Zaiko_EditTable_Item[index].UPDATE_ST ;
        this.Zaiko_EditTable_Item[index].BEFORE_UPDATE_VALUE =this.Zaiko_EditTable_Item[index].FIELD_VALUE
    },
    MAINTMS1_UPDATE_CHECK(index)
    {
        this.Hoshu_EditTable1_Item[index].UPDATE_ST = this.Hoshu_EditTable1_Item[index].FIELD_VALUE != this.Hoshu_EditTable1_Item[index].BEFORE_UPDATE_VALUE 
            && !((this.Hoshu_EditTable1_Item[index].FIELD_VALUE == "") && (this.Hoshu_EditTable1_Item[index].BEFORE_UPDATE_VALUE === null) )? true: this.Hoshu_EditTable1_Item[index].UPDATE_ST ;
        this.Hoshu_EditTable1_Item[index].BEFORE_UPDATE_VALUE =this.Hoshu_EditTable1_Item[index].FIELD_VALUE
    },
    MAINTMS2_UPDATE_CHECK(index)
    {
        this.Hoshu_EditTable2_Item[index].UPDATE_ST = this.Hoshu_EditTable2_Item[index].FIELD_VALUE != this.Hoshu_EditTable2_Item[index].BEFORE_UPDATE_VALUE 
            && !((this.Hoshu_EditTable2_Item[index].FIELD_VALUE == "") && (this.Hoshu_EditTable2_Item[index].BEFORE_UPDATE_VALUE === null) )? true: this.Hoshu_EditTable2_Item[index].UPDATE_ST ;
        this.Hoshu_EditTable2_Item[index].BEFORE_UPDATE_VALUE =this.Hoshu_EditTable2_Item[index].FIELD_VALUE
    },
    getEditTableSetsumei(index,item){
        var Setsumei ="";
        var Setsumei_Error = false;
        var check_change=false;
        if(this.EditInfo_Value[index].FIELD_VALUE === null)
        {
            if (item=="INSPECT_SHEET")
            {
                this.EditInfo_Value[index].FIELD_VALUE = "";
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length ==="" ||
                            this.EditInfo_Value[index].FIELD_VALUE.length =="1" ?
                            "空白=不要 1=要":"空白か1を入力下さい";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE == "" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                                false:true;
                check_change = true;
            }
            else if (item=="CERT_CONFORM")
            {
                this.EditInfo_Value[index].FIELD_VALUE = "";
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length =="" ||
                            this.EditInfo_Value[index].FIELD_VALUE.length =="1" ?
                            "空白=不要 1=要":"空白か1を入力下さい";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE == "" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                                false:true;
                check_change = true;
            }
            else if (item=="TEST_REPORT")
            {
                this.EditInfo_Value[index].FIELD_VALUE = "";
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length =="" ||
                            this.EditInfo_Value[index].FIELD_VALUE.length =="1" ?
                            "空白=不要 1=要":"空白か1を入力下さい";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE == "" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                                false:true;
                check_change = true;
            }
            else if (item=="MILL_SHEET")
            {
                this.EditInfo_Value[index].FIELD_VALUE = "";
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length =="" ||
                            this.EditInfo_Value[index].FIELD_VALUE.length =="1" ?
                            "空白=不要 1=要":"空白か1を入力下さい";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE == "" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                                false:true;
                check_change = true;
            }
            else if (item=="STD_COST_UPD_TYPE")
            {
                this.EditInfo_Value[index].FIELD_VALUE = "0";
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length =="" ||
                            this.EditInfo_Value[index].FIELD_VALUE == "0" ||
                            this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                            "0:可 1:不可": "空白か0か1を入力下さい"; 
                Setsumei_Error =this.EditInfo_Value[index].FIELD_VALUE.length =="" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "0" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                                false:true;
                check_change = true;
            }
        }
        else
        {
            if(item == "TRACE_TYPE")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE == "0" || 
                        this.EditInfo_Value[index].FIELD_VALUE == "1" ||
                        this.EditInfo_Value[index].FIELD_VALUE == "2" ?
                        "0=なし 1=あり 2=XIORマシン":"0,1,2を入力下さい。"
                Setsumei_Error =this.EditInfo_Value[index].FIELD_VALUE == "0" || 
                        this.EditInfo_Value[index].FIELD_VALUE == "1" ||
                        this.EditInfo_Value[index].FIELD_VALUE == "2" ?
                        false:true;
                check_change = true;
            }
            else if (item=="REMARKS_ENG")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length >= 200 ?
                        "200文字以内で入力下さい。":"";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length >= 200 ?
                        true:false;
                check_change = true;
            }
            else if (item=="REMARKS_LOC")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length >= 200 ?
                            "200文字以内で入力下さい。":"";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length >= 200 ?
                        true:false;
                check_change = true;
            }
            else if (item=="PO_SPEC1")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length >= 50 ?
                            "50文字以内で入力下さい。":"";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length >= 50 ?
                        true:false;
                        check_change = true;
            }
            else if (item=="PO_SPEC2")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length >= 50 ?
                            "50文字以内で入力下さい。":"";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length >= 50 ?
                        true:false;
                check_change = true;
            }
            else if (item=="PO_SPEC3")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length >= 50 ?
                            "50文字以内で入力下さい。":"";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length >= 50 ?
                        true:false;
                check_change = true;
            }
            else if (item=="MAINT_PART_NAME")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length >= 200 ?
                            "200文字以内で入力下さい。":"";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length >= 200 ?
                        true:false;
                check_change = true;
            }
            else if (item=="MAINT_PARTS_TYPE")
            {
                
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE == "0"?
                            "0 なし": this.EditInfo_Value[index].FIELD_VALUE == "1" ? 
                            "1 日精(CP)移管部品":this.EditInfo_Value[index].FIELD_VALUE == "2"?
                            "2 日精(CP)とFJ(EV)共用部品":"0,1,2を入力下さい。"
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE == "0" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "1" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "2"?
                                false:true;
                check_change = true;
            }
            else if (item=="RECYCLE_TYPE")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE == "0" || 
                        this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                        "0=無し 1=あり":"0,1を入力下さい。"
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE == "0" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                                false:true;
                check_change = true;
                
            }
            else if (item=="EMG_TYPE")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE == "0" || 
                        this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                        "0=無し 1=あり":"0,1を入力下さい。"
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE == "0" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                                false:true;
                check_change = true;
            }
            else if (item=="MAINT_CONTRACT_TYPE")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE == "0"?
                            "0 チェック不要": this.EditInfo_Value[index].FIELD_VALUE == "1" ? 
                            "1 POG+フルメンで使用":this.EditInfo_Value[index].FIELD_VALUE == "2"?
                            "2 フルメンでのみ使用":"0,1,2を入力下さい。"
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE == "0" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "1" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "2"?
                                false:true;
                check_change = true;
            }
            else if (item=="PART_DESCRIPTION")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length >= 400 ?
                            "400文字以内で入力下さい。":"";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length >= 400 ?
                                true:false;
                check_change = true;
            }
            else if (item=="REPLACE_REASON")
            {   
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length >= 400 ?
                            "400文字以内で入力下さい。":"";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length >= 400 ?
                                true:false;
                check_change = true;
            }
            else if (item=="REPLACE_TIME")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length =="" ? 
                        "数値を入力して下さい": Math.trunc(this.EditInfo_Value[index].FIELD_VALUE).toString().length > 7?
                        "整数部分は7桁以内で入力して下さい" : this.EditInfo_Value[index].FIELD_VALUE.split(".")[1].length >2 ?
                        "少数部分2桁以内で入力して下さい" :"" ;
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length =="" || 
                                Math.trunc(this.EditInfo_Value[index].FIELD_VALUE).toString().length > 7 || 
                                this.EditInfo_Value[index].FIELD_VALUE.split(".")[1].length >2 ?
                                true:false;
                check_change = true;
            }
            else if (item=="INSPECT_SHEET")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length =="" ||
                            this.EditInfo_Value[index].FIELD_VALUE.length =="1" ?
                            "空白=不要 1=要":"空白か1を入力下さい";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE == "" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                                false:true;
                check_change = true;
            }
            else if (item=="CERT_CONFORM")
            {
                Setsumei =this.EditInfo_Value[index].FIELD_VALUE.length =="" ||
                            this.EditInfo_Value[index].FIELD_VALUE.length =="1" ?
                            "空白=不要 1=要":"空白か1を入力下さい";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE == "" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                                false:true;
                check_change = true;
            }
            else if (item=="TEST_REPORT")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length =="" ||
                            this.EditInfo_Value[index].FIELD_VALUE.length =="1" ?
                            "空白=不要 1=要":"空白か1を入力下さい";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE == "" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                                false:true;
                check_change = true;
            }
            else if (item=="MILL_SHEET")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length =="" ||
                            this.EditInfo_Value[index].FIELD_VALUE.length =="1" ?
                            "空白=不要 1=要":"空白か1を入力下さい";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE == "" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                                false:true;
                check_change = true;
            }
            else if (item=="SELLING_PRICE_TYPE")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length =="0" ||
                            this.EditInfo_Value[index].FIELD_VALUE.length =="1" ?
                            "0=無し 1=あり":"0,1を入力下さい。";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE == "0" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                                false:true;
                check_change = true;
            }
            else if (item=="START_DATE")
            {
                check_change = true;
                if(!this.check_date(this.EditInfo_Value[index].FIELD_VALUE))
                {
                    Setsumei = "yyyymmdd形式で入力して下さい"
                    Setsumei_Error =true;
                }
            }
            else if (item=="ORDER_STOP_DATE")
            {
                check_change = true;
                if(!this.check_date(this.EditInfo_Value[index].FIELD_VALUE))
                {
                    Setsumei = "yyyymmdd形式で入力して下さい"
                    Setsumei_Error =true;
                }
            }
            else if (item=="STOP_DATE")
            {
                check_change = true;
                if(!this.check_date(this.EditInfo_Value[index].FIELD_VALUE))
                {
                    Setsumei = "yyyymmdd形式で入力して下さい"
                    Setsumei_Error =true;
                }
            }
            else if (item=="M_START_DATE")
            {
                check_change = true;
                if(!this.check_date(this.EditInfo_Value[index].FIELD_VALUE))
                {
                    Setsumei = "yyyymmdd形式で入力して下さい"
                    Setsumei_Error =true;
                }
            }
            else if (item=="M_ORDER_STOP_DATE")
            {
                check_change = true;
                if(!this.check_date(this.EditInfo_Value[index].FIELD_VALUE))
                {
                    Setsumei = "yyyymmdd形式で入力して下さい"
                    Setsumei_Error =true;
                }
            }
            else if (item=="M_STOP_DATE")
            {
                check_change = true;
                if(!this.check_date(this.EditInfo_Value[index].FIELD_VALUE))
                {
                    Setsumei = "yyyymmdd形式で入力して下さい"
                    Setsumei_Error =true;
                }
            }
            else if (item=="CH_STOP_DATE")
            {
                check_change = true;
                if(!this.check_date(this.EditInfo_Value[index].FIELD_VALUE))
                {
                    Setsumei = "yyyymmdd形式で入力して下さい"
                    Setsumei_Error =true;
                }
            }
            else if (item=="STD_COST_UPD_TYPE")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE == "0" ||
                            this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                            "0:可 1:不可": "空白か0か1を入力下さい"; 
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE == "0" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                                false:true;
                check_change = true;
            }
            else if (item=="PHOTO_TYPE")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE == "0" ||
                            this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                            "1:不要、空白:要": "空白か0か1を入力下さい"; 
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE == "0" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                                false:true;
                check_change = true;
            }
            else if (item=="RECORD_TYPE")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE == "0"?
                            "0 変更なし":this.EditInfo_Value[index].FIELD_VALUE == "1"?
                            "1 変更り":this.EditInfo_Value[index].FIELD_VALUE == "2"?
                            "2 今回追加":this.EditInfo_Value[index].FIELD_VALUE == "3"?
                            "3 今回使用止":this.EditInfo_Value[index].FIELD_VALUE == "4"?
                            "4 今回使用禁止":""
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE == "0" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "1" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "2" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "3" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "4" ?
                                false:true;
                check_change = true;
            }
            else if (item=="MODULE_TYPE")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE == "0"?
                            "PDM3から作成":this.EditInfo_Value[index].FIELD_VALUE == "1"?
                            "統合P/Mから作成":this.EditInfo_Value[index].FIELD_VALUE == "2"?
                            "P/Sユニット":"";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE == "0" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "1" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "2" ?
                                false:true;
                check_change = true;
            }
            else if (item=="PART_NAME_ENG")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length >= 100 ?
                            "100文字以内で入力下さい":this.EditInfo_Value[index].FIELD_VALUE.match(/^[^\x01-\x7E\uFF61-\uFF9F]+$/)?
                            "全角文字が含まれています。当フィールドは半角文字です。":"";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length >= 100 || 
                                this.EditInfo_Value[index].FIELD_VALUE.match(/^[^\x01-\x7E\uFF61-\uFF9F]+$/) ?
                                true:false;
                check_change = true;
            }
            else if (item=="PART_NAME_LOC1")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length >= 100 ?
                            "100文字以内で入力下さい":"";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length >= 100  ?
                                true:false;
                check_change = true;
            }
            else if (item=="PART_NAME_LOC2")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length >= 80?
                            "80文字以内で入力下さい":this.EditInfo_Value[index].FIELD_VALUE.match(/^[^\x01-\x7E\uFF61-\uFF9F]+$/)?
                            "全角文字が含まれています。当フィールドは半角文字です。":"";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length >= 80 || 
                                this.EditInfo_Value[index].FIELD_VALUE.match(/^[^\x01-\x7E\uFF61-\uFF9F]+$/) ?
                                true:false;
                check_change = true;
            }
            else if (item=="MAKER_CODE")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length >= 10?
                            "10文字以内で入力下さい":"";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length >= 10  ?
                                true:false;
                check_change = true;
            }
            else if (item=="MAKER_NAME_ENG")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length >= 100?
                            "100文字以内で入力下さい":"";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length >= 100  ?
                                true:false;
                check_change = true;
            }
            else if (item=="MAKER_NAME_LOC")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length >= 100?
                            "100文字以内で入力下さい":"";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length >= 100  ?
                                true:false;
                check_change = true;
            }
            else if (item=="MAKER_PART_NO")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length >= 60?
                            "100文字以内で入力下さい":"";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length >= 60  ?
                                true:false;
                check_change = true;
            }
            else if (item=="MAKER_REM_ENG")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length >= 100?
                            "100文字以内で入力下さい":"";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length >= 100  ?
                                true:false;
                check_change = true;
            }
            else if (item=="MAKER_REM_LOC")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length >= 100?
                            "100文字以内で入力下さい":"";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length >= 100  ?
                                true:false;
                check_change = true;
            }
            else if (item=="MATERIAL_CODE")
            {
                check_change = true;
                Setsumei ="--"
            }
            else if (item=="WEIGHT")
            {
                var Dotcheck = true;
                if(this.EditInfo_Value[index].FIELD_VALUE === null)
                {
                    this.EditInfo_Value[index].FIELD_VALUE ="";
                }
                Dotcheck = this.EditInfo_Value[index].FIELD_VALUE.indexOf('.') >= 0 ? true :false;
                
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE =="" ? 
                        "数値を入力して下さい": Math.trunc(this.EditInfo_Value[index].FIELD_VALUE).toString().length > 7?
                        "整数部分は7桁以内で入力して下さい" : Dotcheck?( this.EditInfo_Value[index].FIELD_VALUE.split(".")[1].length >2 ?
                        "少数部分2桁以内で入力して下さい" :"") : "" ;
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE =="" || 
                                Math.trunc(this.EditInfo_Value[index].FIELD_VALUE).toString().length > 7 ?true: 
                                Dotcheck?(this.EditInfo_Value[index].FIELD_VALUE.split(".")[1].length >2 ):false?
                                true:false
                check_change = true;
            }
            else if (item=="PO_WIDTH")
            {
                var Dotcheck = true;
                Dotcheck = this.EditInfo_Value[index].FIELD_VALUE.indexOf('.') >= 0 ? true :false;
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length =="" ? 
                        "数値を入力して下さい": Math.trunc(this.EditInfo_Value[index].FIELD_VALUE).toString().length > 7?
                        "整数部分は7桁以内で入力して下さい" : Dotcheck?( this.EditInfo_Value[index].FIELD_VALUE.split(".")[1].length >2 ?
                        "少数部分2桁以内で入力して下さい" :"") : "" ;
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length =="" || 
                                Math.trunc(this.EditInfo_Value[index].FIELD_VALUE).toString().length > 7 ?true :
                                Dotcheck?(this.EditInfo_Value[index].FIELD_VALUE.split(".")[1].length >2 ):false?
                                true:false;
                check_change = true;
            }
            else if (item=="PO_LENGTH")
            {
                var Dotcheck = true;
                Dotcheck = this.EditInfo_Value[index].FIELD_VALUE.indexOf('.') >= 0 ? true :false;
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length =="" ? 
                        "数値を入力して下さい": Math.trunc(this.EditInfo_Value[index].FIELD_VALUE).toString().length > 7?
                        "整数部分は7桁以内で入力して下さい" : Dotcheck?( this.EditInfo_Value[index].FIELD_VALUE.split(".")[1].length >2 ?
                        "少数部分2桁以内で入力して下さい" :"") : "" ;
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length =="" || 
                                Math.trunc(this.EditInfo_Value[index].FIELD_VALUE).toString().length > 7 ? true :
                                Dotcheck?(this.EditInfo_Value[index].FIELD_VALUE.split(".")[1].length >2 ):false?
                                true:false;
                check_change = true;
            }
            else if (item=="THICKNESS")
            {
                var Dotcheck = true;
                Dotcheck = this.EditInfo_Value[index].FIELD_VALUE.indexOf('.') >= 0 ? true :false;
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length =="" ? 
                        "数値を入力して下さい": Math.trunc(this.EditInfo_Value[index].FIELD_VALUE).toString().length > 7?
                        "整数部分は7桁以内で入力して下さい" : Dotcheck?( this.EditInfo_Value[index].FIELD_VALUE.split(".")[1].length >2 ?
                        "少数部分2桁以内で入力して下さい" :"") : "" ;
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length =="" || 
                                Math.trunc(this.EditInfo_Value[index].FIELD_VALUE).toString().length > 7 ?true:
                                Dotcheck?(this.EditInfo_Value[index].FIELD_VALUE.split(".")[1].length >2 ):false?
                                true:false;
                check_change = true;
            }
            else if (item=="DENSITY")
            {
                var Dotcheck = true;
                Dotcheck = this.EditInfo_Value[index].FIELD_VALUE.indexOf('.') >= 0 ? true :false;
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length =="" ? 
                        "数値を入力して下さい": Math.trunc(this.EditInfo_Value[index].FIELD_VALUE).toString().length > 7?
                        "整数部分は7桁以内で入力して下さい" : Dotcheck?( this.EditInfo_Value[index].FIELD_VALUE.split(".")[1].length >2 ?
                        "少数部分2桁以内で入力して下さい" :"") : "" ;
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE.length =="" || 
                                Math.trunc(this.EditInfo_Value[index].FIELD_VALUE).toString().length > 7 ?true:
                                Dotcheck?(this.EditInfo_Value[index].FIELD_VALUE.split(".")[1].length >2 ):false?
                                true:false;
                check_change = true;
            }
            else if (item=="SUPPLEMENT")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length =="0" ||
                            this.EditInfo_Value[index].FIELD_VALUE.length =="1" ?
                            "0=無し 1=あり":"0,1を入力下さい。";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE == "0" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                                false:true;
                check_change = true;
            }
            else if (item=="SUB_PART_TYPE")
            {
                Setsumei = this.EditInfo_Value[index].FIELD_VALUE.length =="0" ||
                            this.EditInfo_Value[index].FIELD_VALUE.length =="1" ?
                            "0=無し 1=あり":"0,1を入力下さい。";
                Setsumei_Error = this.EditInfo_Value[index].FIELD_VALUE == "0" || 
                                this.EditInfo_Value[index].FIELD_VALUE == "1" ?
                                false:true;
                check_change = true;
            }
        }
        if(check_change){
            this.EditInfo_Value[index].FIELD_EXPLAIN = Setsumei; 
            this.EditInfo_Value[index].Setsumei_Error =Setsumei_Error;
        }
        if(this.EditInfo_Value[index].CELL_TYPE == 'B' && this.EditInfo_Value[index].AUTH_TYPE == 2)
        {
            this.PPPMMSCheck_CellType(index);
        }
        this.PPPMMS_UPDATE_CHECK(index);
    },
    getSTD_Setsumei(index,item){
        var Setsumei ="";
        var Setsumei_Error = false;
        var check_change=false;
        if(this.STD_EditInfo_Item[index].FIELD_VALUE !== null)
        {
            if(item =="SETUP_STDTIME"){
            Setsumei = this.STD_EditInfo_Item[index].FIELD_VALUE == "" ?
                        "データを入力して下さい。":isNaN(this.STD_EditInfo_Item[index].FIELD_VALUE)?
                        "数値を入力して下さい。":parseFloat(this.STD_EditInfo_Item[index].FIELD_VALUE)< 0?
                        "0以上で入力して下さい。":Math.trunc(this.STD_EditInfo_Item[index].FIELD_VALUE).toString().length > 5?
                        "整数部分は5桁以内で入力して下さい": this.STD_EditInfo_Item[index].FIELD_VALUE.split(".").length >1?
                        (this.STD_EditInfo_Item[index].FIELD_VALUE.split(".")[1].length >2 ?"少数部分2桁以内で入力して下さい" :""):"";
            Setsumei_Error = this.STD_EditInfo_Item[index].FIELD_VALUE == ""||
                            isNaN(this.STD_EditInfo_Item[index].FIELD_VALUE) ||
                            parseFloat(this.STD_EditInfo_Item[index].FIELD_VALUE)< 0 ||
                            Math.trunc(this.STD_EditInfo_Item[index].FIELD_VALUE).toString().length > 5 ||
                            (this.STD_EditInfo_Item[index].FIELD_VALUE.split(".").length >1?
                            (this.STD_EditInfo_Item[index].FIELD_VALUE.split(".")[1].length >2):false)
                            ?true:false;
            check_change = true;
            }
            if(item == "WORK_STDTIME"){
                Setsumei = this.STD_EditInfo_Item[index].FIELD_VALUE == "" ?
                            "データを入力して下さい。":isNaN(this.STD_EditInfo_Item[index].FIELD_VALUE)?
                            "数値を入力して下さい。":parseFloat(this.STD_EditInfo_Item[index].FIELD_VALUE)< 0?
                            "0以上で入力して下さい。":Math.trunc(this.STD_EditInfo_Item[index].FIELD_VALUE).toString().length > 5?
                            "整数部分は5桁以内で入力して下さい": this.STD_EditInfo_Item[index].FIELD_VALUE.split(".").length >1?
                            (this.STD_EditInfo_Item[index].FIELD_VALUE.split(".")[1].length >2 ?"少数部分2桁以内で入力して下さい" :""):"";
                Setsumei_Error = this.STD_EditInfo_Item[index].FIELD_VALUE  == ""||
                                isNaN(this.STD_EditInfo_Item[index].FIELD_VALUE) ||
                                parseFloat(this.STD_EditInfo_Item[index].FIELD_VALUE)< 0 ||
                                Math.trunc(this.STD_EditInfo_Item[index].FIELD_VALUE).toString().length > 5 ||
                                (this.STD_EditInfo_Item[index].FIELD_VALUE.split(".").length >1?
                                (this.STD_EditInfo_Item[index].FIELD_VALUE.split(".")[1].length >2):false)
                                ?true:false;
                check_change = true;
            }
            if(item == "SEI_STDPCNT"){
                Setsumei = this.STD_EditInfo_Item[index].FIELD_VALUE == "" ?
                            "データを入力して下さい。":isNaN(this.STD_EditInfo_Item[index].FIELD_VALUE)?
                            "数値を入力して下さい。":this.STD_EditInfo_Item[index].FIELD_VALUE>= 0 && this.STD_EditInfo_Item[index].FIELD_VALUE<= 100?
                            "":"標準正社員比率は０～１００で入力して下さい。";
                Setsumei_Error = this.STD_EditInfo_Item[index].FIELD_VALUE == ""||
                                isNaN(this.STD_EditInfo_Item[index].FIELD_VALUE) ||
                                !(this.STD_EditInfo_Item[index].FIELD_VALUE>= 0 && this.STD_EditInfo_Item[index].FIELD_VALUE<= 100)
                                ?true:false;
                check_change = true;
            }
            if(item == "SG_LEADTIME")
            {
                Setsumei = this.STD_EditInfo_Item[index].FIELD_VALUE == "" ?
                            "データを入力して下さい。":isNaN(this.STD_EditInfo_Item[index].FIELD_VALUE)?
                            "'数値を入力して下さい。":Math.trunc(this.STD_EditInfo_Item[index].FIELD_VALUE).toString().length > 5?
                            "整数部分は5桁以内で入力して下さい" :this.STD_EditInfo_Item[index].FIELD_VALUE.split(".").length >1?
                            (this.STD_EditInfo_Item[index].FIELD_VALUE.split(".")[1].length >2 ?"少数部分2桁以内で入力して下さい":
                             parseFloat(this.STD_EditInfo_Item[index].FIELD_VALUE) %0.5 != 0 ? 
                            "リードタイムは０．５日以上で入力して下さい": parseFloat(this.STD_EditInfo_Item[index].FIELD_VALUE) <0.5?
                            "リードタイムは０．５日以上で入力して下さい。":""):"";
            
                Setsumei_Error = this.STD_EditInfo_Item[index].FIELD_VALUE == "" ||
                            isNaN(this.STD_EditInfo_Item[index].FIELD_VALUE) ||
                            Math.trunc(this.STD_EditInfo_Item[index].FIELD_VALUE).toString().length > 5 ?true:false;
                
                if(!Setsumei_Error && this.STD_EditInfo_Item[index].FIELD_VALUE.split(".").length >1)
                {
                    Setsumei_Error =this.STD_EditInfo_Item[index].FIELD_VALUE.split(".")[1].length >2 ? 
                            (parseFloat(this.STD_EditInfo_Item[index].FIELD_VALUE) %0.5 != 0  ||
                            parseFloat(this.STD_EditInfo_Item[index].FIELD_VALUE) <0.5 ):true
                }
                            
               check_change = true;
            }
            if(item =="KIJI"){
                Setsumei = this.STD_EditInfo_Item[index].FIELD_VALUE.length > 50 ?
                        "50文字以内で入力下さい。":"";
                Setsumei_Error = this.STD_EditInfo_Item[index].FIELD_VALUE.length > 50 ?true: false;
                check_change = true;
            }
        }
        if(check_change)
        {
            this.STD_EditInfo_Item[index].FIELD_EXPLAIN = Setsumei; 
            this.STD_EditInfo_Item[index].Setsumei_Error =Setsumei_Error;
        }
        this.KTSTDTIME_UPDATE_CHECK(index)
    },
    getSTD_RULE(index,item){
        if(item=="SETUP_STDTIME")
        {
            this.STD_EditInfo_Item[index].RULES.push(this.formRules.required);
            this.STD_EditInfo_Item[index].RULES.push(this.formRules.IsNumber);
            this.STD_EditInfo_Item[index].RULES.push(this.formRules.MoreThanZero);
            this.STD_EditInfo_Item[index].RULES.push(this.formRules.FloatLess2);
            this.STD_EditInfo_Item[index].RULES.push(this.formRules.InterOnlyThan5);
        }
        if(item=="WORK_STDTIME")
        {
            this.STD_EditInfo_Item[index].RULES.push(this.formRules.required);
            this.STD_EditInfo_Item[index].RULES.push(this.formRules.IsNumber);
            this.STD_EditInfo_Item[index].RULES.push(this.formRules.MoreThanZero);
            this.STD_EditInfo_Item[index].RULES.push(this.formRules.InterOnlyThan5);
            this.STD_EditInfo_Item[index].RULES.push(this.formRules.FloatLess2);
        }
        if(item=="SEI_STDPCNT")
        {
            this.STD_EditInfo_Item[index].RULES.push(this.formRules.required);
            this.STD_EditInfo_Item[index].RULES.push(this.formRules.IsNumber);
            this.STD_EditInfo_Item[index].RULES.push(this.formRules.Range100);
        }
        if(item=="SG_LEADTIME")
        {
            this.STD_EditInfo_Item[index].RULES.push(this.formRules.required);
            this.STD_EditInfo_Item[index].RULES.push(this.formRules.IsNumber); 
            this.STD_EditInfo_Item[index].RULES.push(this.formRules.MoreThanZeroFive);
            this.STD_EditInfo_Item[index].RULES.push(this.formRules.ModZeroFive);
            this.STD_EditInfo_Item[index].RULES.push(this.formRules.InterOnlyThan5);
            this.STD_EditInfo_Item[index].RULES.push(this.formRules.FloatLess2);
        }
        if(item=="KIJI")
        {
            this.STD_EditInfo_Item[index].RULES.push(this.formRules.lengthThan50);
        }

        
    },  
    getEditTable2(Part_NO,PLANT_NO){
        const Today =((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)).substring(0,4)
                            +((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)).substring(5,7)
                            +((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)).substring(8,10);
        const url = this.Main_URL + "KensakuBtnGet";
        const params = {
          Edit_PART_NO : Part_NO,
          USER_ID : this.userId,
          PLANT_NO : PLANT_NO,
        }
        this.$axios.get(url,{params}).then(res =>{
            this.EditInfo2_Value = res.data.map(item => {
                item.Setsumei_Error = false;
                item.RULES = [];
                item.CHECK_LIST = [];   
                item.UPDATE_ST = false;
                item.BEFORE_UPDATE_VALUE = item.FIELD_VALUE
                return item;
            });
            this.EditInfo2_Value.forEach(Row =>{
                var index = this.EditInfo2_Value.indexOf(Row);
                this.getEditTableSetsumei2(index,Row.FIELD_NAME);
                this.getRule2(index,Row.FIELD_NAME);
            })
            this.getPPPMORDER_COUNT(Part_NO,PLANT_NO);
        }).catch(err=>{

        })
    },
    getPPPMORDER_COUNT(PartNO,PLANTNO)
    {
        
        const url = this.Main_URL + "KensakuBtnGet/CountENT_PPPMMORDER";
        const params ={
            PART_NO : PartNO,
            PLANT_NO : PLANTNO,
        }
        this.$axios.get(url,{params}).then(res=>{
            //データが登録されなかった場合に初期値を入れる
            if(res.data[0].COUNT == '0')
            {
                this.EditInfo2_Value.forEach((Row,index) =>{
                    if(Row.FIELD_NAME == "PART_NO")
                    {
                        this.EditInfo2_Value[index].FIELD_VALUE = PartNO;
                    }
                    else if(Row.FIELD_NAME == "PLANT_NO")
                    {
                        this.EditInfo2_Value[index].FIELD_VALUE = PLANTNO;
                    }
                    else if(Row.FIELD_NAME == "MFG_TYPE")
                    {
                        this.EditInfo2_Value[index].FIELD_VALUE = "0";
                    }
                    else if(Row.FIELD_NAME == "SCRAP_PCNT")
                    {
                        this.EditInfo2_Value[index].FIELD_VALUE = "0";
                    }
                    else if(Row.FIELD_NAME == "TRACE_TYPE")
                    {
                        this.EditInfo2_Value[index].FIELD_VALUE = "0";
                    }
                    else if(Row.FIELD_NAME == "YEAR_CH_QTY")
                    {
                        this.EditInfo2_Value[index].FIELD_VALUE = "0";
                    }
                    else if(Row.FIELD_NAME == "AUTO_ARR_COMP_DATE")
                    {
                        this.EditInfo2_Value[index].FIELD_VALUE = "29991231";
                    }
                    else if(Row.FIELD_NAME == "AUTO_CH_REQ_TYPE")
                    {
                        this.EditInfo2_Value[index].FIELD_VALUE = "0";
                    }
                    else if(Row.FIELD_NAME == "LOT_PRINT_TYPE")
                    {
                        this.EditInfo2_Value[index].FIELD_VALUE = "2";
                    }
                    else if(Row.FIELD_NAME == "MFG_LOT_SIZE")
                    {
                        this.EditInfo2_Value[index].FIELD_VALUE = "0";
                    }
                    else if(Row.FIELD_NAME == "MFG_LEADTIME")
                    {
                        this.EditInfo2_Value[index].FIELD_VALUE = "0";
                    }
                    else if(Row.FIELD_NAME == "MFG_MIN_LOT_SIZE")
                    {
                        this.EditInfo2_Value[index].FIELD_VALUE = "0";
                    }
                    else if(Row.FIELD_NAME == "VENDOR_SUPPLY_TYPE")
                    {
                        this.EditInfo2_Value[index].FIELD_VALUE = "0";
                    }
                    else if(Row.FIELD_NAME == "STOP_DATE")
                    {
                        this.EditInfo2_Value[index].FIELD_VALUE = "29991231";
                    }
                    else if(Row.FIELD_NAME == "FC_FLAG")
                    {
                        this.EditInfo2_Value[index].FIELD_VALUE = "0";
                    }
                    else if(Row.FIELD_NAME == "REPAIR_PSC_TYPE")
                    {
                        this.EditInfo2_Value[index].FIELD_VALUE = "0";
                    }
                    this.getEditTableSetsumei2(index,Row.FIELD_NAME);
                })
            }
            if(this.tab_select == 1 && this.Edit_Combobox_1_select.substr(0,1) != '-')
            {
                this.getKouteiJunjo(this.Header_Data[this.Header_Data.length-1].PART_NO,this.Edit_Combobox_1_select.substr(0,1));
            }
            else
            {
                this.KouteiJunjoTable_Item =[];
                this.STD_EditInfo_Item = [];
            }
            }).catch(err=>{

            });
    },
    getRule2(index,item){
        if(item=="STOCK_CODE")
        {
            this.EditInfo2_Value[index].RULES.push(this.formRules.lengthThan2);
        }
        if(item=="TRANS_STOCK_TYPE")
        {
            this.EditInfo2_Value[index].RULES.push(this.formRules.ZeroOne);
        }
        if(item=="SCRAP_PCNT")
        {
            this.EditInfo2_Value[index].RULES.push(this.formRules.required);
            this.EditInfo2_Value[index].RULES.push(this.formRules.InterOnlyThan2);
        }
        if(item=="TRACE_TYPE")
        {
            this.EditInfo2_Value[index].RULES.push(this.formRules.ZeroOneTwo);
        }
        if(item=="YEAR_CH_QTY")
        {
            this.EditInfo2_Value[index].RULES.push(this.formRules.InterOnlyThan7);
        }
        if(item=="WCCC_FOLLOW_TYPE")
        {
            this.EditInfo2_Value[index].RULES.push(this.formRules.VoidOne);
        }
        if(item=="SET_COLOR_TYPE")
        {
            this.EditInfo2_Value[index].RULES.push(this.formRules.lengthThan10);
        }
        if(item=="AUTO_ARR_COMP_DATE")
        {
            this.EditInfo2_Value[index].RULES.push(this.formRules.Datefomat);
        }
        if(item=="AUTO_CH_REQ_TYPE")
        {
            this.EditInfo2_Value[index].RULES.push(this.formRules.ZeroOne);
        }
        if(item=="LOT_PRINT_TYPE")
        {
            this.EditInfo2_Value[index].RULES.push(this.formRules.OneTwo);
        }
        if(item=="MFG_LOT_SIZE")
        {
            this.EditInfo2_Value[index].RULES.push(this.formRules.required);
            this.EditInfo2_Value[index].RULES.push(this.formRules.InterOnlyThan6);
        }
        if(item=="MFG_LEADTIME")
        {
            this.EditInfo2_Value[index].RULES.push(this.formRules.required);
            this.EditInfo2_Value[index].RULES.push(this.formRules.InterOnlyThan3);
        }
        if(item=="MFG_MIN_LOT_SIZE")
        {
            this.EditInfo2_Value[index].RULES.push(this.formRules.ZeroOneTwo);
        }
        if(item=="VENDOR_SUPPLY_TYPE")
        {
            this.EditInfo2_Value[index].RULES.push(this.formRules.ZeroOneTwo);
        }
        if(item=="STOP_DATE")
        {
            this.EditInfo2_Value[index].RULES.push(this.formRules.Datefomat);
        }
        if(item=="FM_ISSUE_FC_RATE")
        {
            this.EditInfo2_Value[index].RULES.push(this.formRules.InterOnlyThan3);
        }
        if(item=="POG_ISSUE_FC_RATE")
        {
            this.EditInfo2_Value[index].RULES.push(this.formRules.InterOnlyThan3);
        }
        if(item=="SUB_CHG_TYPE")
        {
            this.EditInfo2_Value[index].RULES.push(this.formRules.ZeroOneTwo);
        }
        if(item=="SUB_START_DATE")
        {
            this.EditInfo2_Value[index].RULES.push(this.formRules.Datefomat);
        }
    },
    getEditTableSetsumei2(index,item){
        var check_change=false;
        var Setsumei ="";
        var Setsumei_Error = false;
        if(this.EditInfo2_Value[index].FIELD_VALUE === null)
        {
            if ( item == "SCRAP_PCNT")             
            {
                Setsumei = "数値を入力して下さい。";
                Setsumei_Error = true;
                check_change = true;
            }
            else if ( item == "YEAR_CH_QTY")            
            {
                Setsumei = "数値を入力して下さい。";
                Setsumei_Error = true;
                check_change = true;
            }
            else if ( item == "WCCC_FOLLOW_TYPE")       
            {
                Setsumei = "Null:継承なし 1:下位レベルに移送先を継承する";
                Setsumei_Error = false;
                check_change = true;
            }
            else if ( item == "MFG_LOT_SIZE")           
            {
                Setsumei = "数値を入力して下さい。";
                Setsumei_Error = true;
                check_change = true;
            }
            else if ( item == "MFG_LEADTIME")           
            {
                Setsumei = "数値を入力して下さい。";
                Setsumei_Error = true;check_change = true;
            }
            else if ( item == "SUB_CHG_TYPE")           
            {
                Setsumei = "-";
                Setsumei_Error = false;check_change = true;
            }
        }
        else
        {
            if ( item == "STOCK_CODE")
            {
                Setsumei = this.EditInfo2_Value[index].FIELD_VALUE.length > 2 ?
                        "2桁以内で入力して下さい。":"";
                Setsumei_Error = this.EditInfo2_Value[index].FIELD_VALUE.length > 2 ?
                        true:false;
                check_change = true;
            }
            else if ( item == "TRANS_STOCK_TYPE")       
            {
                Setsumei = this.EditInfo2_Value[index].FIELD_VALUE == "0" || 
                        this.EditInfo2_Value[index].FIELD_VALUE == "1" ?
                        "":"0,1を入力下さい。"
                Setsumei_Error = this.EditInfo2_Value[index].FIELD_VALUE == "0" || 
                        this.EditInfo2_Value[index].FIELD_VALUE == "1" ?
                        false:true;
                check_change = true;
            }
            else if ( item == "SCRAP_PCNT")             
            {
                Setsumei = this.EditInfo2_Value[index].FIELD_VALUE.length > 2 ?
                        "2桁以内で入力して下さい。":"";
                Setsumei_Error = this.EditInfo2_Value[index].FIELD_VALUE.length > 2 ?
                        true:false;
                check_change = true;
            }
            else if ( item == "TRACE_TYPE")             
            {
                Setsumei = this.EditInfo2_Value[index].FIELD_VALUE == "0" || 
                        this.EditInfo2_Value[index].FIELD_VALUE == "1" ||
                        this.EditInfo2_Value[index].FIELD_VALUE == "2"?
                        "":"0,1,2を入力下さい。"
                Setsumei_Error = this.EditInfo2_Value[index].FIELD_VALUE == "0" || 
                        this.EditInfo2_Value[index].FIELD_VALUE == "1" ||
                        this.EditInfo2_Value[index].FIELD_VALUE == "2"?
                        false:true;
                check_change = true;
            }
            else if ( item == "YEAR_CH_QTY")            
            {
                Setsumei = this.EditInfo2_Value[index].FIELD_VALUE.length > 7 ?
                        "7桁以内で入力して下さい。":"";
                Setsumei_Error = this.EditInfo2_Value[index].FIELD_VALUE.length > 7 ?
                        true:false;
                check_change = true;
            }
            else if ( item == "WCCC_FOLLOW_TYPE")       
            {
                Setsumei = this.EditInfo2_Value[index].FIELD_VALUE == "1" ?
                        "Null:継承なし 1:下位レベルに移送先を継承する":"空白か1を入力下さい。"
                Setsumei_Error = this.EditInfo2_Value[index].FIELD_VALUE == "1" ?
                        false:true;
                check_change = true;
            }
            else if ( item == "SET_COLOR_TYPE")         
            {

            }
            else if ( item == "AUTO_ARR_COMP_DATE")     
            {
                check_change = true;
                if(!this.check_date(this.EditInfo2_Value[index].FIELD_VALUE))
                {
                    Setsumei = "yyyymmdd形式で入力して下さい"
                    Setsumei_Error =true;
                }
            }
            else if ( item == "AUTO_CH_REQ_TYPE")       
            {
                Setsumei = this.EditInfo2_Value[index].FIELD_VALUE == "0" || 
                        this.EditInfo2_Value[index].FIELD_VALUE == "1" ?
                        "":"0,1を入力下さい。"
                Setsumei_Error = this.EditInfo2_Value[index].FIELD_VALUE == "0" || 
                        this.EditInfo2_Value[index].FIELD_VALUE == "1" ?
                        false:true;
                check_change = true;
            }
            else if ( item == "LOT_PRINT_TYPE")         
            {
                Setsumei = this.EditInfo2_Value[index].FIELD_VALUE == "1" || 
                        this.EditInfo2_Value[index].FIELD_VALUE == "2" ?
                        "1:納入単位でまとめて1枚 2:手配データ毎に1枚":"1か2を入力下さい。"
                Setsumei_Error = this.EditInfo2_Value[index].FIELD_VALUE == "1" || 
                        this.EditInfo2_Value[index].FIELD_VALUE == "2" ?
                        false:true;
                check_change = true;
            }
            else if ( item == "MFG_LOT_SIZE")           
            {
                Setsumei = this.EditInfo2_Value[index].FIELD_VALUE.length > 6 ?
                        "6桁以内で入力して下さい。":"";
                Setsumei_Error = this.EditInfo2_Value[index].FIELD_VALUE.length > 6 ?
                        true:false;
                check_change = true;
            }
            else if ( item == "MFG_LEADTIME")           
            {
                Setsumei = this.EditInfo2_Value[index].FIELD_VALUE.length > 3 ?
                        "3桁以内で入力して下さい。":"";
                Setsumei_Error = this.EditInfo2_Value[index].FIELD_VALUE.length > 3 ?
                        true:false;
                check_change = true;
            }
            else if ( item == "MFG_MIN_LOT_SIZE")       
            {
                Setsumei = this.EditInfo2_Value[index].FIELD_VALUE == "0" || 
                        this.EditInfo2_Value[index].FIELD_VALUE == "1" ||
                        this.EditInfo2_Value[index].FIELD_VALUE == "2"?
                        "":"0,1,2を入力下さい。"
                Setsumei_Error = this.EditInfo2_Value[index].FIELD_VALUE == "0" || 
                        this.EditInfo2_Value[index].FIELD_VALUE == "1" ||
                        this.EditInfo2_Value[index].FIELD_VALUE == "2"?
                        false:true;
                check_change = true;
            }
            else if ( item == "VENDOR_SUPPLY_TYPE")     
            {
                Setsumei = this.EditInfo2_Value[index].FIELD_VALUE == "0" || 
                        this.EditInfo2_Value[index].FIELD_VALUE == "1" ||
                        this.EditInfo2_Value[index].FIELD_VALUE == "2"?
                        "":"0,1,2を入力下さい。"
                Setsumei_Error = this.EditInfo2_Value[index].FIELD_VALUE == "0" || 
                        this.EditInfo2_Value[index].FIELD_VALUE == "1" ||
                        this.EditInfo2_Value[index].FIELD_VALUE == "2"?
                        false:true;
                check_change = true;
            }
            else if ( item == "STOP_DATE")              
            {
                check_change = true;
                if(!this.check_date(this.EditInfo2_Value[index].FIELD_VALUE))
                {
                    Setsumei = "yyyymmdd形式で入力して下さい"
                    Setsumei_Error =true;
                }
            }
            else if ( item == "FM_ISSUE_FC_RATE")       
            {
                check_change = true;
            }
            else if ( item == "POG_ISSUE_FC_RATE")      
            {
                check_change = true;
            }
            else if ( item == "SUB_CHG_TYPE")           
            {
                Setsumei = this.EditInfo2_Value[index].FIELD_VALUE == "0"?
                            "0 手動（代替部品切替日にあわさない）": this.EditInfo_Value[index].FIELD_VALUE == "1" ? 
                            "1 自動（代替部品切替日にあわす）":this.EditInfo_Value[index].FIELD_VALUE == "2"?
                            "2 在庫消化後に切換日を自動設定":"0,1,2を入力下さい。"
                Setsumei_Error = this.EditInfo2_Value[index].FIELD_VALUE == "0" || 
                                this.EditInfo2_Value[index].FIELD_VALUE == "1" || 
                                this.EditInfo2_Value[index].FIELD_VALUE == "2"?
                                false:true;
                check_change = true;
            }
            else if ( item == "SUB_START_DATE")         
            {
                check_change = true;
            }

        }
        if(check_change){
            this.EditInfo2_Value[index].FIELD_EXPLAIN = Setsumei; 
            this.EditInfo2_Value[index].Setsumei_Error =Setsumei_Error;
        }
        if(this.EditInfo2_Value[index].CELL_TYPE == 'B' && this.EditInfo2_Value[index].AUTH_TYPE == 2)
        {
            this.PPPMORDERCheck_CellType(index);
        }
        this.PPPMORDER_UPDATE_CHECK(index);
    },
    GetKoubaiSetsumei(index,item){
        //  check_change 特定の入力フォーマットの変化を確認するプロパティ
        //  True  : 入力確認
        //　False : 入力確認未確認
        var check_change=false;
        var Setsumei ="";
        var Setsumei_Error = false;
        //  入力確認条件が空だった場合こちらで確認
        if(this.Koubai_EditTable_Item[index].FIELD_VALUE === null)
        {
            //最小発注量
            if(item == "CH_MIN_LOT_SIZE")
            {
                Setsumei = "この項目は必須入力の項目です。";
                Setsumei_Error = true;
                check_change = true;
            }
            //購入リードタイム
            else if(item == "CH_LEADTIME")
            {
                Setsumei = "この項目は必須入力の項目です。";
                Setsumei_Error = true;
                check_change = true;
            }
            //自動発注区分
            else if(item == "AUTO_ORD_FLG")
            {
                Setsumei = "この項目は必須入力の項目です。";
                Setsumei_Error = true;
                check_change = true;
            }
            //フォーキャスト判定
            else if(item == "CH_FC_FLAG")
            {
                Setsumei = "この項目は必須入力の項目です。";
                Setsumei_Error = true;
                check_change = true;
            }
            //引取り猶予期間
            else if(item == "FC_PICKUP_PERIOD")
            {
                Setsumei = "0-99(ヵ月) or 空値(初期値)を指定。※空値は引取り責任なし。0(ヵ月)は当月引取要、4(ヶ月)は4ヵ月後までに引取要。";
                Setsumei_Error = false;
                check_change = true;
            }
            //フォーキャスト判定'1'に設定された場合
            else if(this.Koubai_EditTable_Item[this.Koubai_FC_FLAG_INDEX].FIELD_VALUE == "1")
            {
                //フォーキャスト期間
                if(item == "FC_PERIOD")
                {
                    Setsumei = "ﾌｫｰｷｬｽﾄ判定が'1'のとき、必ず入力してください。";
                    Setsumei_Error = true;
                    check_change = true;
                }
                //フォーキュスト固定期間
                else if(item == "FC_FIX_PERIOD")
                {
                    Setsumei = "ﾌｫｰｷｬｽﾄ判定が'1'のとき、必ず入力してください。";
                    Setsumei_Error = true;
                    check_change = true;
                }
                //フォーキャスト作成曜日
                else if(item == "FC_DAY_OF_WEEK")
                {
                    Setsumei = "ﾌｫｰｷｬｽﾄ判定が'1'のとき、必ず入力してください。";
                    Setsumei_Error = true;
                    check_change = true;
                }
                //複数社分配率
                else if(item == "VENDOR_DISTN")
                {
                    Setsumei = "ﾌｫｰｷｬｽﾄ判定が'1'のとき、必ず入力してください。";
                    Setsumei_Error = true;
                    check_change = true;
                }
                //フォーキャスト開始月
                else if(item == "FC_START_YM")
                {
                    Setsumei = "ﾌｫｰｷｬｽﾄ判定が'1'のとき、必ず入力してください。";
                    Setsumei_Error = true;
                    check_change = true;
                }
                //フォーキャスト終了月
                else if(item == "FC_STOP_YM")
                {
                    Setsumei = "ﾌｫｰｷｬｽﾄ判定が'1'のとき、必ず入力してください。";
                    Setsumei_Error = true;
                    check_change = true;
                }
            }
        }
        //  通常入力確認条件だった場合こちらで確認
        else
        {
            //業者部品コード
            if(item == "VENDOR_PART_NO")
            {
                Setsumei = this.Koubai_EditTable_Item[index].FIELD_VALUE.length > 60 ?
                        "60桁以内で入力して下さい。":"";
                Setsumei_Error = this.Koubai_EditTable_Item[index].FIELD_VALUE.length > 60 ?
                        true:false;
                check_change = true;
            }
            //最小発注量
            else if(item == "CH_MIN_LOT_SIZE")
            {
                Setsumei = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^\d{1,6}$/)?
                        "":"数値を6桁以内で入力して下さい。";
                Setsumei_Error = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^\d{1,6}$/)?
                        false:true;
                check_change = true;
            }
            //購入リードタイム
            else if(item == "CH_LEADTIME")
            {
                Setsumei = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^\d{1,3}$/)?
                        "":"数値を3桁以内で入力して下さい。";
                Setsumei_Error = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^\d{1,3}$/)?
                        false:true;
                check_change = true;
            }
            //自動発注区分
            else if(item == "AUTO_ORD_FLG")
            {
                Setsumei = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[0-1]$/)?
                            "0=対象外 1=対象":"0,1を入力下さい。";
                Setsumei_Error = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[0-1]$/)?
                            false:true;
                check_change = true;
            }
            //フォーキャスト判定
            else if(item == "CH_FC_FLAG")
            {
                Setsumei = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[0-1]$/)?
                            "0=対象外 1=対象":"0,1を入力下さい。";
                Setsumei_Error = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[0-1]$/)?
                            false:true;
                check_change = true;
            }
            //引取り猶予期間
            else if(item == "FC_PICKUP_PERIOD")
            {
                Setsumei = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^\d{0,2}$/)?
                            "0-99(ヵ月) or 空値(初期値)を指定。※空値は引取り責任なし。0(ヵ月)は当月引取要、4(ヶ月)は4ヵ月後までに引取要。":
                            "数値2桁(0 ～ 99)を指定してください。（空値も可）。";
                Setsumei_Error = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^\d{0,2}$/)?
                                false:true;
                check_change = true;
            }
            //フォーキャスト判定'1'に設定された場合
            else if(this.Koubai_EditTable_Item[this.Koubai_FC_FLAG_INDEX].FIELD_VALUE == "1")
            {
                //フォーキャスト期間
                if(item == "FC_PERIOD")
                {
                    Setsumei = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[1-9]$/) || 
                               this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[1][0-2]$/)?
                                "1~12(ヶ月)。※業者への提示期間。フォーキャスト判定が0でない場合は必須。":
                                "1 ～ 12までの数値を指定してください。";
                    Setsumei_Error = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[1-9]$/) || 
                               this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[1][0-2]$/)?
                                    false:true;
                    check_change = true;
                }
                //フォーキュスト固定期間
                else if(item == "FC_FIX_PERIOD")
                {
                    Setsumei = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^\d$/) || 
                               this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[1][0-2]$/)?
                                "0~12(ヶ月)。※業者への提示期間。フォーキャスト判定が0でない場合は必須。":
                                "0 ～ 12までの数値を指定してください。";
                    Setsumei_Error = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^\d$/) || 
                                    this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[1][0-2]$/)?
                                    false:true;
                    check_change = true;
                }
                //フォーキャスト作成曜日
                else if(item == "FC_DAY_OF_WEEK")
                {
                    Setsumei = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[0-8]$/)?
                               this.Koubai_FC_DAY_OF_WEEK[this.Koubai_EditTable_Item[index].FIELD_VALUE]:
                                "0 ～ 8までの数値を指定してください。";
                    Setsumei_Error = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[0-8]$/)?
                                    false:true;
                    check_change = true;
                }
                //複数社分配率
                else if(item == "VENDOR_DISTN")
                {
                    Setsumei = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[1][0][0]$/) ||
                                this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^\d{0,2}$/)?
                               "":"数値3桁(0 ～ 100)を指定してください";
                    Setsumei_Error = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[1][0][0]$/) ||
                                this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^\d{0,2}$/)?
                                    false:true;
                    check_change = true;
                }
                //複数社分配率
                else if(item == "FC_START_YM")
                {
                    Setsumei = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^\d{6}$/)?
                               "":"年月(YYYYMM)で入力下さい";
                    Setsumei_Error = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^\d{6}$/)?
                                    false:true;
                    check_change = true;
                }
                //フォーキャスト終了月
                else if(item == "FC_STOP_YM")
                {
                    Setsumei = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^\d{6}$/)?
                               "":"年月(YYYYMM)で入力下さい";
                    Setsumei_Error = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^\d{6}$/)?
                                    false:true;
                    check_change = true;
                }
            }
            //フォーキャスト判定'0'に設定された場合
            else if(this.Koubai_EditTable_Item[this.Koubai_FC_FLAG_INDEX].FIELD_VALUE == "0")
            {
                //フォーキャスト期間
                if(item == "FC_PERIOD")
                {
                    Setsumei = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[0-1]?\d$/)?
                                "1~12(ヶ月)。※業者への提示期間。フォーキャスト判定が0でない場合は必須。":
                                this.Koubai_EditTable_Item[index].FIELD_VALUE ==""?"":
                                "1 ～ 12までの数値を指定してください。";
                    Setsumei_Error = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[0-1]?\d$/)||
                                    this.Koubai_EditTable_Item[index].FIELD_VALUE ==""?
                                    false:true;
                    check_change = true;
                }
                //フォーキュスト固定期間
                else if(item == "FC_FIX_PERIOD")
                {
                    Setsumei = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[0-1]?[1-9]$/)?
                                "1~12(ヶ月)。※業者への提示期間。フォーキャスト判定が0でない場合は必須。":
                                this.Koubai_EditTable_Item[index].FIELD_VALUE ==""?"":
                                "1 ～ 12までの数値を指定してください。";
                    Setsumei_Error = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[0-1]?[1-9]$/)||
                                    this.Koubai_EditTable_Item[index].FIELD_VALUE ==""?
                                    false:true;
                    check_change = true;
                }
                //フォーキャスト作成曜日
                else if(item == "FC_DAY_OF_WEEK")
                {
                    Setsumei = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[0-8]$/)?
                               this.Koubai_FC_DAY_OF_WEEK[this.Koubai_EditTable_Item[index].FIELD_VALUE]:
                               this.Koubai_EditTable_Item[index].FIELD_VALUE ==""?"":
                                "0 ～ 8までの数値を指定してください。";
                    Setsumei_Error = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[0-8]$/)||
                                    this.Koubai_EditTable_Item[index].FIELD_VALUE ==""?
                                    false:true;
                    check_change = true;
                }
                //複数社分配率
                else if(item == "VENDOR_DISTN")
                {
                    Setsumei = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[1][0][0]$/) ||
                                this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^\d{0,2}$/) ||
                               this.Koubai_EditTable_Item[index].FIELD_VALUE ==""?
                               "":"数値3桁(0 ～ 100)を指定してください";
                    Setsumei_Error = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^[1][0][0]$/) ||
                                this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^\d{0,2}$/)||
                                    this.Koubai_EditTable_Item[index].FIELD_VALUE ==""?
                                    false:true;
                    check_change = true;
                }
                //複数社分配率
                else if(item == "FC_START_YM")
                {
                    Setsumei = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^\d{6}$/)||
                               this.Koubai_EditTable_Item[index].FIELD_VALUE ==""?
                               "":"年月(YYYYMM)で入力下さい";
                    Setsumei_Error = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^\d{6}$/)||
                                    this.Koubai_EditTable_Item[index].FIELD_VALUE ==""?
                                    false:true;
                    check_change = true;
                }
                //フォーキャスト終了月
                else if(item == "FC_STOP_YM")
                {
                    Setsumei = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^\d{6}$/)||
                                this.Koubai_EditTable_Item[index].FIELD_VALUE ==""?
                               "":"年月(YYYYMM)で入力下さい";
                    Setsumei_Error = this.Koubai_EditTable_Item[index].FIELD_VALUE.match(/^\d{6}$/)||
                                    this.Koubai_EditTable_Item[index].FIELD_VALUE ==""?
                                    false:true;
                    check_change = true;
                }
            }
        }
        //  check_change　が　Trueであれば　「Setsumei」と「Setsumei_Error」を購買テーブルに保存する
        if(check_change){
            this.Koubai_EditTable_Item[index].FIELD_EXPLAIN = Setsumei; 
            this.Koubai_EditTable_Item[index].Setsumei_Error =Setsumei_Error;
            this.Koubai_EditTable_Item[index].RULES = [];
            if(!Setsumei_Error)
            {
                this.Koubai_EditTable_Item[index].RULES.push(this.formRules.TrueRule);
            }
            else
            {
                this.Koubai_EditTable_Item[index].RULES.push(this.formRules.FalseRule);
            }
        }
        //  データベースから説明部を取得必要ある項目はこちらで確認
        if(this.Koubai_EditTable_Item[index].MS_TABLE !== null && this.Koubai_EditTable_Item[index].MS_TABLE.match(/^[1-5]$/) && this.Koubai_EditTable_Item[index].AUTH_TYPE == 2)
        {
            //this.CHMSACheck_CellType(index);
        }
        //　更新項目をリストに追加
        this.CHMSA_UPDATE_CHECK(index);
    },
    GetZaikouSetsumei(index,item)
    {
        //  check_change 特定の入力フォーマットの変化を確認するプロパティ
        //  True  : 入力確認
        //　False : 入力確認未確認
        var check_change=false;
        var Setsumei ="";
        var Setsumei_Error = false;
        //  入力確認条件が空だった場合こちらで確認
        if(this.Zaiko_EditTable_Item[index].FIELD_VALUE === null ||
        this.Zaiko_EditTable_Item[index].FIELD_VALUE === "" )
        {
            //  発注点
            if(item == "ORDER_POINT")
            {
                Setsumei = "入力を省略できません ";
                Setsumei_Error = true;
                check_change = true;
            }
            // 安全在庫量
            else if(item == "MIN_SAFETY")
            {
                Setsumei = "入力を省略できません";
                Setsumei_Error = true;
                check_change = true;
            }
            //  貯蔵開始日
            else if(item =="STOCK_START_DATE")
            {
                Setsumei = "入力を省略できません ";
                Setsumei_Error = true;
                check_change = true;
            }
            //  ＰＳ展開区分
            else if(item =="PS_FLAG")
            {
                Setsumei = "部品展開で出庫になる";
                Setsumei_Error = false;
                check_change = true;
            }
            //  自動購入依頼判定
            else if(item == "AUTO_PURCHASE_REQ")
            {
                if(this.Zaiko_EditTable_Item[index].FIELD_VALUE === null)
                {
                    this.Zaiko_EditTable_Item[index].FIELD_VALUE = '0';
                    Setsumei = "";
                    Setsumei_Error = false;
                    check_change = true;
                }
                else
                {
                    Setsumei = "0,1,2を入力下さい。";
                    Setsumei_Error = true;
                    check_change = true;
                }
            }
            //  補用品在庫判定
            else if(item == "EZ_STOCK_FLAG")
            {
                Setsumei = "";
                Setsumei_Error = false;
                check_change = true;
            }
            //  店所緊急用在庫
            else if(item == "EMG_STOCK")
            {
                Setsumei = "";
                Setsumei_Error = false;
                check_change = true;
            }
            //  店所緊急用在庫
            else if(item == "MAX_VALUE_SET_TYPE")
            {
                Setsumei = "";
                Setsumei_Error = false;
                check_change = true;
            }
            //  上限値自動設定係数
            else if(item == "MAX_VALUE_CALC_ITEM1")
            {
                Setsumei = "";
                Setsumei_Error = false;
                check_change = true;
            }
            // 安全在庫自動補正判定
            else if(item == "MIN_SAFETY_SET_TYPE")
            {
                Setsumei = "";
                Setsumei_Error = false;
                check_change = true;
            }
            // 安全在庫自動補正計算式
            else if(item == "MIN_SAFETY_CALC_METHOD")
            {
                Setsumei = "";
                Setsumei_Error = false;
                check_change = true;
            }
            //  安全在庫自動設定係数
            else if(item == "MIN_SAFETY_CALC_ITEM1")
            {
                Setsumei = "";
                Setsumei_Error = false;
                check_change = true;
            }
        }
        else
        {
            //  業者部品コード
            if(item == "ORDER_POINT")
            {  
                Setsumei = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^\d{0,6}$/) ?
                        "":"数値6桁以内で入力して下さい。";
                Setsumei_Error = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^\d{0,6}$/) ?
                                false:true;
                check_change = true;
            }
            // 安全在庫量
            else if(item == "MIN_SAFETY")
            {
                Setsumei = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^\d{0,6}$/) ?
                        "":"数値6桁以内で入力して下さい。";
                Setsumei_Error = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^\d{0,6}$/) ?
                                false:true;
                check_change = true;
            }
            //  貯蔵中止判定
            else if(item == "STOCK_STOP_FLAG")
            {
                Setsumei = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^[0]$/) ?
                        "貯蔵継続":this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^[1]$/)?
                        "貯蔵中止(在庫消化後)":"0(継続),1（中止）を入力下さい。";
                Setsumei_Error = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^[0-1]$/) ?
                                false:true;
                check_change = true;
            }
            // 貯蔵開始日
            else if(item == "STOCK_START_DATE")
            {
                Setsumei = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^\d{8}$/) ?
                        "":"yyyymmdd形式で入力して下さい";
                Setsumei_Error = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^\d{8}$/) ?
                        false:true;
                check_change = true;
            }
            // ＰＳ展開区分
            else if(item == "PS_FLAG")
            {
                Setsumei = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^[K]$/)?"K:部品展開で出庫にならない" 
                        :this.Zaiko_EditTable_Item[index].FIELD_VALUE == "" ?
                        "' ':部品展開で出庫になる":"'' or 'K' :Kか空白を入力して下さい";
                Setsumei_Error = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^[K]$/) ||
                                this.Zaiko_EditTable_Item[index].FIELD_VALUE == "" ?
                                false:true;
                check_change = true;
            }
            // 上限値
            else if(item == "MAX_VALUE")
            {
                Setsumei = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^\d{0,6}$/) ?
                        "":"数値6桁以内で入力して下さい。";
                Setsumei_Error = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^\d{0,6}$/) ?
                                false:true;
                check_change = true;
            }
            //  手配情報
            else if(item == "REMARKS")
            {
                Setsumei = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^\w{0,200}$/) ?
                        "最大200文字":"最大200文字";
                Setsumei_Error = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^\w{0,200}$/)?
                        false:true;
                check_change = true;
            }
            // 伝票記事1
            else if(item == "DENPYO_KIJI1")
            {
                Setsumei = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^\w{0,50}$/) ?
                        "最大50文字":"最大50文字";
                Setsumei_Error = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^\w{0,50}$/)?
                        false:true;
                check_change = true;
            }
            // 自動購入依頼判定
            else if(item == "AUTO_PURCHASE_REQ")
            {
                if(this.Zaiko_EditTable_Item[index].FIELD_VALUE === null)
                {
                    this.Zaiko_EditTable_Item[index].FIELD_VALUE = '0';
                }
                Setsumei = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^[0-2]$/) ?
                        "":"0,1,2を入力下さい。";
                Setsumei_Error = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^[0-2]$/)?
                        false:true;
                check_change = true;
            }
            //  補用品在庫判定
            else if(item == "EZ_STOCK_FLAG")
            {
                Setsumei = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^[0]$/) ?
                        "PSC在庫使用不可":this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^[1]$/) ?
                        "PSC在庫使用可":"0(不可),1（可）を入力下さい。"
                Setsumei_Error = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^[0-1]$/)?
                        false:true;
                check_change = true;
            }
            //  倉庫コード
            else if(item == "EMG_STOCK")
            {
                Setsumei = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^\d{0,6}$/) ?
                        "":"数値6桁以内で入力して下さい。";
                Setsumei_Error = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^\d{0,6}$/) ?
                                false:true;
                check_change = true;
            }
            // 上限値自動補正判定
            else if(item == "MAX_VALUE_SET_TYPE")
            {
                Setsumei = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^[0]/) ?
                        "0:手動":this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^[1]/) ?
                        "1:自動":"0(手動),1（自動）を入力下さい。";
                Setsumei_Error = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^[01]$/) ?
                                false:true;
                check_change = true;
            }
            //  上限値自動設定係数
            else if(item == "MAX_VALUE_CALC_ITEM1")
            {
                if(this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/\./))
                {
                    var Point_value = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/\./)?
                        this.Zaiko_EditTable_Item[index].FIELD_VALUE:this.Zaiko_EditTable_Item[index].FIELD_VALUE+".00";
                    Setsumei =Point_value.match(/^\d{0,2}\.\d{0,2}$/) ?"":"整数部は5桁、少数部は2桁で入力して下さい。";
                    Setsumei_Error = Point_value.match(/^\d{0,2}\.\d{0,2}$/) ?false:true;
                }
                else
                {
                    Setsumei = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^100$/)?
                                "":this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^\d{0,2}$/)?
                                "":"100以下で入力して下さい";
                    Setsumei_Error = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^100$/) ||
                                this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^\d{0,2}$/)?
                                false:true
                }
                check_change = true;
            }
            // 安全在庫自動補正判定
            else if(item == "MIN_SAFETY_SET_TYPE")
            {
                Setsumei = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^[0]/) ?
                        "0:手動":this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^[1]/) ?
                        "1:自動":"0(手動),1（自動）を入力下さい。";
                Setsumei_Error = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^[01]$/) ?
                                false:true;
                check_change = true;
            }
            //  安全在庫自動補正計算式
            else if(item == "MIN_SAFETY_CALC_METHOD")
            {
                Setsumei = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^[1]/) ?
                        "1:自動補正する":this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^[2]/) ?
                        "2:自動補正しない":"1,2のいずれかを入力下さい。";
                Setsumei_Error = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^[12]$/) ?
                                false:true;
                check_change = true;
            }
            else if(item == "MIN_SAFETY_CALC_ITEM1")
            {
                if(this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/\./))
                {
                    var Point_value = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/\./)?
                        this.Zaiko_EditTable_Item[index].FIELD_VALUE:this.Zaiko_EditTable_Item[index].FIELD_VALUE+".00";
                    Setsumei =Point_value.match(/^\d{0,2}\.\d{0,2}$/) ?"":"整数部は5桁、少数部は2桁で入力して下さい。";
                    Setsumei_Error = Point_value.match(/^\d{0,2}\.\d{0,2}$/) ?false:true;
                }
                else
                {
                    Setsumei = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^100$/)?
                                "":this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^\d{0,2}$/)?
                                "":"100以下で入力して下さい";
                    Setsumei_Error = this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^100$/) ||
                                this.Zaiko_EditTable_Item[index].FIELD_VALUE.match(/^\d{0,2}$/)?
                                false:true
                }
                check_change = true;
            }
        }
         //  データベースから説明部を取得必要ある項目はこちらで確認
         if(this.Zaiko_EditTable_Item[index].MS_TABLE !== null && this.Zaiko_EditTable_Item[index].MS_TABLE.match(/^[1-5]$/) && this.Zaiko_EditTable_Item[index].AUTH_TYPE == 2)
        {
            this.ZKMS_CellType(index);
            check_change = true;
        }
        //  check_change　が　Trueであれば　「Setsumei」と「Setsumei_Error」を購買テーブルに保存する
        if(check_change){
            this.Zaiko_EditTable_Item[index].FIELD_EXPLAIN = Setsumei; 
            this.Zaiko_EditTable_Item[index].Setsumei_Error =Setsumei_Error;
            this.Zaiko_EditTable_Item[index].RULES = [];
            if(!Setsumei_Error)
            {
                this.Zaiko_EditTable_Item[index].RULES.push(this.formRules.TrueRule);
            }
            else
            {
                this.Zaiko_EditTable_Item[index].RULES.push(this.formRules.FalseRule);
            }
        }
        //　更新項目をリストに追加
        this.ZKMS_UPDATE_CHECK(index);
    },
    /*
    GetKoubaiRule(index,item){
        if(item=="VENDOR_PART_NO")
        {
            this.Koubai_EditTable_Item[index].RULES.push(this.formRules.lengthThan60);
        }
        if(item=="CH_MIN_LOT_SIZE")
        {
            this.Koubai_EditTable_Item[index].RULES.push(this.formRules.required);
            this.Koubai_EditTable_Item[index].RULES.push(this.formRules.InterOnlyThan6);
        }
        if(item=="CH_LEADTIME")
        {
            this.Koubai_EditTable_Item[index].RULES.push(this.formRules.required);
            this.Koubai_EditTable_Item[index].RULES.push(this.formRules.InterOnlyThan3);
        }
        if(item=="AUTO_ORD_FLG")
        {
            this.Koubai_EditTable_Item[index].RULES.push(this.formRules.required);
            this.Koubai_EditTable_Item[index].RULES.push(this.formRules.ZeroOne);
        }
        if(item=="CH_FC_FLAG")
        {
            this.Koubai_EditTable_Item[index].RULES.push(this.formRules.required);
            this.Koubai_EditTable_Item[index].RULES.push(this.formRules.ZeroOne);
        }
        if(item=="FC_PERIOD")
        {

        }
        if(item=="FC_FIX_PERIOD")
        {

        }
        if(item=="FC_DAY_OF_WEEK")
        {

        }
        if(item=="FC_PICKUP_PERIOD")
        {

        }
        if(item=="VENDOR_DISTN")
        {

        }
        if(item=="FC_START_YM")
        {

        }
        if(item=="FC_STOP_YM")
        {

        }
    },
    */
    GetPPPMMAINTMS1Setsumei(index,item){
        //  check_change 特定の入力フォーマットの変化を確認するプロパティ
        //  True  : 入力確認
        //　False : 入力確認未確認
        var check_change=false;
        var Setsumei ="";
        var Setsumei_Error = false;
        //  入力確認条件が空だった場合こちらで確認
        if(this.Hoshu_EditTable1_Item[index].FIELD_VALUE === null ||
        this.Hoshu_EditTable1_Item[index].FIELD_VALUE === "" )
        {
            // 保守部品判定
            if(item =='MAINT_TYPE')
            {
                Setsumei = "この項目は必須入力の項目です"
                Setsumei_Error = true;
                check_change = true;
            }
            //  保全方式(一次判定)
            else if(item =='MAINT_METHOD_1')
            {
                Setsumei = "この項目は必須入力の項目です"
                Setsumei_Error = true;
                check_change = true;
            }
        }
        else
        {
            // 保守部品判定
            if(item == 'MAINT_TYPE')
            {
                Setsumei = this.Hoshu_EditTable1_Item[index].FIELD_VALUE.match(/^[01]$/)?
                            "":"0,1を入力下さい。";
                Setsumei_Error = this.Hoshu_EditTable1_Item[index].FIELD_VALUE.match(/^[01]$/)?
                            false:true;
                check_change = true;
            }
            
            //  設計寿命（月）
            else if(item == "DSG_LIFE_MONTH")
            {
                Setsumei = this.Hoshu_EditTable1_Item[index].FIELD_VALUE.match(/^\d{0,3}$/)?
                            "":"数値を入力して下さい";
                Setsumei_Error = this.Hoshu_EditTable1_Item[index].FIELD_VALUE.match(/^\d{0,3}$/)?
                            false:true;
                check_change = true;
            }
            // 設計寿命（稼動値）
            else if(item == "DSG_LIFE_ACT")
            {
                Setsumei = this.Hoshu_EditTable1_Item[index].FIELD_VALUE.match(/^\d{0,10}$/)?
                            "":"数値を入力して下さい";
                Setsumei_Error = this.Hoshu_EditTable1_Item[index].FIELD_VALUE.match(/^\d{0,10}$/)?
                            false:true;
                check_change = true;
            }
            // 単位(設計寿命)
            else if(item == "DSG_UNIT")
            {
                
            }
        }
        //  データベースから説明部を取得必要ある項目はこちらで確認
        if(this.Hoshu_EditTable1_Item[index].MS_TABLE !== null && this.Hoshu_EditTable1_Item[index].MS_TABLE.match(/^[1-5]$/) && this.Hoshu_EditTable1_Item[index].AUTH_TYPE == 2)
        {
            //もしデータベースに見つからない場合説明欄に”マスタに未登録の値が入力されています”を表示する
            // 保全方式(一次判定)  MAINT_METHOD_1
            // 稼動値区分1        ACT_TYPE_1
            this.MAINTMS1_CellType(index);
        }
        //  check_change　が　Trueであれば　「Setsumei」と「Setsumei_Error」を購買テーブルに保存する
        if(check_change){
            this.Hoshu_EditTable1_Item[index].FIELD_EXPLAIN = Setsumei; 
            this.Hoshu_EditTable1_Item[index].Setsumei_Error =Setsumei_Error;
            this.Hoshu_EditTable1_Item[index].RULES = [];
            if(!Setsumei_Error)
            {
                this.Hoshu_EditTable1_Item[index].RULES.push(this.formRules.TrueRule);
            }
            else
            {
                this.Hoshu_EditTable1_Item[index].RULES.push(this.formRules.FalseRule);
            }
        }
        //　更新項目をリストに追加
        this.MAINTMS1_UPDATE_CHECK(index);
    },
    GetPPPMMAINTMS2Setsumei(index,item){
        //  check_change 特定の入力フォーマットの変化を確認するプロパティ
        //  True  : 入力確認
        //　False : 入力確認未確認
        var check_change=false;
        var Setsumei ="";
        var Setsumei_Error = false;
        //  入力確認条件が空だった場合こちらで確認
        if(this.Hoshu_EditTable2_Item[index].FIELD_VALUE === null ||
            this.Hoshu_EditTable2_Item[index].FIELD_VALUE === "" )
        {
            //  優先度
            if(item =='PRIORITY')
            {
                Setsumei = "この項目は必須入力の項目です"
                Setsumei_Error = true;
                check_change = true;
            }
            // 保全方式（二次判定）
            else if(item =='MAINT_METHOD_2')
            {
                Setsumei = "この項目は必須入力の項目です"
                Setsumei_Error = true;
                check_change = true;
            }
        }
        else
        {
            //  優先度
            if(item =='PRIORITY')
            {
                Setsumei = this.Hoshu_EditTable2_Item[index].FIELD_VALUE.match(/^\d{0,3}$/)?
                            "":"数値を入力して下さい";
                Setsumei_Error = this.Hoshu_EditTable2_Item[index].FIELD_VALUE.match(/^\d{0,3}$/)?
                            false:true;
                check_change = true;
            }
            // 保全方式（二次判定）
            else if(item =='MAINT_METHOD_2')
            {
                // Setsumei = "この項目は必須入力の項目です"
                // Setsumei_Error = true;
                // check_change = true;
            }
            // 交換周期（月）
            else if(item == 'REP_LIFE_MONTH')
            {
                Setsumei = this.Hoshu_EditTable2_Item[index].FIELD_VALUE.match(/^\d{0,3}$/)?
                            "":"数値を入力して下さい";
                Setsumei_Error = this.Hoshu_EditTable2_Item[index].FIELD_VALUE.match(/^\d{0,3}$/)?
                            false:true;
                check_change = true;
            }
            // 交換周期注意（月）
            else if(item == 'REP_LIFE_CHKMONTH')
            {
                Setsumei = this.Hoshu_EditTable2_Item[index].FIELD_VALUE.match(/^\d{0,3}$/)?
                            "":"数値を入力して下さい";
                Setsumei_Error = this.Hoshu_EditTable2_Item[index].FIELD_VALUE.match(/^\d{0,3}$/)?
                            false:true;
                check_change = true;
            }
            // 交換周期（稼動値）
            else if(item == 'REP_LIFE_RUN')
            {
                Setsumei = this.Hoshu_EditTable2_Item[index].FIELD_VALUE.match(/^\d{0,15}$/)?
                            "":"数値を入力して下さい";
                Setsumei_Error = this.Hoshu_EditTable2_Item[index].FIELD_VALUE.match(/^\d{0,15}$/)?
                            false:true;
                check_change = true;
            }
            // 交換周期注意（稼動値）
            else if(item == 'REP_LIFE_CHKRUN')
            {
                Setsumei = this.Hoshu_EditTable2_Item[index].FIELD_VALUE.match(/^\d{0,15}$/)?
                            "":"数値を入力して下さい";
                Setsumei_Error = this.Hoshu_EditTable2_Item[index].FIELD_VALUE.match(/^\d{0,15}$/)?
                            false:true;
                check_change = true;
            }
            else if(item == 'COND_TYPE')
            {
                Setsumei = this.Hoshu_EditTable2_Item[index].FIELD_VALUE.match(/^[Y]$/)?
                            "適用条件あり":this.Hoshu_EditTable2_Item[index].FIELD_VALUE.match(/^[N]$/)?
                            "適用条件なし":"Y(適用条件あり),N(適用条件なし)を入力下さい。";
                Setsumei_Error = this.Hoshu_EditTable2_Item[index].FIELD_VALUE.match(/^[YN]$/)?
                            false:true;
                check_change = true;
            }
        }
        //  データベースから説明部を取得必要ある項目はこちらで確認
        if(this.Hoshu_EditTable2_Item[index].MS_TABLE !== null && this.Hoshu_EditTable2_Item[index].MS_TABLE.match(/^[1-5]$/) && this.Hoshu_EditTable2_Item[index].AUTH_TYPE == 2)
            {
                //もしデータベースに見つからない場合説明欄に”マスタに未登録の値が入力されています”を表示する
                // 保全方式（二次判定）MAINT_METHOD_2
                // 稼動値区分2        ACT_TYPE_2
                this.MAINTMS2_CellType(index);
        }
        if(check_change){
            this.Hoshu_EditTable2_Item[index].FIELD_EXPLAIN = Setsumei; 
            this.Hoshu_EditTable2_Item[index].Setsumei_Error =Setsumei_Error;
            this.Hoshu_EditTable2_Item[index].RULES = [];
            if(!Setsumei_Error)
            {
                this.Hoshu_EditTable2_Item[index].RULES.push(this.formRules.TrueRule);
            }
            else
            {
                this.Hoshu_EditTable2_Item[index].RULES.push(this.formRules.FalseRule);
            }
        }
        //　更新項目をリストに追加
        this.MAINTMS2_UPDATE_CHECK(index);
    },
    OpenCloseNav(){
        
        /*Xl～LGの間*/
        if(!this.$vuetify.breakpoint.mobile)
        {
            this.drawer = !this.drawer;
            this.drawer1 = !this.drawer1;
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
        }
        else
        {
            this.drawer = false;
            this.drawer1 = true;
            this.table_height ="0%";
            this.mini = false;
            this.mini2 = false;
            this.search_height ="100%"
           
        }
    },
    getKensakuBtn1(){
        const url = this.Main_URL + "KensakuBtnGet";
        const params = {
            PART_NO : this.buhincode,
            PART_NAME_LOC1 : this.buhinmei,
            FIND_OPTION : this.selectBuhin.substring(0,1),
        }
        this.$axios.get(url,{params}).then(res =>{
            this.APIJSON = res.data
        }).catch(err=>{

        })
        if(this.$vuetify.breakpoint.mobile)
        {
            this.changeNavBar(1);
        }
    },
    getKensakuBtn2(){
        const url = this.Main_URL + "KensakuBtnGet";
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
        const url = this.Main_URL + "KensakuBtnGet";
        const params = {
          PIC_PART_NO : PART_NO
        }
        this.$axios.get(url,{params}).then(res =>{
          if(res.data != "")
            this.Pic_Loc = res.data[0].DOC_FILE_NAME
          else
            this.Pic_Loc ="写真未登録"
        }).catch(err=>{

        })
        }
    },
    getHeaderPic(PART_NO){
      if(PART_NO != "")
      {
        const url = this.Main_URL + "KensakuBtnGet";
        const params = {
          PIC_PART_NO : PART_NO
        }
        this.$axios.get(url,{params}).then(res =>{
          if(res.data != "")
            this.HeaderPic_Loc = res.data[0].DOC_FILE_NAME
          else
            this.HeaderPic_Loc ="写真未登録"
        }).catch(err=>{

        })
        }
    },
    getCM_CODE(table_name,index,MS_ITEM_NO,CM_CODE_ONLY)
    {
        var ck_list = [];
        const url = this.Main_URL + "KensakuBtnGet";
        const params = {
            CM_KOUNO : MS_ITEM_NO,
            START_DATE : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            STOP_DATE : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            CM_CODE_ONLY : CM_CODE_ONLY
        }
        this.$axios.get(url,{params}).then(res =>{
            res.data.forEach(item =>{
                ck_list.push({
                    CM_CODE : item.CM_CODE,
                    CM_CODE_SETUMEI : item.CM_CODE_SETUMEI, 
                });
            })
            if(table_name == "PPPMMS")
            {
                this.EditInfo_Value[index].CHECK_LIST = ck_list;
                /*入力確認開始 */
                this.EditInfo_Value[index].CHECK_LIST.find(item =>{
                    if(this.EditInfo_Value[index].FIELD_VALUE !== null ||this.EditInfo_Value[index].FIELD_VALUE == "")
                    {
                    /*入力値と一致した場合テーブルの説明欄にCM_CODE_SETUMEIを表示*/
                        if(this.EditInfo_Value[index].FIELD_VALUE == item.CM_CODE){
                            this.EditInfo_Value[index].FIELD_EXPLAIN = item.CM_CODE_SETUMEI;
                            this.EditInfo_Value[index].Setsumei_Error =false;
                            return true;
                        }
                        /*入力値と一致しない場合、テーブルにエラーを表示する */
                        else 
                        {
                            this.EditInfo_Value[index].FIELD_EXPLAIN ="マスタに未登録の値が入力されています";
                            this.EditInfo_Value[index].Setsumei_Error =true;
                            return false;
                        }
                    }
                })    
            }
            else if (table_name == "PPPMORDER")
            {
                this.EditInfo2_Value[index].CHECK_LIST = ck_list;
                /*入力確認開始 */
                this.EditInfo2_Value[index].CHECK_LIST.find(item =>{
                    if(this.EditInfo2_Value[index].FIELD_VALUE !== null ||this.EditInfo2_Value[index].FIELD_VALUE == "")
                    {
                        if(this.EditInfo2_Value[index].FIELD_NAME.indexOf("MATL_BRANCH_CODE") == '0')
                        {
                            /*入力値と一致した場合テーブルの説明欄にCM_CODE_SETUMEIを表示*/
                            if(this.EditInfo2_Value[index].FIELD_VALUE.substr(0,2) == item.CM_CODE){
                                
                                this.EditInfo2_Value[index].FIELD_EXPLAIN = item.CM_CODE_SETUMEI;
                                this.EditInfo2_Value[index].Setsumei_Error =false;
                                return true;
                            }
                            /*入力値と一致しない場合、テーブルにエラーを表示する */
                            else 
                            {
                                this.EditInfo2_Value[index].FIELD_EXPLAIN ="マスタに未登録の値が入力されています";
                                this.EditInfo2_Value[index].Setsumei_Error =true;
                                return false;
                            }
                        }
                        else
                        {
                            /*入力値と一致した場合テーブルの説明欄にCM_CODE_SETUMEIを表示*/
                            if(this.EditInfo2_Value[index].FIELD_VALUE == item.CM_CODE){
                                this.EditInfo2_Value[index].FIELD_EXPLAIN = item.CM_CODE_SETUMEI;
                                this.EditInfo2_Value[index].Setsumei_Error =false;
                                return true;
                            }
                            /*入力値と一致しない場合、テーブルにエラーを表示する */
                            else 
                            {
                                this.EditInfo2_Value[index].FIELD_EXPLAIN ="マスタに未登録の値が入力されています";
                                this.EditInfo2_Value[index].Setsumei_Error =true;
                                return false;
                            }
                        }
                    }
                    else
                    {
                        return false;
                    }
                })    
            }
            else if (table_name == "CHMSA")
            {
                this.Koubai_EditTable_Item[index].CHECK_LIST = ck_list;
                /*入力確認開始 */
                this.Koubai_EditTable_Item[index].CHECK_LIST.find(item =>{
                    if(this.Koubai_EditTable_Item[index].FIELD_VALUE !== null ||this.Koubai_EditTable_Item[index].FIELD_VALUE == "")
                    {
                    /*入力値と一致した場合テーブルの説明欄にCM_CODE_SETUMEIを表示*/
                        if(this.Koubai_EditTable_Item[index].FIELD_VALUE == item.CM_CODE){
                            this.Koubai_EditTable_Item[index].FIELD_EXPLAIN = item.CM_CODE_SETUMEI;
                            this.Koubai_EditTable_Item[index].Setsumei_Error =false;
                            return true;
                        }
                        /*入力値と一致しない場合、テーブルにエラーを表示する */
                        else 
                        {
                            this.Koubai_EditTable_Item[index].FIELD_EXPLAIN ="マスタに未登録の値が入力されています";
                            this.Koubai_EditTable_Item[index].Setsumei_Error =true;
                            return false;
                        }
                    }
                })    
            }
            else if(table_name == "ZKMS")
            {
                this.Zaiko_EditTable_Item[index].CHECK_LIST = ck_list;
                /*入力確認開始 */
                this.Zaiko_EditTable_Item[index].CHECK_LIST.find(item =>{
                    if(this.Zaiko_EditTable_Item[index].FIELD_VALUE !== null ||this.Zaiko_EditTable_Item[index].FIELD_VALUE != "")
                    {
                    /*入力値と一致した場合テーブルの説明欄にCM_CODE_SETUMEIを表示*/
                        if(this.Zaiko_EditTable_Item[index].FIELD_VALUE == item.CM_CODE){
                            this.Zaiko_EditTable_Item[index].FIELD_EXPLAIN = item.CM_CODE_SETUMEI;
                            this.Zaiko_EditTable_Item[index].Setsumei_Error =false;
                            return true;
                        }
                        /*入力値と一致しない場合、テーブルにエラーを表示する */
                        else 
                        {
                            this.Zaiko_EditTable_Item[index].FIELD_EXPLAIN ="マスタに未登録の値が入力されています";
                            this.Zaiko_EditTable_Item[index].Setsumei_Error =true;
                            return false;
                        }
                    }
                })    
            }
            else if (table_name == "MAINTMS1")
            {
                this.Hoshu_EditTable1_Item[index].CHECK_LIST = ck_list;
                /*入力確認開始 */
                this.Hoshu_EditTable1_Item[index].CHECK_LIST.find(item =>{
                    if(this.Hoshu_EditTable1_Item[index].FIELD_VALUE !== null ||this.Hoshu_EditTable1_Item[index].FIELD_VALUE != "")
                    {
                    /*入力値と一致した場合テーブルの説明欄にCM_CODE_SETUMEIを表示*/
                        if(this.Hoshu_EditTable1_Item[index].FIELD_VALUE == item.CM_CODE){
                            this.Hoshu_EditTable1_Item[index].FIELD_EXPLAIN = item.CM_CODE_SETUMEI;
                            this.Hoshu_EditTable1_Item[index].Setsumei_Error =false;
                            this.Hoshu_EditTable1_Item[index].RULES.push(this.formRules.TrueRule);
                            return true;
                        }
                        /*入力値と一致しない場合、テーブルにエラーを表示する */
                        else 
                        {
                            this.Hoshu_EditTable1_Item[index].FIELD_EXPLAIN ="マスタに未登録の値が入力されています";
                            this.Hoshu_EditTable1_Item[index].Setsumei_Error =true;
                            this.Hoshu_EditTable1_Item[index].RULES.push(this.formRules.FalseRule);
                            return false;
                        }
                    }
                })   
            }
            else if (table_name == "MAINTMS2")
            {
                this.Hoshu_EditTable2_Item[index].CHECK_LIST = ck_list;
                /*入力確認開始 */
                this.Hoshu_EditTable2_Item[index].CHECK_LIST.find(item =>{
                    if(this.Hoshu_EditTable2_Item[index].FIELD_VALUE !== null ||this.Hoshu_EditTable2_Item!= "")
                    {
                        /*入力値と一致した場合テーブルの説明欄にCM_CODE_SETUMEIを表示*/
                        if(this.Hoshu_EditTable2_Item[index].FIELD_VALUE == item.CM_CODE){
                            this.Hoshu_EditTable2_Item[index].FIELD_EXPLAIN = item.CM_CODE_SETUMEI;
                            this.Hoshu_EditTable2_Item[index].Setsumei_Error =false;
                            this.Hoshu_EditTable2_Item[index].RULES.push(this.formRules.TrueRule);
                            return true;
                        }
                        /*入力値と一致しない場合、テーブルにエラーを表示する */
                        else 
                        {
                            this.Hoshu_EditTable2_Item[index].FIELD_EXPLAIN ="マスタに未登録の値が入力されています";
                            this.Hoshu_EditTable2_Item[index].Setsumei_Error =true;
                            this.Hoshu_EditTable2_Item[index].RULES.push(this.formRules.FalseRule);
                            return false;
                        }
                    }
                })   
            }
        }).catch(err=>{

        })
    },
    getSokoType(value){
        const url = this.Main_URL + "KensakuBtnGet";
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
                if(index.CM_CODE == this.FT_KOUBA)
                {
                    this.Edit_Combobox_1_select = index.CM_CODE + "*" +index.CM_CODE_SETUMEI;
                }
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
        const url = this.Main_URL + "KensakuBtnGet";
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
        const url = this.Main_URL + "KensakuBtnGet";
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
        this.TableHeight ="500px"
        this.TabledialogWidth ="700px"
        const url = this.Main_URL + "KensakuBtnGet";
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
    }
    ,
    getdialogChoumon(KOUNO){
        const url = this.Main_URL + "KensakuBtnGet";
        this.TableHeight ="500px"
        this.TabledialogWidth ="700px"
        const params ={
            CH_KOUNO:KOUNO,
            START_DATE : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            STOP_DATE : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        }
        this.$axios.get(url,{params}).then(res =>{
            this.dialogChoumonItem = res.data;
        }).catch(err=>{

        })
    },
    getdialogTantou(TANTO_KUBUN,PLANT_NO){
        const url = this.Main_URL + "KensakuBtnGet";
        this.TableHeight ="500px"
        this.TabledialogWidth ="600px"
        const params ={
            TANTO_KUBUN: TANTO_KUBUN,
            PLANT_NO: PLANT_NO,
            START_DATE : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            STOP_DATE : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        }
        this.$axios.get(url,{params}).then(res =>{
            this.dialogTantouItem = res.data;
        }).catch(err=>{
        
        })
    },
    getdialogTantai(LANGU){
        const url = this.Main_URL + "KensakuBtnGet";
        this.TableHeight ="500px"
        this.TabledialogWidth ="700px"
        const params ={
            LANGU:LANGU,
        }
        this.$axios.get(url,{params}).then(res =>{
            this.dialogTantaiItem = res.data;
        }).catch(err=>{
        
        })
    },
    getdialogArrary(NAME){
        this.TableHeight ="200px"
        this.TabledialogWidth ="500px"
        if(NAME == 'TRANSFER_REQ_PLANT')
        {
            this.dialogArrayItem =[
                {ARRAY_VALUE :"",ARRAY_SETUMEI:"指定なし"},
                {ARRAY_VALUE :"1",ARRAY_SETUMEI:"BigFit"},
                {ARRAY_VALUE :"2",ARRAY_SETUMEI:"BigWing"},
                {ARRAY_VALUE :"3",ARRAY_SETUMEI:"BigStep"},
                {ARRAY_VALUE :"5",ARRAY_SETUMEI:"PSC(大阪)"},
            ]
        }
        else if(NAME == 'FC_FLAG')
        {
            this.dialogArrayItem =[
                {ARRAY_VALUE :"0",ARRAY_SETUMEI:"しない"},
                {ARRAY_VALUE :"1",ARRAY_SETUMEI:"計画のみ"},
                {ARRAY_VALUE :"2",ARRAY_SETUMEI:"する"},
            ]
        }
        else if(NAME =='STOCK_PLAN_COUNT')
        {
            this.dialogArrayItem =[
                {ARRAY_VALUE :"",ARRAY_SETUMEI:"なし"},
                {ARRAY_VALUE :"1",ARRAY_SETUMEI:"(回/月)"},
                {ARRAY_VALUE :"2",ARRAY_SETUMEI:"(回/月)"},
                {ARRAY_VALUE :"3",ARRAY_SETUMEI:"(回/月)"},
                {ARRAY_VALUE :"4",ARRAY_SETUMEI:"(回/月)"},
            ]
        }
        else if(NAME == 'STOCK_PLAN_TYPE')
        {
            this.dialogArrayItem =[
                {ARRAY_VALUE :"",ARRAY_SETUMEI:"なし"},
                {ARRAY_VALUE :"1",ARRAY_SETUMEI:"台数"},
                {ARRAY_VALUE :"2",ARRAY_SETUMEI:"停止数"},
            ]
        }
        else if (NAME == 'ISSUE_FC_METHOD')
        {
            this.dialogArrayItem =[
                {ARRAY_VALUE :"",ARRAY_SETUMEI:"なし"},
                {ARRAY_VALUE :"1",ARRAY_SETUMEI:"3ヶ月平均値より計算"},
                {ARRAY_VALUE :"2",ARRAY_SETUMEI:"6ヶ月平均値より計算"},
            ]
        }
    },
    getDialogKouteiCode_Init(){
        const url = this.Main_URL + "KensakuBtnGet";
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
      this.getHeaderPic(value);
      const url = this.Main_URL + "KensakuBtnGet";
      
      const params = {
          Table_Id : value,
      }
      
      this.$axios.get(url,{params}).then(res =>{
            this.Header_Data = res.data;
            this.showHeader = true;
            this.Header_Data.forEach(item =>{
                if(item.APP_CUR_TYPE == 1)
                {
                    this.getEditTable(item.PART_NO,item.PART_REV_NO);
                    this.Get_FT_KOUBA();
                }
            })
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
        switch(this.EditdialogStatus){
            case '1':
                if(this.tab_select == "4")
                {
                    this.Zaiko_EditTable_Item[this.EditIndex].FIELD_VALUE = this.dialogKoumokuTableSelected[0].CM_CODE;
                    this.Zaiko_EditTable_Item[this.EditIndex].FIELD_EXPLAIN = this.dialogKoumokuTableSelected[0].CM_CODE_SETUMEI;
                    this.Zaiko_EditTable_Item[this.EditIndex].UPDATE_ST=true;
                    this.dialogKoumokuTableSelected =[];
                }
                else
                {
                    this.EditInfo_Value[this.EditIndex].FIELD_VALUE = this.dialogKoumokuTableSelected[0].CM_CODE;
                    this.EditInfo_Value[this.EditIndex].FIELD_EXPLAIN = this.dialogKoumokuTableSelected[0].CM_CODE_SETUMEI;
                    this.EditInfo_Value[this.EditIndex].UPDATE_ST=true;
                    this.dialogKoumokuTableSelected =[];
                }
                
                break;
            case '2':
                this.EditInfo_Value[this.EditIndex].FIELD_VALUE = this.dialogChoumonSelected[0].CH_CODE;
                this.EditInfo_Value[this.EditIndex].FIELD_EXPLAIN = this.dialogChoumonSelected[0].CH_CODE_SETUMEI_1;
                this.EditInfo_Value[this.EditIndex].UPDATE_ST=true;
                this.dialogChoumonSelected =[];
                break;
            case '3':
                if(this.tab_select == "4")
                {
                    this.Zaiko_EditTable_Item[this.EditIndex].FIELD_VALUE = this.dialogTantouSelected[0].TANTO_CODE;
                    this.Zaiko_EditTable_Item[this.EditIndex].FIELD_EXPLAIN = "[" + this.dialogTantouSelected[0].USER_ID + "]"+this.dialogTantouSelected[0].USER_NAME;
                    this.Zaiko_EditTable_Item[this.EditIndex].UPDATE_ST=true;
                    this.dialogTantouSelected =[];
                }
                else
                {
                    this.EditInfo_Value[this.EditIndex].FIELD_VALUE = this.dialogTantouSelected[0].TANTO_CODE;
                    this.EditInfo_Value[this.EditIndex].FIELD_EXPLAIN = "[" + this.dialogTantouSelected[0].USER_ID + "]"+this.dialogTantouSelected[0].USER_NAME;
                    this.EditInfo_Value[this.EditIndex].UPDATE_ST=true;
                    this.dialogTantouSelected =[];
                }
                
                break;
            case '4':
                this.EditInfo_Value[this.EditIndex].FIELD_VALUE = this.dialogTantaiSelected[0].TANI;
                this.EditInfo_Value[this.EditIndex].UPDATE_ST=true;
                this.dialogTantaiSelected =[];
                break;
            case '6':
                this.EditInfo_Value[this.EditIndex].FIELD_VALUE = this.dialogArraySelected[0].ARRAY_VALUE;
                this.EditInfo_Value[this.EditIndex].FIELD_EXPLAIN = this.dialogArraySelected[0].ARRAY_SETUMEI;
                this.EditInfo_Value[this.EditIndex].UPDATE_ST=true;
                this.dialogArraySelected =[];
                break;
        }
        this.dialogEditInfo = false;
    },
    getEditInfoDialog2(){
        switch(this.EditdialogStatus){
            case '1':
                this.EditInfo2_Value[this.EditIndex].FIELD_VALUE = this.dialogKoumokuTableSelected[0].CM_CODE;
                this.EditInfo2_Value[this.EditIndex].FIELD_EXPLAIN = this.dialogKoumokuTableSelected[0].CM_CODE_SETUMEI;
                this.EditInfo2_Value[this.EditIndex].UPDATE_ST=true;
                this.dialogKoumokuTableSelected =[];
                break;
            case '2':
                this.EditInfo2_Value[this.EditIndex].FIELD_VALUE = this.dialogChoumonSelected[0].CH_CODE;
                this.EditInfo2_Value[this.EditIndex].FIELD_EXPLAIN = this.dialogChoumonSelected[0].CH_CODE_SETUMEI_1;
                this.EditInfo2_Value[this.EditIndex].UPDATE_ST=true;
                this.dialogChoumonSelected =[];
                break;
            case '3':
                this.EditInfo2_Value[this.EditIndex].FIELD_VALUE = this.dialogTantouSelected[0].TANTO_CODE;
                this.EditInfo2_Value[this.EditIndex].FIELD_EXPLAIN = "[" + this.dialogTantouSelected[0].USER_ID + "]"+this.dialogTantouSelected[0].USER_NAME;
                this.EditInfo2_Value[this.EditIndex].UPDATE_ST=true;
                this.dialogTantouSelected =[];
                break;
            case '4':
                this.EditInfo2_Value[this.EditIndex].FIELD_VALUE = this.dialogTantaiSelected[0].TANI;
                this.EditInfo2_Value[this.EditIndex].UPDATE_ST=true;
                this.dialogTantaiSelected =[];
                break;
            case '6':
                this.EditInfo2_Value[this.EditIndex].FIELD_VALUE = this.dialogArraySelected[0].ARRAY_VALUE;
                this.EditInfo2_Value[this.EditIndex].FIELD_EXPLAIN = this.dialogArraySelected[0].ARRAY_SETUMEI;
                this.EditInfo2_Value[this.EditIndex].UPDATE_ST=true;
                this.dialogArraySelected =[];
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
        this.getdialogChoumon(ITEM_NO);
    },
    getEditDialogBtn3(value,ITEM_NO,PLANT_NO,Dialog){
        this.EditdialogStatus='3';
        this.dialogEditInfo = true;
        this.EditIndex = value;
        this.EditdialogItemNo = ITEM_NO;
        this.EditInfoDialog_Staus = Dialog;
        this.getdialogTantou(ITEM_NO,PLANT_NO);
    },
    getEditDialogBtn4(value,ITEM_NO,Dialog){ 
        this.EditdialogStatus='4'
        this.dialogEditInfo = true;
        this.EditIndex = value;
        this.EditdialogItemNo = ITEM_NO;
        this.EditInfoDialog_Staus = Dialog;
        this.getdialogTantai(ITEM_NO);
    },
    getEditDialogBtn6(value,FIELD_NAME,Dialog){
        this.EditdialogStatus='6';
        this.dialogEditInfo = true;
        this.EditIndex = value;
        this.EditInfoDialog_Staus = Dialog;
        this.getdialogArrary(FIELD_NAME);
    },
    changeSerachHeight(){
        this.mini = !this.mini;
        if(this.mini){
            this.search_height ="8%";
        }
        else
        {
            this.search_height ="100%";
        }
    },
    changeTableHeight(){
        this.mini2 = !this.mini2;
        if(this.mini2){
            this.table_height ="8%";
        }
        else
        {
            this.table_height ="100%";
        }
    },
    changeNavBar(value){
        if(value == 1)
        {
            this.drawer1 = false;
            this.drawer = true;
            this.table_height = this.search_height;
            this.search_height ="0%";
            this.mini2 = this.mini;
            this.mini = false;
        }
        else if(value == 2)
        {
            this.drawer = false;
            this.drawer1 = true;
            this.search_height = this.table_height;
            this.table_height ="0%";
            this.mini = this.mini2;
            this.mini2 = false;
        }
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
    teihaiPostReq(){
        var check =false; 
        this.EditInfo_Value.forEach(value =>{
            check = value.Setsumei_Error || check;
        })
        if(this.$refs.PPPMMS_FORM.validate() && !check ){
            this.POST_PPPMMMS();
            if(this.Edit_Combobox_1_select.substr(0,1) != '-')
            {
                this.POST_PPPMORDER();
            }
        }
        else
        {
            alert("入力が間違います。")
        }
    },
    //　seisakuPostReq()　製作画面内のデータをデータペースに更新するメソッド
    seisakuPostReq()
    {
        var check =false; 
        this.EditInfo2_Value.forEach(value =>{
            check = value.Setsumei_Error || check;
        })
        //  入力の確認、もし入力が正しくない場合警告画面を表示する
        if(this.$refs.PPPMORDER_form.validate() && this.$refs.KTSTDTIME_FORM.validate() && !check)
        {
            
            if(this.Edit_Combobox_1_select.substr(0,1) != '-')
            {
                // POST_PPPMORDER() PPPMORDERデータベースに更新するメソッド
                this.POST_PPPMORDER();  
                // POST_KTSTDTIME() KTSTDTIMEデータベースに更新するメソッド
                this.POST_KTSTDTIME();
            }
        }
        else
        {
            alert("入力が間違います。")
        }
    },
    //  kobaiPostReq()  購買が画面内のデータをデータベースに更新するメソッド
    kobaiPostReq(){
        //　入力フォーマットの入力正しいを確認
        var Update_check = false;
        //　購買情報入力確認
        this.Koubai_EditTable_Item.forEach(value =>{
            this.GetKoubaiSetsumei(this.Koubai_EditTable_Item.indexOf(value),value.FIELD_NAME)
            Update_check =value.Setsumei_Error || Update_check;
        })
        //　PM基本情報入力確認
        this.EditInfo_Value.forEach(value =>{
            //this.getEditTableSetsumei(this.EditInfo_Value.indexOf(value),value.FIELD_NAME)
            Update_check = value.Setsumei_Error || Update_check;
        })
        //  手配情報入力確認
        this.EditInfo2_Value.forEach(value =>{
            //this.getEditTableSetsumei2(this.EditInfo2_Value.indexOf(value),value.FIELD_NAME)
            Update_check = value.Setsumei_Error || Update_check;
        })
        //  もし、全項目の入力が正しいであれば、データベースにデータ更新開始します。
        if( !Update_check && this.$refs.CHMSA_FORM.validate() && this.$refs.PPPMORDER_form.validate() && this.$refs.PPPMMS_FORM.validate() )
        {
            //　POST_PPPMMMS()　PM基本情報をデータに更新
            this.POST_PPPMMMS();
            if(this.Edit_Combobox_1_select.substr(0,1) != '-')
            {
                // POST_PPPMORDER() PPPMORDERデータベースに更新するメソッド
                this.POST_PPPMORDER(); 
                // POST_CHMSA() CHMSA データベースに更新するメソッド
                this.POST_CHMSA()
            }
            if(this.Koubai_SGCODE_Select.substr(0,2) != "")
            {
                this.POST_PPPMPOSPEC();
            }
        }
        //　入力が間違っている場合警告画面を表示
        else
        {
            alert("入力が間違います。")
        }
    },
    //  ZaikoPostReq()  在庫が画面内のデータをデータベースに更新するメソッド
    ZaikoPostReq(){
        //　入力フォーマットの入力正しいを確認
        var Update_check = false;
        //　在庫情報入力確認
        this.Zaiko_EditTable_Item.forEach(value =>{
            this.GetZaikouSetsumei(this.Zaiko_EditTable_Item.indexOf(value),value.FIELD_NAME)
            Update_check =value.Setsumei_Error || Update_check;
        })
        //　PM基本情報入力確認
        this.EditInfo_Value.forEach(value =>{
            
            this.getEditTableSetsumei(this.EditInfo_Value.indexOf(value),value.FIELD_NAME)
            Update_check = value.Setsumei_Error || Update_check;
        })
        //  手配情報入力確認
        this.EditInfo2_Value.forEach(value =>{
            this.getEditTableSetsumei2(this.EditInfo2_Value.indexOf(value),value.FIELD_NAME)
            Update_check = value.Setsumei_Error || Update_check;
        })
        //  もし、全項目の入力が正しいであれば、データベースにデータ更新開始します。
        if( !Update_check && this.$refs.ZKMS_FORM.validate() && this.$refs.PPPMORDER_form.validate() && this.$refs.PPPMMS_FORM.validate() )
        {
            //　POST_PPPMMMS()　PM基本情報をデータに更新
            this.POST_PPPMMMS();
            // POST_PPPMORDER() PPPMORDERデータベースに更新するメソッド
            this.POST_PPPMORDER(); 
            // POST_ZKMS() ZKMS データベースに更新するメソッド
            this.POST_ZKMS();
        }
        //　入力が間違っている場合警告画面を表示
        else
        {
            alert("入力が間違います。")
        }
    },

    POST_PPPMMMS(){
        const url = this.Main_URL + "KensakuBtnPost/PPPMMS";
        this.NRPMA_POST={};
        this.NRPMHIS_POST={};
        var req ={};
        var Check_POST = false;
        //  入力フォームで変更したデータの確認
        this.EditInfo_Value.forEach(item =>{
            // item.UPDATE_ST　こちらのデータが変更状態を表示するプロパティ
            // True  :　変更
            // False :  未変更 
            if(item.UPDATE_ST)
            {
                // item.AUTH_TYPE == "2"　変更可能の項目だけを確認
                // AUTH_Type 0 : 未表示
                //           1 : 表示
                //           2 : 表示と変更可能
                if(item.AUTH_TYPE == "2")
                {
                    //  変更確認出来たデータを　req　に格納する
                    req[item.FIELD_NAME] = item.FIELD_VALUE;
                    //  更新する先が旧データペースと連携しているため、旧データベースと一緒に変更必要あります
                    this.convertPMtoNA(item.FIELD_NAME,item.FIELD_VALUE);
                    this.convertPMtoNH(item.FIELD_NAME,item.FIELD_VALUE);
                }
                Check_POST = true;
            }
            if(item.FIELD_NAME == "PART_NO" || item.FIELD_NAME == "PART_REV_NO")
                {
                    req[item.FIELD_NAME] = item.FIELD_VALUE;
                    this.convertPMtoNA(item.FIELD_NAME,item.FIELD_VALUE);
                    this.convertPMtoNH(item.FIELD_NAME,item.FIELD_VALUE);
                }   
        });
        this.EditInfo_Value=this.EditInfo_Value.map(item =>{
            item.UPDATE_ST = false;
            return item;
        })
        if(Check_POST)
        {
            const params =req;
            if(req != {})
            {
                this.$axios.post(url,params).then(
                
                ).catch(err=>{
                    
                })
                this.POST_NRPMA();
                this.POST_NRPHIS();
            }
        }
        
        
    },
    POST_NRPMA(){
        const url = this.Main_URL + "KensakuBtnPost/NRPMA";
        const params = this.NRPMA_POST;
        this.$axios.post(url,params).then(
            
        ).catch(err=>{
            
        })
        this.NRPMA_POST={};
    },
    POST_NRPMB(){
        const url = this.Main_URL + "KensakuBtnPost/NRPMB";
        const params = this.NRPMB_POST;
        this.$axios.post(url,params).then(
            
        ).catch(err=>{
            
        })
        this.NRPMB_POST={};
    },
    POST_NRPHIS(){
        const url = this.Main_URL + "KensakuBtnPost/NRPMHIS";
        const params = this.NRPMHIS_POST;
        this.$axios.post(url,params).then(
            
        ).catch(err=>{
            
        })
        this.NRPMHIS_POST={};

    },
    POST_PPPMORDER(){
        const url = this.Main_URL + "KensakuBtnPost/PPPMORDER";
        this.NRPMB_POST={};
        var PART_NO ="";
        var req_PPPMOREDR ={};
        var Check_UPLOAD = false;
        this.EditInfo2_Value.forEach(item =>{
            
            if(item.UPDATE_ST)
            {
                Check_UPLOAD = true;
                req_PPPMOREDR[item.FIELD_NAME] = item.FIELD_VALUE;
                this.convertPOtoNB(item.FIELD_NAME,item.FIELD_VALUE);
            }
            if(item.FIELD_NAME == "PART_NO")
            {
                PART_NO = item.FIELD_VALUE;
                this.convertPOtoNB(item.FIELD_NAME,item.FIELD_VALUE);
            }
        });
        
        if(Check_UPLOAD)
        {
            const Today =(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString();
            const UPD_WHEN = Today.substr(0,4)+Today.substr(5,2)+Today.substr(8,2) +Today.substr(11,2)+Today.substr(14,2)+Today.substr(17,2);
            req_PPPMOREDR["PART_NO"] =[];
            req_PPPMOREDR["PLANT_NO"] = [];
            req_PPPMOREDR["PART_NO"] = PART_NO;
            if(this.tab_select == '4')
            {
                req_PPPMOREDR["PLANT_NO"].push(this.FT_ZKMS_KOUBA);
            }
            else
            {
                req_PPPMOREDR["PLANT_NO"].push(this.Edit_Combobox_1_select.substr(0,1));
            }
            req_PPPMOREDR["UPD_WHO"] =this.userId;
            req_PPPMOREDR["UPD_WHEN"] =UPD_WHEN;
            this.NRPMB_POST["PLANT_NO"]=req_PPPMOREDR["PLANT_NO"];
            this.NRPMB_POST["UPD_WHO"]=req_PPPMOREDR["UPD_WHO"];
            this.NRPMB_POST["UPD_WHEN"]=req_PPPMOREDR["UPD_WHEN"];
            this.NRPMB_POST["ENT_DATE"] =Today.substr(0,4)+Today.substr(5,2)+Today.substr(8,2);
            if(this.Edit_checkbox && this.Edit_Combobox_2_select.substr(0,1) != "" &&
            this.Edit_Combobox_2_select.substr(0,1) != "-")
            {
                req_PPPMOREDR["PLANT_NO"].push(this.Edit_Combobox_2_select.substr(0,1));
            } 
            this.NRPMB_POST["PLANT_NO"]=req_PPPMOREDR["PLANT_NO"];
            this.EditInfo2_Value=this.EditInfo2_Value.map(item =>{
                item.UPDATE_ST = false;
                return item;
            })
            
            const params =req_PPPMOREDR;
            this.$axios.post(url,params).then(
        
            ).catch(err=>{
                
            })
            this.POST_NRPMB();
            
        }
        req_PPPMOREDR ={};
    },
    POST_KTSTDTIME(){
        const url = this.Main_URL + "KensakuBtnPost/KTSTDTIME";
        var req ={};
        var SEQ_NO ="";
        this.STD_EditInfo_Item.forEach(item => {
            if(item.UPDATE_ST)
            {
                if(item.AUTH_TYPE == "2")
                {
                    req[item.FIELD_NAME] = item.FIELD_VALUE;
                }
            }
            if(item.FIELD_NAME == "SEQ_NO")
            {
                
                SEQ_NO = item.FIELD_VALUE;
            }
        })

        if(req !== {})
        {
            req["PART_NO"] = this.Header_Data[this.Header_Data.length-1].PART_NO;
            req["KT_CODE"] = this.KT_CODE_SELECT;
            req["PLANT_NO"] = this.Edit_Combobox_1_select.substr(0,1);
            req["SEQ_NO"] =SEQ_NO ;
            this.STD_EditInfo_Item=this.STD_EditInfo_Item.map(item =>{
                item.UPDATE_ST = false;
                return item;
            })
            const params =req;
            this.$axios.post(url,params).then(
            
            ).catch(err=>{
                
            })
        }
    },
    POST_CHMSA(){
        const url = this.Main_URL + "KensakuBtnPost/CHMSA";
        var UP_check= false;
        var req ={};
        //　更新する情報入力
        this.Koubai_EditTable_Item.forEach(item => {
            //　入力した項目だけ更新する
            if(item.UPDATE_ST)
            {
                UP_check = true;
                if(item.AUTH_TYPE == "2")
                {
                    req[item.FIELD_NAME] = item.FIELD_VALUE;
                }
            }
        })
        if(UP_check)
        {
            const Today =(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString();
            const UPD_WHEN = Today.substr(0,4)+Today.substr(5,2)+Today.substr(8,2) +Today.substr(11,2)+Today.substr(14,2)+Today.substr(17,2);
            //  プライマリーキー
            req["PART_NO"] = this.Header_Data[this.Header_Data.length-1].PART_NO;
            req["PLANT_NO"] = this.Edit_Combobox_1_select.substr(0,1);
            req["SG_CODE"] = this.Koubai_SG_CODE;
            req["VENDOR_CODE"] = this.Koubai_VENDOR_CODE;
            req["PRIORITY"] = this.Koubai_PRIORITY;
            //  ユーザー名更新日
            req["UPD_WHO"] = this.userId; 
            req["UPD_WHEN"] = UPD_WHEN;
            this.Koubai_EditTable_Item=this.Koubai_EditTable_Item.map(item =>{
                item.UPDATE_ST = false;
                return item;
            })
            const params =req;
            this.$axios.post(url,params).then(
            
            ).catch(err=>{
                
            })
            
        }
    },
    POST_PPPMPOSPEC(){
        const url = this.Main_URL + "KensakuBtnPost/PPPMPOSPEC";
        var UP_check= false;
        var req ={};
        //　更新する情報入力
        this.Koubai_PPPMPOSPEC_Item.forEach( item => {
            //　入力した項目だけ更新する
            if(item.UPDATE_ST)
            {
                UP_check = true;
                if(item.AUTH_TYPE == "2")
                {
                    req[item.FIELD_NAME] = item.FIELD_VALUE;
                }
            }
        })
        if(UP_check)
        {
            const Today =(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString();
            const UPD_WHEN = Today.substr(0,4)+Today.substr(5,2)+Today.substr(8,2) +Today.substr(11,2)+Today.substr(14,2)+Today.substr(17,2);
            //  プライマリーキー
            req["PART_NO"] = this.Header_Data[this.Header_Data.length-1].PART_NO;
            req["WORK_CODE"] = this.Koubai_SGCODE_Select.substr(0,2);
            //  ユーザー名更新日
            req["UPD_WHO"] = this.userId;
            req["UPD_WHEN"] = UPD_WHEN;
            this.Koubai_PPPMPOSPEC_Item=this.Koubai_PPPMPOSPEC_Item.map(item =>{
                item.UPDATE_ST = false;
                return item;
            })
            const params =req;
            this.$axios.post(url,params).then(()=>{
                this.GET_PPPMPOSPEC();
            }
            ).catch(err=>{
                
            })
            
        }
    },
    POST_ZKMS(){
        const url = this.Main_URL + "KensakuBtnPost/ZKMS";
        var UP_check = false;
        var req = {};
        var req_new_data = {};
        this.Zaiko_EditTable_Item.forEach(item =>{
            if(item.UPDATE_ST)
            {
                UP_check = true;
                if(item.AUTH_TYPE == "2")
                {
                    req[item.FIELD_NAME] = item.FIELD_VALUE;
                }
                if(this.Zaiko_New_Data)
                {
                    req_new_data[item.FIELD_NAME] = item.FIELD_VALUE;
                }
            }
        })
        if(UP_check)
        {
            const Today =(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString();
            const UPD_WHEN = Today.substr(0,4)+Today.substr(5,2)+Today.substr(8,2) +Today.substr(11,2)+Today.substr(14,2)+Today.substr(17,2);
            //  プライマリーキー
            req["PART_NO"] = this.Header_Data[this.Header_Data.length-1].PART_NO;
            req["SOKO_CODE"] = this.Zaikou_SokoCode_Select;
            //  ユーザー名更新日
            req["UPD_WHO"] = this.userId;
            req["UPD_WHEN"] = UPD_WHEN;
            this.Koubai_PPPMPOSPEC_Item=this.Koubai_PPPMPOSPEC_Item.map(item =>{
                item.UPDATE_ST = false;
                return item;
            })
            this.Zaiko_New_Data = false;
            const params =req;
            console.log(params);
            /*
            this.$axios.post(url,params).then(()=>{
                //this.GetZKMS(req["PART_NO"],req["SOKO_CODE"]);
            }
            ).catch(err=>{
                
            })
            */
        }
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
        this.shousaiSelectSouko="";
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