<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
            <ion-title>home</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title size="large">Home</ion-title>
            </ion-toolbar>
            </ion-header>
            <br/><br/><br/>
            <div v-for="(p, postlog) in postlog">
                <div id="post">
                    <p v-if="p.data[2].image == ''">no posts</p>
                    <img v-if="p.data[2].image != ''" :src="'data:image/jpg;base64,' + p.data[2].image">
                    <br/><br/>
                    <div id="options_bar">
                        <ion-text><h1>{{ p.data[1].userdata[1].name }}</h1></ion-text>
                        <div id="extra_options">
                            <div id="like_button">
                                <ion-icon id='main_heart' size="large" :icon="heart" color="light" v-if="p.data[7].liked == false" @click="like(p.data[0].id, p.data[3].likes)"></ion-icon>
                                <ion-icon size="large" :icon="heart" color="danger" v-if="p.data[7].liked == true"></ion-icon>
                                <ion-icon id='extra_heart' size="large" :icon="heart" color="danger"></ion-icon>
                                <ion-text id="likes">{{ p.data[3].likes }}</ion-text>
                            </div>
                            
                            <div id="socials">
                                <ion-button color="primary" @click="openLink(1, p.data[1].userdata[3].instagram)">
                                    <ion-icon size="small" :icon="logoInstagram"></ion-icon>
                                </ion-button>
                                <ion-button color="primary" @click="openLink(2, p.data[1].userdata[4].tiktok)">
                                    <ion-icon size="small" :icon="logoTiktok"></ion-icon>
                                </ion-button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div id="no_post">
                <p>login to see posts</p>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonText, getTimeGivenProgression } from '@ionic/vue';
import { defineComponent, reactive } from 'vue';
import { getFuturePosts, likePost } from '../httpRequests/postRequests.js';
import { Browser } from '@capacitor/browser';
import { heart, logoInstagram, logoTiktok } from 'ionicons/icons';
import { getTime } from '../httpRequests/userRequests.js';
import {makeHaptic, makeToast} from '../scripts/toast.js';
import { Storage } from '@ionic/storage';

export default defineComponent({
    components: {
        IonPage,
        IonContent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonIcon,
        IonButton,
        IonText
    },
    methods: {
        async openLink(social, account){
            makeHaptic('light');
            var u = '';
            if(social == 1){
                u = 'https://www.instagram.com/' + account + '/';
            }
            else{
                u = 'https://www.tiktok.com/@' + account;
            }
            console.log(u);
            await Browser.open({ url: u });
        },
        async like(postid, prelikes){
            makeHaptic('medium');
            var userid = sessionStorage.getItem('userid')
            var response = await likePost(userid, postid);
            if(response.success == true){
                document.getElementById('likes').innerText = parseInt(prelikes) + 1;
                document.getElementById('main_heart').style.display = 'none';
                document.getElementById('extra_heart').style.display = 'block';
            }
            else{
                makeToast('error liking post');
            }
        }
    },
    data(){
        return{
        }
    },
    setup(){

        async function getU(){
            var store = new Storage();
            store.create();
            sessionStorage.setItem('userid', await store.get('userid'));
        }
        getU();

        var userid = sessionStorage.getItem('userid');
        console.log(userid);

        //var post = reactive([]);
        var postlog = reactive([]);

        async function getPost(userid, count){
            var p = await getFuturePosts(userid, count, 3);
            
            
            postlog.push(p);
            
            
            //console.log(p);
        }

        if(userid != null && userid != "" && userid != 'null'){
            getPost(userid, 1);
            //document.getElementById('no_post').style.display = "none";
        }

        function delay(amount) {
            return new Promise(resolve => setTimeout(resolve, amount));
        }
        var num = 0;
        async function time(){
            
            //console.log(userid);
            userid = sessionStorage.getItem('userid');
            if(userid != null && userid != "" && userid != 'null'){
                //postlog = post;
                //console.log('dafsdfsa');
                var response = await getTime(userid);
                //console.log(response);
                if(response.success == true || num == 0){
                    delay(2000)
                    postlog.splice(0);
                    getPost(userid, 1);
                    num = 1;
                }
                
            }
            else{
                //console.log('login');
                //makeToast('you must be logged in', 'danger')
            }
            //console.log(post);
            //console.log(postlog)

            delay(1000).then(() => time());
        }

        time();
        //onsole.log(post);
        

        return{postlog, logoInstagram, logoTiktok, heart};
      
    },
    mounted(){
        

        async function getU(){
            //const sessionStorage = window.sessionStorage;
            var store = new Storage();
            store.create();
            var u = await store.get('userid');
            var pk = await store.get('userpublickey');
            console.log(pk);
            if(sessionStorage.getItem('userid') == "" || sessionStorage.getItem('userid') == null || sessionStorage.getItem('userid') == 'null'){

                if(u == null || u == "" || u == 'null'){
                    console.log('no')
                    this.$router.push("/firstlogin");
                }
                else{
                    console.log('yes');
                    sessionStorage.setItem('userid', u);
                    sessionStorage.setItem('userpublickey', pk);
                    console.log(sessionStorage.getItem('userpublickey'));
                }

                //
            }
            else{
                sessionStorage.setItem('userpublickey', pk);
                console.log(sessionStorage.getItem('userpublickey'));
            }
        }
        getU();
        
    }
    
});
</script>

<style scoped>

#post{
    width: 95%;
    margin-left: auto;
    margin-right: auto;
}

img{
    border-radius: 10px;
}

#extra_heart{
    display: none;
}

#main_heart{
    display: block;
}

#options_bar{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#like_button{
    display: flex;
    align-items: center;
}

ion-text{
    margin-left: 5px;
}

#extra_options{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#socials{
    margin-left: 10px;
}

#no_post{
    display: none;
}

</style>