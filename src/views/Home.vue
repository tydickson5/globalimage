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
            <div v-for="(p, post) in post">
                <div id="post">
                    <p v-if="p.data[2].image == ''">no posts</p>
                    <img v-if="p.data[2].image != ''" :src="'data:image/jpg;base64,' + p.data[2].image">
                    <br/><br/>
                    <div id="options_bar">
                        <div id="like_button">
                            <ion-icon id='main_heart' size="large" :icon="heart" color="light" v-if="p.data[7].liked == false" @click="like(p.data[0].id, p.data[3].likes)"></ion-icon>
                            <ion-icon size="large" :icon="heart" color="danger" v-if="p.data[7].liked == true"></ion-icon>
                            <ion-icon id='extra_heart' size="large" :icon="heart" color="danger"></ion-icon>
                            <ion-text id="likes">{{ p.data[3].likes }}</ion-text>
                        </div>
                        
                        <div id="socials">
                            <ion-button color="primary" @click="openLink('instagram', p.data[1].userdata[3].instagram)">
                                <ion-icon size="small" :icon="logoInstagram"></ion-icon>
                            </ion-button>
                            <ion-button color="primary" @click="openLink('tiktok', p.data[1].userdata[4].tiktok)">
                                <ion-icon size="small" :icon="logoTiktok"></ion-icon>
                            </ion-button>
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonText } from '@ionic/vue';
import { defineComponent, reactive } from 'vue';
import { getFuturePosts, likePost } from '../httpRequests/postRequests.js';
import { Browser } from '@capacitor/browser';
import { heart, logoInstagram, logoTiktok } from 'ionicons/icons';

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
            var u = '';
            if(social = 'instagram'){
                u = 'https://www.instagram.com/' + account + '/';
            }
            else{
                u = 'https://www.tiktok.com/@' + account;
            }
            await Browser.open({ url: u });
        },
        async like(postid, prelikes){
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

        var userid = sessionStorage.getItem('userid');

        const post = reactive([]);

        async function getPost(userid){
            var p = await getFuturePosts(userid, 1, 3);
            post.push(p);
            console.log(p);
        }

        getPost(userid);

        return{post, logoInstagram, logoTiktok, heart};
      
    },
    mounted(){
      if(sessionStorage.getItem('userid') == "" || sessionStorage.getItem('userid') == null){
        this.$router.push("/login");
      }
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

#main_hear{
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

</style>